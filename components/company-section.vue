<template>
  <div>
    <h3>転職先</h3>
    転職先を選択してください。
    <!--<select v-model="$store.state.articleAddition.age">-->
    <select v-model="company">
      <option disabled value="">選択してください</option>
      <option value="自社開発">自社開発</option>
      <option value="受託">受託</option>
      <option value="SIer">SIer</option>
      <option value="SES">SES</option>
      <option value="その他">その他</option>
           
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
    company:{
        /**/
        get:function(){
            return this.$store.state.articleAddition.company;
        },
        
        set:function(companyData){
            this.$store.commit('articleAddition/changeCompany', companyData);
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