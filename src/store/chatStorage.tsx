import { makeAutoObservable } from "mobx"

class ChatStorage {
    private _isOpen: boolean = false;
    private _questionLimit: number | undefined;
    private _questionsToday: number | undefined; 

    constructor() {
        makeAutoObservable(this)
    }

    toggleChatStatus() {
        this._isOpen = !this._isOpen
    }

    get chatStatus() {
        return this._isOpen
    }

    setQuestionLimit(limit: number | undefined) {
        this._questionLimit = limit
    }

    get questionLimit() {
        return this._questionLimit
    }

    setQuestionsToday(questionsToday: number | undefined) {
        this._questionsToday = questionsToday
    }

    get questionsToday() {
        return this._questionsToday
    }

    get questionsLeft() {
        if (this._questionLimit === undefined || this._questionsToday === undefined) return undefined;
        if (this._questionLimit < 0 || this._questionsToday < 0) return undefined;

        return this._questionLimit - this._questionsToday
    }
}

export const chatStorage = new ChatStorage();