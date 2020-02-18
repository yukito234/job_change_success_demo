<template>
  <div>
    <h2>ログインはこちら</h2>
    メールアドレス：<input type="text" v-model="email">    
    <br>
    パスワード：<input type="password" v-model="password">
    <br>
    <button v-on:click="signIn">ログイン</button>
    <br>
    <!--<router-link to="/signup">新規登録はこちら</router-link>-->    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
//import store from '../store'

export default {
  name: 'Signin',
  data () {
    return {     
      email: '',
      password: ''
    }
  },  
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        //store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);
        //this.$store.dispatch('index/nameSetAction', firebase.auth().currentUser.displayName);
        //nameSetActionの前にindexは不要
        this.$store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);
        
        alert('ログイン成功');        
        this.$router.push('/member');
        //this.$router.push({name:'member'});//この記述でもOK
        //this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
      })
    }
  }
}
</script>