import axios from '../../../axios/client'
const get = (id = 0) => {
    if(id === 0) return axios.get('/products')
    return axios.get(`/products/${id}`)
}
const getByProductType = (ptyp_id) => {
    return axios.get(`/products/type/${ptyp_id}`)
}
export default {
    get,
    getByProductType
}