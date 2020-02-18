<template>
  <div>
    <h3>スクール有無</h3>
    体験記事の投稿者のプログラミングスクールの利用有無を選択してください。
    <!--<select v-model="$store.state.articleAddition.age">-->
    <select v-model="schoolPresence">
      <option disabled value="">選択してください</option>
      <option value="あり">あり</option>
      <option value="なし">なし</option>      
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
    schoolPresence:{
        /**/
        get:function(){
            return this.$store.state.articleAddition.schoolPresence;
        },
        
        set:function(schoolPresenceData){
            this.$store.commit('articleAddition/changeSchoolPresence', schoolPresenceData);
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