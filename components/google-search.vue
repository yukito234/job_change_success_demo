<template>
	<div>
    	<h2>Googleにて体験記を探す</h2>    	
    	<p>検索キーワードのヒント</p>
		<label>
      		<input type="checkbox" v-model="suggestKeywords" value="未経験">未経験  
	    </label> 
	    <label>
      		<input type="checkbox" v-model="suggestKeywords" value="転職">転職  
	    </label>
	    <label>
	    	<input type="checkbox" v-model="suggestKeywords" value="web">web  
	    </label>
	    <label>
	    	<input type="checkbox" v-model="suggestKeywords" value="エンジニア">エンジニア  
	    </label>
	    <label>
	      <input type="checkbox" v-model="suggestKeywords" value="成功">成功  
	    </label>
	    <label>
	      <input type="checkbox" v-model="suggestKeywords" value="体験">体験  
	    </label>
	    <label>
	      <input type="checkbox" v-model="suggestKeywords" value="自社開発">自社開発  
	    </label>
	    <label>
	      <input type="checkbox" v-model="suggestKeywords" value="フロントエンド">フロントエンド  
	    </label>
	    <label>
	      <input type="checkbox" v-model="suggestKeywords" value="バックエンド">バックエンド  
	    </label>
		<p>チェックを入れたキーワード:{{ suggestKeywords }}</p>
		<br>
    	<select v-model="domain">
	      <option disabled value="">選択してください</option>
	      <option value="hatenablog">hatenablog</option>
	      <option value="note">note</option>
	      <option value="others">qiita,hatenablog,note以外</option>	      
	    </select>  
	    <p>検索対象のドメイン:{{ domain }}</p>
	    <br>
    	<input type="text" v-model="searchBox" >
    	<button type="button" v-on:click="doSearch">検索する</button>
    	<br>
    	<p>検索ボックスの内容:{{ searchBoxContent }}</p>
    	<br>    	
    	<table border="1">
	      <thead>
	        <tr>
	          <th>記事</th>
	          <th>URL</th>	          
	        </tr>
	  	  </thead>
	  	  <tbody>                
        	<tr v-for="element in allArticleData" v-bind:key="element.link">
          	  <td>
          	  	<a v-bind:href="element.link">{{ element.title }}</a>
          	  </td>
          	   <td>
          	  	{{ element.link }}
          	  </td>
            </tr>
      	  </tbody>
		</table>
		
    </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */

export default {  
	data () {
	    return {
	    	allArticleData:[],
	    	domain:"",
	    	suggestKeywords:[],
	    	searchBox:"",
	    	searchBoxContent:"",
	    	searchBoxContentArray:[],	    	

		}
	},
	watch:{           		
		suggestKeywords:function(){      
	      this.searchBox = this.suggestKeywords.join(" ");    
	    },
	    searchBox( val ){      
	      this.searchBoxContent = val;
	      this.searchBoxContentArray = this.searchBoxContent.split(/\s+/);             	      
	    },
	    
	},
	methods:{
		async doSearch(){		
			let urlParameter ='';
      		let url ='';
      		let result = "";

      		this.allArticleData.splice(-this.allArticleData.length);
      		this.$store.commit("persistedParameter/changeUsedAPI","google");      		

      		for(let i=0; i<this.searchBoxContentArray.length; i++){
		        if(i === this.searchBoxContentArray.length-1 ){
		          urlParameter = urlParameter +  this.searchBoxContentArray[i];
		        } else{
		          urlParameter = urlParameter +  this.searchBoxContentArray[i] + "+";
		        }        
	      	}   	      	

	      	switch(this.domain){
	      		case "hatenablog":
	      			urlParameter = urlParameter + "+" + "site:hatenablog.com" + "+" + "-site:paiza.hatenablog.com";
	      			break;
	      		case "note":
	      			urlParameter = urlParameter + "+" + "site:note.com";
	      			break;
	      		case "others":
	      			urlParameter = urlParameter + "+" + 
	      			"-site:note.com" + "+" + 
	      			"-site:hatenablog.com" + "+" + 
	      			"-site:qiita.com";
	      			break;
	      	}	      	

	      	url = "https://www.googleapis.com/customsearch/v1?key=" + process.env.GOOGLE_API + "&cx=" + process.env.SEARCH_ENGINE_ID + "&q=allintitle:" + "+" + urlParameter;

      		console.log("url");
      		console.log(url);

      		result = await this.$axios.$get(url);       		

      		for(let i=0; i<result.items.length; i++){		            
		       this.allArticleData.push(result.items[i]);
	      	} 

		},
	},
}
</script>