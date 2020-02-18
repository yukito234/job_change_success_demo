<template>
  <div class="company-container">
    <h3>転職先</h3>
    転職先を選択してください。    
    <select v-model="company">
      <option disabled value="">選択してください</option>
      <option value="自社開発">自社開発</option>
      <option value="受託">受託</option>
      <option value="SIer">SIer</option>
      <option value="SES">SES</option>
      <option value="その他">その他</option>           
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
    company:{        
        get:function(){
            return this.$store.state.articleAddition.company;
        },        
        set:function(companyData){
            this.$store.commit('articleAddition/changeCompany', companyData);
        },        
    },
  }     
}
</script>

<style>
.company-container {
  margin: 10px;  
}
</style>