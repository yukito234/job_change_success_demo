<template>
	<div id="stock-articles-container">
		<div>
            <h2 class="h2title">ストック記事の一覧</h2>
            <!--
            <b-icon icon="question-circle" v-b-modal.modal-stock-list-title></b-icon>
            <b-modal id="modal-stock-list-title" ok-only>
              <p class="my-4">
                上の検索結果でストックした記事を一覧表示します。
                
                </p>
            </b-modal>
        	-->
      	</div>

          
         
        <p v-if="!isStockTableDisplay">まだストック記事は追加されていません。</p>
        <div v-if="isStockTableDisplay">
            <b-table            
              :items="stockedArticles" 
              :fields="fieldsOfStockedArticles"
              responsive="sm"                       
            >
              <template v-slot:cell(titleLink)="data">
                  <a v-bind:href="data.item.url">{{data.item.title}}</a>              
              </template>
              <template v-slot:cell(deleteButton)="data">
                  <b-button variant="outline-primary" v-on:click="deleteStockArray(data.item)">削除</b-button>
                </template>

            </b-table>
            <b-button variant="primary" v-on:click="deleteStock" id="all-delete-button">
                ストック記事を全部削除
            </b-button>
        </div>                         
      
    </div>
</template>


<script>
// prettier-ignore
/* eslint-disable */

import {  BIcon, BIconX, BIconQuestionCircle  } from 'bootstrap-vue';
import _cloneDeep from 'lodash/cloneDeep';


export default {  
  
  components: {
      

      BIcon,
      BIconX,
      BIconQuestionCircle,
      

  },

  data () {
      return {
      	isStockTableDisplay:false,
      	fieldsOfStockedArticles:[
            {
            key:'titleLink',
            label:'記事タイトル',
          },
          {
            key:'deleteButton',
            label:'削除',
          },

        ],
        stockedArticles:[],
        stockedDataInQiita: [],
        stockedDataInGoogle: [],



      }
  },
  created(){
    console.log("before this.obtainStockedArticles in created");
    this.obtainStockedArticles();
    this.checkIsStockTableDisplay();

    //ローカルストレージのストック配列を監視するため、シャローコピーをとっておく
    //experience-search.vueにてストック配列に記事が追加されたら、こちらで検知してリアクティブにテーブルに反映させる
    this.stockedDataInQiita = this.$store.getters['persistedParameter/getStockedArticles'];

    this.stockedDataInGoogle = this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch'];

    //this.obtainStockedArticles;
    //this.checkIsStockTableDisplay;


  },
  computed:{
  	/*
  	checkIsStockTableDisplay(){
      console.log("enter checkIsStockTableDisplay");

      if(this.stockedArticles.length !== 0){
       this.isStockTableDisplay = true;

       

      } else{

        this.isStockTableDisplay = false;
      }
      console.log("this.isStockTableDisplay");
      console.log(this.isStockTableDisplay);

    },
    obtainStockedArticles(){ 

    	console.log("enter obtainStockedArticles");
          //ユーザがストックしている記事データを返す

        //永続化された記事ストック用配列のデータを値渡しでコピーする
        //this.allStockedData = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);        

        //Qiitaのストック記事を取得
        //const stockedDataInQiita = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']); 

        const stockedDataInQiita = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);

        console.log("stockedDataInQiita in obtainStockedArticles");
        console.log(stockedDataInQiita);

        //Googleからストックした記事を取得
        //const stockedDataInGoogle = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);  

        const stockedDataInGoogle = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']); 

        console.log("stockedDataInGoogle in obtainStockedArticles");
        console.log(stockedDataInGoogle);

        //全ストック記事
        const concatArray = stockedDataInQiita.concat(stockedDataInGoogle);


        this.stockedArticles.splice(-this.stockedArticles.length);

        for(let i=0; i < concatArray.length; i++){

          this.stockedArticles.push(concatArray[i]);


        }

        console.log("this.stockedArticles in obtainStockedArticles");
        console.log(this.stockedArticles);

         

        
        //return concatArray;
    },
    */


  },
  watch:{
  	stockedDataInQiita:function(){
  		this.obtainStockedArticles();
    	this.checkIsStockTableDisplay();


  	},
  	stockedDataInGoogle:function(){
  		this.obtainStockedArticles();
    	this.checkIsStockTableDisplay();


  	},


  },
  methods:{
  	/**/
    checkIsStockTableDisplay(){
      console.log("enter checkIsStockTableDisplay");

      if(this.stockedArticles.length !== 0){
       this.isStockTableDisplay = true;

       

      } else{

        this.isStockTableDisplay = false;
      }
      console.log("this.isStockTableDisplay");
      console.log(this.isStockTableDisplay);

    },
    obtainStockedArticles(){ 

    	console.log("enter obtainStockedArticles");
          //ユーザがストックしている記事データを返す

        //永続化された記事ストック用配列のデータを値渡しでコピーする
        //this.allStockedData = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);        

        //Qiitaのストック記事を取得
        //const stockedDataInQiita = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']); 

        const stockedDataInQiita = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);

        console.log("stockedDataInQiita in obtainStockedArticles");
        console.log(stockedDataInQiita);

        //Googleからストックした記事を取得
        //const stockedDataInGoogle = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);  

        const stockedDataInGoogle = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']); 

        console.log("stockedDataInGoogle in obtainStockedArticles");
        console.log(stockedDataInGoogle);

        //全ストック記事
        const concatArray = stockedDataInQiita.concat(stockedDataInGoogle);


        this.stockedArticles.splice(-this.stockedArticles.length);

        for(let i=0; i < concatArray.length; i++){

          this.stockedArticles.push(concatArray[i]);


        }

        console.log("this.stockedArticles in obtainStockedArticles");
        console.log(this.stockedArticles);

         

        
        //return concatArray;
    },
    
    deleteStock(){
       console.log("enter deleteStock");
      //ストック記事をすべて削除する  
        this.$store.commit('persistedParameter/deleteStockedArticles'); 
        

        //this.stockedArticles = this.$store.getters['persistedParameter/getStockedArticles'];

        //this.checkIsStockTableDisplay();   

        this.isStockTableDisplay = false;
        console.log("this.isStockTableDisplay");
        console.log(this.isStockTableDisplay);

    },
    deleteStockArray(element){
        console.log("enter deleteStockArray");
        //Qiitaの記事がクリックされた場合
        if(element.domain === "qiita"){
          //Qiitaのストック記事を取得
          //const stockedDataInQiita = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);
          const stockedDataInQiita = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);

          console.log(`stockedDataInQiita in deleteStockArray`);
          console.log(stockedDataInQiita);


          //押下された要素を特定する
          for(let i=0; i<stockedDataInQiita.length; i++){
              if(stockedDataInQiita[i].id === element.id){
                //削除する要素のフラグをtrueに変更
                stockedDataInQiita[i].isDelete = true;              
                                               
                console.log(`stockedDataInQiita[${i}] in deleteStockArray`);
            console.log(stockedDataInQiita[i]);
            
              }
            }

            this.$store.commit('persistedParameter/deleteSingleStockedArticle',stockedDataInQiita);
            //const deleteData = _.cloneDeep(stockedDataInQiita);
            //console.log("deleteData");
            //console.log(deleteData);
            //this.$store.commit('persistedParameter/deleteSingleStockedArticle',deleteData); 

            //Googleの記事がクリックされた場合
        } else {

          //Googleからストックした記事を取得
          //const stockedDataInGoogle = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);

          const stockedDataInGoogle = _cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);

          console.log(`stockedDataInGoogle in deleteStockArray`);
          console.log(stockedDataInGoogle);

          //押下された要素を特定する
          for(let i=0; i<stockedDataInGoogle.length; i++){
              if(stockedDataInGoogle[i].cacheId === element.cacheId){
                //削除する要素のフラグをtrueに変更
                stockedDataInGoogle[i].isDelete = true;             
                                               
                console.log(`stockedDataInGoogle[${i}] in deleteStockArray`);
            console.log(stockedDataInGoogle[i]);
            
              }
            }

            this.$store.commit('persistedParameter/deleteSingleStockedArticle',stockedDataInGoogle);
            //const deleteData = _.cloneDeep(stockedDataInGoogle);
            //console.log("deleteData");
            //console.log(deleteData);
            //this.$store.commit('persistedParameter/deleteSingleStockedArticle',deleteData);

        }


        //this.obtainStockedArticles();
        //this.checkIsStockTableDisplay();


        //以下のcomputedを実行しないと、削除がリアクティブに反映されない
        //本来は、上記の削除処理でindex.jsのstockedArticles配列か、stockedArticlesInGoogleSearchが変化するため、
        //computedがそれを検知して、自動でthis.obtainStockedArticlesとthis.checkIsStockTableDisplayが実行されるはず
        
        //this.obtainStockedArticles;
        //this.checkIsStockTableDisplay;

        //上記の問題は、createdにてストック配列のシャローコピーをとることで解決した

        
        

    },



  },



}


</script>



<style scoped>
/* prettier-ignore */



.h2title{

  display: inline-block;
}



#all-delete-button{


  display:block;
  margin-left:auto;
}

#stock-articles-container{

	margin-top:20px;
}



</style>