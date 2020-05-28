<template><!-- eslint-disable --><!-- prettier-ignore -->
  
  <div class="signin-container">

    <b-card bg-variant="light">
           


        <b-form-group
          label-cols-lg="3"
          label="ログインはこちら"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="3"
            label="メールアドレス:"
            label-align-sm="right"
            label-for="email-signin"
          >
            <b-form-input id="email-signin" v-model="userData.email"></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="パスワード:"
            label-align-sm="right"
            label-for="password-signin"
          >
            <!--
              
              <b-form-input type="password" v-model="userData.password"></b-form-input>
            -->
            <b-form-input id="password-signin" v-model="userData.password"></b-form-input>
            
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label=""
            label-align-sm="right"
            
          >
          <!--ボタンクリック時にローディングアニメーションを入れる-->
            <b-button v-on:click="signIn">ログイン</b-button>
          </b-form-group>
        </b-form-group>
      </b-card>
    <!--
    <b-overlay :show="show" rounded="sm">
      <b-card bg-variant="light">
            

        <b-form-group
          label-cols-lg="3"
          label="ログインはこちら"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
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
            <b-button v-on:click="signIn">ログイン</b-button>
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


//import firebase from 'firebase'
//import db from '../plugins/firebase_config'

export default {
  name: 'Signin',
  data () {
    return {   
      userData:{        
        email: '',
        password: '',

      },  
      //email: '',
      //password: '',
      //show:false,
    }
  },  
  methods: {
    //コードの大半をindex.jsに記述する場合
    async signIn() {

      console.log("this.userData before");
      console.log(this.userData);

      const data = {
        email: this.userData.email,
        password: this.userData.password,
      };

      for(let key in this.userData){

        this.userData[key]="";
      }

      console.log("this.userData after");
      console.log(this.userData);


      await this.$store.dispatch('signInAction',data);



    },

    //コードの大半をvueに記述する場合
    /*
    async signIn() {
      //パスワード初期化関数内で使う
      const that = this;


      console.log("this.userData");
      console.log(this.userData);

      //authenticationでログイン処理を行う
      const resultOfSignIn = await this.$store.dispatch('signInAction',this.userData);

      console.log("resultOfSignIn");
      console.log(resultOfSignIn);

      //console.log("firebase.auth().currentUser in signin.vue");
      //console.log(firebase.auth().currentUser);//uid取得可能



      
      let resultOfUsersCollectionTreatment = '';

      //ログインに成功した場合は、usersコレクションから必要なデータをsessionに保存する
      if(resultOfSignIn === "success"){

        resultOfUsersCollectionTreatment = await this.$store.dispatch('getUsersCollectionAction',this.userData.userName);

        console.log("this.$store.getters['sessionStorageParameter/getAllUsersData']");
        console.log(this.$store.getters['sessionStorageParameter/getAllUsersData']);

        console.log("this.$store.getters['sessionStorageParameter/getLoginUserData']");
        console.log(this.$store.getters['sessionStorageParameter/getLoginUserData']);

        console.log("resultOfUsersCollectionTreatment");
        console.log(resultOfUsersCollectionTreatment);

      //ログインに失敗した場合は、エラーを表示して終了   
      } else {

        passwordInit();
        alert(`${resultOfSignUp}`);
        return;
      }


      passwordInit();


      
      if(resultOfUsersCollectionTreatment === "success"){

        //ログイン有無はsessionに保存する
        this.$store.dispatch('sessionStorageParameter/changeIsLoginUserAction', true);

        this.$router.push('/member');


      //usersコレクションからのデータ取得に失敗した場合は、エラーを表示してログアウトさせる
      //like_article_countはログイン後に更新される可能性があるので、取得に失敗した場合は即退出させる
      } else {

        alert(`${resultOfUsersCollectionTreatment}｜エラーが発生したのでログアウトして終了します。`); 
        this.$store.dispatch('signOutAction');



      }




      //パスワードの初期化
      //signup.vueにも同じ関数があるので、共通関数として切り出す
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

<style>
/* prettier-ignore */
.signin-container {
  margin: 20px;  
}
</style>
