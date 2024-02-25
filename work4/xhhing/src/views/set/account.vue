<template>
    <div class="setting-account-view">
        <div class="account-nav">账号设置</div>
        <div class="account-info">
            <div class="password">
                <span>密码</span>
                <el-button type="primary" plain @click="setPassword">重置</el-button>
            </div>
        </div>
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="修改密码" width="300">
        <input v-model="newPassword" class="input" type="text" placeholder="请输入密码">
        <template #footer>
            <div class="dialog-footer">
                <el-button class="myBtn" type="primary" @click="updateClick">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script setup>

import axios from 'axios';
import { ref } from 'vue';
import useUserStore from '@/stores/store';

const sLoginer = useUserStore()
const dialogVisible = ref(false)
const newPassword = ref("")

console.log(sLoginer.logindata.authorization)
function setPassword (){
    dialogVisible.value = true
}

//更改密码确定事件
function updateClick(){
    let formData = new FormData()
    formData.append('password', newPassword.value)
    axios({
        method:"POST",
        url:"http://8.130.119.35:8081/user/change_password",
        headers:{
            Authorization:sLoginer.logindata.authorization,
        },
        data:formData
    }).then(response=>{
        console.log(response)
        sLoginer.logindata.password = newPassword
        dialogVisible.value = false
    }).catch(error=>{
        console.log(error)
    })
}

</script>


<style scoped>

.account-nav{
    height: 24px;
    padding-bottom: 20px;
    border-bottom: solid 0.8px #e4e6eb;
    color: #252933;
    font-size: 18px;
    font-weight: 500;
}

/* account-info的样式 */
.password{
    display: flex;
    width: 100%;
    height: 18px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: solid 0.8px #e4e6eb;
    justify-content: space-around;
    align-items: center;
}

/* dialog的样式 */
.input{
    height: 20px;
    width: 100%;
}
.myBtn{
    width: 100%;
}

</style>