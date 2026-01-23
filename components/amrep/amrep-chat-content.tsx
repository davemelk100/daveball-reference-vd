"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Send,
  Bot,
  User,
  Loader2,
  Plus,
  History,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

// Helper to extract text content from a message
function getMessageText(message: UIMessage): string {
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter(
        (part): part is { type: "text"; text: string } => part.type === "text",
      )
      .map((part) => part.text)
      .join("");
  }
  return "";
}

function linkifyText(text: string) {
  if (!text) return text;
  return text.replace(
    /(?<!\]\()https?:\/\/[^\s)]+/g,
    (url) => `[${url}](${url})`,
  );
}

const chatPrompts = [
  "Let's talk about GBV - fire away!",
  "What's your favorite GBV album?",
  "Ready to dive into some lo-fi history?",
  "Ask me anything about Guided By Voices!",
  "From Bee Thousand to now - I'm here to help!",
  "Let's geek out on some deep cuts!",
  "Who's your favorite lineup? Let's chat!",
  "Time to talk about Uncle Bob!",
  "What GBV mystery can I solve for you?",
  "Let's explore the catalog together!",
  "From Dayton with love - ask away!",
  "Ready to recommend some hidden gems?",
];

const amrepChatPrompts = [
  "Want a quick AmRep label history?",
  "Ask about an AmRep artist or release.",
  "Looking for noisy rock from the AmRep roster?",
  "Which AmRep era are you exploring?",
  "Need a quick primer on the label’s catalog?",
  "Let’s dig into AmRep’s artist roster.",
];

interface SavedChat {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: number;
  updatedAt: number;
}

const CHAT_KEYS = {
  gbv: {
    chats: "gbv-saved-chats",
    session: "gbv-chat-session",
    idPrefix: "gbv",
  },
  amrep: {
    chats: "amrep-saved-chats",
    session: "amrep-chat-session",
    idPrefix: "amrep",
  },
};

function getSavedChats(storageKey: string): SavedChat[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveChat(storageKey: string, chat: SavedChat) {
  if (typeof window === "undefined") return;
  const chats = getSavedChats(storageKey);
  const index = chats.findIndex((c) => c.id === chat.id);
  if (index >= 0) {
    chats[index] = chat;
  } else {
    chats.unshift(chat);
  }
  localStorage.setItem(storageKey, JSON.stringify(chats.slice(0, 50)));
}

function deleteChat(storageKey: string, chatId: string) {
  if (typeof window === "undefined") return;
  const chats = getSavedChats(storageKey).filter((c) => c.id !== chatId);
  localStorage.setItem(storageKey, JSON.stringify(chats));
}

function getSessionSnapshot(storageKey: string): {
  messages: UIMessage[];
  currentChatId: string | null;
  input: string;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSessionSnapshot(
  storageKey: string,
  snapshot: {
    messages: UIMessage[];
    currentChatId: string | null;
    input: string;
  },
) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(snapshot));
  } catch {
    // Ignore storage errors.
  }
}

function isHardRefresh(): boolean {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (!nav || nav.type !== "reload") return false;
  return nav.transferSize > 0;
}

function shouldRestoreSession(): boolean {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (!nav || nav.type !== "reload") return false;
  return !isHardRefresh();
}

function generateChatId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateChatTitle(messages: UIMessage[]): string {
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (firstUserMessage) {
    const text = getMessageText(firstUserMessage);
    return text.slice(0, 50) + (text.length > 50 ? "..." : "");
  }
  return "New Chat";
}

export function GbvChatContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const keys = CHAT_KEYS[site.id];
  const sitePrompts = site.id === "amrep" ? amrepChatPrompts : chatPrompts;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [randomPrompt, setRandomPrompt] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [lastSavedLength, setLastSavedLength] = useState(0);
  const pendingMessagesRef = useRef<UIMessage[] | null>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: site.id === "amrep" ? "/api/amrep/ask" : "/api/gbv/ask",
      }),
    [],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
    id: `${keys.idPrefix}-chat-${chatKey}`,
  });

  // Apply pending messages after chat key changes
  useEffect(() => {
    if (pendingMessagesRef.current) {
      setMessages(pendingMessagesRef.current);
      pendingMessagesRef.current = null;
    }
  }, [chatKey, setMessages]);

  const isLoading = status === "streaming" || status === "submitted";

  // Load saved chats on mount
  useEffect(() => {
    setSavedChats(getSavedChats(keys.chats));
  }, [keys.chats]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isHardRefresh()) {
      sessionStorage.removeItem(keys.session);
      return;
    }

    if (shouldRestoreSession()) {
      const snapshot = getSessionSnapshot(keys.session);
      if (snapshot?.messages?.length) {
        setMessages(snapshot.messages);
        setCurrentChatId(snapshot.currentChatId ?? null);
        setInput(snapshot.input ?? "");
        setLastSavedLength(snapshot.messages.length);
      }
    }
  }, [keys.session, setMessages]);

  // Set random prompt on mount
  useEffect(() => {
    setRandomPrompt(
      sitePrompts[Math.floor(Math.random() * sitePrompts.length)],
    );
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Autosave chat when messages change
  useEffect(() => {
    if (
      messages.length > 0 &&
      !isLoading &&
      messages.length !== lastSavedLength &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      const chatId = currentChatId || generateChatId(keys.idPrefix);
      const chat: SavedChat = {
        id: chatId,
        title: generateChatTitle(messages),
        messages: messages,
        createdAt: currentChatId
          ? savedChats.find((c) => c.id === currentChatId)?.createdAt ||
            Date.now()
          : Date.now(),
        updatedAt: Date.now(),
      };

      saveChat(keys.chats, chat);
      setCurrentChatId(chatId);
      setSavedChats(getSavedChats(keys.chats));
      setLastSavedLength(messages.length);
    }
  }, [
    messages,
    isLoading,
    currentChatId,
    savedChats,
    lastSavedLength,
    keys.chats,
    keys.idPrefix,
  ]);

  useEffect(() => {
    saveSessionSnapshot(keys.session, { messages, currentChatId, input });
  }, [messages, currentChatId, input, keys.session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput("");
    await sendMessage({ text: message });
  };

  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setChatKey((prev) => prev + 1);
    setLastSavedLength(0);
    setRandomPrompt(
      sitePrompts[Math.floor(Math.random() * sitePrompts.length)],
    );
    setShowHistory(false);
  }, [setMessages]);

  const handleLoadChat = useCallback((chat: SavedChat) => {
    setCurrentChatId(chat.id);
    pendingMessagesRef.current = chat.messages;
    setChatKey((prev) => prev + 1);
    setLastSavedLength(chat.messages.length);
    setShowHistory(false);
  }, []);

  const handleDeleteChat = useCallback(
    (chatId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteChat(keys.chats, chatId);
      setSavedChats(getSavedChats(keys.chats));
      if (currentChatId === chatId) {
        handleNewChat();
      }
    },
    [currentChatId, handleNewChat, keys.chats],
  );

  // Chat History Sidebar
  const historySidebar = showHistory && (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => setShowHistory(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-80 bg-background shadow-lg p-4 overflow-y-auto text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-black">Saved Chats</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {savedChats.length === 0 ? (
          <p className="text-black text-sm">No saved chats yet.</p>
        ) : (
          <div className="space-y-2">
            {savedChats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors group",
                  currentChatId === chat.id && "bg-muted",
                )}
                onClick={() => handleLoadChat(chat)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-black">
                      {chat.title}
                    </p>
                    <p className="text-xs text-black">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const chatActions = (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHistory(!showHistory)}
        className="gap-1 h-10 px-4"
      >
        <History className="h-4 w-4" />
        <span className="hidden sm:inline">History</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNewChat}
        className="gap-1 h-10 px-4"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New</span>
      </Button>
    </div>
  );

  // Empty state - centered layout
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {historySidebar}

        <div className="flex-1 overflow-y-auto">
          {/* Centered content */}
          <div className="flex flex-col items-center justify-start px-4 pt-4">
            <Image
              src={site.chatIconSrc}
              alt={site.chatLabel}
              width={128}
              height={128}
              className="h-32 w-32 mb-4 gbv-rune-white object-contain"
              priority
              loading="eager"
            />
            <h1 className="mb-2">{site.chatLabel}</h1>

            {randomPrompt && (
              <p className="text-center text-muted-foreground mb-4 text-lg">
                {randomPrompt}
              </p>
            )}

            <form
              id="chat-form"
              onSubmit={handleSubmit}
              className="flex w-full max-w-2xl"
            >
              <input
                ref={inputRef}
                id="chat-input"
                name="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${site.shortName} artists, releases, history...`}
                className="flex-1 h-12 px-4 rounded-lg border border-black/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
                autoComplete="off"
              />
            </form>

            <div className="mt-4">{chatActions}</div>
          </div>
        </div>
      </div>
    );
  }

  // Messages layout - input at bottom
  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {historySidebar}

      {/* Scrollable area - messages */}
      <div className="flex-1 overflow-y-auto">
        {/* Messages */}
        <div className="mx-auto px-4 sm:px-[calc(1rem+25px)] max-w-4xl space-y-1 pt-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              Error: {error.message}
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Image
                    src={site.chatIconSrc}
                    alt={site.chatLabel}
                    width={20}
                    height={20}
                    className="h-5 w-5 gbv-rune-white object-contain"
                  />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#eaeaea] text-black",
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose max-w-none text-sm text-black [&_p]:text-sm [&_li]:text-sm [&_p]:my-3 [&_ul]:my-2.5 [&_ol]:my-2.5 [&_li]:my-1 [&_h1]:text-base [&_h2]:text-base [&_h3]:text-sm [&_h1]:my-3 [&_h2]:my-3 [&_h3]:my-2">
                    <ReactMarkdown
                      components={{
                        a: ({ href, children, ...props }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {linkifyText(getMessageText(message))}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-sm">{getMessageText(message)}</div>
                )}
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                <Image
                  src={site.chatIconSrc}
                  alt={site.chatLabel}
                  width={20}
                  height={20}
                  className="h-5 w-5 gbv-rune-white object-contain"
                />
              </div>
              <div className="rounded-lg px-4 py-2">
                <Image
                  src={site.chatIconSrc}
                  alt={site.chatLabel}
                  width={20}
                  height={20}
                  className="h-5 w-5 animate-spin gbv-rune-white object-contain"
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="shrink-0 pt-4 pb-4">
        <div className="mx-auto px-4 sm:px-[calc(1rem+25px)] max-w-4xl space-y-3">
          <form id="chat-form" onSubmit={handleSubmit} className="flex">
            <input
              ref={inputRef}
              id="chat-input"
              name="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${site.shortName} artists, releases, history...`}
              className="flex-1 h-12 px-4 rounded-lg border border-black/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
              autoComplete="off"
            />
          </form>
          {chatActions}
        </div>
      </div>
    </div>
  );
}
