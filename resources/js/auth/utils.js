import store from '../store'
export const isLoggedIn = () => {
    return store.getters.isAuthenticated
}