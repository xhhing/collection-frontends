<template>

<div class="layout" @click="closeMenu">
    <el-container class="home-body">
      <!-- 导航 -->
      <el-header class="banner">
        <el-row class="row-1" justify="space-between">
          <el-col :span="18"><img src="../assets/logo.png" alt="" class="logo" @click="enterBlogs"></el-col>
          <el-col :span="2"><el-button @click="enterEditor" type="primary" plain class="btn-1">创作者中心</el-button></el-col>
          <el-col :span="2">
            <div class="menu" v-if="sLoginer.islogin">
              <img @click.stop="openMenu" :src=sLoginer.logindata.image alt=""  class="headshot">
              <!-- 个人菜单 -->
              <div class="drop-down-menu" v-if="isOpenMenu">
                <div class="menu-inf">
                  <img :src=sLoginer.logindata.image alt="" class="menu-inf-headshot">
                  <span>{{ sLoginer.logindata.name }}</span>
                </div>
                <el-button class="menu-btn" width="100px" @click="enterLoginer">个人主页</el-button>
              </div>
            </div>
            <el-button type="primary" plain class="btn-1" v-else @click="userLogin">登录|注册</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 二级路由 -->
      <RouterView></RouterView>
    </el-container>
</div>

</template>



<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../stores/store'
import axios from 'axios';

const sLoginer = useUserStore()
const router = useRouter()

const isOpenMenu = ref(false)

//头像点击事件
function openMenu (){
  isOpenMenu.value = true
}
//头像关闭事件
function closeMenu() {
  if (isOpenMenu.value === true){
    isOpenMenu.value = false
  }
}

//点击事件，进入创作者中心
function enterEditor (){
  router.push({name:'editor'})
}

//点击事件，进入个人主页
function enterLoginer (){
  router.push({name:'homeLoginer'})
}
//点击事件， 进入首页
function enterBlogs () {
  router.push({name:'homeBlogs'})
}

//登录注册事件
function userLogin (){
  router.push({name:'login'})
}

//登录成功获取用户信息(获取用户名和头像)
if (sLoginer.islogin === true){
  axios({
    method:"GET",
    url:"http://8.130.119.35:8081/user/info",
    headers:{
      Authorization:sLoginer.logindata.authorization
    }
  }).then(response=>{
    console.log(response)
    const res = response.data.data
    sLoginer.logindata.name = res.username
    sLoginer.logindata.image = res.image
  }).catch(error=>{
    console.log(error)
  })
}

</script>



<style scoped>

.layout{
  display: flex;
  width: 100%;
  height: 100%;
}

/* banner样式 */
.banner{
  padding: 0px;
  height: 40px;
}
.row-1{
  background-color: #1e80ff;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding-left: 20px;
  /* padding-right: 20px; */
}
.headshot{
  height:40px;
  width: 40px;
  border-radius: 50%;  
  cursor: pointer;
}
.btn-1{
  height: 40px;
  /* background-color: #409EFF; */
}
.logo{
  height: 40px;
  cursor: pointer;
}

/* menu样式 */
.menu{
  height: 40px;
  position: relative;
}
.drop-down-menu{
  position: absolute;
  left: -90px;
  width: 200px;
  height: 100px;
  border-radius: 5px;
  background-color: #ecf5ff;
  padding: 5px;
}
.menu-inf{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
}
.menu-inf-headshot{
  height:40px;
  width: 40px;
}
.menu-btn{
  margin-top: 10px;
  margin-left: 16px;
}

/* 主体部分样式 */
.home-body{
  height: 100%;
}

</style>