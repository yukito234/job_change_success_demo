<template>
  <div >
    <h1>未経験からwebエンジニアを目指す人のための情報サイト</h1>    
    <article-list></article-list>
    <signup></signup>
    <signin></signin>               
  </div>
</template>

<script>
import Signup from '~/components/signup.vue'
import Signin from '~/components/signin.vue'
import ArticleList from '~/components/article-list.vue'

export default {
  components: {    
    Signup,
    Signin,
    'article-list': ArticleList,
  }
}
</script>

<style>
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
