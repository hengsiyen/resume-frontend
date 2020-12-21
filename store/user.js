export const strict = false

export const state = () => ({
  facebookAuth: null,
  user: {
    first_name: null,
    last_name: null,
    email: null
  }
})

export const getters = {
  getUser: (state, getters, rootState) => {
    return state.user
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  },
  setFacebookAuth (state, data) {
    state.facebookAuth = data
  },
  clearFacebookAuth (state) {
    state.facebookAuth = null
  }
}

export const actions = {
  setUser ({ commit, state }, data) {
    commit('setUser', data)
  },
  setFacebookAuth ({ commit, state }, data) {
    commit('setFacebookAuth', data)
  },
  clearFacebookAuth ({ commit, state }) {
    commit('clearFacebookAuth')
  }
}
