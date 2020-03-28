<template>
  <div class="article-list-container">        
    <!--<h2>未経験webエンジニア転職者の体験記の一覧</h2>-->
    <h3>上のグラフのデータ一覧</h3>    
    <p>下表では、年齢・学歴、スクール有無、転職先の項目でフィルターできます。<br>また、勉強期間では昇順・降順で並び替えができます。</p>
    
    <el-button @click="clearFilter">下表のフィルターをすべて解除する</el-button>
    <el-button @click="displayMessage()">コンソールでテーブルのデータをチェック</el-button>
    <el-button @click="sortFunctionCheck()">jsのsortの機能をチェック</el-button>
    <el-table 
      ref="filterTable"
      :data="tableData"       
      style="width: 100%" 
      >

      <el-table-column 
        type="index">
      </el-table-column>
      
      <el-table-column        
        label="記事タイトル"
        >
        <div slot-scope="{row}">
          <a v-bind:href="row.url">{{row.title}}</a>          
        </div>

      </el-table-column>
      
      <el-table-column
        prop="age"
        label="年齢"
        :filters="[{text: '20代後半', value: '20代後半'}, {text: '30代前半', value: '30代前半'}, {text: '20代前半', value: '20代前半'}]"
        :filter-method="filterHandler"
        >
      </el-table-column>
      <el-table-column
        prop="educational_background"
        label="学歴"
        :filters="[{text: '大学院卒', value: '大学院卒'}, {text: '高専卒', value: '高専卒'}, {text: '高卒', value: '高卒'}, {text: '大卒', value: '大卒'}]"
        :filter-method="filterHandler"
        >
      </el-table-column>      
      <!--
      <el-table-column
        prop="study_term"
        label="勉強期間（ヶ月）"
        :sort-method="sortChange()"
        :sort-orders="['ascending', 'descending', null]"
        sortable
        >
      </el-table-column>
      -->
      <el-table-column
        prop="study_term"
        label="勉強期間（ヶ月）"
        :sort-method="sortChange()"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="school_presence"
        label="スクール有無"
        :filters="[{text: 'あり', value: 'あり'}, {text: 'なし', value: 'なし'}]"
        :filter-method="filterHandler"
        >
      </el-table-column>
      
      <el-table-column
        prop="company"
        label="転職先"
        :filters="[{text: '受託', value: '受託'}, {text: '自社開発', value: '自社開発'}, {text: 'SES', value: 'なし'}]"
        :filter-method="filterHandler"
        >
      </el-table-column>
    </el-table>    
    <br>
    <br>
    <br>
    <br>        
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _ from 'lodash';

export default {
  data(){
    return {
      tableData:[],

    }
  },
  created:function(){ 
    //firebaseから記事データ一覧を取得
    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          //const data = doc.data();          
          const data = _.cloneDeep(doc.data());
          const dataForElementTable = _.cloneDeep(doc.data());          
         
          //体験記の一覧データを取得
          this.$store.dispatch('allArticlesGetAction', data);          
          this.tableData.push(dataForElementTable);
        });
        console.log("this.tableData");
        console.log(this.tableData);        
                
      })
      .catch(function(error) {
          alert(error.message)
      });
  },
  methods:{
    sortFunctionCheck(){
      //jsのsortメソッドの動作を確認
      let primes = [7, 13, 2, 5, 19, 3, 11, 17];
      /*
      7 13->7, 13, 2, 5, 19, 3, 11, 17
      13 2->7 2 13 | 5  19, 3, 11, 17
      7 2-> 2 7 13
      7 5-> 2 5 7 13 | 19, 3, 11, 17
      2 5-> 2 5 7 13 | 19, 3, 11, 17
      5 19 -> 2 5 19 7 13 | 3, 11, 17
      7 19 -> 2 5 7 19 13 | 3, 11, 17
      13 19 -> 2 5 7 13 19 | 3, 11, 17
      7 3 -> 2 5 3 7 13 19 | 11, 17
      */

      primes.sort(function(b, a){
        if(a < b) {
          console.log("a < b");
          console.log(`a = ${a}, b= ${b}`);
          return -1;
        }
        else if(a > b) {
          console.log("a > b");
          console.log(`a = ${a}, b= ${b}`);
          return 1;
        }
        else {
          console.log("a = b");
          console.log(`a = ${a}, b= ${b}`);
          return 0;
        }
      });
      console.log("primes");
      console.log(primes);

    },
    displayMessage(){      
      console.log("this.$refs.filterTable");
      console.log(this.$refs.filterTable);
      console.log("this.$refs.filterTable.tableData");
      console.log(this.$refs.filterTable.tableData);
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    sortChange(){
     
      return function(a,b){
       
        if (a.study_term === '' && b.study_term === '') {
          console.log(`a = ${a.study_term}, b= ${b.study_term}  both empty`);
          return 0;//a と b を並び替えしない          
        }
        if (a.study_term === '') {
          console.log(`a = ${a.study_term}, b= ${b.study_term} a is empty`);
          return 1;//空の要素aをbの後方へ移動させる
        }
        if (b.study_term === '') {
          console.log(`a = ${a.study_term}, b= ${b.study_term} b is empty`);
          return -1;//a を b の前に並び替える          
        }
        //並び替えるデータ
        //[6, "", 6, 4, "", 4, 2, 6, 8, 4, 3, "", 3, 4, 6, 4, 6, 6, 6]        

        if( Number(a.study_term) - Number(b.study_term) > 0 ){
          console.log(`a = ${a.study_term}, b= ${b.study_term} `);
          return 1;
        } else if (Number(a.study_term) - Number(b.study_term) <0){
          console.log(`a = ${a.study_term}, b= ${b.study_term} `);
          return -1;

        }        
        console.log(`a = ${a.study_term}, b= ${b.study_term} `);
        return 0;
      }
    }   
  },
}

</script>

<style>
.article-list-container {
  margin: 20px;  
}
</style>