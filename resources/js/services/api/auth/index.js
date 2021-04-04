import axios from '../../../axios/admin'
const login = (data) => {
    return axios.post('auth/login', data)
}
const logout = () => {
    return axios.post('auth/logout')
}
export default {
    login,
    logout
}