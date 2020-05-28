<template>
  <div class="educational-background-container">
    <b-form-group
      label-cols-sm="3"
      label="学歴:"
      label-align-sm="right"
     
    >
      <b-form-select v-model="educationalBackground" :options="options"></b-form-select>
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
        { value: '高卒', text: '高卒' },
        { value: '高専卒', text: '高専卒' },
        { value: '大卒', text: '大卒' },
        { value: '大学院卒', text: '大学院卒' },
              
      ],
    }
  },  
  methods: {
  },
  computed:{
    educationalBackground:{        
        get:function(){
            return this.$store.state.articleAddition.educationalBackground;
        },        
        set:function(educationalBackgroundData){
            this.$store.commit('articleAddition/changeEducationalBackground', educationalBackgroundData);
        },        
    },
  } 
}
</script>

<style>
.educational-background-container {
  margin: 10px;  
}
</style>