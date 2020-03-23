<template>
  <el-menu mode="horizontal" :router="true">    
    <el-menu-item index="1" :route="{ path: '/' }">
      トップ
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/success-graph' }">
      成功者グラフ
    </el-menu-item>
    <el-menu-item index="3" :route="{ path: '/member' }" v-if="checkUser">
      ユーザ一覧
    </el-menu-item>
    <el-menu-item index="4" :route="{ path: '/dashboard' }" v-if="checkUser">
      ダッシュボード
    </el-menu-item>
    <el-menu-item index="5" :route="{ path: '/signin-signup' }" v-if="!checkUser">
      ログイン
    </el-menu-item>    
    <el-menu-item index="6" :route="{ path: '/' }" v-if="checkUser" v-on:click="signOut">
      ログアウト
    </el-menu-item>       
    
  </el-menu>
</template>

<script>
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {
  data () {
    return {
      //ログアウト状態でfalse、ログイン状態でtrue
      userFlag:this.$store.getters['persistedParameter/getIsLoginUser'],
      
    }
  },
  methods:{
    signOut() {           
      this.$store.commit('nameInit');
      this.$store.commit('persistedParameter/userIdPersistedInit');      
      this.$store.dispatch('persistedParameter/changeIsLoginUserAction',false);

      //１つのパソコンを複数のユーザーが使用するため、ログイン後にisEmptyをリセットする
      this.$store.commit('persistedParameter/changeIsEmpty',true);      

      firebase.auth().signOut().then(() => {
        //トップページでログアウトした場合、リロードさせないと、ダッシュボード等のメニューがグローバルに残ったままになってしまう
        this.$router.go({path: this.$router.currentRoute.path, force: true});
        this.$router.push('/');        
      })
    }, 

  },
  computed: {    
    checkUser(){
      return this.userFlag;      
    }        
  }
}
</script>
