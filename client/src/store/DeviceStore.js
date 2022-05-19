import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Смартфоны'},
            {id: 2, name: 'Ноутбуки'},
            {id: 3, name: 'Планшеты'},
            {id: 4, name: 'Телевизоры'},
            {id: 5, name: 'Пылесосы'},
            {id: 6, name: 'Чайники'},
        ]

        this._brands = [
            {id: 1, name: 'Xiaomi'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Lenovo'},
            {id: 4, name: 'Asus'},
            {id: 5, name: 'Nokia'},
            {id: 6, name: 'Acer'},
            

        ]

        this._devices = [
            {id: 1, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 2, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 3, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 4, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 5, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 6, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 7, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 8, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 9, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 10, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 11, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 12, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 13, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 14, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 15, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 16, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 17, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
            {id: 18, name: 'Note 12', prece: 15, rating: 5, price: 15000, img: 'https://img.giznext.com/assets/model/4/13039/xiaomi-mobiles-xiaomi-redmi-note-12-pro-max-1626950748.jpg?width=160'},
        ]
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    setTypes (types) {
        this._types = types
    }

    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this.devices = devices
    }

    setSelectedType (type) {
        this._selectedType = type
    }

    setSelectedBrand (brand) {
        this._selectedBrand = brand
    }

    get types () {
        return this._types
    }

    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }

    get selectedType () {
        return this._selectedType
    }

    get selectedBrand () {
        return this._selectedBrand
    }
}