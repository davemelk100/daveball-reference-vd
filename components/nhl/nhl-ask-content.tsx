"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

const SAMPLE_PROMPTS = [
  "Who has the most goals in NHL history?",
  "Which team has won the most Stanley Cups?",
  "Who won the Hart Trophy last season?",
  "What is the longest winning streak in NHL history?",
];

export function NHLAskContent() {
  const [input, setInput] = useState("");

  return (
    <div className="container py-6 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-2xl text-center">
        <Image
          src="/nhl-logo.svg"
          alt="NHL"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="font-league mb-2">ChatNHL</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Ask questions about NHL hockey, players, teams, and stats.
        </p>

        <Card className="mb-6">
          <CardContent className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask about the NHL..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" size="icon" disabled>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
          {SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="text-left text-sm p-3 rounded-lg border hover:bg-muted/50 transition-colors text-muted-foreground"
            >
              {prompt}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Chat functionality coming soon. This is a placeholder.
        </p>
      </div>
    </div>
  );
}
