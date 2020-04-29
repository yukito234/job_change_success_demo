<template>
  <div >
  	
    <b-spinner small v-show="loading"></b-spinner>
    <div v-show="!loading">
      <h2>未経験から転職に成功した人のデータ</h2>
      <p>転職成功者のデータ（年齢・学歴・勉強期間・スクール有無・転職先）をまとめたので、
        <br>あなたが気になる項目をチェックしてみてください。
      </p>
    	<doughnut-graph class="small" v-bind:chart-data="datacollection"></doughnut-graph>       
      <doughnut-graph-select v-on:graphChangeNotice="redrawGraph"></doughnut-graph-select>
      <article-list></article-list>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleList from '~/components/article-list.vue'
import DoughnutGraph from '~/components/doughnut.vue'
import DoughnutGraphSelect from '~/components/doughnut-graph-select.vue'


export default {
  components: {    
    
    'article-list': ArticleList,
    'doughnut-graph': DoughnutGraph,
    'doughnut-graph-select': DoughnutGraphSelect,    
    

  },
  data () {
    return {
      datacollection: null,
      loading: true,
      
    }
  },  
  created() {
    
  },
  mounted () {    

    this.loading=false;  
    //グラフ描画に必要な全データを取得
    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();                    
          
          this.$store.dispatch('allArticlesForGraphGetAction', data);          

        });        
        //グラフタイプ（初期はage）において、各項目のデータ数を取得
        //例：２０代後・・・７人、３０代前半・・・５人
        this.$store.dispatch('itemCountAction', this.$store.state.graphType);

        //グラフのラベル、データ、カラーの配列を準備
        this.$store.dispatch('createLabelQuantityColorAction');

        //描画用オブジェクトに必要データを格納
        this.datacollection = {                           
          labels: this.$store.state.graphLabels,          
          datasets: [
            {                          
              data: this.$store.state.graphQuantity,                          
              backgroundColor: this.$store.state.graphColor,              
            }
          ]                    
        }
        //this.loading=false;        
         
      })
      .catch(function(error) {
          alert(error.message)
      });
  },
  methods: {
    //グラフタイプの切替時の再描画
    redrawGraph(){            
      this.datacollection = {                      
        labels: this.$store.state.graphLabels,        
        datasets: [
          {                        
            data: this.$store.state.graphQuantity,                        
            backgroundColor: this.$store.state.graphColor,            
          }
        ]               
      }                 
    },    
  }

}	
</script>