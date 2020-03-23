<template>
  <div class="member-container">    
    <global-navi></global-navi>
    <span>{{loginUserName}}さん、ようこそ！！</span>
    <br>                
    <users-list></users-list>   
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import UsersList from '~/components/users-list.vue'
import globalNavi from '~/components/global-navi.vue';

export default {
  middleware: 'authenticated', 
  name: 'Member',
  components: {        
    'users-list': UsersList,    
    "global-navi": globalNavi,
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
      this.$store.commit('persistedParameter/userIdPersistedInit');
      this.$store.dispatch('persistedParameter/changeIsLoginUserAction',false);

      //１つのパソコンを複数のユーザーが使用するため、ログイン後にisEmptyをリセットする
      this.$store.commit('persistedParameter/changeIsEmpty',true);      

      firebase.auth().signOut().then(() => {
        this.$router.push('/');
        //this.$router.go({path: this.$router.currentRoute.path, force: true});
      })
    }, 
    goToDashboard(){
      this.$router.push('/dashboard');

    },  
  }
}
</script>

<style>
.member-container {
  margin: 20px;  
}
</style>