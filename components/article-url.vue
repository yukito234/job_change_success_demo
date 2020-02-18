<template>
  <div>
    <h3>記事URL</h3>
    参考になった体験記事のURLを入力してください。<input type="text" v-model="url">    
    <!--<div>{{ url }}</div>-->
  </div>
</template>

<script>
/* eslint-disable */

export default {
  //name: 'Signin',
  data () {
    return {     
      //url: '',
      
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
    /*
    urlChanged(){
        this.$emit('url-input', this.url);
    }
    */

  
}
</script>