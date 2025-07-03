import type { DBUser } from "./DBUser";
import type { TelegramUser } from "./telegramUser";

export interface AskOrbResponse {
    success: boolean;
    data?: {
        answer: string;
        model: string;
        usage: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
        };
        limitReached: boolean;
    };
}

export interface InitDataResponse {
    success: boolean,
    user: DBUser,
    telegramUser: TelegramUser
}