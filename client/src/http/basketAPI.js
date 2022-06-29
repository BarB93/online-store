import {$authHost} from './index'

export const addDeviceToBasket = async (device) => {
    const {data} = $authHost.post('/api/basket', device)
    return data
}