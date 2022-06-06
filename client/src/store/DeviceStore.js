import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._isLoadingTypes = true
        this._isLoadingBrands = true
        this._isLoadingDevices = true
        this._isLoadingOneDevice = true
        makeAutoObservable(this)
    }

    setTypes (types) {
        this._types = types
    }

    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this._devices = devices
    }

    setSelectedType (type) {
        this._selectedType = type
    }

    setSelectedBrand (brand) {
        this._selectedBrand = brand
    }

    setIsLoadingTypes (bool) {
        this._isLoadingTypes = bool
    }

    setIsLoadingBrands (bool) {
        this._isLoadingBrands = bool
    }

    setIsLoadingDevices (bool) {
        this._isLoadingDevices = bool
    }

    setIsLoadingOneDevice (bool) {
        this._isLoadingOneDevice = bool
    }

    get types () {
        return this._types
    }

    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }

    get selectedType () {
        return this._selectedType
    }

    get selectedBrand () {
        return this._selectedBrand
    }

    get isLoadingTypes () {
        return this._isLoadingTypes
    }

    get isLoadingBrands () {
        return this._isLoadingBrands
    }

    get isLoadingDevices () {
        return this._isLoadingDevices
    }

    get isLoadingOneDevice () {
        return this._isLoadingOneDevice
    }
}