import axios from '../../../axios/admin'
const get = (id = 0) => {
    if (id === 0) {
        return axios.get('products')
    } else {
        return axios.get(`products/${id}`)
    }
}
const save = (id = 0, data) => {
    const formData = new FormData()
    // data.images = data.images[0]
    for (const [key, value] of Object.entries(data)) {
        if (key !== 'images') {
            formData.append(key, value)
        }
    }
    data.images.forEach((element, index) => {
        formData.append(`images[${index}]`, element)
    })
    const config = {
        header: {
            'Content-Type': 'multipart/form-data'
        }
    }
    if(id === 0) {
        return axios.post('/products', formData, config)
    } else {
        return axios.post(`/products/${id}`, formData, config)
    }
}
const remove = (id) => {
    return axios.delete(`products/${id}`)
}
export default {
    get,
    save,
    remove
}
