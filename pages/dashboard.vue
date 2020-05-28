<template><!-- eslint-disable --><!-- prettier-ignore -->
  
  <div>    
    
    <!--<span>ここは、{{loginUserName}}さんのダッシュボードページです</span>  -->          
          
    <profile-registration></profile-registration>
    
    <like-article-registration></like-article-registration>
    
    <article-registration></article-registration> 
    
  </div>
</template>


<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleRegistration from '~/components/article-registration.vue'
import ProfileRegistration from '~/components/profile-registration.vue'

import LikeArticleRegistration from '~/components/like-article-registration.vue';
import _cloneDeep from 'lodash/cloneDeep';

export default {
  middleware: 'authenticated',  
 
  components: {    
     'article-registration': ArticleRegistration,    
     'profile-registration': ProfileRegistration,
     
     "like-article-registration": LikeArticleRegistration,

  },  

  data () {
    return {
      //likeArticleCount:null,            
    }
  },

  async fetch ({ store }) {
    


    //member.vueで全プロフィールデータを取得していない場合や
    //リロード等により全プロフィールデータが消失している場合
    //再度DBと通信してデータを取得する
    if( !store.getters['getIsAllProfiles'] ){

      console.log("enter !store.getters['getIsAllProfiles'] in dashboard.vue");
      store.dispatch('allProfilesInitAction');
      
      //全プロフィールデータを取得してindex.jsに保存する
      await store.dispatch('allProfilesGetAction');

      //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
      store.dispatch('changeIsAllProfilesAction',true);

    
    } 

    //全プロフィールデータの中からログインユーザのデータを見つけ出し、sessionに保存
    store.dispatch('loginUserProfileGetAction');


    if( !store.getters['getIsAllLikeArticles'] ){

      console.log("enter !store.getters['getIsAllLikeArticles'] in dashboard.vue");
      await store.dispatch('likeArticlesGetAction');

       store.dispatch('changeIsAllLikeArticlesAction', true);


    }


    

  },
  computed:{
    /*
    loginUserName(){
      return this.$store.state.currentUserName;       
     
    },
    */
  },
  /*
  created:function(){
    //ログインユーザのお気に入り記事の数を取得し、永続化させる
    //以下はmember.vueにて行う
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
  */
  methods: {
     
  }
}
</script>

<style scoped>
/* prettier-ignore */
.member-container {
  margin: 20px;  
}
</style>