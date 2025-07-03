import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AnimatedSphere } from './AnimatedSphere';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { chatStorage } from '../../store/chatStorage';
import { AnswerBubble } from './AnswerBubble';
import { QuestionForm } from './QuestionForm';
import { QuestionsLimit } from './QuestionsLimit';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useMagicBallAnswer } from '../../hooks/useMagicBallAnswer';
import type { MagicBallProps } from '../../types/magic-ball';
import { initData } from '@/lib/api';
import { userStorage } from '@/store/userStorage';

const MagicBallComponent: React.FC<MagicBallProps> = ({ width = '100%', height = '100%' }) => {
    const [showInput, setShowInput] = useState(false);
    const [question, setQuestion] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const isOpen = chatStorage.chatStatus;
    const { answer, error, getAnswer, setAnswer } = useMagicBallAnswer();

    useEffect(() => {
        if (isOpen) {
            setShowInput(true);
            setAnswer('Задайте вопрос');
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setShowInput(false);
            setAnswer('');
            setQuestion('');
        }
    }, [isOpen, setAnswer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        if (chatStorage.questionsLeft) return;
        setShowInput(false);
        setAnswer('Думаю...');
        await getAnswer(question);

        const serverResponse = (await initData(userStorage.rawDataAsHeader)).data
        userStorage.setTelegramUser(serverResponse.telegramUser)
        userStorage.setUser(serverResponse.user)
        chatStorage.setQuestionLimit(userStorage.user?.dailyLimit)
        chatStorage.setQuestionsToday(userStorage.user?.requestsToday)
    }

const displayText = error ? error : answer;
const typedText = useTypewriter(displayText, 20);
const showMoreButton = answer.length > 120 && typedText === displayText;

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
        <QuestionsLimit questionsLeft={chatStorage.questionsLeft} />
        {displayText && (
            <AnswerBubble
                typedText={typedText}
                bubbleText={answer}
                showMoreButton={showMoreButton}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        )}
        {showInput && (
            <QuestionForm
                inputRef={inputRef}
                question={question}
                setQuestion={setQuestion}
                onSubmit={handleSubmit}
                disabled={!chatStorage.questionsLeft}
            />
        )}
    </div>
);
};

/* eslint-disable react-refresh/only-export-components */
export default observer(MagicBallComponent); 