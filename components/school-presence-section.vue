<template><!-- eslint-disable --><!-- prettier-ignore -->
  <div class="school-presence-container">
    <b-form-group
      label-cols-sm="3"
      label="スクール有無:"
      label-align-sm="right"
      
    >
      <b-form-select v-model="schoolPresence" :options="options"></b-form-select>
    </b-form-group>
    <!--
    <h3>スクール有無</h3>
    体験記事の投稿者のプログラミングスクールの利用有無を選択してください。    
    <select v-model="schoolPresence">
      <option disabled value="">選択してください</option>
      <option value="あり">あり</option>
      <option value="なし">なし</option>      
    </select>   
  -->
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
export default {  
  data () {
    return {           
      options: [
        { value: null, text: '選択してください' },
        { value: 'あり', text: 'あり' },
        { value: 'なし', text: 'なし' },
        
      
      ],
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