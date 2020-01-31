import axios from '../../axios/axios_auth'
// import router from '../../router'

const state = {
  paging: {},
  expenseList: [],
  expense: null, 
}

const getters = {
  getExpenses (state) {
    return state
  },
  getOneExpense (state) {
    return state.expense
  }
}

const mutations = {
  updateExpenses (state, { expenseList = [], paging = {} }) {
    state.expenseList = expenseList
    state.paging = paging;
  },

  updatePage (state, page) { //  jes 4 testing
    state.paging.current_page = page
  }
}

const actions = {

  fetchExpenses ({ commit },  params = {} ) {
    console.log('b4 fetch Expenses...');
    (async () => {
      try {
        const res = await axios.get('expense', { params })
        commit('updateExpenses', { expenseList: res.data.data, paging: res.data.paging })
      } 
      catch (error) {
        console.error(error)
      }
    })()
  },


  createExpense ({ commit, dispatch }, newExpense) {
    return axios.post('expense', newExpense)
      .then(res => {
        dispatch('fetchExpenses')

        if (res.data.status === 'success') {
          
          return res.data;
        }
        return false
      })
      .catch(err => console.log('err: ' + err))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
