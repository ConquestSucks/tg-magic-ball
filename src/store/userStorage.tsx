import type { DBUser } from "@/types/DBUser";
import type { TelegramUser } from "@/types/telegramUser";
import { makeAutoObservable } from "mobx"

class UserStorage {
    private _rawData : string = "";
    private _user: DBUser | undefined
    private _telegramUser: TelegramUser | undefined

    constructor() {
        makeAutoObservable(this)
    }

    setRawData(raw: string) {
        this._rawData = raw
    }

    get rawData() {
        return this._rawData
    }

    setUser(user: DBUser) {
        this._user = user
    }

    get user() {
        return this._user
    }

    setTelegramUser(user: TelegramUser) {
        this._telegramUser = user
    }

    get telegramUser() {
        return this._telegramUser
    }
}

export const userStorage = new UserStorage();