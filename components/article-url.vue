<template>
  <div class="article-url-container">
    <h3>記事URL</h3>
    参考になった体験記事のURLを入力してください。<input type="text" v-model="url">        
  </div>
</template>

<script>
/* eslint-disable */
export default {  
  data () {
    return {          
      
    }
  },  
  methods: {
  },
  computed:{
    url:{
        get:function(){
            return this.$store.state.articleAddition.url;
        },
        set:function(urlData){
            this.$store.commit('articleAddition/changeUrl', urlData);
        },
    },
  }    
}
</script>

<style>
.article-url-container {
  margin: 10px;  
}
</style>