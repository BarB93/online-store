import { makeAutoObservable } from 'mobx'

export default class TypeStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._isLoadingTypes = true
        makeAutoObservable(this)
    }

    setTypes (types) {
        this._types = types
    }
    setSelectedType (type) {
        this._selectedType = type
    }
    setIsLoadingTypes (bool) {
        this._isLoadingTypes = bool
    }
    get types () {
        return this._types
    }
    get selectedType () {
        return this._selectedType
    }
    get isLoadingTypes () {
        return this._isLoadingTypes
    }
}