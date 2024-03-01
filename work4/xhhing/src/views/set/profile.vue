<template>

<div class="setting-profile-view">
    <div class="profile-nav">个人资料</div>
    <div class="profile-infos">
        <!-- 用户名的修改 -->
        <div class="info-input">
            <el-form-item label="用户名：">
                <el-input v-model="newName" :placeholder=sLoginer.logindata.name></el-input>
            </el-form-item>
        </div>
        <!-- 头像的修改 -->
        <div class="avatar-input">
            <div class="avatar-uploder">
                <img class="avatar" :src=sLoginer.logindata.image alt="">
                <label for="input">
                    <div class="click-cover">点击修改头像</div>
                </label>
                <input ref="fileInput" @change="onFileInputChange" id="input" type="file" style="display: none;">
            </div>
            <div class="avatar-label">上传头像</div>
        </div>
    </div>
    <el-button class="btn" @click="saveClick" type="primary" plain>保存修改</el-button>
</div>
    
</template>



<script setup>

import useUserStore from '@/stores/store';
import axios from 'axios';
import { ref } from 'vue';

const sLoginer = useUserStore()
const newName = ref("")
const fileInput = ref(null)

let file

const onFileInputChange = () => {
    file = fileInput.value.files[0]
}


function saveClick (){
    let formData = new FormData()
    formData.append('username', newName.value)
    formData.append('image', file)
    axios({
        method:"POST",
        url:"http://8.130.119.35:8081/user/update",
        headers:{
            Authorization:sLoginer.logindata.authorization,
        },
        data:formData
    }).then(response=>{
        console.log(response)
        const res = response.data.data
        sLoginer.logindata.name = res.newName
        sLoginer.logindata.image = res.image
    }).catch(error=>{
        console.log(error)
    })
}

</script>



<style scoped>

.btn{
    margin-top: 50px;
    margin-left: 200px;
}

/* profile-nav的样式 */
.profile-nav{
    height: 24px;
    padding-bottom: 20px;
    border-bottom: solid 0.8px #e4e6eb;
    color: #252933;
    font-size: 18px;
    font-weight: 500;
}

/* profile-infos的样式 */
.profile-infos{
    display: flex;
    padding-left: 50px;
    padding-top: 50px;
    height: 100%;
}
.info-input{
    width:60%;
    height: 100%;
}
.avatar-input{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    width: 40%;
    height: 100%;
}
.avatar-uploder{
    position: relative;
}
.avatar{
    width: 90px;
    height: 90px;
    border-radius: 50%;
}
.click-cover{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: rgba(29,33,41,.5);
    font-size: 12px;
    border-radius: 50%;
    width: 90px;
    height: 90px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.click-cover:hover{
    cursor: pointer;
    opacity: 1;
}

</style>