<template>  
  <div class="page-container"> 	
     <!-- eslint-disable --><!-- prettier-ignore --> 
    
    
    
    <div>
      <!--
       
      <doughnut-graph-section v-bind:chart-data="items" v-on:graphChangeNoticeToSuccessGraph="redrawGraph"></doughnut-graph-section>

      <doughnut-graph-section v-bind:chart-data="datacollection" v-on:graphChangeNoticeToSuccessGraph="redrawGraph"></doughnut-graph-section>

      -->
       
      <doughnut-graph-section ></doughnut-graph-section>      
      
      <article-list></article-list>
    </div>
  </div>
</template>


<script>
// prettier-ignore
/* eslint-disable */


//import firebase from 'firebase'
//import db from '../plugins/firebase_config'
import ArticleList from '~/components/article-list.vue'

import DoughnutGraphSection from '~/components/doughnut-graph-section.vue'

//import _cloneDeep from 'lodash/cloneDeep';


export default {
  components: {    
    
    'article-list': ArticleList,
    'doughnut-graph-section': DoughnutGraphSection, 

        
    

  },
  /**/
  data () {
    return {
     
      
      
    }
  },  
  //index.jsに非同期処理を記載する場合
  async fetch ({ store }) {

    console.log("store");
    console.log(store);

    
    //体験記データがstoreにない場合（初回アクセス時またはリロード後）
    if( !store.getters['getIsExperienceArticles'] ){

      
      store.dispatch('allArticlesForGraphInitAction');
      //初回のみDBと通信して体験記データを取得
      //体験記データはdashboard.vueにて追加され、DBが更新されるため、ブラウザ側でもリロードを行い、DBのデータを取り込む必要がある
      await store.dispatch('allArticlesForSuccessGraphGetAction');

      console.log("after dispatch of allArticlesForSuccessGraphGetAction in success-graph.vue");

      //DBからのデータ取得有無を表すflagを"取得済"に変更する
      store.dispatch('changeIsExperienceArticlesAction',true);
      console.log("after dispatch of changeIsExperienceArticlesAction in success-graph.vue");
      
    
    } else {
      //2回目以降のアクセスでは、DBとのやり取りはせず、ストアに保存した体験記データを利用する
      console.log("enter else section");
      console.log("store.getters['getIsExperienceArticles']"); 
      console.log(store.getters['getIsExperienceArticles']);     
    }


  },

  

 
  /**/
  created() {

    //console.log("----------------------------------");
    //console.log("this");
    //console.log(this);


      



    
  },
  
  /*
  mounted () { 
 
    
  },
  */
  /**/
  methods: {

    
    
     
  },
  

}	
</script>