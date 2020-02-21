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
  name: 'Member',
  components: {    
    'article-registration': ArticleRegistration,    
  },
  head(){
    return {
      title:'testTitle',            
      meta: { requiresAuth: true },
      /*
      meta: [
        { hid: 'description', name: 'description', content: 'description'},
        { requiresAuth: true },
      ],
      */     
    }

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