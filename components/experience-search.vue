<template>
	<div>				
    	<h2>体験記を探す</h2>    	
    	<p>以下のstep1~step3の手順に従って検索をかけることで
    		<br>転職成功者の体験記を効率よく見つけることができます。ぜひ使ってみてください。
    	</p>
    	<h3>step1.キーワードを選ぶ</h3>
    	<p>検索したいキーワードにチェックを入れてください。
    		<br>以下のキーワードは体験記の記事タイトルによく使われているので
    		<br>検索のヒントとしてご利用ください。
    		<br>キーワードが候補になければ、そのままstep2に進んでください。
    		<br>ここで選んだキーワードは下の検索ボックスに反映されます。
    	</p>
    	<b-form-group label="検索のヒント:">
	      <b-form-checkbox-group	        
	        v-model="suggestKeywords"
	        :options="optionsOfsuggestKeywords"	        
	      ></b-form-checkbox-group>
	    </b-form-group>
	    <p>チェックを入れたキーワード:{{suggestKeywords}}</p>

    	
	    
	    <h3>step2.ドメインを選ぶ</h3>
	    <p>検索したいドメインを選んでください。</p>


	    <b-form-select v-model="domain" :options="optionsOfDomain"></b-form-select>
	    <p>検索対象のドメイン:{{ domain }}</p>

	   

	    
	    <h3>step3.検索を開始</h3>
	    <p>step2で選んだドメインを対象に検索を行います。<br>ここでは検索したいキーワードを直接入力することもできます。<br>こちらの検索ボックスに入力されているキーワードをすべてタイトルに含む記事が表示されます。</p>
	    

	    <b-form-input v-model.trim="searchBox" v-on:blur="doOnBlur()" placeholder="検索ワードを直接入力できます"></b-form-input>
	    <p>検索ボックスの内容(searchBoxContent):{{ searchBoxContent }}</p>

	    
    	

    	<b-button variant="primary" v-bind:disabled="loading" v-on:click="doSearch">
		    <b-spinner small v-show="loading"></b-spinner>
		    <span v-show="loading">Loading...</span>
		    <span v-show="!loading">検索する</span>
		</b-button>


    	<!--<b-spinner label="Loading..." v-show="loading"></b-spinner>-->

    	<div  v-show="!loading">
    		<!--
    		<div  v-show="!loading">
    		-->
	    	<div v-if="isOtherDomainSearchResultDisplay">
	    		<b-table 			      
			      :items="allArticleData" 
			      :fields="fieldsOfGoogleSearch"
			      responsive="sm"			      			      
			    >
				    <template v-slot:cell(index)="data">
			        	{{ data.index + 1 }}
			        </template>
				    <template v-slot:cell(titleLink)="data">
				        <a v-bind:href="data.item.link">{{data.item.title}}</a>			        
				    </template>

				</b-table>

				
			</div>

			<div v-if="isQiitaSearchResultDisplay">
				<h3>検索結果: {{allArticleDataSorted.length}} 件のデータを取得しました</h3>
				<b-pagination
			      v-model="currentPage"
			      :total-rows="rows"
			      :per-page="perPageOfBootstrap"
			      aria-controls="my-table"
			    ></b-pagination>

			    <p class="mt-3">Current Page: {{ currentPage }}</p>

				<b-table
				  id="my-table" 			      
			      :items="allArticleDataSorted" 
			      :per-page="perPageOfBootstrap"
			      :current-page="currentPage"
			      :fields="fieldsOfQiitaSearch"
			      responsive="sm"
			      :sort-compare="mySortCompare"
			      
	      		  
	      		  :sort-direction="sortDirection"			      			      
			    >
			    <!--:sort-desc.sync="sortDesc" :sort-by.sync="sortBy"-->
				    <template v-slot:cell(index)="data">
			        	<!--{{ data.index + 1 }}-->
			        	{{ (data.index+1)+(currentPage-1)*perPageOfBootstrap }}
			        </template>
			        <template v-slot:cell(updated)="data">
			        	{{ data.item.updated_at.slice(0,10)}}
			        </template>

				    <template v-slot:cell(titleLink)="data">
				        <a v-bind:href="data.item.url">{{data.item.title}}</a>			        
				    </template>
				    <template v-slot:cell(stockButton)="data">
			        	<b-button variant="outline-primary" v-on:click="addStockArray(data.item)">ストック</b-button>
			        </template>

				</b-table>

				
			    

			    <p>1ページの表示件数を変更する</p>
			    <p>表示件数を入力してください</p>

			    <b-form-input :type="number" v-model.number="perPageOfUserInput" placeholder="表示件数を入力"></b-form-input>
			    <b-button variant="primary" v-on:click="changePerPage()">
				    表示件数を変更する
				</b-button>
				 <b-button variant="primary" v-on:click="displayAllArticles()">
				    全件表示する
				</b-button>

			    	    
			    <p>{{ perPageOfBootstrap }}</p>
			    
			    <p>以下の記事がストックされています</p>

			    <b-table 			      
			      :items="obtainStockedArticles" 
			      :fields="fieldsOfStockedArticles"
			      responsive="sm"			      			      
			    >
			    	<template v-slot:cell(titleLink)="data">
				        <a v-bind:href="data.item.url">{{data.item.title}}</a>			        
				    </template>
				    <template v-slot:cell(deleteButton)="data">
			        	<b-button variant="outline-primary" v-on:click="deleteStockArray(data.item)">削除</b-button>
			        </template>

				</b-table>
				<b-button variant="primary" v-on:click="deleteStock">
				    ストック記事を全部削除する
				</b-button>

				

			    
				
			</div>
		</div>

    </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash';

export default {  
	data () {
	    return {
	      
          fieldsOfStockedArticles:[
          	{
	          key:'titleLink',
	          label:'記事タイトル',
	        },
	        {
	          key:'deleteButton',
	          label:'削除',
	        },

          ],
          loading:false,
	      currentPage: 1,
	      perPageOfBootstrap: 8,
	      fieldsOfQiitaSearch:[
	      		
	      		{
		          key:'index',
		          label:'',
		        },
		        {
		          key:'updated',
		          label:'更新日',
		          sortable: true,
		          sortDirection: 'asc'
		        },
	      				        
		        {
		          key:'titleLink',
		          label:'記事タイトル',
		        },
		        {
		          key:'likes_count',
		          label:'いいね数',
		          sortable: true,
		          sortDirection: 'desc',
		        },
		        {
		          key:'stockButton',
		          label:'ストック',
		        },
		  ],
	      fieldsOfGoogleSearch:[
	      		{
		          key:'index',
		          label:'',
		        },
	      				        
		        {
		          key:'titleLink',
		          label:'記事タイトル',
		        },
		  ],
	      searchBoxOfBootstrap:"",
	     
	      optionsOfDomain:[
	      	{ value: 'qiita', text: 'qiita' },
	      	{ value: 'hatenablog', text: 'hatenablog' },
	      	{ value: 'note', text: 'note' },
	      	{ value: 'others', text: 'qiita,hatenablog,note以外' },

	      ],	
	      optionsOfsuggestKeywords:[
		      { text: '未経験', value: '未経験' },
	          { text: '転職', value: '転職' },
	          { text: 'web', value: 'web' },
	          { text: 'エンジニア', value: 'エンジニア' },
	          { text: '成功', value: '成功' },
	          { text: '体験', value: '体験' },
	          { text: '自社開発', value: '自社開発' },
	          { text: 'フロントエンド', value: 'フロントエンド' },
	          { text: 'バックエンド ', value: 'バックエンド ' },

	      ],
	     
	      perPageOfUserInput:10,//ユーザが入力した表示数の一時保存用
	      suggestKeywords: [], //キーワード候補の格納用
	      allArticleData:[], //QiitaやGoogleのAPIから取得する全検索結果データの格納用
	      searchBoxContent: "", //検索ボックスの内容確認用(この変数は不要かも)
	      searchBox:"", //検索ボックスの内容
	      searchBoxContentArray:[],//検索ボックスの複合キーワードを分割して格納する配列
	      
	      allArticleDataSorted: [],//sortTypeに従って並べ替えられた後の記事データ格納用
	      
	      //allArticleDataStocked: [],//isStockプロパティを含むQiitaから取得した全データ格納用(この変数は不要かも) 
	      
	      domain:"qiita",//検索対象のドメイン（googleのAPIを用いない場合は不要）
	      isOtherDomainSearchResultDisplay: false,//検索結果の表示切り替え用。qiita以外のドメインを検索する場合にtrueになる
	      isQiitaSearchResultDisplay:false,//検索結果の表示切り替え用。trueでqiitaの検索結果が表示される
	      storedSearchKeywords:[],//検索ボックスの内容を一時保存する配列
	      allStockedData:[],//永続化されたstockedArticles[]のコピー配列。データを削除する際の一時保存用。
	      
	    }
	},
	watch:{           		
		suggestKeywords:function(){       	      
		  //検索ヒントsuggestKeywords[]がチェックされた場合、検索ボックスsearchBoxに反映させる
		  //検索ボックスにカーソルがあたり、その後フォーカスが外れたら、ヒントのチェックボックスを初期化する
		  //このとき、直前の検索ボックスの内容はstoredSearchKeywords[]に退避させておく
		  //ヒントのチェックと直接入力が繰り返し行われることを想定し、
		  //検索ボックスの内容はヒントsuggestKeywords[]と、storedSearchKeywords[]を連結させたものとする	     
	      //ただし、どちらかの配列が空の場合は文字列の前後に空白が入らないように場合分けで対処する

	      //まだ検索ボックスにカーソルがあたっていない場合    
	      if(this.storedSearchKeywords.length === 0){

	      	//選択されたヒントのキーワードを連結させるだけでOK
	      	this.searchBox =  this.suggestKeywords.join(" ");

	      //検索ボックスにカーソルがあたったが、ヒントが１つもチェックされていない場合	
	      } else if(this.suggestKeywords.length === 0){
	      	//カーソルが外れる直前の内容が検索ボックスの中身となる
	      	this.searchBox =  this.storedSearchKeywords.join(" ");

	      //ヒントが１つ以上チェックされ、なおかつ検索ボックスにカーソルがあたってから外れた場合
	      } else {
	      	this.searchBox =  this.storedSearchKeywords.join(" ") + " " + this.suggestKeywords.join(" ");
	      }
	      
	      console.log("this.searchBox");
	      console.log(this.searchBox);
	      console.log("this.storedSearchKeywords");
	      console.log(this.storedSearchKeywords);
	    },
	    searchBox( val ){ 
	      //検索ボックスの内容確認
	      this.searchBoxContent = val;
	      //検索ボックスの内容を空白で区切って、検索ワードを配列に格納する
	      this.searchBoxContentArray = this.searchBoxContent.split(/\s+/);             	      
	    },
	    
	    
	},
	computed:{    
		rows() {
	        return this.allArticleDataSorted.length;
	    },
	   
	    obtainStockedArticles(){ 
	        //ユーザがストックしている記事データを返す
	    	//永続化された記事ストック用配列のデータを値渡しでコピーする
	    	this.allStockedData = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);	    	

			console.log("this.allStockedData");
	    	console.log(this.allStockedData);
	    	return this.allStockedData;
	    },
	},
	methods:{
		mySortCompare(a, b, key, sortDesc){
			if (key === 'updated') {
							

				return (a.updated_at < b.updated_at ? 1 : -1);

				

			} 

		},
		displayAllArticles(){
			//全件表示ボタンがクリックされたとき、１ページ目に全データを表示させる

			//1ページあたりの表示数をqiita取得の全データ数とする			
			this.perPageOfBootstrap = this.allArticleDataSorted.length;
			
			

		},
		doOnBlur(){
			//検索ボックスからフォーカスが外れたときに実行される

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
		
		deleteStock(){
		  //ストック記事をすべて削除する	
	      this.$store.commit('persistedParameter/deleteStockedArticles');      

	    },
	    deleteStockArray(element){

	    	//押下された要素を特定する
	    	for(let i=0; i<this.allStockedData.length; i++){
	          if(this.allStockedData[i].id === element.id){
	          	//削除する要素のフラグをtrueに変更
	          	this.allStockedData[i].isStock = true;	          	
	                                           
	            console.log(`this.allStockedData[${i}]`);
    			console.log(this.allStockedData[i]);
    			
	          }
	        }
	        let deleteData = _.cloneDeep(this.allStockedData);
	        this.$store.commit('persistedParameter/deleteSingleStockedArticle',deleteData);
	    	

	    },
	    addStockArray(element){
	    	//記事をブラウザに保存して永続化させる
	    	//後で読みたい記事をストックしておける

	    	//押下された要素を特定する
	    	for(let i=0; i<this.allArticleDataSorted.length; i++){
	          if(this.allArticleDataSorted[i].id === element.id){	            
	          	//押下された要素のディープコピーをとる
	            let changeData = _.cloneDeep(this.allArticleDataSorted[i]);

	            this.$store.commit('persistedParameter/changeStockedArticles',changeData);
	            
	          }
	        }
	    },
	    	    
	    
	   
	    changePerPage(){
	    	//ユーザによって、１ページあたりの記事表示数が変更された場合の挙動

	    	//ユーザが入力した表示数を現在の表示数とする		
			this.perPageOfBootstrap = this.perPageOfUserInput;

						

		},	   
		
		async doSearch(){		
			//loadingアニメーションの実行
			this.loading = true;

			//検索を実行する

			//すでに表示されている検索結果をクリアにする
			this.isQiitaSearchResultDisplay=false;
			this.isOtherDomainSearchResultDisplay=false;

			//検索対象ドメインがqiitaの場合
			if(this.domain === "qiita"){
				
	          this.isQiitaSearchResultDisplay=true;	          

	      	  //配列の初期化
		      this.allArticleData.splice(-this.allArticleData.length);
		      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
		      //this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);
		      //this.allArticleDataStocked.splice(-this.allArticleDataStocked.length);
		      
		      //qiitaのAPIを利用することをaxios.jsに伝える
		      //axios.jsでは、このusedAPIフラグにてどのAPIとやり取りをしているのかを判断し、
		      //ヘッダーにトークン情報を付加して通信する
		      this.$store.commit("persistedParameter/changeUsedAPI","qiita");

		      let urlParameter ='';
		      let url ='';      
		      const pageMax = 5;
		      //pageMaxの決め方
		      /*
		      Qiitaから取得する体験記の記事数の最大値(予想)は、現状で約500件
		      以下はQiitaで実際に検索をかけたときの検索キーワードと取得記事数
		      title:未経験・・・478件
		      title:転職・・・269件
		      実際には500件を超える可能性もあるが、ユーザが表示方法や検索キーワードを変えずに
		      すべての（500件以上の）記事をチェックする可能性は低いので、これで問題ないと考える

		      QiitaAPIマニュアルよりper_page=100(MAX)なので、pageMax=5としておけば必要な記事をすべて取得できる
		      pageMax=5
		      per_page=100 
		      */
		      
		      //検索ボックスのキーワードを取得
		      //タイトルにすべてのキーワードを含む記事のみを検索対象とする
		      for(let i=0; i<this.searchBoxContentArray.length; i++){
		        if(i === this.searchBoxContentArray.length-1 ){
		          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i];
		        } else{
		          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i] + "+";
		        }        
		      }            
		      url = "https://qiita.com/api/v2/items?query=" + urlParameter;      
		      
		      //ここからは冗長な処理を含む
		      //後で取得した記事がユーザにストックされることを想定し、取得した各記事データにisStockフラグを設置する(最初はfalse)
		      //その際に、取得した生のデータを変更したくないので、元データのコピー用配列を準備しておく
		      //以下に４つの配列を用意しているのは、エラー解決のために使用したからである
		      //今後４つのうち３つは削除予定
		      let resultAddedIsStock=[];
		      //let resultAddedIsStock_1=[];
		      let resultAddedIsStock_2=[];
		      let resultAddedIsStock_3=[];

		      //APIにアクセスして検索結果を取得する
		      for(let i=0; i<pageMax; i++){
		        url = "https://qiita.com/api/v2/items?query=" + urlParameter + `&page=${i+1}&per_page=100`;
		        let result = await this.$axios.$get(url);       

		        //取得数が上限の500件未満の場合は、途中でQiitaから空配列が返ってくるので、
		        //その時点で、必要なデータをゲットできたと判断し、取得処理を中止する
		        if(result===[]){
		          break;
		        }

		        //以下３種類の配列に同じ検索結果を格納しているが（エラー解決のため）、実際は１つだけでOKなはず
		        /*
		        for(let j=0; j<result.length; j++){         
		          //isStockプロパティを付与した配列を作成          	          		                

		          //qiitaから取得したデータをディープコピーする
		          resultAddedIsStock_1[j] = _.cloneDeep(result[j]); 		          
		          resultAddedIsStock_1[j].isStock = false;
		          resultAddedIsStock_1[j].articleNumber = j;

		          this.allArticleDataStocked.push(resultAddedIsStock_1[j]);		          
		        }
		        */

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

		     
		      
		      //アニメーションを停止
		      this.loading = false;  

		    //検索対象のドメインがqiita以外の場合  
			} else {


				//googleのAPIを用いて、指定したドメインにおける検索結果を取得する
				//ただし、無料使用の場合、１日１００クエリという厳しい制限があるので
				//今後機能を削除する可能性あり
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

		      	this.loading = false;
		    }

		},
	},
}
</script>