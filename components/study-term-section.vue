<template>
  <div>
    <h3>勉強期間(ヶ月)</h3>
    記事投稿者の勉強期間を入力してください。<input type="number" v-model="studyTerm">    
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
    studyTerm:{
        get:function(){
            return this.$store.state.articleAddition.studyTerm;
        },
        set:function(studyTermData){
            this.$store.commit('articleAddition/changeStudyTerm', studyTermData);
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