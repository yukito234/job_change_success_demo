<template>  
  <div >  
  <!-- eslint-disable --><!-- prettier-ignore -->      
    <b-spinner small v-show="loading"></b-spinner>
    <div  v-show="!loading">
      <h2>ユーザ一覧</h2>
      <p>ダッシュボードにて、あなたのプロフィールを作成できます。</p>
      

      <b-table        
        :items="tableData"
        :fields="fields"
        :outlined="true"           
        >
      
        <template v-slot:cell(userImage)="data">
          <img :src="getImage(data.item.image_url)" class="profileimage">
        </template>
        <template v-slot:cell(titleLink)="data">                
          <nuxt-link v-on:click.native="setUserData(data.item)" v-bind:to="{ path: `/id` }">{{data.item.nick_name}}</nuxt-link>
          <br>
          <br>
          <p>{{data.item.self_introduction}}</p>
        </template>
      </b-table>
      
      
    </div>
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _ from 'lodash';

export default {   
  data () {
    return {            
      loading:true,
      allProfile:[],
      tableData:[],
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

  mounted () {    
    //全会員のプロフィールデータを取得
    db.collection("user_profile").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{                                                
          const data = _.cloneDeep(doc.data());
          const dataForElementTable = _.cloneDeep(doc.data());

          //以下は不要かも
          this.allProfile.push(data);
          
          //firebaseのプロフィールデータをブラウザ側に保存し、永続化
          //以下は不要かも          
          this.$store.dispatch('persistedParameter/allProfilePersistedSetAction',data);

          this.tableData.push(dataForElementTable);

          this.loading=false;

        });        
                         
      })
      .catch(function(error) {
          alert(error.message)
      });
  },
  computed:{
   
  },
  created:function(){
  },  
  methods: {
    setUserData(element){
      //クリックされたプロフィールページのユーザ情報を保存
      console.log("element");
      console.log(element);
      //this.$store.commit('userDataSet',element);
      
      this.$store.commit('persistedParameter/userDataSet',element);

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
  }
}
</script>

<style scoped>
/* prettier-ignore */
.profileimage{
  width: 150px;
}

.member-container {
  margin: 20px;  
}
</style>