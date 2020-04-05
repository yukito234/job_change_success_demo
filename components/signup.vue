<template>
  <div class="signup-container">
    <h2>会員登録（無料）はこちら</h2>
    ユーザ名：<input type="text" v-model="userName">
    <br>
    メールアドレス：<input type="text" v-model="email">
    <br>
    パスワード：<input type="password" v-model="password">
    <br>
    <button v-on:click="signUp">新規登録</button>
    <br>    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {  
  name: 'Signup',
  data () {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },  
  methods: {
    signUp(){     
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)      
        .then(() => {
          let person = firebase.auth().currentUser;
          person.updateProfile({
            displayName: this.userName
          })          

          db.collection("users").add({
              name: this.userName,
              like_article_count:0,//お気に入り記事の登録数                            
          })
          .then(() => {
            alert("登録完了");
            //ユーザ名やメールアドレスなどの入力欄の値を空にする 
            //this.userName='';
            //this.email='';

            //パスワードのみ空にして、ログインしてもらう
            this.password='';
            //メンバーページに飛ばす場合は、signin.vueのsignIn()メソッドの処理が必要          
                     
          })          
          .catch(function(error) {
             alert(error.message)
          });
        })
        .catch(error => {
          alert(error.message)
        })
    },
  }
}
</script>

<style>
.signup-container {
  margin: 20px;  
}
</style>