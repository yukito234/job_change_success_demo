<template>
  <div >
  	<global-navi></global-navi>
    <h2>未経験から転職に成功した人のデータ</h2>
  	<doughnut-graph class="small" v-bind:chart-data="datacollection"></doughnut-graph>       
    <doughnut-graph-select v-on:graphChangeNotice="redrawGraph"></doughnut-graph-select>
    <article-list></article-list>

  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import ArticleList from '~/components/article-list.vue'
import DoughnutGraph from '~/components/doughnut.vue'
import DoughnutGraphSelect from '~/components/doughnut-graph-select.vue'
import globalNavi from '~/components/global-navi.vue';

export default {
  components: {    
    
    'article-list': ArticleList,
    'doughnut-graph': DoughnutGraph,
    'doughnut-graph-select': DoughnutGraphSelect,    
    "global-navi": globalNavi,

  },
  data () {
    return {
      datacollection: null,
      
    }
  },  
  mounted () {    
    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();                    
          //グラフ描画に必要な全データを取得
          this.$store.dispatch('allArticlesForGraphGetAction', data);          

        });        
        //グラフ項目のデータを集計
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