import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._basket = null
        this._quantity = null
        
        makeAutoObservable(this)
    }

    setBasket(basket) {
        this._basket = basket
    }
    setQuantity(num) {
        this._quantity = num
    }
   
    get quantity() {
        return this._quantity
    }
    get basket() {
        return this._basket
    }
}