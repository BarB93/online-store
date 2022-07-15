import { makeAutoObservable } from 'mobx';
import { languages } from '../utils/consts'
class AppStore {
    constructor() {
        this._lang = languages.russian
        this._mainLang = languages.russian
        this._isOpenUserMenu = false
        this._isOpenLangMenu = false
        makeAutoObservable(this)
    }

    setLang(lang) {
        this._lang = lang
    }
    setMainLang(lang) {
        this._mainLang = lang
    }
    setIsOpenUserMenu(bool) {
        this._isOpenUserMenu = bool
    }
    setIsOpenLangMenu(bool) {
        this._isOpenLangMenu = bool
    }

    get lang() {
        return this._lang
    }
    get mainLang() {
        return this._mainLang
    }
    get isOpenUserMenu() {
        return this._isOpenUserMenu
    }
    get isOpenLangMenu() {
        return this._isOpenLangMenu
    }
}

export default new AppStore()