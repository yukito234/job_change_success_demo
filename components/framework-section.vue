<template>
  <div class="framework-container">
    <h3>フレームワーク</h3>
    フレームワークを選択してください。
    <label>
      <input type="checkbox" v-model="framework" value="Vue.js">Vue.js
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="React.js">React.js
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="AngularJS">AngularJS
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="Laravel">Laravel
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="CakePHP">CakePHP
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="Symfony">Symfony
    </label>
    <label>
      <input type="checkbox" v-model="framework" value="Ruby on Rails">Ruby on Rails
    </label>    
      <input type="checkbox" v-model="framework" value="その他">その他
    </label>        
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
    framework:{        
        get:function(){
            return this.$store.state.articleAddition.framework;
        },        
        set:function(frameworkData){
            this.$store.commit('articleAddition/changeFramework', frameworkData);
        },        
    },
  } 
}
</script>

<style>
.framework-container {
  margin: 10px;  
}
</style>