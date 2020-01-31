import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import auth from './modules/auth'
import expenses from './modules/expenses'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    rate: null,
    userId: null
  },

  mutations: {
    updateExRate (state, rate) {
      state.rate = rate
    },
    updateLoginState (state, { userId, token, expiresIn }) {
      state.userId = userId
      state.token = token
      state.expiresIn = expiresIn
    },
    
  },

  actions: {
    fetchExRate ({ commit },  params = {} ) {
      console.log('b4 fetch Rate...');
      (async () => {
        try {
          const res = await axios.get('https://api.exchangeratesapi.io/latest?symbols=GBP')
          commit('updateExRate', res.data.rates.GBP)
        } 
        catch (error) {
          console.error(error)
        }
      })()
    },
  },

  getters: {},
  
  modules: {
    auth,
    expenses
  }
})