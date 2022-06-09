import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isLoading = true
        this._isFetchingAuth = false
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setIsLoading(bool) {
        this._isLoading = bool
    }
    setIsFetchingAuth(bool) {
        this._isFetchingAuth = bool
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get isLoading() {
        return this._isLoading
    }
    get  isFetchingAuth() {
        return this._isFetchingAuth
    }
}