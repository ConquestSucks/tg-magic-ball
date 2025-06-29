import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'https://ask-the-orb.ghjc.ru';

export const apiClient = axios.create({ baseURL, withCredentials: true, headers: { 'Content-Type': 'application/json' } });

export const askOrb = (message: string) => {
    return apiClient.post<{ success: boolean; data?: { answer: string } }>(
        '/api/openai/ask',
        { message },
    );
}; 