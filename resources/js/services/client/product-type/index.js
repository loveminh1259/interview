import axios from '../../../axios/client'
const get = (id = 0) => {
    if(id === 0) {
        return axios.get('/product-types')
    } else {
        return axios.get(`product-types/${id}`)
    }
}
export default {
    get
}