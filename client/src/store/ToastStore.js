import { makeAutoObservable } from "mobx";

export default class ToastStore {
    constructor() {
        this._list = []
        makeAutoObservable(this)
    }
    
    setList(list) {
        this._list = list
    }
    get list() {
        return this._list
    }
}