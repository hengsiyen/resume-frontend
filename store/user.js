export const strict = false

export const state = () => ({
  facebookAuth: null,
  authenticated: false,
  choose_template: null,
  user: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null
  }
})

export const getters = {
  getUser: (state, getters, rootState) => {
    return state.user
  },
  authenticated: (state, getters, rootState) => {
    return state.authenticated
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  },
  setLoggedIn (state) {
    state.authenticated = true
  },
  setLoggedOut (state) {
    state.user = {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null
    }
    state.authenticated = false
  },
  setFacebookAuth (state, data) {
    state.facebookAuth = data
  },
  clearFacebookAuth (state) {
    state.facebookAuth = null
  },
  setChooseTemplate (state, data) {
    state.choose_template = data
  }
}

export const actions = {
  setChooseTemplate ({ commit, state }, data) {
    commit('setChooseTemplate', data)
  },
  setUser ({ commit, state }, data) {
    commit('setUser', data)
  },
  loggedIn ({ commit, state }) {
    commit('setLoggedIn')
  },
  loggedOut ({ commit, state }) {
    commit('setLoggedOut')
  },
  setFacebookAuth ({ commit, state }, data) {
    commit('setFacebookAuth', data)
  },
  clearFacebookAuth ({ commit, state }) {
    commit('clearFacebookAuth')
  }
}
