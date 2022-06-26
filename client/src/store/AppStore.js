import { makeAutoObservable } from 'mobx';
import { languages } from '../utils/consts'

export default class AppStore {
    constructor() {
        this._lang = languages.russian
        this._mainLang = languages.russian
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