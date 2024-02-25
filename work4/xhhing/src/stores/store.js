import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('store', {
  state:() => {
    return {
      islogin:ref(false),
      logindata:{
        name:'',
        password:'',
        image:'',
        authorization:'',
        myArticles:[],
        likedArticles:[],
      },
      timeArticles:ref([]),
      clickArticles:[],
    }
  },
  persist:true
})

export default useUserStore
