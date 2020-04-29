<template>
  <div class="member-container">    
    <!---->
    <global-navi></global-navi>
    <span>{{loginUserName}}さん、ようこそ！！</span>
    <br>                
    <users-list-members></users-list-members>   
  </div>
</template>


<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../../plugins/firebase_config'
import UsersListMembers from '~/components/users-list-members.vue'
import globalNavi from '~/components/global-navi.vue';

export default {
  middleware: 'authenticated', 
  name: 'Member',
  components: {        
    'users-list-members': UsersListMembers,    
    "global-navi": globalNavi,
  },
  head(){
    return {
      title:'会員ページ',                         
    }
  },
  data () {
    return {            
    }
  },
  computed:{
    loginUserName(){      
      //ログインしたユーザのユーザ名を返す
      return this.$store.state.currentUserName;            
    },
  },
  created:function(){
    //会員情報を取得
    db.collection("users").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = _.cloneDeep(doc.data());
          //data.isChecked=false;
          //data.documentId = doc.id;
          this.$store.dispatch('persistedParameter/usersDataSetAction',data);
          //this.allUsersData.push(data);                   
          

        });
        console.log("this.$store.getters['persistedParameter/getUsersData']");
        console.log(this.$store.getters['persistedParameter/getUsersData']);

      })
      .catch(function(error) {
          alert(error.message)
      });
  },  
  methods: {
    signOut() {           
      //ユーザ名を初期化する
      this.$store.commit('nameInit');

      //ユーザIDを初期化する
      this.$store.commit('persistedParameter/userIdPersistedInit');

      //ログイン・ログアウトの状態を示すフラグを初期化する
      this.$store.dispatch('persistedParameter/changeIsLoginUserAction',false);

      //isLoginUserでログインかログアウトかの状態を把握できるので、おそらく以下は不要
      this.$store.commit('persistedParameter/changeIsEmpty',true);      

      firebase.auth().signOut().then(() => {
        this.$router.push('/');
        //this.$router.go({path: this.$router.currentRoute.path, force: true});
      })
    }, 
    goToDashboard(){
      this.$router.push('/members/dashboard-members');

    },  
  }
}
</script>

<style>
.member-container {
  margin: 20px;  
}
</style>