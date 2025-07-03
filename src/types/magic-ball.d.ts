export interface MagicBallProps {
  width?: string | number;
  height?: string | number;
}

export interface AnswerBubbleProps {
  typedText: string;
  bubbleText: string;
  showMoreButton: boolean;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export interface QuestionFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  question: string;
  setQuestion: (q: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export interface QuestionsLimitProps {
  questionsLeft: number | undefined;
} 