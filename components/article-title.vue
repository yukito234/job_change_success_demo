<template>
	<div class="article-title-container">
		<!-- eslint-disable --><!-- prettier-ignore -->
	<b-form-group
	  label-cols-sm="3"
	  label="記事タイトル:"
	  label-align-sm="right"
	  
	>
	  <b-form-input v-model="title"></b-form-input>
	</b-form-group>
			
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
	title:{
		get:function(){
			return this.$store.state.articleAddition.title;
		},
		set:function(titleData){
			this.$store.commit('articleAddition/changeTitle', titleData);
		},
	},
  }      
}
</script>

<style>
.article-title-container {
  margin: 10px;  
}
</style>