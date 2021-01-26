<template> 
 <div class="loginWrap">
     <main>
         <div class="form">
             <div class="logoWrap">
                 <!-- <img src="" class="logo"> -->
                 <h3>Chỉnh sửa thông tin</h3>
             </div>
             <div class="formInputWrap">
                 <div class="input-wrap">                     
                    <input type="text" placeholder="Nhập tên" class="sui-input" @input="onChangeEmail($event.target.value)" >
                    <span class="textRed">{{emailErrorMsg}}</span>
                 </div>
             </div>
             <div class="formInputWrap">
                 <div class="inpur-wrap">
                     <input type="password" placeholder="Nhập mật khẩu" class="sui-input" @input="onChangePass($event.target.value)">
                     <span class="textRed">{{passErrorMsg}}</span>
                 </div>               
                <!-- <div class="forgot" @click="register()">
                    <span class="forgotPwd">Đăng ký</span>
                </div>                -->
             </div>
              <button class="submitButton" @click="submit()">          
                 <span>Xác Nhận</span>             
             </button>
         </div>
     </main>
 </div>
</template>

<script> 

export default {
   
  data() {
      return {
       
      }
  },
  methods: {
     
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loginWrap {
     height: 100vh;
     border: 1px solid black;
  overflow: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  .form{
      height: 363px;
      background-color: white;
      width: 385px;
      padding: 24px;
      border-radius: 10px;
      border: 1px solid black;
  }
}
</style>
