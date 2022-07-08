import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

const deviceAPI = {
    async createType(type) {
        const {data} = await $authHost.post('/api/type', type)
        return data
    },
    
    async fetchTypes() {
        const {data} = await $host.get('/api/type')
        return data
    },
    
    async check() {
        const {data} = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
    
    async createBrand(brand) {
        const {data} = await $authHost.post('/api/brand', brand)
        return data
    },
    
    async fetchBrands() {
        const {data} = await $host.get('/api/brand')
        return data
    },
    
    async createDevice(device) {
        const {data} = await $authHost.post('/api/device', device)
        return data
    },
    
    async fetchDevices(typeId, brandId, page = 1, limit = 10) {
        const {data} = await $host.get('/api/device', {params: {
            typeId,
            brandId,
            page,
            limit
        }})
        return data
    },
    
    async fetchOneDevice(id) {
        const {data} = await $host.get(`/api/device/${id}`)
        return data
    }
}

export default deviceAPI