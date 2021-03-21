<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
    <!-- <AdminLayout v-if="isLogin == true " /> -->
    <!-- <LoginLayout v-else /> -->
    <LoginLayout />
    <!-- <AdminLayout v-if="isAuthenticated"/> -->

  </div>
</template>
<script>
import {mapState, mapMutations } from 'vuex'
import LoginLayout from './layouts/LoginLayout.vue'
//  import axios from 'axios'
// import api from './api'
// import AdminLayout from './layouts/AdminLayout.vue'

  export default {
     name: 'App',
    components: {
        LoginLayout,
        // AdminLayout
    },
    computed: {
      ...mapState('auth', ['isAuthenticated']),
    },
    methods: {
      ...mapMutations('auth', ['changeLoginStatus']),
      // async handleLogout() {
      //   localStorage.removeItem('access_token')
      //   this.updateLoginStatus(false)
      //   this.updateAuthUser({})
      //   if (this.$router.currentRoute.name !== 'Login') {
      //     await this.$router.push({ name: 'Login' })
      //   }
      // }
    },
    // mounted() {
    //   axios({
    //     method: 'get',
    //     url: 'http://vuecourse.zent.edu.vn/api/auth/me',
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //     }
    //   }).then((response) => {
    //     this.changeLoginStatus({
    //       isAuthenticated: true,
    //       authUser: response.data,
    //     })
    //   }).catch((error) => {
    //     if (error.response.status === 401) {
    //       this.changeLoginStatus({
    //         isAuthenticated: false,
    //         authUser: {},
    //       })
    //       localStorage.removeItem('access_token')
    //       if (this.$router.currentRoute.name !== 'Login') {
    //         this.$router.push({ name: 'Login' })
    //       }
    //     }
    //   })
    // }
  };
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  ::-webkit-scrollbar {
            height: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(194, 191, 191, 0.65);;
            border-radius: 6px;
        }
        ::-webkit-scrollbar-track-piece {
            background: rgba(0,0,0,.15);
        }
}
body{
  margin: 0px;
}
.el-dialog__body{
  // padding: 0 !important;
  background-color: #f4f5f7;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px !important;
  color: #172b4d !important;
}
.el-input__inner {
    background-color: rgba(9, 30, 66, 0.04) !important;
    
  }
.el-dialog__header{
  // padding: 0 !important;
  background-color: #f4f5f7;
}
.el-dialog__footer {
    background-color: #f4f5f7;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
