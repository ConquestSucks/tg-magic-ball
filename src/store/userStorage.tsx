import { makeAutoObservable } from "mobx"

class UserStorage {
    private _rawData : string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setRawData(raw: string) {
        this._rawData = raw
    }

    get rawData() {
        return this._rawData
    }

    get rawDataAsHeader() {
        return this._rawData.replace("tgWebAppData=", "")
    }
}

export const userStorage = new UserStorage();