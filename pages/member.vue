<template>
  <div class="member-container">    
    <span>{{loginUserName}}さん、ようこそ！！</span>            
    <button v-on:click="signOut">ログアウト</button>   
    <br>
    <nuxt-link to="/dashboard">ダッシュボードに移動する</nuxt-link>
    <users-list></users-list>   
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import UsersList from '~/components/users-list.vue'

export default {
  middleware: 'authenticated', 
  name: 'Member',
  components: {        
    'users-list': UsersList,    
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
    },
  },
  created:function(){
  },  
  methods: {
    signOut() {           
      this.$store.commit('nameInit');
      //１つのパソコンを複数のユーザーが使用するため、ログイン後にisEmptyをリセットする
      this.$store.commit('persistedParameter/changeIsEmpty',true);
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    }, 
    goToDashboard(){
      this.$router.push('/dashboard');

    } ,  
  }
}
</script>

<style>
.member-container {
  margin: 20px;  
}
</style>