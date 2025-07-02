import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { QuestionFormProps } from '../../types/magic-ball';

export const QuestionForm: React.FC<QuestionFormProps> = ({
    inputRef,
    question,
    setQuestion,
    onSubmit,
    disabled,
}) => (
    <form onSubmit={onSubmit} className="absolute top-full mt-4 left-0 right-0 flex justify-center gap-2 animate-in fade-in-0 slide-in-from-top-2">
        <Input
            ref={inputRef}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Задай вопрос..."
            className="w-2/3 bg-white/90 text-black"
            disabled={disabled}
        />
        <Button type="submit" variant="secondary" disabled={disabled}>
            OK
        </Button>
    </form>
); 