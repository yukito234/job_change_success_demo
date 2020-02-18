<template>
  <div>
    <h3>学歴</h3>
    体験記事の投稿者の学歴を選択してください。
    <!--<select v-model="$store.state.articleAddition.age">-->
    <select v-model="educationalBackground">
      <option disabled value="">選択してください</option>
      <option value="高卒">高卒</option>
      <option value="高専卒">高専卒</option>
      <option value="大卒">大卒</option>
      <option value="大学院卒">大学院卒</option>      
    </select>
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
    educationalBackground:{
        /**/
        get:function(){
            return this.$store.state.articleAddition.educationalBackground;
        },
        
        set:function(educationalBackgroundData){
            this.$store.commit('articleAddition/changeEducationalBackground', educationalBackgroundData);
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