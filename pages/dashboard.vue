<template>
  <div>    
    <global-navi></global-navi>
    <span>ここは、{{loginUserName}}さんのダッシュボードページです</span>            
    <br>
    <br>      
    <profile-registration></profile-registration>
    <br>
    <br>
    <article-registration></article-registration> 
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleRegistration from '~/components/article-registration.vue'
import ProfileRegistration from '~/components/profile-registration.vue'
import globalNavi from '~/components/global-navi.vue';

export default {
  middleware: 'authenticated',  
 
  components: {    
     'article-registration': ArticleRegistration,    
     'profile-registration': ProfileRegistration,
     "global-navi": globalNavi,
  },  
  data () {
    return {            
    }
  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName;       
     
    },
  },
  created:function(){
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