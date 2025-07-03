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