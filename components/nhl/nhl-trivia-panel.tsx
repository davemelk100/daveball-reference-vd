"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  getDailyNHLTriviaQuestions,
  getNHLTodayStorageKey,
  type NHLTriviaQuestion,
} from "@/lib/nhl-trivia-data";
import {
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

function NHLTriviaPanelContent() {
  const [quizDate, setQuizDate] = useState<Date | null>(null);
  const [dailyQuestions, setDailyQuestions] = useState<NHLTriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showYesterday, setShowYesterday] = useState(false);
  const [yesterdayQuestions, setYesterdayQuestions] = useState<NHLTriviaQuestion[]>([]);

  useEffect(() => {
    const now = new Date();
    setQuizDate(now);

    const questions = getDailyNHLTriviaQuestions(now);
    setDailyQuestions(questions);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    setYesterdayQuestions(getDailyNHLTriviaQuestions(yesterday));

    const storageKey = getNHLTodayStorageKey(now);
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

    const storageKey = getNHLTodayStorageKey(quizDate!);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const goToNext = () => {
    if (currentIndex < 4) setCurrentIndex(currentIndex + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleShare = async () => {
    const score = answeredQuestions.filter((a) => a.isCorrect).length;
    const date = new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
    const text = `I got ${score}/5 on today's (${date}) NHL Numbers trivia!\n\nPlay here: https://majorleaguenumbers.com/nhl`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "NHL Numbers Trivia", text });
      } catch (err: any) {
        if (err?.name === "AbortError") return;
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        toast("Results copied to clipboard!");
      } catch { /* ignore */ }
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-4 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-league mr-4 text-primary">Daily Trivia</h2>
            {isComplete && (
              <Badge variant="secondary" className="ml-1 text-xs bg-primary/20 text-primary">
                Today: {totalCorrect}/5
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!showYesterday && isComplete && (
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-1 h-7 text-xs">
                <Share2 className="h-3 w-3" />
                Share
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="link"
          size="sm"
          className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary p-0 h-auto justify-start"
          onClick={() => { setShowYesterday(!showYesterday); setCurrentIndex(0); }}
        >
          {showYesterday ? "Back to Today" : "Yesterday's Answers"}
        </Button>
      </div>

      <p className="font-medium text-sm">{currentQuestion.question}</p>

      <div className="grid gap-2">
        {currentQuestion.options.map((option, index) => {
          const isSelected = currentAnswered?.selectedAnswer === index;
          const isCorrectAnswer = index === currentQuestion.correctAnswer;

          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={cn(
                "justify-start h-auto py-2 px-3 text-left text-sm whitespace-normal",
                (currentAnswered || showYesterday) && isCorrectAnswer && "border-green-500 bg-green-500/10",
                !showYesterday && currentAnswered && isSelected && !isCorrectAnswer && "border-red-500 bg-red-500/10",
                !currentAnswered && !showYesterday && "hover:bg-muted",
              )}
              onClick={() => handleAnswer(index)}
              disabled={!!currentAnswered || showYesterday}
            >
              <span className="flex items-start gap-2">
                {(currentAnswered || showYesterday) && isCorrectAnswer && (
                  <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                {!showYesterday && currentAnswered && isSelected && !isCorrectAnswer && (
                  <XCircle className="h-3 w-3 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <span className="break-words">{option}</span>
              </span>
            </Button>
          );
        })}
      </div>

      {(currentAnswered || showYesterday) && (
        <div className="p-2 rounded-lg text-sm bg-white">
          {!showYesterday && (currentAnswered?.isCorrect
            ? <p className="font-medium text-sm text-green-500">Correct!</p>
            : <p className="font-medium text-red-400 text-sm">Not quite!</p>
          )}
          {showYesterday && <p className="font-medium text-green-500 text-sm">Correct Answer:</p>}
          <p className="mt-1 text-muted-foreground text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button variant="ghost" size="sm" onClick={goToPrev} disabled={currentIndex === 0} className="gap-1">
          <ChevronLeft className="h-4 w-4" /> Prev
        </Button>
        <span className="text-xs text-muted-foreground font-medium">{currentIndex + 1} of 5</span>
        {currentIndex < 4 ? (
          <Button variant="ghost" size="sm" onClick={goToNext} className="gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : !showYesterday && isComplete ? (
          <Button variant="ghost" size="sm" onClick={handleShare} className="gap-1 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10">
            Share <Share2 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="w-[72px]" />
        )}
      </div>
    </div>
  );
}

export function NHLTriviaPanel() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 h-[300px] animate-pulse" />}>
      <NHLTriviaPanelContent />
    </Suspense>
  );
}
