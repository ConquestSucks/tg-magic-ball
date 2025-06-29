import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AnimatedSphere } from './AnimatedSphere';
import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { chatStorage } from '../../store/chatStorage';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { askOrb } from '../../lib/api';

interface MagicBallProps {
  width?: string | number;
  height?: string | number;
}

const MagicBallComponent: React.FC<MagicBallProps> = ({ width = '100%', height = '100%' }) => {
    const [showInput, setShowInput] = useState(false);
    const [bubbleText, setBubbleText] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [typedText, setTypedText] = useState('');
    const [question, setQuestion] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isOpen = chatStorage.chatStatus;

    useEffect(() => {
        if (isOpen) {
            setShowInput(true);
            setBubbleText('Задайте вопрос');
            setDisplayText('Задайте вопрос');
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setShowInput(false);
            setBubbleText('');
            setDisplayText('');
            setQuestion('');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        setShowInput(false);
        setBubbleText('Думаю...');
        setDisplayText('Думаю...');

        try {
            const { data } = await askOrb(question.trim());
            if (data?.success && data.data?.answer) {
                setBubbleText(data.data.answer);
                const isLong = data.data.answer.length > 120;
                setDisplayText(isLong ? data.data.answer.slice(0, 120) + '...' : data.data.answer);
            } else {
                setBubbleText('Ошибка сервера');
                setDisplayText('Ошибка сервера');
            }
        } catch {
            setBubbleText('Сеть недоступна');
            setDisplayText('Сеть недоступна');
        }
    };

    useEffect(() => {
        let index = 1;
        setTypedText(displayText[0] ?? '');
        const interval = setInterval(() => {
            if (index > displayText.length) {
                clearInterval(interval);
                return;
            }
            setTypedText(displayText.slice(0, index));
            index += 1;
        }, 20);
        return () => clearInterval(interval);
    }, [displayText]);

    const showMoreButton = bubbleText.length > 120 && typedText === displayText;

    return (
        <div style={{ width, height }} className="relative flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
                <group scale={0.85}>
                    <AnimatedSphere />
                </group>
                <EffectComposer>
                    <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.3} />
                </EffectComposer>
            </Canvas>
            {displayText && (
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
                                    <p className="whitespace-pre-line break-words max-h-[70vh] overflow-y-auto text-center">
                                        {bubbleText}
                                    </p>
                                </DialogContent>
                            </Dialog>
                        )}
                        <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg" />
                    </div>
                </div>
            )}
            {showInput && (
                <form onSubmit={handleSubmit} className="absolute top-full mt-4 left-0 right-0 flex justify-center gap-2 animate-in fade-in-0 slide-in-from-top-2">
                    <Input ref={inputRef} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Задай вопрос..." className="w-2/3 bg-white/90 text-black" />
                    <Button type="submit" variant="secondary">OK</Button>
                </form>
            )}
        </div>
    );
};

/* eslint-disable react-refresh/only-export-components */
export default observer(MagicBallComponent); 