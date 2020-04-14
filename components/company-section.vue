<template>
  <div class="company-container">
    <b-form-group
      label-cols-sm="3"
      label="転職先:"
      label-align-sm="right"
      
    >
      <b-form-select v-model="company" :options="options"></b-form-select>
    </b-form-group>
    
  </div>
</template>

<script>
/* eslint-disable */
export default {  
  data () {
    return {           
      options: [
        { value: null, text: '選択してください' },
        { value: '自社開発', text: '自社開発' },
        { value: '受託', text: '受託' },
        { value: 'SIer', text: 'SIer' },
        { value: 'SES', text: 'SES' },
        { value: 'その他', text: 'その他' },
        
      
      ],
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