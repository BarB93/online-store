import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const urlAPI = isDev ? process.env.DEVELOPMENT_APP_API_URL : process.env.PRODUCTION_APP_API_URL

const $host = axios.create({
    baseURL: urlAPI
})

const $authHost = axios.create({
    baseURL: urlAPI
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}