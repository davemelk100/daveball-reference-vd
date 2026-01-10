"use client"

import { useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

const exampleQuestions = [
  "Who has the most home runs in a single season?",
  "Compare Babe Ruth and Mike Trout's career stats",
  "Which team has won the most World Series?",
  "Who were the 2024 MVP winners?",
  "What is the triple crown in baseball?",
  "Tell me about the 1927 Yankees",
]

export function AskPageContent() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chatHelpers = useChat({
    api: "/api/ask",
  })

  const messages = chatHelpers.messages
  const input = chatHelpers.input ?? ""
  const handleInputChange = chatHelpers.handleInputChange ?? (() => { })
  const handleSubmit = chatHelpers.handleSubmit
  const isLoading = chatHelpers.isLoading
  const error = chatHelpers.error

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleExampleClick = (question: string) => {
    if (isLoading) return
    const inputEl = inputRef.current
    if (inputEl) {
      // Set value via native setter to trigger React's onChange
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
      nativeInputValueSetter?.call(inputEl, question)
      inputEl.dispatchEvent(new Event("input", { bubbles: true }))
      // Submit after a tick
      setTimeout(() => {
        const form = document.getElementById("chat-form") as HTMLFormElement
        if (form) form.requestSubmit()
      }, 10)
    }
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
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-2">
                        <ReactMarkdown>{message.content || ""}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-sm">{message.content || ""}</div>
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
              onChange={handleInputChange}
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
