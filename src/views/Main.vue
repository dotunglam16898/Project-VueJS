<template> 
 <div class="mainPage">
     <el-container>
        <el-header style="height: 53px;">
            <el-row style="height: 53px;">
                <el-col :span="8" style=" width:420px;height:20px">
                    <div class="grid-content bg-purple button-home">
                        <div class="button-house">
                            <el-row>
                            
                            </el-row>
                        </div>
                        
                    </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"><img src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png" alt="" style="height: 35px;margin-top: 6px;"></div></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple avatar">
                        <!-- <img src="data:image/jpeg;base64,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" :style="{ width:'40px', height:'40px', borderRadius:'50px'}"> -->
                        <el-dropdown>
                        <span class="el-dropdown-link">
                           <!-- <img src="data:image/jpeg;base64,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" :style="{ width:'40px', height:'40px', borderRadius:'50px', marginTop: '6px'}"> -->
                           <img :src="'http://vuecourse.zent.edu.vn/storage/users/'+ authUser.avatar" :style="{ width:'40px', height:'40px', borderRadius:'50px', marginTop: '6px'}">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><div @click="userProfile()">Thông tin tài khoản</div></el-dropdown-item>
                            <el-dropdown-item><div @click="logout()">Đăng Xuất</div></el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="img-dawn content" >
            <List />
        </el-main>
    </el-container>
 </div>
</template>

<script> 
import List from '../components/List.vue'
import {mapState, mapMutations } from 'vuex'
import api from '../api'
export default {
   components: {
       List
   },
     computed: {
      ...mapState('login', ['isAuthenticated','authUser']),
    },
  data() {
      return {
       
      }
  },
  methods: {
      ...mapMutations('login', ['updateLoginStatus', 'updateAuthUser']),
      async logout() {
        localStorage.removeItem('access_token')
        this.updateLoginStatus(false)
        this.updateAuthUser({})
        if (this.$router.currentRoute.name !== 'Login') {
          await this.$router.push({ name: 'Login' })
        }
      },
     userProfile() {
         this.$router.push({path: '/profile'})
     },
    //  logout() {
    //      this.$router.push({path: '/login'})
    //  }
  },
  mounted() {
      api.getAuthUser().then((response) => {
        if (response) {
          this.updateAuthUser(response.data)
        }
      })
    }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mainPage{
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    .el-header, .el-footer {
        background-color: rgba(0,0,0,.32);
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .avatar{
        text-align: right;
        cursor: pointer;
    }
    .button-home{
        text-align: left;
    }
    .button-house{
        // background-color: hsla(0,0%,100%,.3);
    }
    .img-dawn {
        background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2333x1600/85d3896e5e19f95591a72b7ab5879f41/photo-1612485222394-376d81a3e829.jpg");
        // background-image: url("https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=en-US");
        // background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2333x1600/85d3896e5e19f95591a72b7ab5879f41/photo-1612485222394-376d81a3e829.jpg");
        height: 92vh;
        background-size: cover;
        background-position: 50%;
        background-attachment: fixed;
        background-position: center;
        
    }
}
// .content {
//     width: 100%;
//     overflow-x: scroll;
// }


</style>
