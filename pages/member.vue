<template>
  <div class="member-container">    
    <span>{{loginUserName}}さん、ようこそ！！</span>            
    <button v-on:click="signOut">ログアウト</button>
    <article-registration></article-registration>    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleRegistration from '~/components/article-registration.vue'

export default {
  middleware: 'authenticated',
  //middleware: 'currentUserName',
  name: 'Member',
  components: {    
    'article-registration': ArticleRegistration,    
  },
  head(){
    return {
      title:'会員ページ',            
              
    }
  },
  data () {
    return {            
    }
  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName;       
      //return this.$store.state.authenticated; 
    },
  },
  created:function(){
  },  
  methods: {
    signOut() {           
      this.$store.commit('nameInit');
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