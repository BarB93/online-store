import { makeAutoObservable } from 'mobx';

export default class AppStore {
    constructor() {
        this._lang = 'ru'
        this._mainLang = 'ru'
        makeAutoObservable(this)
    }

    setLang(lang) {
        this._lang = lang
    }
    setMainLang(lang) {
        this._mainLang = lang
    }

    get lang() {
        return this._lang
    }
    get mainLang() {
        return this._mainLang
    }
}