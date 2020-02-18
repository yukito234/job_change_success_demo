<template>
  <div>
    <h3>記事タイトル</h3>
    上の記事のタイトルを入力してください。<input type="text" v-model="title">    
    
  </div>
</template>

<script>
/* eslint-disable */

export default {
  //name: 'Signin',
  data () {
    return {     
      
      
    }
  },  
  methods: {
  },
  computed:{
    title:{
        get:function(){
            return this.$store.state.articleAddition.title;
        },
        set:function(titleData){
            this.$store.commit('articleAddition/changeTitle', titleData);
        },
    },
  }
    /*
    urlChanged(){
        this.$emit('url-input', this.url);
    }
    */

  
}
</script>