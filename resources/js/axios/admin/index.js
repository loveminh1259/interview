import axios from 'axios'
import store from '../../store'
import router from '../../router'
import swal from 'sweetalert2'
var isAlreadyFetchingAccessToken = false
var subscribers = []

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.interceptors.request.use(
    config => {
        // Get token from localStorage
        const accessToken = store.getters.token
        // If token is present add it to request's Authorization Header
        if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    error => Promise.reject(error),
)
axios.interceptors.response.use(
    response => response,
    error => {
        // const { config, response: { status } } = error
        const {
            config,
            response
        } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
            store.commit('removeAuthentication')
            router.push({
                name: 'login'
            })
            // // eslint-disable-next-line no-alert
            // if (!isAlreadyFetchingAccessToken) {
            //   isAlreadyFetchingAccessToken = true
            //   // eslint-disable-next-line no-use-before-define
            //   refreshToken().then(r => {
            //     isAlreadyFetchingAccessToken = false
            //     store.commit('setToken', { token: r.data.access_token })
            //     // eslint-disable-next-line no-use-before-define
            //     onAccessTokenFetched(r.data.access_token)
            //   })
        }
        if (response && response.status === 403) {
            swal.fire({
                title: 'Error',
                text: 'You have no right to execute this action',
                icon: 'error'
            })
        }
        // const retryOriginalRequest = new Promise(resolve => {
        //   // eslint-disable-next-line no-use-before-define
        //   addSubscriber(accessToken => {
        //     // Make sure to assign accessToken according to your response.
        //     // Check: https://pixinvent.ticksy.com/ticket/2413870
        //     // Change Authorization header
        //     originalRequest.headers.Authorization = `Bearer ${accessToken}`
        //     resolve(axios(originalRequest))
        //   })
        // })
        // return retryOriginalRequest
        // }
        return Promise.reject(error)
    },
)
const onAccessTokenFetched = accessToken => {
    subscribers = subscribers.filter(callback => callback(accessToken))
}
const addSubscriber = callback => {
    subscribers.push(callback)
}
const refreshToken = () => axios.post('/refresh-token')

export default axios
