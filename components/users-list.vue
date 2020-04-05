<template>
  <div >        
    <h2>ユーザ一覧</h2>
    <el-table 
      ref="filterTable"
      :data="tableData"       
      style="width: 100%" 
      >
      <el-table-column 
        type="index">
      </el-table-column>
      <!--
      <el-table-column        
        label="ユーザー"
        >
      -->
      <el-table-column        
        
        >
        <div slot-scope="{row}">
          <!--<a v-bind:href="row.url">{{row.title}}</a>-->          
          <nuxt-link v-on:click.native="setUserData(row)" v-bind:to="{ path: `/id` }">{{ row.nick_name }}</nuxt-link>
          <br>
          <!--<img :src="row.image_url" class="profileimage">-->          
          <img :src="getImage(row.image_url)" class="profileimage">
          <!--<p>{{row.image_url}}</p>-->
        </div>
        
      </el-table-column>
      <el-table-column        
        prop="self_introduction"        
        >        
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _ from 'lodash';

export default {   
  data () {
    return {            
      allProfile:[],
      tableData:[],
      
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

<style>
.profileimage{
  width: 150px;
}

.member-container {
  margin: 20px;  
}
</style>