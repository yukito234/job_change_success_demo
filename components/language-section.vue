<template>
	<div class="language-container">
		<!-- eslint-disable --><!-- prettier-ignore -->
	<h3>プログラミング言語</h3>
	プログラミング言語を選択してください。
	<label>
	  <input type="checkbox" v-model="language" value="JavaScript">JavaScript
	</label>
	<label>
	  <input type="checkbox" v-model="language" value="PHP">PHP
	</label>
	<label>
	  <input type="checkbox" v-model="language" value="Ruby">Ruby
	</label>
	<label>
	  <input type="checkbox" v-model="language" value="その他">その他
	</label>
	
	<!--<div>{{ url }}</div>-->
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */

export default {
  //name: 'Signin',
  data () {
	return {     
	  //url: '',
	  
	}
  },  
  methods: {
  },
  computed:{
	language:{
		/**/
		get:function(){
			return this.$store.state.articleAddition.language;
		},
		
		set:function(languageData){
			this.$store.commit('articleAddition/changeLanguage', languageData);
		},
		
	},
  }
	/*
	urlChanged(){
		this.$emit('url-input', this.url);
	}
	*/

  
}
</script>

<style>

.language-container {
  margin: 10px;

  
}

</style>