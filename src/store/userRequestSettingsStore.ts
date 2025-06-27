import { makeAutoObservable } from "mobx"

class UserRequestSettingsStore {
    private _answerType: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setAnswerType(type: number) {
        this._answerType = type
    }

    get AnswerType() {
        return this._answerType
    }
}

export const userRequestSettingsStore = new UserRequestSettingsStore();