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
import {
  getSavedChats,
  saveChat,
  deleteChat,
  generateChatId,
  generateChatTitle,
  type SavedChat,
} from "@/lib/nfl-chat-storage";
import {
  isDisallowedMediaRequest,
  MEDIA_GENERATION_BLOCK_RESPONSE,
} from "@/lib/chat-guard";

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

function createLocalMessage(
  id: string,
  role: "user" | "assistant",
  text: string,
): UIMessage {
  return {
    id,
    role,
    parts: [{ type: "text", text }],
  };
}

const chatPrompts = [
  "Ask me anything about the NFL!",
  "Curious about football history? Let's chat!",
  "Want to know about NFL teams? Fire away!",
  "From the Super Bowl to the Draft - ask away!",
  "Let's talk about the greatest players of all time!",
  "Got a question about NFL stats? I'm here!",
  "Which QB is the GOAT? Let's discuss!",
  "Ready to talk football? Ask me anything!",
];

export function NFLAskContent() {
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
    () => new DefaultChatTransport({ api: "/api/nfl/ask" }),
    [],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
    id: `nfl-chat-${chatKey}`,
  });

  useEffect(() => {
    if (pendingMessagesRef.current) {
      setMessages(pendingMessagesRef.current);
      pendingMessagesRef.current = null;
    }
  }, [chatKey, setMessages]);

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    setSavedChats(getSavedChats());
  }, []);

  useEffect(() => {
    setRandomPrompt(
      chatPrompts[Math.floor(Math.random() * chatPrompts.length)],
    );
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (
      messages.length > 0 &&
      !isLoading &&
      messages.length !== lastSavedLength &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      const chatId = currentChatId || generateChatId();
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

      saveChat(chat);
      setCurrentChatId(chatId);
      setSavedChats(getSavedChats());
      setLastSavedLength(messages.length);
    }
  }, [messages, isLoading, currentChatId, savedChats, lastSavedLength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput("");
    if (isDisallowedMediaRequest(message)) {
      const baseId = `local-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      setMessages([
        ...messages,
        createLocalMessage(`${baseId}-user`, "user", message),
        createLocalMessage(
          `${baseId}-assistant`,
          "assistant",
          MEDIA_GENERATION_BLOCK_RESPONSE,
        ),
      ]);
      return;
    }
    await sendMessage({ text: message });
  };

  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setChatKey((prev) => prev + 1);
    setLastSavedLength(0);
    setRandomPrompt(
      chatPrompts[Math.floor(Math.random() * chatPrompts.length)],
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
      deleteChat(chatId);
      setSavedChats(getSavedChats());
      if (currentChatId === chatId) {
        handleNewChat();
      }
    },
    [currentChatId, handleNewChat],
  );

  const historySidebar = showHistory && (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={() => setShowHistory(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-80 bg-background shadow-lg p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Saved Chats</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {savedChats.length === 0 ? (
          <p className="text-muted-foreground text-sm">No saved chats yet.</p>
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
                    <p className="font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">
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
    <div className="flex justify-end gap-2 px-4 pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHistory(!showHistory)}
        className="gap-1"
      >
        <History className="h-4 w-4" />
        <span className="hidden sm:inline">History</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNewChat}
        className="gap-1"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New</span>
      </Button>
    </div>
  );

  // Empty state - centered layout
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-180px)]">
        {historySidebar}
        {chatActions}

        <div className="flex-1 flex flex-col items-center px-4">
          <Image src="/nfl-logo.svg" alt="ChatNFL" width={128} height={128} className="h-32 w-auto mb-4" />
          <h1 className="mb-2">ChatNFL</h1>

          {randomPrompt && (
            <p className="text-center text-muted-foreground mb-4 text-lg">
              {randomPrompt}
            </p>
          )}

          <form
            id="chat-form"
            onSubmit={handleSubmit}
            className="flex gap-2 w-full max-w-2xl"
          >
            <input
              ref={inputRef}
              id="chat-input"
              name="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the NFL, teams, players, or history..."
              className="flex-1 h-10 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Messages layout - input at bottom
  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {historySidebar}
      {chatActions}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto px-4 sm:px-[calc(1rem+25px)] max-w-4xl w-full">
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <Image src="/nfl-logo.svg" alt="ChatNFL" width={96} height={96} className="h-24 w-auto" />
              <div className="flex-1">
                <h1 className="whitespace-nowrap">
                  ChatNFL
                </h1>
              </div>
              <div className="flex gap-2" />
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-[calc(1rem+25px)] max-w-4xl space-y-1">
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
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#eaeaea]",
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose dark:prose-invert max-w-none text-sm [&_p]:text-sm [&_li]:text-sm [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_h1]:text-base [&_h2]:text-base [&_h3]:text-sm [&_h1]:my-2 [&_h2]:my-2 [&_h3]:my-1">
                    <ReactMarkdown>{getMessageText(message)}</ReactMarkdown>
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
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-[#eaeaea]">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 pt-4 pb-4">
        <div className="mx-auto px-4 sm:px-[calc(1rem+25px)] max-w-4xl">
          <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              id="chat-input"
              name="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the NFL, teams, players, or history..."
              className="flex-1 h-10 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
