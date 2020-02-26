<template>
  <div class="article-list-container">        
    <h2>未経験webエンジニア転職者の体験記の一覧</h2>    
    <table border="1">
      <thead>
        <tr>
          <th>記事タイトル</th>          
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
        <tr v-for="element in $store.state.allArticles" v-bind:key="element.url">
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

    }
  },
  created:function(){ 
    //firebaseから記事データ一覧を取得
    db.collection("experience_articles").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();          
          //体験記の一覧データを取得
          this.$store.dispatch('allArticlesGetAction', data);          

        });
                
      })
      .catch(function(error) {
          alert(error.message)
      });
  },
}

</script>

<style>
.article-list-container {
  margin: 20px;  
}
</style>