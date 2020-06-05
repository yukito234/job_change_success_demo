<template>  
  <el-menu mode="horizontal" :router="true">    
    <!-- eslint-disable --><!-- prettier-ignore -->
    <el-menu-item index="1" :route="{ path: '/' }">
      トップ
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/success-graph' }">
      成功者グラフ
    </el-menu-item>
    <!--
      URL設計前
      <el-menu-item index="3" :route="{ path: '/member' }" v-if="checkUser">
        ユーザ一覧
      </el-menu-item>
    -->
    <el-menu-item index="3" :route="{ path: '/members' }" v-if="checkUser">
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
    <!--
    <el-menu-item index="7" :route="{ path: '/' }"  >
      {{ displayRoute }}
    </el-menu-item>
    -->
    
    
  </el-menu>
</template>

<script>
// prettier-ignore
/* eslint-disable */
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
  created() {

    /*
    console.log("----------------------------------");
    console.log("in global-navi.vue");
    //console.log("this");
    //console.log(this);

    console.log("this.$route.name");
    console.log(this.$route.name);
    */

      



    
  },
  methods:{
    async signOut() { 

      await this.$store.dispatch('signOutAction');
      
      //this.$store.getters['sessionStorageParameter/getLoginUserData'];
      //console.log("global-naviでログアウトが完了しました");
      //this.$router.push('/');  

      //signin.vueでも、usersコレクションからのデータ取得に失敗した場合はログアウトさせるので、以下はindex.jsに記述した方がいいかも

      //sessionの全ユーザデータを初期化する
      //this.$store.dispatch('sessionStorageParameter/allUsersDataInitAction');

      //sessionのログインユーザ情報を初期化する
      //this.$store.dispatch('sessionStorageParameter/loginUserDataInitAction');

      //sessionのログイン状態をfalseにする
      //this.$store.dispatch('sessionStorageParameter/changeIsLoginUserAction', false);


      //ログアウトする

    },
    /*
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
    */

  },
  computed: {    
    checkUser(){
      return this.$store.getters['sessionStorageParameter/getIsLoginUser'];   
      //return this.$store.getters['persistedParameter/getIsLoginUser'];            
      
    },
    displayRoute(){
      /*
      console.log("----------------------------------");
      console.log("in global-navi.vue");
      //console.log("this");
      //console.log(this);

      console.log("this.$route");
      console.log(this.$route);

      console.log("this.$route.name");
      console.log(this.$route.name);
      */

      return this.$route.name;


    },       
  }
}
</script>
