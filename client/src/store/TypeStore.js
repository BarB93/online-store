import { makeAutoObservable } from 'mobx'
class TypeStore {
    constructor() {
        this._types = []
        this._isLoadingTypes = true
        this._isFetchingType = false
        this._selectedTypes = []
        makeAutoObservable(this)
    }

    // setters
    setTypes(types) {
        this._types = types
    }
    setSelectedTypes(array) {
        this._selectedTypes = array
    }
    setIsLoadingTypes(bool) {
        this._isLoadingTypes = bool
    }
    setIsFetchingType(bool) {
        this._isFetchingType = bool
    }

    // getters
    get types() {
        return this._types
    }
    get isLoadingTypes() {
        return this._isLoadingTypes
    }
    get isFetchingType() {
        return this._isFetchingType
    }
    get selectedTypes() {
        return this._selectedTypes
    }

    // methods
    addSelectedType(id) {
        this._selectedTypes = [...this._selectedTypes, id]
    }

    removeSelectedType(id) {
        this._selectedTypes = this._selectedTypes.filter(item => item !== id)
    }
}

export default new TypeStore()