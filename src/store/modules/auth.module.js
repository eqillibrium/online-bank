const TOKEN_KEY = 'jwt-token'
const url = ''
const key = ''
import axios from 'axios'
import Error from '../../utils/Error'

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem(TOKEN_KEY)
    },
    mutations: {
      setToken(state, token) {
          state.token = token
          localStorage.setItem(TOKEN_KEY, token)
      },
      logout(state) {
          state.token = null
          localStorage.removeItem('jwt-token')
      }
    },
    actions: {
      async login({commit, dispatch}, payload) {
          try {
              const { data } = await axios.post(`${url}${key}`, {...payload, returnSecureToken: true})
              commit('setToken', data.idToken)
              commit('clearMessage', null, {root:true})
          } catch (e) {
              const error = await new Error(e.response.data.error.message).getErrorStatus()
              dispatch('setMessage', {
                  value: error,
                  type: 'danger'
              }, {
                  root: true
              })
              console.log(error)
              throw new Error(error)
          }
      }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}
