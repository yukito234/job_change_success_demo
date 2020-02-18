<template>
  <div>        
    <h2>未経験webエンジニア転職者の体験記の一覧</h2>    
    <table>
      <thead>
        <tr>
          <th>記事タイトル</th>
          <!--<th>URL</th>-->          
          <th>年齢</th>
          <th>学歴</th>
          <th>勉強期間（ヶ月）</th>
          <th>スクール有無</th>
          <th>言語</th>
          <th>フレームワーク</th>
          <th>転職先</th>
        </tr>
      </thead>
      <tbody>        
        <!--<tr v-for="element in allArticles" v-bind:key="element.url">  -->
        <tr v-for="element in $store.state.allArticles" v-bind:key="element.url">
          
          <!--<td>{{ element.title }}</td>-->  
          <!--<td>{{ element.url }}</td>-->
          <td>
            <a v-bind:href="element.url">{{ element.title }}</a>
          </td>          
          <td>{{ element.age }}</td>
          <td>{{ element.educational_background }}</td>
          <td>{{ element.study_term }}</td>          
          <td>{{ element.school_presence }}</td>
          <td>{{ element.language }}</td>
          <td>{{ element.framework }}</td>          
          <td>{{ element.company }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {
  date(){
    return {
      //allArticles: [],
      /*
      ここで、allArticlesを定義すると、以下のエラーが出る
      vue.runtime.esm.js?2b0e:619 [Vue warn]: Property or method "allArticles" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.

      ここで定義したallArticlesは、あくまでこのコンポーネントでのみ保持されるデータとなる
      親要素のindex.vueでallArticlesは認識できない
      よってindex.jsにてstateにallArticlesを定義する

      */

    }
  },
  created:function(){ 

    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        

        querySnapshot.forEach((doc)=>{
          const data = doc.data();
          //console.log(data);

          //const stockArray = [];
          //stockArray.push(data);
          //console.log(stockArray);
          //this.allArticles.push(data);
          this.$store.dispatch('allArticlesGetAction', data);
          
                   
        
        });
        console.log(this.$store.state.allArticles);
      })
      .catch(function(error) {
          alert(error.message)
      });


  },






}


</script>