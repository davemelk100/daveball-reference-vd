"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getDailyGbvTriviaQuestions,
  getGbvNextTriviaTime,
  getGbvTodayStorageKey,
  type GbvTriviaQuestion,
} from "@/lib/gbv-trivia-data";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnsweredQuestion {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

function GbvTriviaCardContent() {
  const [quizDate, setQuizDate] = useState<Date | null>(null);
  const [dailyQuestions, setDailyQuestions] = useState<GbvTriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);
  const [yesterdayQuestions, setYesterdayQuestions] = useState<
    GbvTriviaQuestion[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const openTrivia = searchParams.get("trivia");

  useEffect(() => {
    if (openTrivia === "open") {
      setIsOpen(true);
    }
  }, [openTrivia]);

  useEffect(() => {
    const now = new Date();
    setQuizDate(now);

    const questions = getDailyGbvTriviaQuestions(now);
    setDailyQuestions(questions);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    setYesterdayQuestions(getDailyGbvTriviaQuestions(yesterday));

    const storageKey = getGbvTodayStorageKey(now);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as AnsweredQuestion[];
      setAnsweredQuestions(parsed);

      if (parsed.length >= 5) {
        setIsComplete(true);
      } else {
        const firstUnanswered = questions.findIndex(
          (q) => !parsed.some((a) => a.questionId === q.id)
        );
        if (firstUnanswered !== -1) {
          setCurrentIndex(firstUnanswered);
        }
      }
    }
  }, []);

  const currentQuestion = showYesterday
    ? yesterdayQuestions[currentIndex]
    : dailyQuestions[currentIndex];
  const currentAnswered = answeredQuestions.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const totalAnswered = answeredQuestions.length;
  const totalCorrect = answeredQuestions.filter((a) => a.isCorrect).length;

  const handleAnswer = (index: number) => {
    if (showYesterday || currentAnswered || !currentQuestion) return;

    const isCorrect = index === currentQuestion.correctAnswer;
    const newAnswered: AnsweredQuestion = {
      questionId: currentQuestion.id,
      selectedAnswer: index,
      isCorrect,
    };

    const updated = [...answeredQuestions, newAnswered];
    setAnsweredQuestions(updated);

    if (updated.length >= 5) {
      setIsComplete(true);
    }

    const storageKey = getGbvTodayStorageKey(quizDate!);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const goToNext = () => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShare = async () => {
    const score = answeredQuestions.filter((a) => a.isCorrect).length;
    const date = new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    const text = `I got ${score}/5 on today's (${date}) Guided By Data trivia!\n\nPlay here: https://majorleaguenumbers.com/gbv?trivia=open`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Guided By Data Trivia",
          text: text,
        });
      } catch (err: any) {
        if (err?.name === "AbortError") return;
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast("Results copied to clipboard!");
      } catch {
        // ignore
      }
    }
  };

  if (!currentQuestion) return null;

  const questionsToLink = showYesterday ? yesterdayQuestions : dailyQuestions;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={totalAnswered > 0 ? "outline" : "default"}
          className={cn(
            "gap-2 font-semibold text-black",
            totalAnswered > 0
              ? "border-primary/30 bg-primary/10 hover:bg-primary/20"
              : "bg-primary hover:bg-primary/90"
          )}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Daily Trivia</span>
          {totalAnswered > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 text-xs bg-primary/20 gbv-badge-black"
            >
              Today: {totalCorrect}/5
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(20rem,calc(100vw-2rem))] p-0"
        align="end"
        sideOffset={8}
        collisionPadding={16}
      >
        <div className="p-4 space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Daily Trivia
              </h3>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-[10px] uppercase tracking-wider text-black p-0 h-auto justify-start"
              onClick={() => setShowYesterday(!showYesterday)}
            >
              {showYesterday ? "View Today" : "View Yesterday"}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-xs">
              Question {currentIndex + 1} of 5
            </div>
            <div className="font-semibold">{currentQuestion.question}</div>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswered?.selectedAnswer === index;
              const isCorrect = currentQuestion.correctAnswer === index;
              const showAnswerState = currentAnswered || showYesterday;

              return (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  onClick={() => handleAnswer(index)}
                  className={cn(
                    "w-full text-left p-2 rounded-md text-sm border transition-colors",
                    showAnswerState
                      ? isCorrect
                        ? "border-green-400 bg-green-500/10"
                        : isSelected
                          ? "border-red-400 bg-red-500/10"
                          : "border-transparent bg-muted/40"
                      : "border-transparent bg-muted/40 hover:bg-muted/60"
                  )}
                  disabled={!!currentAnswered || showYesterday}
                >
                  <div className="flex items-center gap-2">
                    {showAnswerState ? (
                      isCorrect ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : isSelected ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : null
                    ) : null}
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showYesterday || currentAnswered ? (
            <div className="text-xs border-t pt-3">
              {currentQuestion.explanation}
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-black"
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-black"
              onClick={goToNext}
              disabled={currentIndex === 4}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-xs">
            <span>
              Next quiz in{" "}
              {Math.max(
                0,
                Math.floor(
                  (getGbvNextTriviaTime().getTime() - Date.now()) / 1000 / 60 / 60
                )
              )}
              h
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-black"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {isComplete && (
            <div className="text-xs text-center">
              Completed! Score: {totalCorrect}/5
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 text-xs">
          {questionsToLink.length > 0 ? (
            <a
              href={`/gbv/ask?trivia=open`}
              className="underline underline-offset-4"
            >
              Open Chat GBV trivia
            </a>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function GbvTriviaPanelContent() {
  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Daily GBV Trivia</h2>
        <div>
          <GbvTriviaCardContent />
        </div>
        <p className="text-sm">Test your Guided By Voices knowledge.</p>
      </CardContent>
    </Card>
  );
}

function GbvTriviaPanelSkeleton() {
  return (
    <Card className="w-full h-full min-h-[120px]">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="h-6 w-40 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        <div className="h-4 w-64 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function GbvTriviaPanel() {
  return (
    <Suspense fallback={<GbvTriviaPanelSkeleton />}>
      <GbvTriviaPanelContent />
    </Suspense>
  );
}
