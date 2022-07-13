import { makeAutoObservable } from 'mobx'

class PriceStore {

    constructor() {
        this._minPrice = ''
        this._maxPrice = ''
        this._inputedMinPrice = ''
        this._inputedMaxPrice = ''
        this._stateInputMinPrice = ''
        this._stateInputMaxPrice = ''
        this._interval = 200

        makeAutoObservable(this)
    }

    // setters
    setMinPrice(num) {
        num = Number(num)

        this._minPrice = num
        if(!this._stateInputMinPrice || this._stateInputMinPrice < num) this._stateInputMinPrice = num
        if(this._stateInputMaxPrice && this._stateInputMaxPrice < num) this._stateInputMaxPrice = num
        
    }
    setMaxPrice(num) {
        num = Number(num)
        
        this._maxPrice = num
        if(!this._stateInputMaxPrice || this._stateInputMaxPrice > num) this._stateInputMaxPrice = num
        if(this._stateInputMaxPrice && this._stateInputMinPrice > num) this._stateInputMinPrice = num
    }
    setStateMinPrice(num) {
        this._stateInputMinPrice = num
    }
    setStateMaxPrice(num) {
        this._stateInputMaxPrice = num
    }
    setInputedMinPrice() {
        const stateMinPrice = parseInt(this._stateInputMinPrice) || 0
        const stateMaxPrice = parseInt(this._stateInputMaxPrice) || 0

        if(stateMinPrice < this._minPrice) {
            this.setMinPriceStateAndInputed(this._minPrice)
            
            return
        }

        if(this.stateInputMinPrice > this._maxPrice) {
            this.setMinPriceStateAndInputed(this._maxPrice - this._interval)
            this.setMaxPriceStateAndInputed(this._maxPrice)

            return
        }

        if(stateMinPrice > stateMaxPrice) {
            const sum = stateMinPrice + this._interval

            if(sum > this._maxPrice) {
                this.setMaxPriceStateAndInputed(this._maxPrice)
                this.setMinPriceStateAndInputed(this._maxPrice - this._interval)

                return
            }

            this.setMaxPriceStateAndInputed(sum)
        }

        this._inputedMinPrice = this._stateInputMinPrice
    }
    setInputedMaxPrice() {
        const stateMinPrice = parseInt(this._stateInputMinPrice) || 0
        const stateMaxPrice = parseInt(this._stateInputMaxPrice) || 0

        if(stateMaxPrice > this._maxPrice) {
            this.setMaxPriceStateAndInputed(this._maxPrice)

            return
        }

        if(this.stateInputMaxPrice < this._minPrice) {
            this.setMinPriceStateAndInputed(this._minPrice)
            this.setMaxPriceStateAndInputed(this._minPrice + this._interval)

            return
        }

        if(stateMaxPrice < stateMinPrice) {
            const diff = stateMaxPrice - this._interval

            if(diff < this._minPrice) {
                this.setMinPriceStateAndInputed(this._minPrice)
                this.setMaxPriceStateAndInputed(this._minPrice + this._interval)
            
                return
            }

            this.setMinPriceStateAndInputed(diff)
        }

        this._inputedMaxPrice = stateMaxPrice
    }

    setMinPriceStateAndInputed(num) {
        this._stateInputMinPrice = num
        this._inputedMinPrice = num
    }

    setMaxPriceStateAndInputed(num) {
        this._stateInputMaxPrice = num
        this._inputedMaxPrice = num
    }

    // getters
    get minPrice() {
        return this._minPrice
    }
    get maxPrice() {
        return this._maxPrice
    }
    get stateInputMinPrice() {
        return this._stateInputMinPrice
    }
    get stateInputMaxPrice() {
        return this._stateInputMaxPrice
    }
    get inputedMinPrice() {
        return this._inputedMinPrice
    }
    get inputedMaxPrice() {
        return this._inputedMaxPrice
    }
}

export default new PriceStore()