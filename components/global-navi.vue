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
      
    }
  },
  //
  mounted() {
    
  },
  methods:{
    signOut() {           
      //ログアウトが押されたのでアニメーション開始
      //this.$store.dispatch('persistedParameter/changeIsShowAllAction',true);  


      //member.vueページに表示されているユーザ名を初期化する
      //ユーザ名は永続化させておいた方がいいかも
      this.$store.commit('nameInit');

      //ログインユーザを識別する場面で使う
      this.$store.commit('persistedParameter/userIdPersistedInit');      

      //現在の状態がログインなのか、ログアウトなのかを知るため
      this.$store.dispatch('persistedParameter/changeIsLoginUserAction',false);

      //isEmptyをリセット
      this.$store.commit('persistedParameter/changeIsEmpty',true);      

      firebase.auth().signOut().then(() => {
        //トップページに戻る直前でアニメーションを解除
        //this.$store.dispatch('persistedParameter/changeIsShowAllAction',false);  
        //トップページでログアウトした場合、リロードさせないと、ダッシュボード等のメニューがグローバルに残ったままになってしまう
        this.$router.go({path: this.$router.currentRoute.path, force: true});
        this.$router.push('/');        
      })
    }, 

  },
  computed: {    
    checkUser(){
     
      return this.$store.getters['persistedParameter/getIsLoginUser'];            
      //gettersを使わずに直接stateを参照しても問題なかった
      //return this.$store.state.persistedParameter.isLoginUser;
    }        
  }
}
</script>
