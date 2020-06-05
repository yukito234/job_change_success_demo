<template>  
  <div class="page-container">    
    <!-- eslint-disable --><!-- prettier-ignore -->
    <!--
      <span>{{loginUserName}}さん、ようこそ！！</span>
      <users-list></users-list>   

       <p>ダッシュボードで、あなたのプロフィールを作成できます。</p>
    -->
    <div >
      <h2 class="h2title">ユーザ一覧</h2>

      <b-icon icon="question-circle" v-b-modal.modal-user-list-title></b-icon>
      <b-modal id="modal-user-list-title" ok-only>
        <p class="my-4">
          ニックネームをクリックすると詳細ページに移動できます。
          <br>ダッシュボードで、あなたもプロフィールを作成できるので、
          ぜひ使ってみてください！</p>
      </b-modal>
     
      
    </div>


      <b-table        
        :items="getTableData"
        :fields="fields"
        :outlined="true"           
        >
      
        <template v-slot:cell(userImage)="data">
          <img :src="getImage(data.item.image_url)" class="profileimage">
        </template>
        <template v-slot:cell(titleLink)="data">                
          <nuxt-link v-on:click.native="setUserData(data.item)" v-bind:to="{ path: `/id` }">{{data.item.nick_name}}</nuxt-link>
          
          <p>{{data.item.self_introduction}}</p>
        </template>
      </b-table>
      
      
    
                    
    
  </div>
</template>


<script>
// prettier-ignore
/* eslint-disable */


//import firebase from 'firebase'
//import db from '../plugins/firebase_config'
//import UsersList from '~/components/users-list.vue'

import {  BIcon, BIconX, BIconQuestionCircle  } from 'bootstrap-vue';

export default {
  middleware: 'authenticated', 
  name: 'Member',

  components: {        
      BIcon,
      BIconX,
      BIconQuestionCircle,    
    
  },
  head(){
    return {
      title:'会員ページ',                         
    }
  },
  data () {
    return { 
      //loading:true,
      //allProfile:[],
      //tableData:[],
      
      //プロフィール作成時に画像の登録を必須にする
      //ただし、過去に登録されたプロフィールは画像がないものもあるので、デフォルト画像は必要
      defaultImage:"https://firebasestorage.googleapis.com/v0/b/job-change-success-demo.appspot.com/o/icon_default.png?alt=media&token=2f9b0a2b-5547-46a5-9853-e3c8932806ed",
      fields:[
        {
          key:'userImage',
          label:'',
          thStyle: {
             display: 'none'
          }
        },
        {
          key:'titleLink',
          label:'',
          thStyle: {
             display: 'none'
          }
        },
        
      ],  



    }
  },

  
  /*
  //プロフィールデータをsessionに保存する場合
  async fetch ({ store }) {

    //体験記データがstoreにない場合（初回アクセス時またはリロード後）
    //dashboardから新たなプロフィールが登録されたり、修正された場合はDBにアクセスして再度取得する必要がある
    //これはdashboardでリロードを行いisAllProfiles=falseにして初期化する
    if( !store.getters['sessionStorageParameter/getIsAllProfiles'] ){
      console.log("enter !store.getters['sessionStorageParameter/getIsAllProfiles']");
      //全プロフィールデータを取得してindex.jsに保存する
      await store.dispatch('sessionStorageParameter/allProfilesGetAction');

      //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
      store.dispatch('sessionStorageParameter/changeIsAllProfilesAction',true);

    }



  },
  */

  /* */
  //プロフィールデータは、id.vueでも使うので、sessionに保存しておく
  //そうしないと、id.vueでリロードされたとき、index.jsのデータは消失してしまう
  //sessionを使わないのであれば、id.vueにて store.getters['getIsAllProfiles'] を監視しておき
  //falseであれば、その都度DBにアクセスしてプロフィールデータを取得してくるようにする  
  async fetch ({ store }) {

    //体験記データがstoreにない場合（初回アクセス時またはリロード後）
    //dashboardから新たなプロフィールが登録されたり、修正された場合はDBにアクセスして再度取得する必要がある
    //これはdashboardでリロードを行いisAllProfiles=falseにして初期化する
    if( !store.getters['getIsAllProfiles'] ){

      store.dispatch('allProfilesInitAction');
      //全プロフィールデータを取得してindex.jsに保存する
      await store.dispatch('allProfilesGetAction');

      //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
      store.dispatch('changeIsAllProfilesAction',true);

    }



  },
 
  computed:{
    getTableData(){
      return this.$store.getters['getAllProfiles'];

    },
    /*
    loginUserName(){      
      //ログインしたユーザのユーザ名を返す
      return this.$store.state.currentUserName;            
    },
    */
  },
  //signin時にすでにusersコレクションのデータはsessionに保存してある
  /*
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
  */
  methods: {

    setUserData(element){
      //クリックされたプロフィールページのユーザ情報を保存
      console.log("element");
      console.log(element);
      //this.$store.commit('userDataSet',element);
      
      //ユーザのデータはsessionに保存する
      //URLパラメータで渡す方法だと、個別ページでリロードされたときにデータが消失してしまう
      //ログアウトするときにデータを全部削除する
      this.$store.commit('sessionStorageParameter/clickedProfileDataSet',element);
      //this.$store.commit('persistedParameter/userDataSet',element);

    },
    getImage(url){
      //プロフィール画像のURLを返す
      console.log("url");
      console.log(url);
      //プロフィール画像を削除したときは、databaseのimage_urlを空にしておく
      //プロフィール画像を変更したときは、元の画像データを削除し、上の作業を行う

      //プロフィール画像が存在しない、または設定されていない場合はデフォルトのアバター画像のURLを返す
      if(url==="" || url===null || url===undefined){
        return "https://firebasestorage.googleapis.com/v0/b/job-change-success-demo.appspot.com/o/icon_default.png?alt=media&token=2f9b0a2b-5547-46a5-9853-e3c8932806ed";
      } else{
        return url;
      }

    },
    /*
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
    */
    /*
    goToDashboard(){
      this.$router.push('/dashboard');

    },  
    */
  }

}
</script>

<style scoped>
/* prettier-ignore */
.profileimage{
  width: 150px;
}

.h2title{

  display: inline-block;
}
</style>