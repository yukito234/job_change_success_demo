<template>
  <div class="signin-container">
    <h2>ログインはこちら</h2>
    メールアドレス：<input type="text" v-model="email">    
    <br>
    パスワード：<input type="password" v-model="password">
    <br>
    <button v-on:click="signIn">ログイン</button>
    <br>    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'

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
        this.$store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);                   
        this.$store.dispatch('persistedParameter/changeUserIdPersistedAction', firebase.auth().currentUser.uid);       
                
        alert('ログイン成功');        
        this.$router.push('/member');        
      })
      .catch(error => {
        alert(error.message);
      })
    }
  }
}
</script>

<style>
.signin-container {
  margin: 20px;  
}
</style>
