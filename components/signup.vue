<template>
  <div class="signup-container">
    <b-overlay :show="show" rounded="sm">
      <b-card bg-variant="light">
            
        <b-form-group
          label-cols-lg="3"
          label="会員登録（無料）はこちら"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="ユーザ名:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input id="nested-street" v-model="userName"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="メールアドレス:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input id="nested-street" v-model="email"></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="パスワード:"
            label-align-sm="right"
            label-for="nested-street"
          >
            <b-form-input id="nested-street" v-model="password"></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label=""
            label-align-sm="right"
            label-for="nested-country"
          >
            <b-button v-on:click="signUp">新規登録</b-button>
          </b-form-group>
        </b-form-group>
      </b-card>
      
    </b-overlay>
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
      password: '',
      show:false,
    }
  },  
  methods: {
    signUp(){     
      this.show=true;
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
            this.show=false;
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