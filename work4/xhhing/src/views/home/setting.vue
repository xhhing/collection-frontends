<template>
    <div class="set-layout">
        <el-container class="set-body">
            <!-- 头 -->
            <el-header class="banner">
                <RouterLink to="/home/loginer">&#60 返回个人主页</RouterLink>
            </el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside class="aside" width="230px">
                    <RouterLink class="btn" to="/home/setting/profile">个人设置</RouterLink>
                    <RouterLink class="btn" to="/home/setting/account">账号设置</RouterLink>
                </el-aside>
                <!-- 主体 -->
                <el-main class="main" >
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<script setup>

import { ref } from 'vue';

const op=ref(1)

//标签页的选择
function selected_1 (){
    op.value = 1
}
function selected_2 (){
    op.value = 2
}

</script>



<style scoped>

.set-layout{
    width:100%;
    height: 100%;
    padding-top: 30px;
    background-color: #f4f4f5;
}
.set-body{
    height: 100%;
}

/* banner样式 */
.banner{
    display: flex;
    align-items: center;
    background-color: #ffffff;
    margin-bottom: 10px;
    margin-left: 150px;
    margin-right: 150px;
    border-radius: 5px;
    height: 7%;
}
.banner > a{
    text-decoration: none;
    color: #409EFF;
    font-weight:550;
}

/* aside样式 */
.aside{
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin-left: 150px;
    margin-right: 20px;
    margin-bottom: 30px;
    padding: 8px;
    border-radius: 5px;
}
.btn{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: auto;
    text-decoration: none;
    color: #252933;
    font-size: 16px;
    font-weight: 400;
}
.btn:hover{
    background-color: #eaf2ff;
    color:#1e80ff;
}
.btn:active{
    color: #252933;
}
.router-link-active{
    background-color: #eaf2ff;
}

/* main样式 */
.main{
    background-color: #ffffff;
    margin-right: 150px;
    margin-bottom: 30px;
    border-radius: 5px;
}

</style>