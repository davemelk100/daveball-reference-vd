import { type UIMessage } from "ai";

export interface SavedChat {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "chatnfl-saved-chats";

export function generateChatId(): string {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getSavedChats(): SavedChat[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveChat(chat: SavedChat): void {
  if (typeof window === "undefined") return;
  try {
    const chats = getSavedChats();
    const existingIndex = chats.findIndex((c) => c.id === chat.id);
    if (existingIndex >= 0) {
      chats[existingIndex] = { ...chat, updatedAt: Date.now() };
    } else {
      chats.unshift(chat);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (e) {
    console.error("Failed to save chat:", e);
  }
}

export function deleteChat(chatId: string): void {
  if (typeof window === "undefined") return;
  try {
    const chats = getSavedChats();
    const filtered = chats.filter((c) => c.id !== chatId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error("Failed to delete chat:", e);
  }
}

export function generateChatTitle(messages: UIMessage[]): string {
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (!firstUserMessage) return "New Chat";

  let text = "";
  if (firstUserMessage.parts && Array.isArray(firstUserMessage.parts)) {
    text = firstUserMessage.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  if (text.length > 50) {
    return text.substring(0, 47) + "...";
  }
  return text || "New Chat";
}
