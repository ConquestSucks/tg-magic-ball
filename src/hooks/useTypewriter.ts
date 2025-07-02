import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 20) {
    const [typed, setTyped] = useState('');
    useEffect(() => {
        let index = 1;
        setTyped(text[0] ?? '');
        const interval = setInterval(() => {
            if (index > text.length) {
                clearInterval(interval);
                return;
            }
            setTyped(text.slice(0, index));
            index += 1;
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return typed;
} 