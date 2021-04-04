import * as Cookies from 'js-cookie'

export default {
  state: {
    isAuthenticated: Cookies.getJSON('isAuthenticated'),
    userData: Cookies.getJSON('userData'),
    token: Cookies.getJSON('token'),
  },
  getters: {
    token: state => state.token,
    isAuthenticated: state => state.isAuthenticated,
    userData: state => state.userData,
  },
  mutations: {
    setAuthenticated(state, payload) {
      Cookies.set('isAuthenticated', payload.isAuthenticated, {expires: 1})
      state.isAuthenticated = payload.isAuthenticated
      Cookies.set('userData', JSON.stringify(payload.userData))
      state.userData = JSON.stringify(payload.userData)
      Cookies.set('token', payload.token)
      state.token = payload.acess_token
    },
    removeAuthentication(state) {
      localStorage.removeItem('userData')
      Cookies.remove('isAuthenticated')
      Cookies.remove('userData')
      Cookies.remove('token')
      state.isAuthenticated = false
      state.userData = null
      state.token = null
    },
    setToken(state, payload) {
      Cookies.set('token', payload.token)
      state.token = payload.token
    },
  },
}
