import {makeAutoObservable} from 'mobx'
class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._isLoading = true
        this._isFetchingAuth = false
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        if(bool && this._user.role === 'ADMIN') this.setIsAdmin(true)
        this._isAuth = bool
    }
    setUser(user) {
        if(user.role === 'ADMIN') this.setIsAdmin(true)
        this._user = user
    }
    setIsLoading(bool) {
        this._isLoading = bool
    }
    setIsFetchingAuth(bool) {
        this._isFetchingAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
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
    get isAdmin() {
        return this._isAdmin
    }
}

export default new UserStore()