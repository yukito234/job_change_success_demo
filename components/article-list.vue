<template>
  <div class="article-list-container">        
    
    <h3>上のグラフのデータ一覧</h3>    
    <p>下表では、年齢・学歴、スクール有無、転職先の項目でフィルターできます。
      <br>気になる項目でフィルターをかけて表のデータを比較してみると新たな発見があるかもしれません。
      <br>また、勉強期間では昇順・降順で並び替えができます。
      <br>※空白はデータなしです。
    </p>    

    <b-form-group
      label="Filter"
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
          placeholder="Type to Search"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-form-group
      label="Filter On"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
      description="Leave all unchecked to filter on all data"
      class="mb-0">
      <b-form-checkbox-group v-model="filterOn" class="mt-1">
        <b-form-checkbox value="age">年齢</b-form-checkbox>
        <b-form-checkbox value="educational_background">学歴</b-form-checkbox>
        <b-form-checkbox value="school_presence">スクール有無</b-form-checkbox>
        <b-form-checkbox value="company">転職先</b-form-checkbox>        
      </b-form-checkbox-group>
    </b-form-group>

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
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _ from 'lodash';

export default {
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
    //firebaseから記事データ一覧を取得
    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
               
          const data = _.cloneDeep(doc.data());
          const dataForElementTable = _.cloneDeep(doc.data());          
         
          //体験記の一覧データを取得
          //this.$store.dispatch('allArticlesGetAction', data);          
          this.tableData.push(dataForElementTable);
        });
        //console.log("this.tableData");
        //console.log(this.tableData);
        this.totalRows = this.tableData.length;
        console.log("this.totalRows");
        console.log(this.totalRows);        
                
      })
      .catch(function(error) {
          alert(error.message)
      });
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

<style>
.article-list-container {
  margin: 20px;  
}
</style>