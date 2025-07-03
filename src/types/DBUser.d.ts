export interface DBUser {
    _id: string,
    telegramId: number,
    firstName: string,
    username: string,
    createdAt: string,
    dailyLimit: number,
    totalRequests: number,
    requestsToday: number,
    isPremium: boolean,
    banned: boolean,
    lastRequestAt: string

}