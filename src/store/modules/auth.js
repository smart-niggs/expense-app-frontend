import axios from '../../axios/axios_auth'
import router from '../../router/'
import { encryptData, decryptData } from '../../scripts/functions'
// const CryptoJS = require('crypto-js');
// import vue from 'vue-notifyjs'
// import Vue from 'vue'

const state = {
  logInError: null
  // userId: null,
  // userLevel: null,
}

const getters = {
  isAuthenticated (state, getters, rootState) {
    // console.log('state.idToken: ' + state.idToken);
    return !!(rootState.token)
  }
}

const mutations = {
  updateLogInError (state, logInError) {
    state.logInError = logInError
  }
}

const actions = {

  register ({ commit, dispatch }, newUser) {
    return axios.post('users/register', newUser)
      .then(res => {
        commit('updateLoginState', { token: res.data.token, userId: res.data.localId })
        // dispatch('autoLogout', res.data.expiresIn)

        if (res.data.status === 'success') {
          // commit('updateCreatedUser', true) // show notification
          // console.log('userLevel: ' + userLevel);
          router.replace('/')
          return res.data;
        }
        return false
      })
      .catch(err => console.log('err: ' + err))
  },

  login ({ commit, dispatch }, body) {
    return axios.post('users/authenticate', body) // this shd be username: so both username & email can be used to login!
      .then(res => {
        // console.log('res.data: ' + JSON.stringify(res.data));
        if (res.data.status === 'success' || res.data.token) {

        commit('updateLoginState', { token: res.data.token, userId: res.data.userId, expiresIn: localStorage.expiresIn }, { root: true })
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        // dispatch('autoLogout', res.data.expiresIn)

        let token = encryptData(res.data.token);
        console.log('login token: ' + token);
      

        let expiresIn = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', token) // have a simple method that sets and clears, put token... in an array nd use res.data[arr[0]]
        localStorage.setItem('userId', res.data.userId)
        // localStorage.setItem('userLevel', res.data.userLevel)
        localStorage.setItem('expiresIn', expiresIn)
        
        // router.replace('/dashboard')
        // dispatch('fetchCurrentUserById', res.data.userId, { root: true })
        return res.data;          
        }
        return false
      })
      .catch(err => {      
        console.log('err: ' + err)
      })
  },

  autoLogin ({ commit, dispatch }) {
    // let locals
    if (!(localStorage.token && localStorage.userId && localStorage.expiresIn )){
      // if (router.currentRoute.path !== '/')  router.replace('/');
      router.replace('/');
      return false
    } 
    
    const expiresIn = new Date(localStorage.expiresIn).getTime() - new Date().getTime()
    if (expiresIn <= 0) {
      router.replace('/');
      return false
    }

    
    // console.log('CryptoJS.AES: ' + JSON.stringify(CryptoJS));
    let token = decryptData(localStorage.token);
    console.log('token: ' + token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    commit('updateLoginState', { token, userId: localStorage.userId }, { root: true })
    // dispatch('autoLogout', expiresIn);	// leave 4 now, the expiresIn doesn't change, so the previous autoLogout is still valid.

    // dispatch('fetchCurrentUserById', localStorage.userId, { root: true } )
    return true;
  },

  logout ({ commit }) {
    commit('updateLoginState', { userId: null, token: null }, { root: true })    
    localStorage.clear()
    router.replace('/')
  },

  autoLogout ({ dispatch }, expiresIn) {
    setTimeout(() => {
      dispatch('logout')
      router.replace('/')
      // Vue.$router.push('/signin');
    }, expiresIn * 1000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
