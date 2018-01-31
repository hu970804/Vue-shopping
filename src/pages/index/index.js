import 'css/common.css'
import './index.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNumber: 1,
    pageSize: 4,
    loading: false, // 可以继续加载
    allLoaded: false
  },
  created() {
    this.getLists()
  },
  methods: {
   getLists() {
    if(this.allLoaded) return ;

    this.loading = true;
    axios.post(url.hotLists, {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }).then(res => {
      let curLists = res.data.list;
      // 判断所有数据加载完毕
      if(curLists.length < this.pageSize){
        this.allLoaded = true; 
      }
      if(this.lists) {
        this.lists = this.lists.concat(curLists);
      }  else {
        this.lists = curLists ; //  第一次请求数据       
      }
      this.loading = false;
      this.pageNumber++;
    })
   }
  }
})