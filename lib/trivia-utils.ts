const YEAR_QUESTION_PATTERN = /\b(what|which|in what)\s+year\b/i;
const YEAR_OPTION_PATTERN = /^\d{4}$/;

/** Returns true if the question is about identifying a specific year. */
export function isYearQuestion(question: {
  question: string;
  options: string[];
}): boolean {
  if (YEAR_QUESTION_PATTERN.test(question.question)) return true;
  if (question.options.every((opt) => YEAR_OPTION_PATTERN.test(opt.trim())))
    return true;
  return false;
}
