import {$authHost} from './index'

export const addDeviceToBasket = async (device) => {
    const {data} = await $authHost.post('/api/basket', device)
    return data
}

export const fetchBasketItems = async () => {
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
}

export const fetchQuantityBasketItems = async () => {
    const {data} = await $authHost.get('/api/basket/quantity')
    return data
}