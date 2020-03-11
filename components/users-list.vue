<template>
  <div >        
    <h2>ユーザ一覧</h2>
    <table border="1">
      <thead>
        <tr>
          <th>ニックネーム</th>
          <th>画像</th>
          <th>自己紹介</th>
          <th>個別ページへのリンク</th>                    
        </tr>        
      </thead>
      <tbody>                
        <tr v-for="element in allProfile" v-bind:key="element.nick_name">
          <td>
            {{ element.nick_name }}
          </td>
          <td>            
            <img :src="element.image_url" class="profileimage">
          </td>
          <td>
            {{ element.self_introduction }}
          </td>
          <td>
            <!--<nuxt-link to="/${element.nick_name}">{{ element.nick_name }}の個別ページに移動する</nuxt-link>-->
            <nuxt-link v-bind:to="{ path: `/${element.nick_name}` }">{{ element.nick_name }}の個別ページに移動する</nuxt-link>
          </td>                    
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
  data () {
    return {            
      allProfile:[],
      
    }
  },
  mounted () {    
    db.collection("user_profile").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();                                        
          this.allProfile.push(data);

        });        
        console.log("this.allProfile");
        console.log(this.allProfile);        
         
      })
      .catch(function(error) {
          alert(error.message)
      });
  },
  computed:{
   
  },
  created:function(){
  },  
  methods: {
    
  }
}
</script>

<style>
.profileimage{
  width: 150px;
}

.member-container {
  margin: 20px;  
}
</style>