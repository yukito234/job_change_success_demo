<template>
  <div >
        
    <experience-search></experience-search>                  
  </div>
</template>


<script>
import ExperienceSearch from '~/components/experience-search.vue'


export default {
  components: {          
    'experience-search': ExperienceSearch,
    

  },
  data () {
    return {      
      
    }
  },     
}
</script>

<style>

.small {
    max-width: 300px;
    margin:  20px 10px auto;
    border:1px solid;
  }

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
