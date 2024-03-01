<template>
    <div class="editor-layout">
        <el-container class="markdown-editor">
            <!-- 页面头 -->
            <el-header class="editor-header">
                <div class="left-box">
                    <el-input class="title-input" v-model="title" placeholder="输入文章标题..." />
                </div>
                <div class="right-box">
                    <el-button class="btn" type="primary" @click="addBlog">发布</el-button>
                    <img class="avatar" src="https://xitu.oss-cn-nanjing.aliyuncs.com/666.png" @click="enterLoginer" alt="">
                </div>
            </el-header>
            <!-- 页面主体-编辑器 -->
            <el-main class="editor-main">
                <v-md-editor class="editor" v-model="text" height="100%"></v-md-editor>
            </el-main>
        </el-container>
    </div>
</template>



<script setup>

import { ref } from 'vue';
import router from '@/router';
import axios from 'axios';
import useUserStore from '@/stores/store';
import { ElMessage } from 'element-plus';   //引入提示函数

const text = ref('')
const title = ref('')
const sLoginer = useUserStore()

//点击事件，进入个人中心
function enterLoginer (){
    router.push({name:'homeLoginer'})
}

//点击事件，发布博客
function addBlog (){
    if (title.value === "" || text.value === ""){
        ElMessage({
            message: '文章标题或内容未编辑！',
            type: 'warning',
        })
    }
    else{
        let formData = new FormData()
        formData.append('title', title.value)  // 通过append向form对象添加数据
        formData.append('content', text.value) // 添加form表单中其他数据
        axios({
            method:"POST",
            url:"http://8.130.119.35:8081/user/add_blog",
            headers:{
                Authorization:sLoginer.logindata.authorization,
            },
            data:formData
        }).then(response=>{
            console.log(response)
            ElMessage({
                message: '发布成功！',
                type: 'success',
            })
        }).catch(error =>{
            console.log(error)
            ElMessage.error('发布失败！')
        })
    }
}

</script>



<style scoped>

.editor-layout{
    height: 100vh;
}
.markdown-editor{
    height: 100%;
}

/* editor-header 样式 */
.editor-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 5.334rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.left-box{
    display: flex;
    height: 100%;
    width: 60%;
}
.title-input{
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 500;
    color: #1d2129;
    border: none;
    outline: none;
}
.right-box{
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: flex-end;
}
.btn{
    height: 32px;
    font-size: 14px;
    margin-left: 8px;
    margin-right: 8px;
}
.avatar{
    width: 2.667rem;
    height: 2.667rem;
    border-radius: 50%;
    margin-left: 8px;
    margin-right: 8px;
}
.avatar:hover{
    cursor: pointer;
}

/* editor-main 样式 */
.editor-main{
    height: 100%;
}

</style>