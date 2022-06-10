import { makeAutoObservable } from 'mobx'

export default class BrandStore {
    constructor() {
        this._brands = []
        this._selectedBrand = {}
        this._isLoadingBrands = true
        this._isFetchingBrand = false
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setIsLoadingBrands(bool) {
        this._isLoadingBrands = bool
    }
    setIsFetchingBrand(bool) {
        this._isFetchingBrand = bool
    }
    get brands () {
        return this._brands
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get isLoadingBrands() {
        return this._isLoadingBrands
    }
    get isFetchingBrand() {
        return this._isFetchingBrand
    }
}