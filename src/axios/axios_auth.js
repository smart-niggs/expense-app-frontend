// Note that this is a simply just an axios config similar to the global config.
// But, this is an axiosInstance-can be applied to specific areas and works exactly like
import axios from 'axios'
// import { store } from '@/store/index';
// import Vue from 'vue'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
  // headers   // put into .env file
})

axiosInstance.defaults.headers.common['Accepts'] = 'application/json' // specific to a request type.
// axiosInstance.defaults.headers.common['Authorization'] = 'Auth Token';
// console.log('Vue ' + JSON.stringify(Vue));
// console.log('store: ' + JSON.stringify(store));
// axiosInstance.defaults.headers.common['Authorization'] = 'Instance HEaderes'

// Axios global setup; NB: this is done here cus main.js is loaded b4 the oda component files, u can use in anoda file and import here also
// axios.defaults.baseURL = 'https://vuejs-http-340b3.firebaseio.com/';
// // axios.defaults.headers.common['Authorization'] = 'Auth Token';
// // axios.defaults.headers.get['Accepts'] = 'application/json'  //  specific to a request type.

// // Custom  vue axiosInstance is also used in the axios_auth file

// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('config: ' + JSON.stringify(config));
//   // config.headers['Authorization'] = 'changedd ooh'
//   return config   //  must-middleware
// })

// const resInterceptor = axios.interceptors.request.use(res => {
//   // console.log('res: ' + JSON.stringify(res));
//   // res.data = {hmm: 'I changed da data ooh!!'}
// if res.data != 'success'
//   return res   //  must-middleware
// })

export default axiosInstance
