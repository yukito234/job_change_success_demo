<template>
  <div class="article-list-container">        
    <div>
      <h3 class="h3title">上のグラフのデータ一覧</h3> 
      <b-icon icon="question-circle" v-b-modal.modal-graph-data-list-title></b-icon>
      <b-modal id="modal-graph-data-list-title" ok-only>
        <p class="my-4">下表では、フィルター機能が使えます。
        <br>キーワード(文字列や数値)を入力することで、キーワードを含む行を抽出できます。
        <br>チェックボックスでは、フィルタリングする列を指定できます。（複数指定可）        
        <br>※空白はデータなしです。</p>
      </b-modal>
    </div>



    <!--   
    <p>下表では、フィルター機能が使えます。
      <br>キーワード(文字列や数値)を入力することで、キーワードを含む行を抽出できます。
      <br>チェックボックスでは、フィルタリングする列を指定できます。（複数指定可）
      <br>勉強期間では昇順・降順で並び替えができます。
      <br>※空白はデータなしです。
    </p>   
    --> 

    <div>
      <b-form-group
        label="フィルター："
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="文字列や数値を入力してください"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''" variant="primary">クリア</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <!--
      label="フィルター対象の列"
      label="検索対象の列："
      description="チェックを入れない場合は、すべての列がフィルター対象となります"
      -->
      <b-form-group
        label="フィルタリングする列："
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        description="※チェックを入れない場合は、すべての列が検索対象となります"
        class="mb-0">
        <b-form-checkbox-group v-model="filterOn" class="mt-1">

          <b-form-checkbox value="title">記事タイトル</b-form-checkbox>

          <b-form-checkbox value="age">年齢</b-form-checkbox>
          <b-form-checkbox value="educational_background">学歴</b-form-checkbox>
          <b-form-checkbox value="study_term">勉強期間</b-form-checkbox>
          <b-form-checkbox value="school_presence">スクール有無</b-form-checkbox>
          <b-form-checkbox value="company">転職先</b-form-checkbox>        
        </b-form-checkbox-group>
      </b-form-group>
    </div>

    <b-table 
      striped hover 
      :items="tableData" 
      :fields="fields"
      sticky-header="600px"
      :sort-compare="mySortCompare"
      @filtered="onFiltered"
      :filter="filter"
      :filterIncludedFields="filterOn"
      >
    <!-- 
      responsive sticky-header 
      no-border-collapse
    -->
    
      <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
      </template>    
      <template v-slot:cell(titleLink)="data">
        <a v-bind:href="data.item.url">{{data.item.title}}</a>
        
      </template>
    </b-table>

         
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
//import _ from 'lodash';
//import _cloneDeep from 'lodash/cloneDeep';

import {  BIcon, BIconX, BIconQuestionCircle  } from 'bootstrap-vue';

export default {

  components: {        
    
      BIcon,
      BIconX,
      BIconQuestionCircle,
         
      

  },
  data(){

    return {
      totalRows: 1,
      filter: null,
      filterOn: [],
      tableData:[],//表の描画用データ
      fields:[
        'index',
        //'title',
        //'url',
        {
          key:'titleLink',
          label:'記事タイトル',
        },
        {
          key:'age',
          label:'年齢',
        },
        {
          key:'educational_background',
          label:'学歴',
        },
        {
          key:'study_term',
          label:'勉強期間（ヶ月）',
          sortable: true,
          //sort-null-last:true,
          //formatter
          //sortByFormatted
          //filterByFormatted
          //stickyColumn
        },
        {
          key:'school_presence',
          label:'スクール有無',
        },
        {
          key:'company',
          label:'転職先',
        },
      ],

    }
  },
  mounted() {
  

  },
  created:function(){ 



    //DBから取得した全体験記をテーブル配列に挿入
    this.tableData = this.$store.getters['getAllArticlesForGraph'];
    console.log("this.tableData in article-list");
    console.log(this.tableData);

    /*
    //sessionStorageに保存する場合
    this.tableData = this.$store.getters['sessionStorageParameter/getAllArticlesForGraph'];
    console.log("this.tableData in article-list");
    console.log(this.tableData);
    */


    this.totalRows = this.tableData.length;
    console.log("this.totalRows in article-list");
    console.log(this.totalRows);


    
  },
  methods:{
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      //this.currentPage = 1
    },
    mySortCompare(a, b, key, sortDesc){
      if (key === 'study_term') {
        console.log(sortDesc);
        
        //降順
        if(sortDesc){
          if( Number(a[key]) - Number(b[key]) > 0 ){
            //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
            return 1;
          } else if (Number(a[key]) - Number(b[key]) <0){
            //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
            return -1;
          }        
          //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
          return 0;

        //昇順  
        } else{
          //空要素のソート
          if (a[key] === '' && b[key] === '') {
            //console.log(`a = ${a.study_term}, b= ${b.study_term}  both empty`);
            //a と b を並び替えしない
            return 0;          
          }

          if (a[key] === '') {
            //console.log(`a = ${a.study_term}, b= ${b.study_term} a is empty`);
            //bを前方へ移動させる(b を a より小さい添字にソート)
            return 1;
          }

          if (b[key] === '') {
            //console.log(`a = ${a.study_term}, b= ${b.study_term} b is empty`);
            //aを前方へ移動させる (a を b より小さい添字にソート)     
            return -1;    
          }

          //数字のソート
          if( Number(a[key]) - Number(b[key]) > 0 ){
            //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
            //bを前方へ移動させる(b を a より小さい添字にソート)
            return 1;
          } else if (Number(a[key]) - Number(b[key]) <0){
            //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
            //aを前方へ移動させる (a を b より小さい添字にソート)
            return -1;
          }        
          //console.log(`a = ${a.study_term}, b= ${b.study_term} `);
          return 0;


        }
        
      } else {
        
        return false;
      }


    },
    
  },
}

</script>


<style scoped>



.h3title{

  display: inline-block;
}

</style>