import {makeAutoObservable, action} from 'mobx'
import { setQuantity } from '../http/basketAPI'
import { DiSCOUNT } from '../utils/consts'
import { getPriceWithoutDiscount } from '../utils/getPriceWithoutDiscount'
export default class UserStore {
    constructor() {
        this._devices = null
        this._checkedDeviceIds = null
        this._totalQuantity = null
        this._isPanding = false
        this._totalPrice = 0
        this._totalPriceWithoutDiscount = 0
        
        makeAutoObservable(this)
    }

    // setters
    setTotalQuantity(num) {
        this._totalQuantity = num
    }
    setDevices(devices) {
        this._devices = devices
        this._checkedDeviceIds = devices.map(item => item.id)
        this.calcTotalPrice()
    }
    setTotalPrice(price) {
        this._totalPrice = price
    }
    setTotalPriceWithoutDiscount(price) {
        this._totalPriceWithoutDiscount = price
    }
   
    // getters
    get totalQuantity() {
        return this._totalQuantity
    }
    get devices() {
        return this._devices
    }
    get totalPrice() {
        return this._totalPrice
    }
    get totalPriceWithoutDiscount() {
        return this._totalPriceWithoutDiscount
    }

    // methods
    calcTotalQuantity() {
        const total = this._devices.reduce((acc, item) => acc + item.quantity, 0)
        this.setTotalQuantity(total)
    }

    calcTotalPrice() {
        const total = this._devices.reduce((acc, item) => acc + item.price * item.quantity,0)
        this.setTotalPrice(total)
        this.setTotalPriceWithoutDiscount(getPriceWithoutDiscount(total, DiSCOUNT))
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
                this.calcTotalPrice()
            }),
            action('fetch error', () => {}),
        ).finally(() => {
            this._isPanding = false
        })
    }
}