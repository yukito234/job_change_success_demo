<template>
  <div>
    <h3>年齢</h3>
    体験記事の投稿者の年齢を選択してください。
    <!--<select v-model="$store.state.articleAddition.age">-->
    <select v-model="age">
      <option disabled value="">選択してください</option>
      <option value="10代">10代</option>
      <option value="20代前半">20代前半</option>
      <option value="20代後半">20代後半</option>
      <option value="30代前半">30代前半</option>
      <option value="30代後半">30代後半</option>
      <option value="40代前半">40代前半</option>
      <option value="40代後半">40代後半</option>
      <option value="50代">50代</option>
      <option value="60代以降">60代以降</option>
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
    age:{
        /**/
        get:function(){
            return this.$store.state.articleAddition.age;
        },
        
        set:function(ageData){
            this.$store.commit('articleAddition/changeAge', ageData);
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