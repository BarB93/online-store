import {makeAutoObservable, action} from 'mobx'
import { setQuantity } from '../http/basketAPI'

export default class UserStore {
    constructor() {
        this._devices = null
        this._totalQuantity = null
        this._isPanding = false
        
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

    calcTotalQuantity() {
        const total = this.devices.reduce((acc, item) => acc + item.quantity, 0)
        this.setTotalQuantity(total)
    }

    setDeviceQuantity(id, quantity) {
        this._isPanding = true
        setQuantity(id, quantity).then(
            action('fetch success', data => {
                if(data) {
                    this.setDevices(this._devices.map(item => {
                        if(item.id === id) {
                            item.quantity = quantity
                        }
                        return item
                    }))
                }
                this.calcTotalQuantity()
            }),
            action('fetch error', () => {}),
        ).finally(() => {
            this._isPanding = false
        })
    }
}