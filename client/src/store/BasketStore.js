import {makeAutoObservable, action} from 'mobx'
import basketAPI from '../http/basketAPI'
import { DiSCOUNT } from '../utils/consts'
import { getPriceWithoutDiscount } from '../utils/getPriceWithoutDiscount'
export default class UserStore {
    constructor() {
        this._devices = []
        this._order = []
        this._isOrderInit = false
        this._orderDeviceIds = []
        this._isAllChecked = true
        this._totalQuantity = 0
        this._totalOrderQuantity = 0
        this._isPandding = false
        this._totalPrice = 0
        this._totalOrderPrice = 0
        this._totalPriceWithoutDiscount = 0
        this._totalOrderPriceWithoutDiscount = 0
        
        makeAutoObservable(this)
    }

    // setters
    setTotalQuantity(num) {
        this._totalQuantity = num
    }

    setTotalOrderQuantity(num) {
        this._totalOrderQuantity = num
    }

    setDevices(devices) {
        this._devices = devices
        this.calcTotalPrice()
    
        if(!this._isOrderInit) {
            this.setOrderDeviceIds(devices.map(item => item.id))
            this._isOrderInit = true
        }else {
            this.updateOrder()
        }
    }

    setTotalPrice(price) {
        this._totalPrice = price
    }

    setTotalOrderPrice(price) {
        this._totalOrderPrice = price
    }

    setTotalPriceWithoutDiscount(price) {
        this._totalPriceWithoutDiscount = price
    }

    setTotalOrderPriceWithoutDiscount(price) {
        this._totalOrderPriceWithoutDiscount = price
    }

    setOrderDeviceIds(array) {
        this._orderDeviceIds = array
        this.setIsAllChecked(this._devices.every(item => array.includes(item.id)))
        this.setOrder(this._devices.filter(item => this._orderDeviceIds.includes(item.id)))
    }
    setOrder(devices) {
        this._order = devices
        this.calcTotalOrderPrice()
        this.calcTotalOrderQuantity()
    }

    setIsOrderInit(bool) {
        this._isOrderInit = bool
    }
    setIsAllChecked(bool) {
        this._isAllChecked = bool
    }

    // getters
    get totalQuantity() {
        return this._totalQuantity
    }
    get totalOrderQuantity() {
        return this._totalOrderQuantity
    }
    get devices() {
        return this._devices
    }
    get totalPrice() {
        return this._totalPrice
    }
    get totalOrderPrice() {
        return this._totalOrderPrice
    }
    get totalPriceWithoutDiscount() {
        return this._totalPriceWithoutDiscount
    }
    get totalOrderPriceWithoutDiscount() {
        return this._totalOrderPriceWithoutDiscount
    }
    get orderDeviceIds() {
        return this._orderDeviceIds
    }
    get isAllChecked() {
        return this._isAllChecked
    }
    get isOrderInit() {
        return this._isOrderInit
    }

    // methods
    addToOrder(id) {
        if(!this._orderDeviceIds.includes(id)){
            this.setOrderDeviceIds([...this._orderDeviceIds, id])
        }
    }

    removeFromOrder(id) {
        this.setOrderDeviceIds(this._orderDeviceIds.filter(orderId => orderId !== id))
    }

    calcTotalQuantity() {
        const total = this._devices.reduce((acc, item) => acc + item.quantity, 0)
        this.setTotalQuantity(total)
    }

    calcTotalOrderQuantity() {
        const total = this._order.reduce((acc, item) => acc + item.quantity, 0)
        this.setTotalOrderQuantity(total)
    }
    calcTotalPrice() {
        const total = this._devices.reduce((acc, item) => acc + item.price * item.quantity,0)
        this.setTotalPrice(total)
        this.setTotalPriceWithoutDiscount(getPriceWithoutDiscount(total, DiSCOUNT))
    }

    calcTotalOrderPrice() {
        const total = this._order.reduce((acc, item) => acc + item.price * item.quantity,0)
        this.setTotalOrderPrice(total)
        this.setTotalOrderPriceWithoutDiscount(getPriceWithoutDiscount(total, DiSCOUNT))
    }

    updateOrder() {
        this.setOrder(this._devices.filter(item => this._orderDeviceIds.includes(item.id)))
    }

    setDeviceQuantity(id, quantity) {
        this._isPandding = true
        basketAPI.setQuantity(id, quantity).then(
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
            this._isPandding = false
        })
    }
    
    clearAllOrder() {
        this.setOrderDeviceIds([])
    }

    checkAllOrder() {
        this.setOrderDeviceIds(this._devices.map(item => item.id))
    }
}