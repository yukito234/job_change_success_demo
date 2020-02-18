<template>
  <div class="member-container">    
    <span>{{loginUserName}}さん、ようこそ！！</span>        
    <!--<span>ID：{{ loginUserID }}</span>-->
    <button v-on:click="signOut">ログアウト</button>
    <article-registration></article-registration>
    
  </div>
</template>

<script>
/* eslint-disable */

import firebase from 'firebase'
import db from '../plugins/firebase_config'
//import db from '../firebaseConfig'
//import store from '../store'
import ArticleRegistration from '~/components/article-registration.vue'

export default {
  name: 'Member',
  components: {    
    'article-registration': ArticleRegistration,
    
  },
  data () {
    return {
      allUsers:[],      
      //currentID: "",
      //currentMoney:"",
      walletValue:0,
      loginUserID: "",
      loginUserMoney: 0, 
    }
  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName; 
      //return this.$store.state.index.currentUserName;
    },

  },
  created:function(){     

     
     db.collection("users").get()
      .then((querySnapshot)=>{        

        querySnapshot.forEach((doc)=>{
          const data = doc.data();          
          
          if( data.name !== this.loginUserName){
            this.allUsers.push(data);
          }          
        
        });        
               
        for(let i =0; i<querySnapshot.docs.length; i++){
           
           if(querySnapshot.docs[i].data().name === this.$store.state.currentUserName){
           //if(querySnapshot.docs[i].data().name === this.$store.state.index.currentUserName){ 

             this.loginUserID = querySnapshot.docs[i].id;
            
           }
        }
       

      });


  },
  

  methods: {
    signOut() {
      
      //this.$store.commit('index/nameInit');
      this.$store.commit('nameInit');

      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },    
    
    
      
      
      
    
    
  }
}
</script>

<style>

.member-container {
  margin: 20px;

  
}

</style>