<template>  
  <div class="page-container"> 
    <!-- eslint-disable --><!-- prettier-ignore -->
    <experience-search></experience-search>
    <stock-articles></stock-articles>      

         
          

  </div>
</template>


<script>
// prettier-ignore
/* eslint-disable */

import ExperienceSearch from '~/components/experience-search.vue';
import StockArticles from '~/components/stock-articles.vue';








export default {  
  
  components: {
      'experience-search': ExperienceSearch,
      'stock-articles': StockArticles,

     

  },
  
  data () {
      return {

      }         
  },  
  
  
  
  methods:{

  },

      
}



</script>


