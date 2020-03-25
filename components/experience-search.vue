<template>
	<div>		
		<br>
		<br>
    	<h2>体験記を探す</h2>    	
    	<h3>step1.キーワードを選ぶ</h3>
    	<p>検索したいキーワードにチェックを入れてください。
    		<br>キーワードが候補になければ、そのままstep2に進んでください。
    		<br>ここで選んだキーワードは下の検索ボックスに反映されます。
    	</p>
    	<br>
		<br>
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
	    <br>
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
		<br>
	    <h3>step2.検索対象のドメインを選ぶ</h3>
	    <p>検索したいサイトを選んでください。</p>
	    <select v-model="domain">
	      <!--<option disabled value="">選択してください</option>-->
	      <option value="qiita">qiita</option>
	      <option value="hatenablog">hatenablog</option>
	      <option value="note">note</option>
	      <option value="others">qiita,hatenablog,note以外</option>	      
	    </select>  
	    <p>検索対象のドメイン:{{ domain }}</p>
	    <br>
	    <h3>step3.検索を開始</h3>
	    <p>検索したいキーワードを直接入力することもできます。</p>
	    <!--入力された文字列の前後の空白を取り除いて検索する-->    	
    	<input type="text" v-model.trim="searchBox" v-on:blur="doOnBlur()">
    	<button type="button" v-on:click="doSearch">検索する</button>
    	<br>
    	<p>検索ボックスの内容(searchBoxContent):{{ searchBoxContent }}</p>
    	<br>
    	<br>
    	<div v-if="isOtherDomainSearchResultDisplay">
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

		<div v-if="isQiitaSearchResultDisplay">
			<div>
			  <h3>検索結果: {{allArticleDataSorted.length}} 件のデータを取得しました</h3>
			  <p>検索結果を並び替える</p>
		      <select v-model="sortType">     
		        <option value="relationSort">関連順</option>
		        <option value="newSort">新着順</option>
		        <option value="likeSort">いいね順</option>
		        
		      </select>   
		      <span>{{ sortChange }}</span>
		    </div>
		    <br>
		    <br>
		    <table border="1">
		      <thead>
		        <tr>
		          <th>ストック</th>		          
		          <th>記事No</th>
		          <th>更新日</th>
		          <th>記事タイトル</th>
		          <!--<th>本文(導入部)</th>-->
		          <th>いいね数</th>                    
		        </tr>        
		      </thead>
		      <tbody>                
		        <tr v-for="element in allArticleDataForDisplay" v-bind:key="element.id">
		          <td>		            
		            <button type="button" v-on:click="addStockArray(element)">ストック</button>
		          </td>		          
		          <td>
		            {{ element.articleNumber+1 }}            
		            
		          </td>
		          <td>
		            {{ element.updated_at.slice(0,10) }}
		          </td>
		          <td>
		          	<a v-bind:href="element.url" >{{ element.title }}</a>
		          </td>
		          <td>
		            <!--<button type="button" v-on:click="showBodyText(element)">表示</button>-->
		            <!--{{ element.body }}-->
		          </td>
		          <td>
		            {{ element.likes_count }}
		          </td>                    
		        </tr>
		      </tbody>
		    </table>
		    <br> 		    
		    <br> 
		    <br>        
		    <div>
		      <el-pagination background layout="prev, pager, next" v-bind:total="allArticleData.length" v-bind:page-size="10" @current-change="onchange">
		      </el-pagination>
		    </div>
		    <br> 
		    <br> 
		    <p>以下の記事がストックされています</p>
		    <table border="1">
		      <thead>
		        <tr>
		          <th>削除選択<br>checkbox</th>
		          <th>isStock</th>
		          <th>記事タイトル</th>
		        </tr>
		  	  </thead>
		  	  <tbody>		  	  	
		  	  	<tr v-for="item in obtainStockedArticles" v-bind:key="item.id">	
		  	  		<td>		            
		            	<input type="checkbox" v-on:click="deleteCheck(item)" v-model="item.isStock">                    		            
		          　</td>
		  	  		<td>
		            	{{item.isStock}}            		            
		            </td>
		            <td>
		          		<a v-bind:href="item.url" >{{ item.title }}</a>
		          	</td>
		  	  	</tr>
		  	  </tbody>
		  	</table>
		    <!--
		    <ul >
		      <li v-for="item in $store.getters['persistedParameter/getStockedArticles']" :key="item.id">
		        <a v-bind:href="item.url">{{ item.title }}</a>
		        
		      </li>
		    </ul>
		    -->
		    <br> 
		    <br> 		    
		    <button type="button" v-on:click="deleteStock">ストック記事を全部削除する</button>
			
			<button type="button" v-on:click="deleteSelectedStock()">選択した記事をストックから削除する</button>
			
		</div>

    </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash';

export default {  
	data () {
	    return {
	      suggestKeywords: [], //キーワード候補の格納用
	      allArticleData:[], //Qiitaから取得する全データの格納用
	      searchBoxContent: "", 
	      searchBox:"",
	      searchBoxContentArray:[],
	      allArticleDataForDisplay:[], //表示する記事データ格納用
	      sortType: "relationSort",
	      allArticleDataSorted: [],//並べ替え後のデータ格納用
	      pageNum: 1,//ページネーションの現在ページ
	      allArticleDataStocked: [],//isStockプロパティを含むQiitaから取得した全データ 
	      //domain:"",
	      domain:"qiita",
	      isOtherDomainSearchResultDisplay: false,//検索結果の表示切り替え用
	      isQiitaSearchResultDisplay:false,//検索結果の表示切り替え用。trueでqiitaの検索結果が表示される
	      storedSearchKeywords:[],//検索ボックスの内容を一時保存する配列
	      allStockedData:[],//永続化されたstockedArticles[]のコピー配列。データを削除する際の一時保存用
	      //allStockedData:"",//永続化されたstockedArticles[]のコピー配列。データを削除する際の一時保存用
	    }
	},
	watch:{           		
		suggestKeywords:function(){       	      
	      //検索ボックスの内容は、フォーカスが外れる直前の検索ボックスの内容と、今選んだ検索ヒントキーワードを連結させる
	      //ただし、どちらかの配列が空の場合は文字列の前後に空白が入らないように場合分けする
	      if(this.storedSearchKeywords.length === 0){
	      	this.searchBox =  this.suggestKeywords.join(" ");

	      } else if(this.suggestKeywords.length === 0){
	      	this.searchBox =  this.storedSearchKeywords.join(" ");
	      } else{
	      	this.searchBox =  this.storedSearchKeywords.join(" ") + " " + this.suggestKeywords.join(" ");
	      }
	      
	      console.log("this.searchBox");
	      console.log(this.searchBox);
	      console.log("this.storedSearchKeywords");
	      console.log(this.storedSearchKeywords);
	    },
	    searchBox( val ){ 
	      this.searchBoxContent = val;
	      this.searchBoxContentArray = this.searchBoxContent.split(/\s+/);             	      
	    },
	    sortChange:function(){ 	        
	      //データをソートする前に、ディープコピーをとる    
	      let dataStoredArray = _.cloneDeep(this.allArticleDataSorted);
	      
	      //ディープコピーでソートを実行
	      if(this.sortType === "likeSort"){
	        dataStoredArray.sort(likesSortFunc);

	      } else if(this.sortType === "newSort"){
	        dataStoredArray.sort(dateSortFunc);

	      } else {
	      	dataStoredArray = _.cloneDeep(this.allArticleData);	        

	      }      
	      //ソート用の関数を定義
	      function likesSortFunc(a,b){
	        return b.likes_count - a.likes_count;
	      }

	      function dateSortFunc(a,b){
	        return (a.updated_at < b.updated_at ? 1 : -1);
	      }      

	      //ソートしたデータをリアクティブな配列に格納
	      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
	      for(let j=0; j<dataStoredArray.length; j++){
	        this.allArticleDataSorted.push(dataStoredArray[j]);
	      }       
	      this.onchange(this.pageNum);
	      
	    }
	    
	},
	computed:{    
	    sortChange(){      
	      return this.sortType;

	    },          
	    obtainStockedArticles(){//checked      
	    	//永続化された記事ストック用配列のデータを値渡しでコピーする
	    	this.allStockedData = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);	    	

			console.log("this.allStockedData");
	    	console.log(this.allStockedData);
	    	return this.allStockedData;
	    },
	},
	methods:{
		
		doOnBlur(){
			//検索ボックスの内容を一時保存するための配列を初期化する			
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);
			//フォーカスが外れる直前の検索ボックスの内容を一時保存用の配列に格納する
			for(let j=0; j<this.searchBoxContentArray.length; j++){
		        this.storedSearchKeywords.push(this.searchBoxContentArray[j]);
		    }
		    console.log("this.storedSearchKeywords");
			console.log(this.storedSearchKeywords);
			//検索ボックスの内容を退避させたら、ヒントキーワードを格納する配列を空にする			
			this.suggestKeywords.splice(-this.suggestKeywords.length);
		},
		/*
		showBodyText(element){ //記事ボディの内容をチェックするためのメソッド
			//alert(element.body);
			console.log("element.body");
			console.log(element.body);

			console.log("element.rendered_body");
			console.log(element.rendered_body);

		},
		*/
		deleteStock(){
	      this.$store.commit('persistedParameter/deleteStockedArticles');      

	    },
	    addStockArray(element){
	    	//押下された要素を特定する
	    	for(let i=0; i<this.allArticleDataSorted.length; i++){
	          if(this.allArticleDataSorted[i].id === element.id){	            
	          	//押下された要素のディープコピーをとる
	            let changeData = _.cloneDeep(this.allArticleDataSorted[i]);

	            this.$store.commit('persistedParameter/changeStockedArticles',changeData);
	            
	          }
	        }
	    },
	    	    
	    deleteCheck(element){
	    	//削除する要素を見つける
	    	if(!element.isStock){
		        for(let i=0; i<this.allStockedData.length; i++){
		          if(this.allStockedData[i].id === element.id){
		            this.allStockedData[i].isStock = true;                                  
		            console.log(`this.allStockedData[${i}].isStock`);
	    			console.log(this.allStockedData[i].isStock);
		          }
		        }
		    } else{
		        for(let i=0; i<this.allStockedData.length; i++){
		          if(this.allStockedData[i].id === element.id){
		            this.allStockedData[i].isStock = false;
		            console.log(`this.allStockedData[${i}].isStock`);
	    			console.log(this.allStockedData[i].isStock);
		            
		          }
		        }
		    }
		    console.log("this.allStockedData");
	        console.log(this.allStockedData);    

	    },
	    deleteSelectedStock(){    		    	

	    	let data = _.cloneDeep(this.allStockedData);

	    	console.log("data");
	    	console.log(data);

	    	this.$store.commit('persistedParameter/deleteStockItems',data);
	    	
	    },
	   
	    onchange( page ){     
	      this.pageNum = page;
	      let data = this.getRangeByPage(page);

	      //表示用配列の初期化
	      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);
	      for(let j=0; j<data.length; j++){
	        this.allArticleDataForDisplay.push(data[j]);
	      } 
	     
	    },
	    getRangeByPage( page ){
	       //1ページの表示数
	       const SIZE = 10;       
	       const dataStoredArray = _.cloneDeep(this.allArticleDataSorted);	      

	       return dataStoredArray.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
	       
	    },
		async doSearch(){		
			//すでに表示されている検索結果をクリアにする
			this.isQiitaSearchResultDisplay=false;
			this.isOtherDomainSearchResultDisplay=false;

			//検索対象がqiitaの場合
			if(this.domain === "qiita"){
				
	          this.isQiitaSearchResultDisplay=true;	          

	      	  //配列の初期化
		      this.allArticleData.splice(-this.allArticleData.length);
		      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
		      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);
		      this.allArticleDataStocked.splice(-this.allArticleDataStocked.length);
		      
		      //qiitaのAPIを利用することをaxiosに伝える
		      this.$store.commit("persistedParameter/changeUsedAPI","qiita");

		      let urlParameter ='';
		      let url ='';      
		      const pageMax = 5;
		      //pageMaxの決め方
		      /*
		      Qiitaから取得する記事数の最大値(予想)は、現状で約500件
		      title:未経験 478
		      title:転職 269

		      QiitaAPIマニュアルよりper_page=100(MAX)なので、pageMax=5としておけば必要な記事をすべて取得できる
		      pageMax=5
		      per_page=100 
		      */
		      
		      for(let i=0; i<this.searchBoxContentArray.length; i++){
		        if(i === this.searchBoxContentArray.length-1 ){
		          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i];
		        } else{
		          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i] + "+";
		        }        
		      }            
		      url = "https://qiita.com/api/v2/items?query=" + urlParameter;      
		      
		      let resultAddedIsStock=[];
		      let resultAddedIsStock_1=[];
		      let resultAddedIsStock_2=[];
		      let resultAddedIsStock_3=[];

		      for(let i=0; i<pageMax; i++){
		        url = "https://qiita.com/api/v2/items?query=" + urlParameter + `&page=${i+1}&per_page=100`;
		        let result = await this.$axios.$get(url);       
		        if(result===[]){
		          break;
		        }

		        for(let j=0; j<result.length; j++){         
		          //isStockプロパティを付与した配列を作成          	          		                

		          //qiitaから取得したデータをディープコピーする
		          resultAddedIsStock_1[j] = _.cloneDeep(result[j]); 		          
		          resultAddedIsStock_1[j].isStock = false;
		          resultAddedIsStock_1[j].articleNumber = j;

		          this.allArticleDataStocked.push(resultAddedIsStock_1[j]);		          
		        }

		        for(let j=0; j<result.length; j++){         
		          //isStockプロパティを付与した配列を作成          	          		                

		          //qiitaから取得したデータをディープコピーする
		          resultAddedIsStock_2[j] = _.cloneDeep(result[j]); 		          
		          resultAddedIsStock_2[j].isStock = false;
		          resultAddedIsStock_2[j].articleNumber = j;

		          this.allArticleData.push(resultAddedIsStock_2[j]);		          
		        }

		        for(let j=0; j<result.length; j++){         
		          //isStockプロパティを付与した配列を作成          	          		                

		          //qiitaから取得したデータをディープコピーする
		          resultAddedIsStock_3[j] = _.cloneDeep(result[j]); 		          
		          resultAddedIsStock_3[j].isStock = false;
		          resultAddedIsStock_3[j].articleNumber = j;

		          this.allArticleDataSorted.push(resultAddedIsStock_3[j]);		          
		        }		        

		      }                
		      console.log("this.allArticleDataSorted");
		      console.log(this.allArticleDataSorted);

		      let dataPage1 = this.getRangeByPage(1);
		      
		      for(let j=0; j<dataPage1.length; j++){
		        this.allArticleDataForDisplay.push(dataPage1[j]);      
		      }  

		    //検索対象のドメインがqiita以外の場合  
			} else {

				this.isOtherDomainSearchResultDisplay=true;

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
		    }

		},
	},
}
</script>