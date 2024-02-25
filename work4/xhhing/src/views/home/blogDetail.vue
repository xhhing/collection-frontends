<template>
    <div class="main-view" :class="{beGray:isopen}">
        <!-- 悬挂面板 -->
        <div class="article-suspended-panels">
            <!-- 点赞 -->
            <div class="btn-liked btn" :data-after="blog.liked" @click="likedClick" :class="{active:blog.isLiked}">
                <span class="iconfont icon-dianzan my-icon"></span>
            </div>
            <!-- 评论 -->
            <div class="btn-comments btn" :data-after="blog.clickNum" @click="commentClick">
                <el-icon my-icon><ChatLineSquare /></el-icon>
            </div>
        </div>
        <!-- 文章区域 -->
        <div class="article-area">
            <h1 class="article-title">{{ blog.title }}</h1>
            <div class="author-info-box">
                <span class="author-name">{{ blog.author }}</span>
                <div class="time">{{ blog.createTime }}</div>
                <div class="clickNum">
                    <el-icon><View /></el-icon>
                    <span>{{  }}</span>
                </div>
            </div>
            <div class="article" v-html="markdownToHtml"></div>
        </div>
        
    </div>
    <!-- 评论窗口 -->
    <div class="comment-layout" v-if="isopen">
        <div class="comment-empty" @click="cannelOpen"></div>
        <!-- 评论的区域 -->
        <div class="comment-area">
            <div class="comment-container">
                <div class="c-header">
                    <span class="c-title">评论 {{  }}</span>
                    <el-icon class="close-btn" size="18px" @click="cannelOpen"><Close /></el-icon>
                </div>
            <el-scrollbar height="650px">  <!-- 滚动条 -->
                <!-- 博客的评论框 -->
                <div class="c-editor">
                    <div class="avatar-box">
                        <img class="avatar" :src=sLoginer.logindata.image alt="">
                    </div>
                    <div class="form-box" :class="{focus:isFocus}">
                        <textarea 
                            class="c-input" 
                            v-model="myComment"
                            @focus="isFocus=true" 
                            @blur="isFocus=false" 
                            placeholder="平等表达，友善交流"
                            ></textarea
                        >
                        <el-button type="primary">发送</el-button>
                    </div>
                </div>
                <div class="c-list">
                    <div class="list-header">最新</div>
                    <div class="list-contents">
                        <div class="list" v-for="(item,index) in blog_comments" >
                            <!-- 评论者的头像 -->
                            <div class="comment-avatar">
                                <img class="avatar-image" :src=sLoginer.logindata.image alt="">
                            </div>
                            <!-- 评论主体 -->
                            <div class="comment-body">
                                <span class="comment-name">name</span>
                                <div class="comment-content">content</div>
                                <div class="comment-action">
                                    <span class="createTime">time</span>
                                    <!-- 点赞量显示 -->
                                    <div class="comment-likedNum">
                                        <span class="iconfont icon-dianzan"></span>
                                        <span>num</span>
                                    </div>
                                    <!-- 评论的回复 -->
                                    <div class="comment-reply" :class="{isclick:isreply[index]}" @click="replyClick(index)">
                                        <el-icon><ChatDotSquare /></el-icon>
                                        <span v-if="isreply[index]">取消回复</span>
                                    </div>
                                </div>
                                <!-- 评论的回复框 -->
                                <div class="reply" v-if="isreply[index]">
                                    <textarea 
                                        class="r-input" 
                                        v-model="myReply[index]" 
                                        placeholder="回复"
                                        ></textarea
                                    >
                                    <el-button type="primary" size="small">回复</el-button>
                                </div>
                                <!-- 子评论 -->
                                <div class="reply-list">
                                    
                                    <div class="list" v-for="(item,index) in blog_comments" >
                                        <!-- 评论者的头像 -->
                                        <div class="comment-avatar">
                                            <img class="avatar-image" :src=sLoginer.logindata.image alt="">
                                        </div>
                                        <!-- 评论主体 -->
                                        <div class="comment-body">
                                            <span class="comment-name">name</span>
                                            <div class="comment-content">content</div>
                                            <div class="comment-action">
                                                <span class="createTime">time</span>
                                                <!-- 点赞量显示 -->
                                                <div class="comment-likedNum">
                                                    <span class="iconfont icon-dianzan"></span>
                                                    <span>num</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            </div>
        </div>
    </div>
</template>



<script setup>

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';    //引入markdown解析器
import axios from 'axios';
import useUserStore from '@/stores/store';

const route = useRoute()
console.log(route.query.msg)
const sLoginer = useUserStore()

const blog = ref({
    content:""
})
const blog_comments = ref([1,2])

const isopen = ref(false)
const isFocus = ref(false)
// 回复最多一千条
const isreply = ref([])
isreply.value = new Array(1000).fill(false)

const myComment = ref("")
const myReply = ref([])

//回复点击事件，弹出/取消输入框
function replyClick (index){
    if (isreply.value[index]){
        isreply.value[index] = false
    }
    else{
        isreply.value[index] = true
    }
}

//请求文章内容
axios({
    method:"POST",
    url:"http://8.130.119.35:8081/blog/enter",
    params:{
        blog_id:route.query.msg,
    },
    headers:{
        Authorization:sLoginer.logindata.authorization,
    }
}).then(response=>{
    console.log("请求内容：")
    console.log(response)
    const res = response.data.data
    blog.value = res
    console.log(blog.value)
}).catch(error=>{
    console.log(error)
})

const markdownToHtml = computed(() =>{
    return marked(blog.value.content)
})
console.log(blog.value.id)
//点赞按钮点击事件
function likedClick (){
    axios({
        method:"GET",
        url:"http://8.130.119.35:8081/user/like",
        params:{
            blog_id:blog.value.id,
            is_liked:blog.value.isLiked,
        },
        headers:{
            Authorization:sLoginer.logindata.authorization
        }
    }).then(response=>{
        console.log(response)
        const res = response.data.data
        blog.value.isLiked = res.isLiked
    }).catch(error=>{
        console.log(error)
    })
}
//评论按钮点击事件
function commentClick (){
    //打开or关闭
    if (isopen.value)
        isopen.value = false
    else
        isopen.value = true
    //axios 请求 该博客的评论
    axios({
        method:'GET',
        url:"https://8.130.119.35:8081/fcomment",
        params:{
            blog_id:blog.value.id,
        }
    }).then(response=>{
        console.log(response)
        blog_comments.value = response.data.data
    }).catch(error=>{
        console.log(error)
    })
}
//点击空白区域，关闭评论
function cannelOpen (){
    isopen.value = false
}

</script>



<style scoped>

/* 主体窗口 */
.main-view{
    display: flex;
    /* background-color: #f2f3f5; 背景颜色不能撑满 */
    justify-content: center;
}
/* article-area 的样式 */
.article-area{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-left: 140px;
    margin-right: 140px;
    padding: 32px;
    width: 820px;
}
.article-title{
    font-size: 2.3rem;
    font-weight: 600;
    line-height: 1.31;
}
.author-info-box{
    display: flex;
    align-items: center;
    margin-bottom: 1.667rem;
}
.author-name{
    display: flex;
    align-items: center;
    margin-right: 16px;
    color: #8a919f;
}
.time{
    margin-right: 16px;
    color: #8a919f;
}
.clickNum{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8a919f;
}

/* article-suspended-panels 的样式 */
.article-suspended-panels{
    display: flex;
    flex-direction: column;
    width: 48px;
    position: fixed;
    margin-left: -7rem;
    top: 140px;
    left: 320px;
}
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50px;
    background-color: #fff;
    margin-bottom: 20px;
}
.btn:hover{
    cursor: pointer;
}
.btn-liked{
    position: relative;
}
.btn-liked::after{
    content: attr(data-after);
    position: absolute;
    top: 0;
    left: 75%;
    height: 17px;
    line-height: 17px;
    padding: 0 5px;
    border-radius: 9px;
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
    background-color: #c2c8d1;
    color: #fff;
}
.active{
    color: #1e80ff  ;
}
.active::after{
    background-color: #1e80ff;
}
.btn-comments{
    position: relative;
}
.btn-comments::after{
    content: attr(data-after);
    position: absolute;
    top: 5px;
    left: 75%;
    height: 17px;
    line-height: 17px;
    padding: 0 5px;
    border-radius: 9px;
    font-size: 11px;
    text-align: center;
    white-space: nowrap;
    background-color: #c2c8d1;
    color: #fff;
}

/* 评论窗口 */
.comment-layout{
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgb(0, 0, 0, 0.08);
}
.beGray{    /* 主体页面变灰 */
    filter: grayscale(100%);
}
.comment-empty{
    width: 70%;
}
.comment-area{
    width: 30%;
    background-color: #fff;
    padding: 20px;
}
.comment-container{
    margin-top: 64px;
}
.c-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    width: 430px;
    position: fixed;
    padding: 0 22px 0 24px;
    top: 0;
    border-bottom: 1px solid #e4e6eb;
    transform: translateX(-20px);
    z-index: 100;
    background: #fff;
}
.c-title{
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
    color: #252933;
}
.close-btn:hover{
    cursor: pointer;
}
.c-editor{
    margin-top: 32px;
    display: flex;
}
.form-box{
    width: 100%;
    background-color: #f2f3f5;
    padding: 10px;
    border-radius: 5px;
}
.focus{
    background-color: #fff;
    border: 1px solid #1e80ff;
}
.avatar{
    margin-right: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.c-input{
    background-color: #f2f3f5;
    font-size: 18px;
    border: 0px;
    resize: none;
    height: 40px;
    width: 100%;
}
.c-input:focus{
    outline:none;
    background-color: #fff;
    height: 80px;
}
.c-list{
    margin-top: 32px;
}
.list-header{
    font-size: 15px;
    line-height: 22px;
    color: #515767;
    font-weight: 400;
    padding: 3px 4px;
}
.list{
    display: flex;
    padding: 16px 0px;
}
.comment-avatar{
    width: 36px;
    margin-right: 16px;
}
.avatar-image{
    width: 100%;
    border-radius: 50%;
}
.comment-action{
    display: flex;
    align-items: center;
    color: #8a919f;
    font-size: 14px;
    font-weight: 400;
}
.comment-likedNum{
    display: flex;
    align-items:center;
    margin-left: 20px;
    margin-right: 20px;
}
.comment-reply{
    display: flex;
    align-items: center;
}
.comment-reply:hover{
    cursor: pointer;
}
.isclick{
    color: #1e80ff;
}
.reply{
    margin-top: 10px;
    border: 1px solid #1e80ff;
    border-radius: 5px;
    padding: 3px;
}
.r-input{
    font-size: 12px;
    border: 0px;
    resize: none;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    outline:none;
}

</style>