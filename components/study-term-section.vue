<template>
  <div class="study-term-container">
    <h3>勉強期間(ヶ月)</h3>
    記事投稿者の勉強期間を入力してください。<input type="number" v-model="studyTerm">       
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
    studyTerm:{
        get:function(){
            return this.$store.state.articleAddition.studyTerm;
        },
        set:function(studyTermData){
            this.$store.commit('articleAddition/changeStudyTerm', studyTermData);
        },
    },
  }     
}
</script>

<style>
.study-term-container {
  margin: 10px;  
}
</style>