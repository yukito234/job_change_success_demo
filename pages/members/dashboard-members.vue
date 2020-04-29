<template>
  <div>    
    <global-navi></global-navi>
    <span>ここは、{{loginUserName}}さんのダッシュボードページです</span>            
    <br>
    <br>      
    <profile-registration></profile-registration>
    <br>
    <br>
    <like-article-registration></like-article-registration>
    <br>
    <br>
    <article-registration></article-registration> 
    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
//import db from '../plugins/firebase_config'
import db from '../../plugins/firebase_config'
import ArticleRegistration from '~/components/article-registration.vue'
import ProfileRegistration from '~/components/profile-registration.vue'
import globalNavi from '~/components/global-navi.vue';
import LikeArticleRegistration from '~/components/like-article-registration.vue';

export default {
  middleware: 'authenticated',  
 
  components: {    
     'article-registration': ArticleRegistration,    
     'profile-registration': ProfileRegistration,
     "global-navi": globalNavi,
     "like-article-registration": LikeArticleRegistration,

  },  
  data () {
    return {
      //likeArticleCount:null,            
    }
  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName;       
     
    },
  },
  created:function(){
    //ログインユーザのお気に入り記事の数を取得し、永続化させる
    db.collection("users").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = _.cloneDeep(doc.data());
          //
          if(data.name === this.$store.state.currentUserName){
            console.log("data.name");
            console.log(data.name);
            console.log("data.like_article_count");
            console.log(data.like_article_count);
            console.log("doc.id");
            console.log(doc.id);
            //ログインユーザのお気に入り記事数をブラウザに保存する
            //test4@t.com以前のユーザはDBにlike_article_countが設定されていないので注意
            this.$store.dispatch('persistedParameter/likeArticleCountSetAction',data.like_article_count);

            //ログインユーザのusersテーブルにおけるドキュメントIDをブラウザに保存する
            //お気に入り記事数を更新する際に使う            
            this.$store.dispatch('persistedParameter/docIdForUpdatelikeArticleCountSetAction',doc.id);

            //お気に入り記事数が３未満のとき、isAdditionOfLikeArticleがtrueとなる
            //like-article-registration.vueにて、isAdditionOfLikeArticleの真偽値により、コンテンツの表示を切り替えている
            this.$store.dispatch('persistedParameter/changeIsAdditionOfLikeArticleAction',data.like_article_count);

            console.log("this.$store.getters['persistedParameter/getLikeArticleCount'] in dashboard");
            console.log(this.$store.getters['persistedParameter/getLikeArticleCount']);

            console.log("this.$store.getters['persistedParameter/getisAdditionOfLikeArticle'] in dashboard");
            console.log(this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']);

          }

        });

      })
      .catch(function(error) {
          alert(error.message)
      });
    
  },  
  methods: {
     
  }
}
</script>

<style>
.member-container {
  margin: 20px;  
}
</style>