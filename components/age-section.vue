<template>
  <div class="age-section-container">
    <h3>年齢</h3>
    <span>体験記事の投稿者の年齢を選択してください。</span>   
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
    age:{        
        get:function(){
            return this.$store.state.articleAddition.age;
        },        
        set:function( ageData ){
            this.$store.commit('articleAddition/changeAge', ageData);
        },        
    },
  }
}
</script>

<style>
.age-section-container {
  margin: 10px;  
}
</style>