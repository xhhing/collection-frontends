<template>

<el-container>
    <!-- 博客列表 -->
    <el-main class="timeBlogs">
      <h2 class="timeBlogs-title">最新博客</h2>
      <!-- 博客数组渲染 -->
      <div class="blog" @click="blogClick(item.id)" v-for="(item, index) in filterItems" :key="index">
        <h3 class="blog-title">{{ item.title }}</h3>
        <div class="blog-tip">
          <span>{{ item.author }}</span>
          <!-- 点击量显示 -->
          <div class="blog-tip-clickNum">
            <el-icon><View /></el-icon>
            <span>{{ item.clickNum }}</span>
          </div>
          <!-- 点赞量显示 -->
          <div class="blog-tip-likedNum" :class="{likedActive:item.isLiked===1}" @click.stop="likedClick(index)">
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
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="sLoginer.timeArticles.length" 
      /> 
    </el-main>
    <!-- 榜单 -->
    <el-aside class="clickBlogs" width="400px">
      <h2 class="clickBlogs-title">文章榜</h2>
      <ul>
        <li 
          @click="blogClick(item2.blogId)"
          type="1"
          v-for="(item2, index) in filterClickItems" 
          :key="index" 
          :class="{'first-index':index===0, 'second-index':index===1, 'third-index':index===2, 'other-index':index>2}"
        >{{ item2.title }}</li>
      </ul>
    </el-aside>
  </el-container>

</template>

<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../../stores/store'
import axios from 'axios'

const sLoginer = useUserStore()
const router = useRouter()
console.log(sLoginer.logindata.authorization)

//axios请求最新博客
axios({
  method:'GET',
  // url:"http://127.0.0.1:4523/m1/3998796-0-default/blog/currents"
  url:'http://8.130.119.35:8081/blog/currents',
}).then(response =>{
    const res = response.data.data
    sLoginer.timeArticles = res
    console.log(response)
    console.log(sLoginer.timeArticles)
}).catch(error => {
    console.log(error);
})

//axios请求博客榜
axios({
  method:'GET',
  url:'http://8.130.119.35:8081/blog/clickrank',
  // headers:{
  //   Authorization:sLoginer.logindata.authorization
  // }
}).then(response =>{
    const res = response.data.data
    sLoginer.clickArticles = res
    console.log(response)
}).catch(error => {
    console.log(error);
})

//点赞事件,
function likedClick (index){
  console.log(sLoginer.timeArticles[index])
  axios({
    method:"GET",
    url:"http://8.130.119.35:8081/user/like",
    params:{
      blog_id:sLoginer.timeArticles[index].id,
      is_liked:sLoginer.timeArticles[index].isLiked,
    },
    headers:{
      Authorization:sLoginer.logindata.authorization
    }
  }).then(response=>{
    console.log(response)
    const res = response.data.data
    sLoginer.timeArticles[index].isLiked = res.isLiked
    console.log(sLoginer.timeArticles)
    if(sLoginer.timeArticles[index].isLiked === 1){
      sLoginer.timeArticles[index].liked++
    }
    else{
      sLoginer.timeArticles[index].liked--
    }
  }).catch(error=>{
    console.log(error)
  })
}

//点击查看博客事件
function blogClick (id){
  console.log("id:"+id)
  //进入博客页面
  router.push({
    name:'blogDetail',
    query:{
      msg:id,
    },
  })
}

//分页处理
const currentPage = ref(1)//当前页码,初始为1
const pageSize = ref(6)//每页条目数
const filterItems = computed(()=>{
  const star = (currentPage.value-1)*pageSize.value
  const end = star + pageSize.value
  return sLoginer.timeArticles.slice(star, end)
})

//榜单的过滤
const filterClickItems = computed(()=>{
  const len = sLoginer.clickArticles.length
  const end = len>6 ? 6:len
  return sLoginer.clickArticles.slice(0, end)
})



</script>

<style>

/* timeBlogs样式 */
.timeBlogs{
  margin-left: 70px;
  margin-right: 50px;
}
.timeBlogs-title{
  margin-top: 20px;
  margin-bottom: 15px;
}
.blog{
  padding: 5px 5px 10px 5px;
  border-bottom:solid thin rgba(228,230,235,0.5);
}
.blog:hover{
  cursor: pointer;
  background-color: #e9e9e9;
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
  font-size: 13px;
  color: #8a919f;
}
.blog-tip-likedNum{
  display: flex;
  margin-left: 30px;
  font-size: 13px;
  color: #8a919f;
}
.blog-tip-likedNum:hover{
  color: #409EFF;
}
.likedActive{
  color: #409EFF;
}
.pagination{
  margin-top: 40px;
}

/* clickBlogs样式 */
.clickBlogs{
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 80px;
}
.clickBlogs-title{
  /* text-align: center; */
  padding-left: 30px;
  margin-bottom: 40px;
} 
.clickBlogs li{
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.clickBlogs li::marker{
  font-weight: bold;
}
.clickBlogs li:hover{
  cursor: pointer;
}
.first-index::marker{
  color: #c45656;
}
.second-index::marker{
  color: #F56C6C;
}
.third-index::marker{
  color: #f89898;
}
.other-index::marker{
  color: #c0c0c0;
}

</style>