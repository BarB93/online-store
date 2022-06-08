import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._brands = []
        this._devices = []
        this._selectedBrand = {}
        this._isLoadingBrands = true
        this._isLoadingDevices = true
        this._isLoadingOneDevice = true
        makeAutoObservable(this)
    }


    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this._devices = devices
    }


    setSelectedBrand (brand) {
        this._selectedBrand = brand
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


    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }


    get selectedBrand () {
        return this._selectedBrand
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