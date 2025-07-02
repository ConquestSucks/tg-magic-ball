import { useState } from 'react';
import { askOrb } from '../lib/api';

export function useMagicBallAnswer() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const getAnswer = async (question: string) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await askOrb(question.trim());
      if (data?.success && data.data?.answer) {
        setAnswer(data.data.answer);
      } else {
        setError('Ошибка сервера');
      }
    } catch {
      setError('Сеть недоступна');
    } finally {
      setLoading(false);
    }
  };

  return { loading, answer, error, getAnswer, setAnswer };
} 