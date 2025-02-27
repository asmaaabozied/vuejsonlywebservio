import {mapHtmlForm} from '../../utils/helper'

export default {
    namespaced: true,
    state: () => ({
        user: {},
        address: {},
        newAddress: undefined,
        newUser: undefined,
        addresses: [],
    }),

    getters: {
        getUser(state) {
            if (state.user['api_token'] === undefined)
                return JSON.parse(localStorage.getItem('user'))
            return state.user
        },

        getAddress(state) {
            let address = {...state.address}
            if (address.address === undefined) {
            }
            address = JSON.parse(localStorage.getItem('address')) || {}
            if (!address.description) {
                address.description = address.address?.substr(0, 20)
            }
            return address
        },

        isAuth(state) {
            return (state.user['api_token'] !== undefined) || (localStorage.getItem('user') !== null)
        },
    },

    mutations: {
        UPDATE_USER(state, payload) {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },

        UPDATE_ADDRESSES(state, payload) {
            state.addresses = payload
        },

        UPDATE_NEW_ADDRESS(state, payload) {
            state.newAddress = payload
        },

        UPDATE_NEW_USER(state, payload) {
            state.newUser = payload
        },

        UPDATE_ADDRESS(state, payload) {
            state.address = payload
            localStorage.setItem('address', JSON.stringify(payload))
        },
    },

    actions: {
        async loginAction({dispatch, commit}, event) {
            const response = await this.$axios.post('login', mapHtmlForm(event))
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_USER', response.data.data)
                dispatch('getAddressesAction')
                return {
                    type: 'success',
                    title: 'Login Successfully',
                    message: 'Thank you for connecting to your account'
                }
            }
            return {type: 'error', title: 'Login Error', message: response.data.message}
        },

        async registerAction({dispatch, commit}, event) {
            const response = await this.$axios.post('register', mapHtmlForm(event))
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_USER', response.data.data)
                dispatch('getAddressesAction')
                return {
                    type: 'success',
                    title: 'Account created successfully',
                    message: 'Thank you for creating new account'
                }
            }
            return {type: 'error', title: 'Sign-up Error', message: response.data?.message}
        },

        async updateUserAction({commit, getters}, user) {
            let queryParameters = {
                'api_token': getters.getUser.api_token,
            }
            const response = await this.$axios.post(`users/${getters.getUser.id}`, user, {params: queryParameters})
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_USER', response.data.data)
                return {
                    type: 'success',
                    title: 'Saved Successfully',
                    message: 'Your account information has been updated successfully'
                }
            }
            return {type: 'error', title: 'Error', message: response.data.message}
        },

        async updatePasswordAction({commit, getters}, event) {
            let queryParameters = {
                'api_token': getters.getUser.api_token,
            }
            const response = await this.$axios.post(`changepassword/${getters.getUser.id}`, mapHtmlForm(event), {params: queryParameters})
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_USER', response.data.data)
                return {
                    type: 'success',
                    title: 'Update Password Successfully',
                    message: 'Your Password has been updated successfully'
                }
            }
            return {type: 'error', title: 'Password Error', message: response.data.message}
        },


        logoutAction({commit}) {
            commit('UPDATE_USER', {})
            commit('UPDATE_ADDRESSES', [])
            localStorage.removeItem('user')
            return {type: 'success', title: 'Logout successfully', message: 'Logout successfully'}
        },

        getAddressesAction({commit, getters}) {
            if (!getters.isAuth) return

            let queryParameters = {
                'api_token': getters.getUser.api_token,
                'user_id': getters.getUser.id,
                'search': `user_id:${getters.getUser.id}`,
                'searchFields': 'user_id:=',
                'orderBy': 'id',
                'sortedBy': 'desc',
                'limit': '15',
            }
            this.$axios.get('addresses', {params: queryParameters}).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    response.data.data.map((address) => {
                        if (!address.description) {
                            address.description = address.address.substr(0, Math.min(address.address.length, 20))
                        }
                        return address
                    })
                    commit('UPDATE_ADDRESSES', response.data.data)
                }
            })
        },

        getAddressesActionAll({commit, getters}) {
            if (!getters.isAuth) return

            let queryParameters = {
                'api_token': getters.getUser.api_token,
                'user_id': getters.getUser.id,
                'search': `user_id:${getters.getUser.id}`,
                'searchFields': 'user_id:=',
                'orderBy': 'id',
                'sortedBy': 'desc',
                'limit': '15',
            }

            this.$axios.get('addresses', {params: queryParameters}).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    commit('UPDATE_ADDRESSES', response.data.data)
                }
            })
        },

        async addAddressAction({state, commit, getters}, event) {
            let queryParameters = {
                'api_token': getters.getUser.api_token,
                'user_id': getters.getUser.id,
            }

            const response = await this.$axios.post(`addresses`, event, {params: queryParameters})
            if (response.status === 200 && response.data?.success) {

                commit('UPDATE_ADDRESS', event)


                if (state.newAddress === undefined) {
                    commit('UPDATE_NEW_ADDRESS', {})
                } else {
                    commit('UPDATE_NEW_ADDRESS', undefined)
                }

                return {
                    type: 'success',
                    title: 'create Address Successfully',
                    message: 'Your Address has been created successfully'
                }
            }
            return {type: 'error', title: 'Address Error', message: response.data.message}
        },
        async deleteAddressAction({commit, getters}, event) {
            let queryParameters = {
                'api_token': getters.getUser.api_token,
            }
            const response = await this.$axios.delete(`addresses/`, event, {params: queryParameters})
            if (response.status === 200 && response.data?.success) {

                return {
                    type: 'success',
                    title: 'Address Delete Successfully',
                    message: 'Your Address has been deleted successfully'
                }
            }
            return {type: 'error', title: 'Addresss Error', message: response.data.message}
        },


        setCurrentAddressAction({commit}, address) {
            commit('UPDATE_ADDRESS', address)
        },

        toggleAddressPickerAction({state, commit}) {
            if (state.newAddress === undefined) {
                commit('UPDATE_NEW_ADDRESS', {})
            } else {
                commit('UPDATE_NEW_ADDRESS', undefined)
            }
        },

        setNewAddressAction({state, commit}, address) {
            console.log(address)
            commit('UPDATE_NEW_ADDRESS', address)
        },

        toggleProfileAction({state, commit, getters}) {
            if (state.newUser === undefined) {
                commit('UPDATE_NEW_USER', {...getters.getUser})
            } else {
                commit('UPDATE_NEW_USER', undefined)
            }
        },
        togglePasswordAction({state, commit, getters}) {
            if (state.newUser === undefined) {
                commit('UPDATE_NEW_USER', {...getters.getUser})
            } else {
                commit('UPDATE_NEW_USER', undefined)
            }
        },
        setNewUserAction({state, commit}, user) {
            console.log(user)
            commit('UPDATE_NEW_USER', user)
        },


    },
}
