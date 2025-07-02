import { makeAutoObservable } from "mobx"

class ChatStorage {
    private _isOpen: boolean = false;
    questionLimit = 5; // максимальный лимит
    questionsLeft = 5; // сколько осталось

    constructor() {
        makeAutoObservable(this)
    }

    toggleChatStatus() {
        this._isOpen = !this._isOpen
    }

    get chatStatus() {
        return this._isOpen
    }

    decrementQuestions() {
        if (this.questionsLeft > 0) {
            this.questionsLeft--;
        }
    }

    resetQuestions() {
        this.questionsLeft = this.questionLimit;
    }
}

export const chatStorage = new ChatStorage();