<template>
  <div >
    <h1>未経験からwebエンジニアを目指す人のための情報サイト</h1>        
    <p>test0@t.com</p>
    <p>testtest0</p>    
    <qiita-search></qiita-search>
    <doughnut-graph class="small" v-bind:chart-data="datacollection"></doughnut-graph>       
    <doughnut-graph-select v-on:graphChangeNotice="redrawGraph"></doughnut-graph-select>
    <article-list></article-list>
    <signup></signup>
    <signin></signin>               
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import Signup from '~/components/signup.vue'
import Signin from '~/components/signin.vue'
import ArticleList from '~/components/article-list.vue'
import DoughnutGraph from '~/components/doughnut.vue'
import DoughnutGraphSelect from '~/components/doughnut-graph-select.vue'
import QiitaSearch from '~/components/qiita-search.vue'


export default {
  components: {    
    Signup,
    Signin,
    'article-list': ArticleList,
    'doughnut-graph': DoughnutGraph,
    'doughnut-graph-select': DoughnutGraphSelect,
    'qiita-search': QiitaSearch,

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

<style>

.small {
    max-width: 300px;
    margin:  20px 10px auto;
    border:1px solid;
  }

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
