<template>
  <div > 	
    
    
    <div>
      <!--
       
      <doughnut-graph-section v-bind:chart-data="items" v-on:graphChangeNoticeToSuccessGraph="redrawGraph"></doughnut-graph-section>

      <doughnut-graph-section v-bind:chart-data="datacollection" v-on:graphChangeNoticeToSuccessGraph="redrawGraph"></doughnut-graph-section>

      -->
      <doughnut-graph-section ></doughnut-graph-section>
      
      
      <article-list></article-list>
    </div>
  </div>
</template>


<script>
//
import firebase from 'firebase'
//
import db from '../plugins/firebase_config'
import ArticleList from '~/components/article-list.vue'

import DoughnutGraphSection from '~/components/doughnut-graph-section.vue'




export default {
  components: {    
    
    'article-list': ArticleList,
    'doughnut-graph-section': DoughnutGraphSection, 

        
    

  },
  /**/
  data () {
    return {
     

      
      
    }
  },  
  async fetch ({ store }) {

    //ページがレンダリングされる前に、体験記データをストアに入れる
    console.log("store");
    console.log(store);

    //初回のみDBと通信して体験記データを取得
    if( !store.getters['getIsExperienceArticles'] ){

      console.log("store.getters['getIsExperienceArticles']"); 
      console.log(store.getters['getIsExperienceArticles']); 


      await db.collection("experience_articles").get()
        .then((querySnapshot)=>{        
          querySnapshot.forEach((doc)=>{          
            const data = _.cloneDeep(doc.data());  

            

            store.commit('allArticlesForGraphGet', data);  
             
            //this.$store.dispatch('sessionStorageParameter/allArticlesForGraphGetAction', data);        

          });     

          


          //グラフタイプ（初期はage）において、各項目のデータ数を取得
          //例：２０代後・・・７人、３０代前半・・・５人
          

          //グラフ描画に必要なデータをすべてindex.jsに保存する場合
          //app.store.dispatch('itemCountAction', app.store.getters['getGraphType']);
          
          


          //グラフのラベル、データ、カラーの配列を準備
          //グラフ描画に必要なデータをすべてindex.jsに保存する場合
          //app.store.dispatch('createLabelQuantityColorAction');
          


          //DBからのデータ取得有無を表すflagを"取得済"に変更する

          store.commit('changeIsExperienceArticles',true);       




          
          console.log("getting data is finished of success-graph.vue");          
           
        })
        .catch(function(error) {
            alert(error.message)
        });

    } else {
      //2回目以降のアクセスでは、DBとのやり取りはせず、ストアに保存した体験記データを利用する
      console.log("store.getters['getIsExperienceArticles']"); 
      console.log(store.getters['getIsExperienceArticles']);     
    }





  },
  /*
  async asyncData({app}){

    //let items ={};


    

    console.log("app");
    console.log(app);


    if( !app.store.getters['getIsExperienceArticles'] ){

      console.log("app.store.getters['getIsExperienceArticles']"); 
      console.log(app.store.getters['getIsExperienceArticles']); 


      await db.collection("experience_articles").get()
        .then((querySnapshot)=>{        
          querySnapshot.forEach((doc)=>{          
            const data = _.cloneDeep(doc.data());  

            

            app.store.dispatch('allArticlesForGraphGetAction', data);  
             
            //this.$store.dispatch('sessionStorageParameter/allArticlesForGraphGetAction', data);        

          });     

          


          //グラフタイプ（初期はage）において、各項目のデータ数を取得
          //例：２０代後・・・７人、３０代前半・・・５人
          

          //グラフ描画に必要なデータをすべてindex.jsに保存する場合
          //app.store.dispatch('itemCountAction', app.store.getters['getGraphType']);
          
          


          //グラフのラベル、データ、カラーの配列を準備
          //グラフ描画に必要なデータをすべてindex.jsに保存する場合
          //app.store.dispatch('createLabelQuantityColorAction');
          


          //dbからのデータ取得有無を表すflagを"取得済"に変更する

          app.store.dispatch('changeIsExperienceArticlesAction',true);       




          
          console.log("getting data is finished of success-graph.vue");          
           
        })
        .catch(function(error) {
            alert(error.message)
        });

    } else {

      console.log("app.store.getters['getIsExperienceArticles']"); 
      console.log(app.store.getters['getIsExperienceArticles']);     
    }

    //const  items =  app.store.getters['getAllArticlesForGraph'];

    //console.log("before return items of success-graph.vue");   

    //return { items }; 


  },
  */

 
  /**/
  created() {


      



    
  },
  
  /*
  mounted () { 
 
    
  },
  */
  /**/
  methods: {

    
    
     
  },
  

}	
</script>