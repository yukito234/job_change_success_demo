<template>
  <div class="age-section-container">
    <b-form-group
      label-cols-sm="3"
      label="年齢:"
      label-align-sm="right"
      
    >
      <b-form-select v-model="age" :options="options"></b-form-select>
    </b-form-group>
    
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
        { value: '20代前半', text: '20代前半' },
        { value: '20代後半', text: '20代後半' },
        { value: '30代前半', text: '30代前半' },
        { value: '30代後半', text: '30代後半' },
        { value: '40代前半', text: '40代前半' },
        { value: '40代後半', text: '40代後半' },
        { value: '50代', text: '50代' },
        { value: '60代以降', text: '60代以降' },
      
      ],


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