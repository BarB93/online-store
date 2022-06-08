import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._isLoadingDevices = true
        this._isLoadingOneDevice = true
        makeAutoObservable(this)
    }

    setDevices (devices) {
        this._devices = devices
    }
    setIsLoadingDevices (bool) {
        this._isLoadingDevices = bool
    }
    setIsLoadingOneDevice (bool) {
        this._isLoadingOneDevice = bool
    }
    get devices () {
        return this._devices
    }
    get isLoadingDevices () {
        return this._isLoadingDevices
    }
    get isLoadingOneDevice () {
        return this._isLoadingOneDevice
    }
}