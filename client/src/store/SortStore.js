import { makeAutoObservable } from 'mobx'

class SortStore {
    constructor() {
        this._currentSort = null

        makeAutoObservable(this)
    }
}

export default new SortStore()