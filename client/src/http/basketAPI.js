import {$authHost} from './index'


const basketAPI = {
    async addDeviceToBasket(device) {
        const {data} = await $authHost.post('/api/basket', device)
        return data
    },

    async fetchBasketItems() {
        const {data: basketItems} = await $authHost.get('/api/basket')
        const arrayId = basketItems.map(item => item.deviceId)
        const {data:devices} =  await $authHost.get('/api/device', { params: {arrayId}})
        
        // adding quantity field in device
        devices.forEach(el => {
            el.quantity = basketItems.find(item => item.deviceId === el.id).quantity
        })
        // total quantity
        const totalQuantity = basketItems.reduce((prev, item) => prev + item.quantity, 0)
        
        return {devices, totalQuantity}
    },

    async fetchQuantityBasketItems() {
        const {data} = await $authHost.get('/api/basket/quantity')
        return data
    },

    async deleteBasketItem(deviceId) {
        const {data} = await $authHost.delete('/api/basket',{params: {deviceId}})
        return data
    },
    
    async setQuantity(id, quantity) {
        const {data} = await $authHost.put('/api/basket/quantity', {id, quantity})
        return data
    },
} 

export default basketAPI
