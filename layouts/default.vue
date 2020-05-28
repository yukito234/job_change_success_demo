<template><!-- eslint-disable --><!-- prettier-ignore -->
  <div>
    <!--
    <b-overlay :show="this.$store.getters['persistedParameter/getIsShowAll']" rounded="sm">
    </b-overlay>
      
    -->
      <header-area ></header-area>
      <global-navi ></global-navi>
      
      
      <nuxt />
    
  </div>
</template>

<script>
/* eslint-disable */
// prettier-ignore
import globalNavi from '~/components/global-navi.vue';
import headerArea from '~/components/header-area.vue';
export default {     
  components: {
  //    
  "global-navi": globalNavi,
    "header-area": headerArea,

  },
  data () {
    return {
     
      
    }
  }, 
  /* */
  created() {
    
    
  },
 
  
  methods:{
    

    

  },

}

</script>

<style>
/* prettier-ignore */
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
