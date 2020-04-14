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
        this.$router.push('/member');
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
