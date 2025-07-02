import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import type { AnswerBubbleProps } from '../../types/magic-ball';

export const AnswerBubble: React.FC<AnswerBubbleProps> = ({
    typedText,
    bubbleText,
    showMoreButton,
    dialogOpen,
    setDialogOpen,
}) => (
    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 animate-[mac-bubble-in_450ms_cubic-bezier(0.25,0.1,0.25,1)]">
        <div className="relative inline-block bg-white text-black text-sm px-6 py-4 rounded-3xl shadow-lg w-[260px] pointer-events-auto">
            <div className="whitespace-pre-line break-words text-center max-h-[calc(50vh_-_150px)] overflow-y-auto pr-1">
                {typedText}
            </div>
            {showMoreButton && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="mt-2">
                            Подробнее
                        </Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton>
                        <DialogTitle className="sr-only">Ответ шара</DialogTitle>
                        <p className="whitespace-pre-line break-words max-h-[70vh] overflow-y-auto text-center">
                            {bubbleText}
                        </p>
                    </DialogContent>
                </Dialog>
            )}
            <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg" />
        </div>
    </div>
); 