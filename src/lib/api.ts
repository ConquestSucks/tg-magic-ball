import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'https://api.ask-the-orb.ghjc.ru/api/telegram';

export const apiClient = axios.create({ baseURL, withCredentials: true, headers: { 'Content-Type': 'application/json', } });

export const initData = (rawParams: unknown) => {
    return apiClient.post(
        '/me',
        { Headers: {
            'Authorization': `tma ${rawParams}`
        } },
    );
};

export const askOrb = (message: string) => {
    return apiClient.post<{ success: boolean; data?: { answer: string } }>(
        '/ask',
        { message },
    );
};

export const invoiceLink = () => {
    return apiClient.post<{ success: boolean, link: string }>(
        ''
    );
}