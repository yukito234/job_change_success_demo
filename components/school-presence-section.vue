<template>
  <div class="school-presence-container">
    <h3>スクール有無</h3>
    体験記事の投稿者のプログラミングスクールの利用有無を選択してください。    
    <select v-model="schoolPresence">
      <option disabled value="">選択してください</option>
      <option value="あり">あり</option>
      <option value="なし">なし</option>      
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
    schoolPresence:{        
        get:function(){
            return this.$store.state.articleAddition.schoolPresence;
        },        
        set:function(schoolPresenceData){
            this.$store.commit('articleAddition/changeSchoolPresence', schoolPresenceData);
        },        
    },
  }
}
</script>

<style>
.school-presence-container {
  margin: 10px;  
}
</style>