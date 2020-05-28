<template><!-- eslint-disable --><!-- prettier-ignore -->
  
  <div class="study-term-container">
    <b-form-group
      label-cols-sm="3"
      label="勉強期間(ヶ月):"
      label-align-sm="right"
      
    >
      <b-form-input  v-model="studyTerm"></b-form-input>
    </b-form-group>
        
  </div>
</template>

<script>
// prettier-ignore
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

<style scoped>
/* prettier-ignore */
.study-term-container {
  margin: 10px;  
}
</style>