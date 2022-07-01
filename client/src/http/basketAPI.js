import {$authHost} from './index'

export const addDeviceToBasket = async (device) => {
    const {data} = await $authHost.post('/api/basket', device)
    return data
}

export const getBasketItmes = async () => {
    const {data} = await $authHost.get('/api/basket')
    return data
}

export const getQuantityBasketItems = async () => {
    const {data} = await $authHost.get('/api/basket/quantity')
    return data
}