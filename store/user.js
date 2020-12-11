export const strict = false

export const state = () => ({
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
  }
}

export const actions = {
  setUser ({ commit, state }, data) {
    commit('setUser', data)
  }
}
