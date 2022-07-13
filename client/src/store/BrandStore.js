import { makeAutoObservable } from 'mobx'

class BrandStore {
    constructor() {
        this._brands = []
        this._selectedBrands = []
        this._isLoadingBrands = true
        makeAutoObservable(this)
    }

    // setters
    setBrands(brands) {
        this._brands = brands
    }
    setSelectedBrands(array) {
        this._selectedBrands = array
    }
    setIsLoadingBrands(bool) {
        this._isLoadingBrands = bool
    }

    get brands() {
        return this._brands
    }
    get selectedBrands() {
        return this._selectedBrands
    }
    get isLoadingBrands() {
        return this._isLoadingBrands
    }

    // methods
    addSelectedBrand(id) {
        this._selectedBrands = [...this._selectedBrands, id]
    }

    removeSelectedBrand(id) {
        this._selectedBrands = this._selectedBrands.filter(item => item !== id)
    }
}

export default new BrandStore()