<template>
  <div class="signin-container">
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
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {
  name: 'Signin',
  data () {
    return {     
      email: '',
      password: '',
      show:false,
    }
  },  
  methods: {
    signIn() {
      this.show=true;

      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {        
        this.$store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);

        this.$store.dispatch('persistedParameter/namePersistedSetAction', firebase.auth().currentUser.displayName);
                           
        this.$store.dispatch('persistedParameter/changeUserIdPersistedAction', firebase.auth().currentUser.uid);             

        this.$store.dispatch('persistedParameter/changeIsLoginUserAction', true);        

        



        this.show=false;        
        //alert('ログイン成功');        
        //global-navi.vueをdefault.vueでimportする場合、pushメソッドの手前でリロードするとmemberページに飛ばず、このページがリロードされて処理終了となる
        //つまりこのページが描画されたまま
        //グローバルメニューはユーザー一覧、ダッシュボード、ログアウトを含み正しく表示される
        //this.$router.go({path: this.$router.currentRoute.path, force: true});
        this.$router.push('/member');
        //以下にリロードを記述すると、memberページが描画された後でサイドsigninページがリロードされるので、最終的にsigninページのまま
        //グローバルメニューはユーザー一覧、ダッシュボード、ログアウトを含み正しく表示される
        //this.$router.go({path: this.$router.currentRoute.path, force: true});
                
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
