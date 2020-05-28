<template><!-- eslint-disable --><!-- prettier-ignore -->
  
  <div class="signup-container">
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
          label-for="user-name-signup"
        >
          <b-form-input id="user-name-signup" v-model="userData.userName"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="3"
          label="メールアドレス:"
          label-align-sm="right"
          label-for="email-signup"
        >
          <b-form-input id="email-signup" v-model="userData.email"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="パスワード:"
          label-align-sm="right"
          label-for="password-signup"
        >
          <b-form-input id="password-signup" v-model="userData.password"></b-form-input>
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label=""
          label-align-sm="right"
          
        >
        <!--ボタンクリック時にローディングアニメーションを入れる-->
          <b-button v-on:click="signUp">新規登録</b-button>
        </b-form-group>
      </b-form-group>
    </b-card>

    <!--
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
    -->
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
//
import firebase from 'firebase'
//
import db from '../plugins/firebase_config'


export default {  
  name: 'Signup',
  data () {
    return {
      userData:{
        userName: '',
        email: '',
        password: '',

      },
      //userName: '',
      //email: '',
      //password: '',
      //show:false,
    }
  },  

  methods: {

    //コードの大半をindex.jsに記述する場合
    async signUp(){ 

      console.log("this.userData before");
      console.log(this.userData);

      const dataForSignUp = {
        userName: this.userData.userName,
        email: this.userData.email,
        password: this.userData.password,
      };

      const dataForSignIn = {
        email: this.userData.email,
        password: this.userData.password,
      };

      for(let key in this.userData){

        this.userData[key]="";
      }

      console.log("this.userData after");
      console.log(this.userData);


      //authenticationで会員登録の処理を行う 
      const resultOfSignUp = await this.$store.dispatch('signUpAction',dataForSignUp);

      //正常に登録が完了した場合は、usersコレクションにユーザIDとお気に入り記事の登録数を入れる処理を実行する      
      if(resultOfSignUp === "success"){

        await this.$store.dispatch('signInAction',dataForSignIn);
      //登録に失敗した場合は、エラーを表示して終了 
      } else {

        //alert("会員登録時にエラーが発生しました。");
        
        alert(`${resultOfSignUp}`);
        

      }





    },



    //コードの大半をvueに記述する場合
    /*
    async signUp(){ 

     
      //パスワード初期化関数内で使う
      const that = this;


      console.log("this.userData");
      console.log(this.userData);


      //authenticationで会員登録の処理を行う 
      //以下だとresultOfSignUp = undefinedとなる
      //const resultOfSignUp = await this.$store.dispatch('signUpAction',this.userData);

      const resultOfSignUp = await this.$store.dispatch('signUpAction',this.userData);

      console.log("resultOfSignUp");
      console.log(resultOfSignUp);

      //console.log("firebase.auth().currentUser in signup.vue");
      //console.log(firebase.auth().currentUser);//uid取得可能

      
      
      let resultOfUsersCollectionTreatment = '';
      
      //正常に登録が完了した場合は、usersコレクションにユーザIDとお気に入り記事の登録数を入れる処理を実行する      
      if(resultOfSignUp === "success"){

        //if内で定義してしまうと、if(resultOfUsersCollectionTreatment === "success"){にてis not definedのエラーが出る
        //const resultOfUsersCollectionTreatment = await this.$store.dispatch('addUsersCollectionAction',this.userData.userName);
        //ifの外にてletで定義する

        resultOfUsersCollectionTreatment = await this.$store.dispatch('addUsersCollectionAction',this.userData.userName);

        console.log("resultOfUsersCollectionTreatment");
        console.log(resultOfUsersCollectionTreatment);


      //登録に失敗した場合は、エラーを表示して終了 
      } else {

        //alert("会員登録時にエラーが発生しました。");
        passwordInit();
        alert(`${resultOfSignUp}`);
        return;

      }

      passwordInit();

      //usersコレクションへの書き込み処理が正常に完了した場合
      if(resultOfUsersCollectionTreatment === "success"){


        alert("登録完了です。続けてログインしてください！");

      //失敗した場合は、エラーを表示して終了   
      } else {

         alert(`${resultOfUsersCollectionTreatment}`); 

      }

      //パスワードの初期化
      function passwordInit(){
        console.log("that.userData.password before");
        console.log(that.userData.password);

        that.userData.password = "";

        console.log("that.userData.password after");
        console.log(that.userData.password);
      }
      







      

    },
    */

    
  }
}
</script>

<style scoped>
/* prettier-ignore */
.signup-container {
  margin: 20px;  
}
</style>