<template>
  <div >        
    <signin></signin>
    <signup></signup>
  </div>
</template>

<script>
import Signup from '~/components/signup.vue'
import Signin from '~/components/signin.vue'


export default {
  components: {    
    Signup,
    Signin,
    
  }
}
</script>