<template>

<div class="info">
    <!-- 基本信息 -->
    <div class="basic-info">
        <div class="info-my">
            <img class="info-headshot" :src=sLoginer.logindata.image alt="">
            <span class="info-name">{{ sLoginer.logindata.name }}</span>
        </div>
        <el-button 
            class="info-setBtn" 
            type="primary" 
            plain 
            style="width: 100px;"
            @click="enterSet"
        >
        设置
        </el-button>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName"  class="info-tabs" type="border-card">
        <!-- 我写的博客 -->
        <el-tab-pane label="文章" name="first">
            <el-container>
                <!-- 博客列表 -->
                <el-main class="myBlogs">
                <h2 class="myBlogs-title">我的博客</h2>
                <!-- 博客数组渲染 -->
                <div class="blog" v-for="(item, index) in filterMyBlogs" :key="index">
                    <h3 class="blog-title">{{ item.title }}</h3>
                    <div class="blog-tip">
                    <!-- 点击量显示 -->
                    <div class="blog-tip-clickNum">
                        <el-icon><View /></el-icon>
                        <span>{{ item.clickNum }}</span>
                    </div>
                    <!-- 点赞量显示 -->
                    <div class="blog-tip-likedNum">
                        <span class="iconfont icon-dianzan"></span>
                        <span>{{ item.liked }}</span>
                    </div>
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination 
                    class="pagination"
                    background  
                    layout="prev, pager, next" 
                    v-model:current-page="myBlogs_currentPage"
                    v-model:page-size="myBlogs_pageSize"
                    :total="items.length" 
                /> 
                </el-main>
            </el-container>
        </el-tab-pane>
        <!-- 我点赞的博客 -->
        <el-tab-pane label="赞" name="second">
            <el-container>
                <!-- 博客列表 -->
                <el-main class="myBlogs">
                <h2 class="myBlogs-title">我赞过的博客</h2>
                <!-- 博客数组渲染 -->
                <div class="blog" v-for="(item, index) in filterLikediBlogs" :key="index">
                    <h3 class="blog-title">{{ item.title }}</h3>
                    <div class="blog-tip">
                    <span>{{ item.author }}</span>
                    <!-- 点击量显示 -->
                    <div class="blog-tip-clickNum">
                        <el-icon><View /></el-icon>
                        <span>{{ item.clickNum }}</span>
                    </div>
                    <!-- 点赞量显示 -->
                    <div class="blog-tip-likedNum">
                        <span class="iconfont icon-dianzan"></span>
                        <span>{{ item.liked }}</span>
                    </div>
                    </div>
                </div>
                <!-- 分页 -->
                <el-pagination 
                    class="pagination"
                    background  
                    layout="prev, pager, next" 
                    v-model:current-page="likediBlogs_currentPage"
                    v-model:page-size="likediBlogs_pageSize"
                    :total="items.length" 
                />
                </el-main>
            </el-container>
        </el-tab-pane>
    </el-tabs>
</div>

</template>



<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../../stores/store'
import axios from 'axios';

const sLoginer = useUserStore()
const router = useRouter()
const likedNum = ref(0)
const activeName = ref('first')

const items = ref([])
const likediBlogs = ref([])

// axios 请求我写的博客
axios({
    method:"GET",
    url:"http://8.130.119.35:8081/blog/myblogs",
    headers:{
        Authorization:sLoginer.logindata.authorization
    }
}).then(response=>{
    console.log(response)
    const res = response.data.data
    items.value = res
}).catch(error=>{
    console.log(error)
})

// axios 请求我点赞的博客
axios({
    method:"GET",
    url:"http://8.130.119.35:8081/blog/mylike",
    headers:{
        Authorization:sLoginer.logindata.authorization
    }
}).then(response=>{
    console.log(response)
    const res = response.data.data
    likediBlogs.value = res
}).catch(error=>{
    console.log(error)
})

//myBlogs-分页处理
const myBlogs_currentPage = ref(1)//当前页码,初始为1
const myBlogs_pageSize = ref(3)//每页条目数
const filterMyBlogs = computed(()=>{
  const star = (myBlogs_currentPage.value-1)*myBlogs_pageSize.value
  const end = star + myBlogs_pageSize.value
  return items.value.slice(star, end)
})

//likedBlogs-分页处理
const likediBlogs_currentPage = ref(1)//当前页码,初始为1
const likediBlogs_pageSize = ref(3)//每页条目数
const filterLikediBlogs = computed(()=>{
  const star = (likediBlogs_currentPage.value-1)*likediBlogs_pageSize.value
  const end = star + likediBlogs_pageSize.value
  return likediBlogs.value.slice(star, end)
})

//设置按钮点击事件, 进入设置页面
function enterSet (){
    router.push({name:'setting'})
}

</script>



<style scoped>

.info{
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    background-color: #f4f4f5;
}

/* basic-info样式 */
.basic-info{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 70%;
    height: 30%;
    border:solid 1px #dcdfe6;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #ffffff;
    position: relative;
}
.info-my{
    display: flex;
    position: relative;
}
.info-headshot{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin-right: 30px;
}
.info-name{
    position: relative;
    font-weight: bold;
    font-size: larger;
    top: 20px;
}
.info-setBtn{
    position: relative;
    top: 35px;
}

/* tabs样式 */
.info-tabs{
    width: 70%;
    height: 70%;
}

/* timeBlogs样式 */
.myBlogs{
  margin-left: 70px;
  margin-right: 50px;
  padding-top: 10px;
}
.myBlogs-title{
  margin-top: 0px;
  margin-bottom: 15px;
}
.blog{
  padding: 5px 5px 10px 5px;
  border-bottom:solid thin #c0c0c0;
}
.blog-title{
  margin-top: 10px;
  margin-bottom: 10px;
}
.blog-tip{
  display: flex;
}
.blog-tip-clickNum{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
}
.blog-tip-likedNum{
  display: flex;
  margin-left: 30px;
}
.pagination{
  margin-top: 40px;
}

</style>