import {makeAutoObservable} from 'mobx'
import basketAPI from '../http/basketAPI'
import ToastStore from './ToastStore'
import { createToast } from '../components/UI/Toast/Toast'
import i18n from 'i18next'
import { DiSCOUNT } from '../utils/consts'
import { getPriceWithoutDiscount } from '../utils/getPriceWithoutDiscount'
class BasketStore {
    constructor() {
        this._isPandding = false
        this._devices = []
        this._order = []
        this._orderDeviceIds = []
        this._isDevicesLoading = true
        this._isOrderInit = false
        this._isAllChecked = true
        this._isOpenEmtyOrderModal = false
        this._totalQuantity = 0
        this._totalOrderQuantity = 0
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
        this.calcTotalQuantity()
    
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

    setIsDevicesLoading(bool) {
        this._isDevicesLoading = bool
    }

    setIsOpenEmtyOrderModal(bool) {
        this._isOpenEmtyOrderModal = bool
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
    get isDevicesLoading() {
        return this._isDevicesLoading
    }
    get order() {
        return this._order
    }
    get isVisibleCheckbox() {
        return this._devices.length > 1
    }
    get isOpenEmtyOrderModal() {
        return this._isOpenEmtyOrderModal
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

    addDeviceToBasket(device) {
        basketAPI.addDeviceToBasket(device)
        .then(data => {
            ToastStore.addToast(createToast(i18n.t('Added to cart', {name: device.name})))
        })
        .then(() => basketAPI.fetchQuantityBasketItems())
        .then(data => this.setTotalQuantity(data))
        .catch(e => console.error(e.message))
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

    updateOrder(isForceUpdate = false) {
        if(isForceUpdate) {
            this.setOrderDeviceIds(this._devices.map(item => item.id))
        } else {
            this.setOrder(this._devices.filter(item => this._orderDeviceIds.includes(item.id)))
        }
    }

    removeBasketItem(deviceId) {
        basketAPI.deleteBasketItem(deviceId)
            .then(data => {
                if(data) {
                    this.setDevices(this._devices.filter(item => item.id !== deviceId))
                    if(this._devices.length === 1) {
                        this.setOrderDeviceIds(this._devices.map(item => item.id))
                    }
                }
            })
            .catch((e) => console.error(e.message))

            
    }

    setDeviceQuantity(id, quantity) {
        this._isPandding = true
        basketAPI.setQuantity(id, quantity).then(
            data => {
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
            })
            .catch(e => console.error(e.message))
            .finally(() => {
                this._isPandding = false
            })
    }
    
    clearAllOrder() {
        this.setOrderDeviceIds([])
    }

    checkAllOrder() {
        this.setOrderDeviceIds(this._devices.map(item => item.id))
    }

    fetchBasketItems() {
        this.setIsDevicesLoading(true)
        basketAPI.fetchBasketItems()
            .then(data => {
                this.setDevices(data.devices)
                this.updateOrder(true)
            })
            .finally(() => this.setIsDevicesLoading(false))
    }
}

export default new BasketStore()