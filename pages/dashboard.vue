<template>
  <div>    
    <span>ここは、{{loginUserName}}さんのダッシュボードページです</span>            
    <button v-on:click="signOut">ログアウト</button>   
    <br>    
    <nuxt-link to="/member">メンバーページに移動する</nuxt-link>
    <profile-registration></profile-registration>
    <article-registration></article-registration> 
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleRegistration from '~/components/article-registration.vue'
import ProfileRegistration from '~/components/profile-registration.vue'

export default {
  middleware: 'authenticated',  
 
  components: {    
     'article-registration': ArticleRegistration,    
     'profile-registration': ProfileRegistration,
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
    signOut() {           
      this.$store.commit('nameInit');
      this.$store.commit('persistedParameter/changeIsEmpty',true);
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },    
  }
}
</script>

<style>
.member-container {
  margin: 20px;  
}
</style>