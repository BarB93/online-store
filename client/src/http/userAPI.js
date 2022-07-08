import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

const userAPI = {
    async registration(email, password) {
        const {data} = await $host.post('/api/user/registration', {email, password, role: 'USER'})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
    
    async login(email, password) {
        const {data} = await $host.post('/api/user/login', {email, password})
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
    
    async check() {
        const {data} = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
}

export default userAPI

export const check = async () => {
    const {data} = await $authHost.get('/api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
