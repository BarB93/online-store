import {makeAutoObservable} from 'mobx'
class DeviceStore {
    constructor() {
        this._devices = []
        this._isLoadingDevices = true
        this._isLoadingOneDevice = true
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        makeAutoObservable(this)
    }

    setDevices(devices) {
        this._devices = devices
    }
    setIsLoadingDevices(bool) {
        this._isLoadingDevices = bool
    }
    setIsLoadingOneDevice(bool) {
        this._isLoadingOneDevice = bool
    }
    setPage(num) {
        this._page = num
    }
    setTotalCount(num) {
        this._totalCount = num
    }
    setLimit(num) {
        this._limit = num
    }
    get devices() {
        return this._devices
    }
    get isLoadingDevices() {
        return this._isLoadingDevices
    }
    get isLoadingOneDevice() {
        return this._isLoadingOneDevice
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}

export default new DeviceStore()