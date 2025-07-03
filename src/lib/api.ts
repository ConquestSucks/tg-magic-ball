import type { AskOrbResponse } from '@/types/response';
import axios, { type AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'https://api.ask-the-orb.ghjc.ru/api/telegram/';

export const apiClient = axios.create({ baseURL, withCredentials: true, headers: { 'Content-Type': 'application/json', } });

export const initData = async (rawParams: string) => {
    try {
        await apiClient.get(
            '/me',
            {
                headers: {
                    'Authorization': `tma ${rawParams}`
                }
            },
        );
    } catch (error) {
        console.log(error)
    }
};

export const askOrb = async (message: string, rawParams: string): Promise<AxiosResponse<AskOrbResponse>> => {
    try {
        const response = await apiClient.post<AskOrbResponse>(
            '/ask',
            { message },
            {
                headers: {
                    'Authorization': `tma ${rawParams}`
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const invoiceLink = () => {
    return apiClient.post<{ success: boolean, link: string }>(
        ''
    );
}