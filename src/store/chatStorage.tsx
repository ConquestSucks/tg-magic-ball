import { makeAutoObservable } from "mobx"

class ChatStorage {
    private _isOpen: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    toggleChatStatus() {
        this._isOpen = !this._isOpen
    }

    get chatStatus() {
        return this._isOpen
    }
}

export const chatStorage = new ChatStorage();