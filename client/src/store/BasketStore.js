import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._devices = null
        this._totalQuantity = null
        
        makeAutoObservable(this)
    }

    setTotalQuantity(num) {
        this._totalQuantity = num
    }
    setDevices(devices) {
        this._devices = devices
    }
   
    get totalQuantity() {
        return this._totalQuantity
    }
    get devices() {
        return this._devices
    }
}