import axios from '../../../axios/admin'

const updateCurrentUser = (data) => {
    return axios.post('currentUser/update', data)
}
const getCurrentUser = () => {
    return axios.get('currentUser')
}
const get = (id = 0) => {
    if(id === 0) return axios.get('users')
    return axios.get(`users/${id}`)
}
const save = (id = 0, data) => {
    if(id === 0) return axios.post('users', data)
    return axios.post(`users/${id}`, data)
}
const remove = (id) => {
    return axios.delete(`users/${id}`)
}
export default {
    getCurrentUser,
    updateCurrentUser,
    get,
    save,
    remove
}