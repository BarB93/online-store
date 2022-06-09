import { makeAutoObservable } from "mobx";

export default class ToastStore {
    constructor() {
        this._list = []
        this._count = 0
        makeAutoObservable(this)
    }
    
    addToast(toast) {
        this._count += 1
        this._list = [...this._list, toast]
    }
    setList(list) {
        this._list = list
    }
    get list() {
        return this._list
    }
    get count() {
        return this._count
    }
}