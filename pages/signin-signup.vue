<template>
  <div >
    <global-navi></global-navi>
    
    <signin></signin>
    <signup></signup>
  </div>
</template>

<script>
import Signup from '~/components/signup.vue'
import Signin from '~/components/signin.vue'
import globalNavi from '~/components/global-navi.vue';

export default {
  components: {    
    Signup,
    Signin,
    "global-navi": globalNavi,
  }
}
</script>