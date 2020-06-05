<template>
  <div class="page-container">
  <!-- eslint-disable --><!-- prettier-ignore -->        
    <signin></signin>
    <signup></signup>
  </div>
</template>

<script>
/* prettier-ignore *//* eslint-disable */

import Signup from '~/components/signup.vue'
import Signin from '~/components/signin.vue'


export default {
  components: {    
    Signup,
    Signin,
    
  }
}
</script>