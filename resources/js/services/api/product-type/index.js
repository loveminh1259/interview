import axios from '../../../axios/admin'
const get = (id = 0) => {
    if (id === 0) {
        return axios.get('product-types')
    } else {
        return axios.get(`product-types/${id}`)
    }
}
const save = (id = 0, data) => {
    if (id === 0) {
        return axios.post('product-types', data)
    } else {
        return axios.post(`product-types/${id}`, data)
    }
}
const remove = (id) => {
    return axios.delete(`product-types/${id}`)
}
export default {
    get,
    save,
    remove
}
