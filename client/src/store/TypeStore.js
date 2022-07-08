import { makeAutoObservable } from 'mobx'
class TypeStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._isLoadingTypes = true
        this._isFetchingType = false
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setSelectedType(type) {
        if(this._selectedType?.id === type?.id) {
            this._selectedType = null
        } else {
            this._selectedType = type
        }
    }
    setIsLoadingTypes(bool) {
        this._isLoadingTypes = bool
    }
    setIsFetchingType(bool) {
        this._isFetchingType = bool
    }
    get types() {
        return this._types
    }
    get selectedType() {
        return this._selectedType
    }
    get isLoadingTypes() {
        return this._isLoadingTypes
    }
    get isFetchingType() {
        return this._isFetchingType
    }
}

export default new TypeStore()