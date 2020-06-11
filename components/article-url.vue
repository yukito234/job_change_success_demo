<template>
	<div class="article-url-container">
		<!-- eslint-disable --><!-- prettier-ignore -->
	<b-form-group
	  label-cols-sm="3"
	  label="記事URL:"
	  label-align-sm="right"
	  
	>
	  <b-form-input  v-model="url"></b-form-input>
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
	url:{
		get:function(){
			return this.$store.state.articleAddition.url;
		},
		set:function(urlData){
			this.$store.commit('articleAddition/changeUrl', urlData);
		},
	},
  }    
}
</script>

<style>
.article-url-container {
  margin: 10px;  
}
</style>