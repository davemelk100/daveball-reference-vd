"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

// Helper to extract text content from a message (handles both old and new formats)
function getMessageText(message: UIMessage): string {
  // New format: parts array
  if (message.parts && Array.isArray(message.parts)) {
    return message.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("")
  }
  // Old format: content string
  if (typeof (message as { content?: string }).content === "string") {
    return (message as { content: string }).content
  }
  return ""
}

const exampleQuestions = [
  "Who has the most home runs in a single season?",
  "Compare Babe Ruth and Mike Trout's career stats",
]

export function AskPageContent() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState("")

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/ask" }), [])

  const { messages, sendMessage, status, error } = useChat({
    transport,
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const message = input.trim()
    setInput("")
    await sendMessage({ text: message })
  }

  const handleExampleClick = async (question: string) => {
    if (isLoading) return
    await sendMessage({ text: question })
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold whitespace-nowrap">ChatMLB</h1>
        <p className="text-sm text-muted-foreground">Ask questions about baseball statistics and history</p>
      </div>

      <Card className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">Error: {error.message}</div>
          )}

          {messages.length === 0 && !error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h2 className="font-league text-3xl font-semibold mr-4 mb-2">What would you like to know?</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Ask me anything about baseball statistics, player comparisons, team history, or MLB records.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left text-sm p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-sm prose dark:prose-invert max-w-none prose-p:my-1 prose-p:text-sm prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-li:text-sm prose-headings:my-2 prose-headings:text-base">
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
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              id="chat-input"
              name="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about baseball stats, players, or history..."
              className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
