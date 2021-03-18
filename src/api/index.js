import axios from 'axios'
import store from "../store";
import router from "../router";
// Lấy ra các biến cần thiết: base url, token
const baseUrl = process.env.VUE_APP_BASE_URL;
const token = localStorage.getItem('access_token');
// Tạo instance của axios
export const apiAxios = axios.create({
  baseURL:`${baseUrl}/api`,
  headers: {
    post: {
      'Content-Type': 'application/json'
    },
    common: {
      'Authorization': `Bearer ${token}`
    }
  }
})
// Xử lý logout khi response 401
apiAxios.interceptors.response.use(undefined, (error) => {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
      store.commit('login/updateLoginStatus', false)
      store.commit('login/updateAuthUser', {})
      localStorage.removeItem('access_token')
      return router.push({name: 'Login'})
    }
  }
})
// Khai báo các request sử dụng trong hệ thống
export default {
  getAuthUser () {
    return apiAxios({
      method: 'get',
      url: '/auth/me'
    })
  },
  register (data) {
    return apiAxios({
      method: 'post',
      url: 'auth/register',
      data: data
    })
  },
  login (data) {
    return apiAxios({
      method: 'post',
      url: 'auth/login',
      data: data
    })
  },
  updateUser(data) {
    return apiAxios({
      method: 'put',
      url: '/users',
      data: data
    })
  },
  storeDirectory (data) {
    return apiAxios({
      method: 'post',
      url: '/directories',
      data: data
    })
  },
  getDirectory() {
    return apiAxios({
      method: 'get',
      url: '/directories'
    })
  },
  updateDirectoryTitle(data,id){
    return apiAxios({
      method: 'put',
      url: '/directories/' + id,
      data: data
    })
  },
  deleteDirectory(id){
    return apiAxios({
      method: 'delete',
      url: '/directories/' + id,
    })
  },
  deleteCard(id){
    return apiAxios({
      method: 'delete',
      url: '/cards/' + id,
    })
  },
  changeStatusCard(data,id) {
    return apiAxios({
      method: 'put',
      url: '/cards/' + id + '/change-status',
      data: data
    })
  },
  detailCard(id) {
    return apiAxios({
      method: 'get',
      url: '/cards/' + id
    })
  },
  storeCard(data){
    return apiAxios({
      method: 'post',
      url: '/cards',
      data: data
    })
  },
  updateCard(data,id) {
    return apiAxios({
      method: 'put',
      url: '/cards/' + id,
      data: data
    })
  },
  changeIndexCard(data,id) {
    return apiAxios({
      method: 'put',
      url: '/cards/' + id + '/directory',
      data: data
    })
  },
  storeLabel(data,id){
    return apiAxios({
      method: 'post',
      url: '/cards/'+ id +'/label',
      data: data
    })
  },
  getLabel() {
    return apiAxios({
      method: 'get',
      url: '/labels'
    })
  },
  searchLabel(params) {
    return apiAxios({
      method: 'get',
      url: '/labels',
      params: params
      
    })
  },
  storeCheckList(data) {
    return apiAxios({
      method: 'post',
      url: '/check-lists',
      data: data
    })
  },
  attachLabel(data,id) {
    return apiAxios({
      method: 'post',
      url: '/cards/'+ id +'/attach-labels',
      data: data
    })
  },
  editLabel(data,id) {
    return apiAxios({
      method: 'put',
      url: '/labels/'+ id ,
      data: data
    })
  },
  deleteLabel(id) {
    return apiAxios({
      method: 'delete',
      url: '/labels/'+ id ,
    })
  },
  deleteCheckList(id) {
    return apiAxios({
      method: 'delete',
      url: '/check-lists/' + id,
    })
  },
  storeDeadline(data,id) {
    return apiAxios({
      method: 'put',
      url: '/cards/' + id + '/change-status-deadline',
      data: data
    })
  },
  storeCheckListChild(data) {
    return apiAxios({
      method: 'post',
      url: '/check-list-childs',
      data: data
    })
  },
  deleteCheckListChild(id) {
    return apiAxios({
      method: 'delete',
      url: '/check-list-childs/'+ id,
    })
  },
  changeStatusChild(data,id) {
    return apiAxios({
      method: 'put',
      url: '/check-list-childs/'+ id +'/change-status',
      data: data
    })
  },
  updateCheckListChild(data,id) {
    return apiAxios({
      method: 'put',
      url: '/check-list-childs/'+ id,
      data: data
    })
  },

}