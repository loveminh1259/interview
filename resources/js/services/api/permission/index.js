import axios from '../../../axios/admin'

const get = (id = 0) => {
    if(id === 0) return axios.get('permissions');
    return axios.get(`permissions/${id}`)
}
export default {
    get
}