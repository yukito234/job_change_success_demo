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
	    
	    <b-icon icon="x" v-on:click="deleteSearchBoxContent()"></b-icon>       	    	        	

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
	    		<!--<p v-if="isAPIError">Googleから記事を取得する際にエラーが発生しました。</p>-->
	    		<p v-if="checkAPIError">Googleから記事を取得する際にエラーが発生しました。</p>

	    		<div v-if="!checkAPIError">
		    		<no-search-result v-if="getIsSearchResult"></no-search-result>

		    		<!--
		    		<div v-if="getIsSearchResult">
						<h3>上記のキーワードをタイトルに含む記事は見つかりませんでした。</h3>
						<p>検索キーワードを減らしたり、別のキーワードを選ぶなどして再検索してください！</p>
					</div>
					-->
					<div v-if="!getIsSearchResult">
			    		<b-table 			      
					      :items="allArticleDataSorted" 
					      :fields="fieldsOfGoogleSearch"
					      responsive="sm"			      			      
					    >
						    <template v-slot:cell(index)="data">
					        	{{ data.index + 1 }}
					        </template>
						    <template v-slot:cell(titleLink)="data">
						        <a v-bind:href="data.item.link">{{data.item.title}}</a>			        
						    </template>
						    <template v-slot:cell(stockButton)="data">
					        	<b-button variant="outline-primary" v-on:click="addStockArrayInGoogleSearch(data.item)">ストック</b-button>
					        </template>

						</b-table>
					</div>
				</div>
				
			</div>

			<div v-if="isQiitaSearchResultDisplay">
				<!--<p v-if="isAPIError">Qiitaから記事を取得する際にエラーが発生しました。</p>-->
				<p v-if="checkAPIError">Qiitaから記事を取得する際にエラーが発生しました。</p>

				<div v-if="!checkAPIError">

					<no-search-result v-if="getIsSearchResult"></no-search-result>
					<!--
					<div v-if="getIsSearchResult">
						<h3>上記のキーワードをタイトルに含む記事は見つかりませんでした。</h3>
						<p>検索キーワードを減らしたり、別のキーワードを選ぶなどして再検索してください！</p>
					</div>
					-->
					<div v-if="!getIsSearchResult">					
						<h3>検索結果: {{rows}} 件のデータを取得しました</h3>
						<!--
							<h3>検索結果: {{allArticleDataSorted.length}} 件のデータを取得しました</h3>
							<h3>検索結果: {{getNumberOfSearchResult}} 件のデータを取得しました</h3>
						-->
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
					    >
					    <!--
					    	:sort-direction="sortDirection"
					    	:sort-desc.sync="sortDesc" 
					    	:sort-by.sync="sortBy"

					    -->
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

					    <!--<b-form-input :type="number" v-model.number="perPageOfUserInput" placeholder="表示件数を入力"></b-form-input>-->
					    <b-form-input type="number" v-model.number="perPageOfUserInput" placeholder="表示件数を入力"></b-form-input>

					    <b-button variant="primary" v-on:click="changePerPage()">
						    表示件数を変更する
						</b-button>
						 <b-button variant="primary" v-on:click="displayAllArticles()">
						    全件表示する
						</b-button>
					    	    
					    <p>{{ perPageOfBootstrap }}</p>
					</div>
				</div>

			</div>    

			    <h2>ストック記事の一覧</h2>
			    <p>以下の記事がストックされています</p>

			    <b-table 			      
			      :items="obtainStockedArticles()" 
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
</template>

<script>
/* eslint-disable */
import _ from 'lodash';
import {  BIcon, BIconX } from 'bootstrap-vue';
import NoSearchResult from '~/components/no-search-result.vue'; 

export default {  
	
	components: {
	    BIcon,
    	BIconX,
    	'no-search-result': NoSearchResult,
	},
	
	data () {
	    return {
	      isAPIError:false,
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
          loading:false,//検索ボタンクリック時のアニメーションや結果表示タイミングの制御用
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
		        {
		          key:'stockButton',
		          label:'ストック',
		        },
		  ],
	      //searchBoxOfBootstrap:"",
	     
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
	          { text: 'バックエンド', value: 'バックエンド' },

	      ],
	     
	      perPageOfUserInput:10,//ユーザが入力した表示数の一時保存用
	      suggestKeywords: [], //キーワード候補の格納用
	      //allArticleData:[], //QiitaやGoogleのAPIから取得する全検索結果データの格納用
	      //searchBoxContent: "", //検索ボックスの内容確認用(この変数は不要かも)
	      searchBox:"", //検索ボックスの内容
	      searchBoxContentArray:[],//検索ボックスの複合キーワードを分割して格納する配列
	      
	      allArticleDataSorted: [],//記事データ格納用
	      
	      //allArticleDataStocked: [],//isStockプロパティを含むQiitaから取得した全データ格納用(この変数は不要かも) 
	      
	      domain:"qiita",//検索対象のドメイン（googleのAPIを用いない場合は不要）
	      isOtherDomainSearchResultDisplay: false,//検索結果の表示切り替え用。qiita以外のドメインを対象に検索した場合にtrueになる
	      isQiitaSearchResultDisplay:false,//検索結果の表示切り替え用。qiitaで検索したときにtrueとなり、qiitaの検索結果を表示するためのHTMLが表示される
	      storedSearchKeywords:[],//検索ボックスの内容を一時保存する配列
	      
	      //allStockedData:[],
	      //永続化されたstockedArticles[]のコピー配列。データを削除する際の一時保存用。
	      //コピーを取らずに、必要なときに永続化データをgettersで取得してくればいい
	      
	    }
	},
	/*
	created:function(){

		let testArray = [];
		console.log("testArray.length");
		console.log(testArray.length);//0
	},
	*/
	watch:{           		
		suggestKeywords:function(){       	      
		  //検索ヒント配列suggestKeywords[]が変化したら、それを検索ボックスsearchBoxに反映させる

		  //ここで、searchBoxの中身は、suggestKeywords[]とstoredSearchKeywords[]をあわせたものとなる
		  //storedSearchKeywords[]は、検索ボックスからカーソルが外れたときの検索ボックスの中身

		  //storedSearchKeywords[]の役割  
		  //ユーザが検索ヒントの選択と検索ボックスへの直接入力を繰り返すことを想定し、検索ボックスからカーソルが外れた際に、検索ヒントの再選択に備えて、直前の検索ボックスの内容を保持しておく
		  
		  //suggestKeywords[]が空
		  if(this.suggestKeywords.length === 0 && this.storedSearchKeywords.length !== 0){
		  	//検索ボックスの中身は、直前の検索ボックス配列の要素を連結させたもの
		  	this.searchBox =  this.storedSearchKeywords.join(" ");
		  	/*
		  	console.log("suggestKeywords.length === 0");
		  	console.log("this.storedSearchKeywords");
		  	console.log(this.storedSearchKeywords);
		  	console.log("this.searchBox");
		  	console.log(this.searchBox);
		  	console.log("------------------------------");
		  	*/

		  //storedSearchKeywords[]が空	
		  } else if(this.suggestKeywords.length !== 0 && this.storedSearchKeywords.length === 0){
		  	//検索ボックスの中身は、検索ヒント配列の要素を連結させたもの
		  	this.searchBox = this.suggestKeywords.join(" ");
		  	/*
		  	console.log("storedSearchKeywords.length === 0");
		  	console.log("this.suggestKeywords");
		  	console.log(this.suggestKeywords);
		  	console.log("this.searchBox");
		  	console.log(this.searchBox);
		  	console.log("------------------------------");
		  	*/


		  //suggestKeywords[]が空でなく、storedSearchKeywords[]も空でない
		  } else if(this.suggestKeywords.length !== 0 && this.storedSearchKeywords.length !== 0){
		  	//検索ボックスの中身は、2つの配列の要素を連結させたもの
		  	this.searchBox =  this.storedSearchKeywords.join(" ") + " " + this.suggestKeywords.join(" ");
		  	/*
		  	console.log("suggestKeywords.length !== 0 && storedSearchKeywords.length !== 0");
		  	console.log("this.storedSearchKeywords");
		  	console.log(this.storedSearchKeywords);
		  	console.log("this.suggestKeywords");
		  	console.log(this.suggestKeywords);
		  	console.log("this.searchBox");
		  	console.log(this.searchBox);
		  	console.log("------------------------------");
		  	*/

		  	//検索ボックス配列と検索ヒント配列が両方空の場合
		  } else {
		  	//検索ボックスの中身は、空
		  	this.searchBox = "";
		  	//console.log("suggestKeywords.length === 0 && storedSearchKeywords.length === 0");

		  }		  



		 
	    },
	    searchBox( val ){ 

	      //検索ボックスの内容確認      
	      //console.log("val in searchBox");
	      //console.log(val);

	      //検索ボックスが空でない場合
	      if(val !== ""){	     

		      //検索ボックスの内容を半角空白で区切って、検索ワードを配列に格納する	     
	      	  this.searchBoxContentArray = val.split(/\s+/);
		      //console.log("this.searchBoxContentArray in searchBox");
	      	  //console.log(this.searchBoxContentArray);

	      //検索ボックスが空のとき
      	  } else{
      	  	 
      	  	 //console.log("this.searchBoxContentArray before");
      	  	 //console.log(this.searchBoxContentArray);

      	  	 //検索ボックスが空のときは、検索ボックス配列も空にする
      	  	 //これを実行しないと、検索ボックスの文字列を手動で全消去しても、searchBoxContentArrayに1文字だけ残ってしまう
      	  	this.searchBoxContentArray=[];
      	  	//console.log("this.searchBoxContentArray after");
      	  	//console.log(this.searchBoxContentArray);
      	  }
      	  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");	      

	    },
	    
	    
	    
	},
	computed:{    
		rows() {
	        return this.allArticleDataSorted.length;
	    },
	    getIsSearchResult(){
	    	if( this.allArticleDataSorted.length > 0 ){
	    		return false;

	    	} else {

	    		return true;
	    	}
	    },
	    checkAPIError(){
     
	      //return this.$store.getters['persistedParameter/getAPIError'];            
	      //return this.$store.getters['getAPIError'];
	      return this.isAPIError;
	     
	    }  
	    

	   
	},
	methods:{
		obtainStockedArticles(){ 
	        //ユーザがストックしている記事データを返す

	    	//永続化された記事ストック用配列のデータを値渡しでコピーする
	    	//this.allStockedData = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);	    	

	    	//Qiitaのストック記事を取得
	    	const stockedDataInQiita = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);	

	    	console.log("stockedDataInQiita in obtainStockedArticles");
	    	console.log(stockedDataInQiita);

	    	//Googleからストックした記事を取得
	    	const stockedDataInGoogle = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);	

	    	console.log("stockedDataInGoogle in obtainStockedArticles");
	    	console.log(stockedDataInGoogle);

	    	//全ストック記事
	    	const concatArray = stockedDataInQiita.concat(stockedDataInGoogle);

	    	
	    	return concatArray;
	    },
		deleteSearchBoxContent(){
			//検索ボックス内の文字列を全消去
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);
			this.suggestKeywords.splice(-this.suggestKeywords.length);
			//上記２処理の後、watchのsuggestKeywordsにて、this.searchBox = "";が実行される			
			//これにより、watchのsearchBoxにて、this.searchBoxContentArray=[];が実行される
			

		},
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
			//console.log("enter doOnBlur method");

			//検索ボックスの内容を一時保存するための配列を初期化する			
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);

			//フォーカスが外れる直前の検索ボックスの内容を確認
			//console.log("this.searchBoxContentArray");
			//console.log(this.searchBoxContentArray);

			//フォーカスが外れる直前の検索ボックスの内容を一時保存用の配列に格納する
			for(let j=0; j<this.searchBoxContentArray.length; j++){
		        this.storedSearchKeywords.push(this.searchBoxContentArray[j]);
		    }
		    //console.log("this.storedSearchKeywords");
			//console.log(this.storedSearchKeywords);

			//検索ボックスの内容を退避させたら、ヒントキーワードを格納する配列を空にする			
			this.suggestKeywords.splice(-this.suggestKeywords.length);
		},
		
		deleteStock(){
		  //ストック記事をすべて削除する	
	      this.$store.commit('persistedParameter/deleteStockedArticles');      

	    },
	    deleteStockArray(element){

	    	//Qiitaの記事がクリックされた場合
	    	if(element.domain === "qiita"){
	    		//Qiitaのストック記事を取得
	    		const stockedDataInQiita = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticles']);

	    		console.log(`stockedDataInQiita in deleteStockArray`);
    			console.log(stockedDataInQiita);


	    		//押下された要素を特定する
		    	for(let i=0; i<stockedDataInQiita.length; i++){
		          if(stockedDataInQiita[i].id === element.id){
		          	//削除する要素のフラグをtrueに変更
		          	stockedDataInQiita[i].isDelete = true;	          	
		                                           
		            console.log(`stockedDataInQiita[${i}] in deleteStockArray`);
	    			console.log(stockedDataInQiita[i]);
	    			
		          }
		        }

		        this.$store.commit('persistedParameter/deleteSingleStockedArticle',stockedDataInQiita);
		        //const deleteData = _.cloneDeep(stockedDataInQiita);
		        //console.log("deleteData");
		        //console.log(deleteData);
	        	//this.$store.commit('persistedParameter/deleteSingleStockedArticle',deleteData);	

	        	//Googleの記事がクリックされた場合
	    	} else {

	    		//Googleからストックした記事を取得
	    		const stockedDataInGoogle = _.cloneDeep(this.$store.getters['persistedParameter/getStockedArticlesInGoogleSearch']);

	    		console.log(`stockedDataInGoogle in deleteStockArray`);
    			console.log(stockedDataInGoogle);

	    		//押下された要素を特定する
		    	for(let i=0; i<stockedDataInGoogle.length; i++){
		          if(stockedDataInGoogle[i].cacheId === element.cacheId){
		          	//削除する要素のフラグをtrueに変更
		          	stockedDataInGoogle[i].isDelete = true;	          	
		                                           
		            console.log(`stockedDataInGoogle[${i}] in deleteStockArray`);
	    			console.log(stockedDataInGoogle[i]);
	    			
		          }
		        }

		        this.$store.commit('persistedParameter/deleteSingleStockedArticle',stockedDataInGoogle);
		        //const deleteData = _.cloneDeep(stockedDataInGoogle);
		        //console.log("deleteData");
		        //console.log(deleteData);
	        	//this.$store.commit('persistedParameter/deleteSingleStockedArticle',deleteData);

	    	}

	    	
	    	

	    },
	    addStockArrayInGoogleSearch(element){

	    	//Googleの記事をストックする
	    	for(let i=0; i<this.allArticleDataSorted.length; i++){
	          if(this.allArticleDataSorted[i].cacheId === element.cacheId){	            
	          	//押下された要素のディープコピーをとる
	            let changeData = _.cloneDeep(this.allArticleDataSorted[i]);

	            console.log(`this.allArticleDataSorted[${i}] in addStockArrayInGoogleSearch`);
    			console.log(this.allArticleDataSorted[i]);

	            this.$store.commit('persistedParameter/changeStockedArticlesInGoogleSearch',changeData);
	            
	          }
	        }



	    },
	    addStockArray(element){
	    	//記事をブラウザに保存して永続化させる
	    	//後で読みたい記事をストックしておける

	    	//Qiitaの記事をストックする

	    	//押下された要素を特定する
	    	for(let i=0; i<this.allArticleDataSorted.length; i++){
	          if(this.allArticleDataSorted[i].id === element.id){	            
	          	//押下された要素のディープコピーをとる
	            let changeData = _.cloneDeep(this.allArticleDataSorted[i]);

	            console.log(`this.allArticleDataSorted[${i}] in addStockArray`);
    			console.log(this.allArticleDataSorted[i]);

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

			//検索ボックスが空の場合はアラートを出す
			if(this.searchBoxContentArray.length === 0){

				alert("キーワードを入力してください");
				return;
			}

			//loadingアニメーションの実行
			this.loading = true;

			//APIによるデータ取得時のエラーを初期化
			this.isAPIError = false;

			//this.$store.dispatch('APIErrorSetAction',false);

			

			//すでに表示されている検索結果を非表示にする			
			this.isQiitaSearchResultDisplay=false;
			this.isOtherDomainSearchResultDisplay=false;



			let urlParameter ='';
		    let url ='';

		   
		    //APIから取得したデータの格納用
		    let result=[];

		     //resultのコピー用
		    let resultAddedIsStock_3=[];

		    //配列の初期化
		    this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);




			//検索対象ドメインがqiitaの場合
			if(this.domain === "qiita"){
			
				//		
	          this.isQiitaSearchResultDisplay=true;	          

	      	  
		      
		      
		      //qiitaのAPIを利用することをaxios.jsに伝える
		      //axios.jsでは、このusedAPIフラグにてどのAPIとやり取りをしているのかを判断し、
		      //ヘッダーにトークン情報を付加して通信する
		      //ローカルではなく、通常のstoreで問題ないのでは？
		      this.$store.commit("persistedParameter/changeUsedAPI","qiita");

		            
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
		      
		      console.log("url:");
		      console.log(url);

		      //APIを利用して検索結果を取得する
		      for(let i=0; i<pageMax; i++){
		        //     
		        url = "https://qiita.com/api/v2/items?query=" + urlParameter + `&page=${i+1}&per_page=100`;

		       

				let status = await this.$axios.$get(url)
					.then(response =>{
						//responseオブジェクトからstatusを取得できないので、
						//axiosの処理が正常に終了した場合は200を返す
						result = response;
						return 200;
					})
		        	.catch(err => {
		        	  console.log("err");
				      console.log(err);
				      this.isAPIError=true;
				      //result = null;
				      return err.response.status;
				    });


				console.log("status of qiita search");
	      	  	console.log(status);    

		        console.log("result of qiita search");
	      	  	console.log(result);


	      	  	if(status === 200){

			        //取得数が上限の500件未満の場合は、途中でQiitaから空配列が返ってくるので、
			        //その時点で、必要なデータをゲットできたと判断し、取得処理を中止する
			        if(result===[]){
			          break;
			        }

			        

			        for(let j=0; j<result.length; j++){         
			          //isStockプロパティを付与した配列を作成          	          		                

			          //qiitaから取得したデータをディープコピーする
			          resultAddedIsStock_3[j] = _.cloneDeep(result[j]);

			          //ストック記事を削除する際に使うフラグ 		          
			          resultAddedIsStock_3[j].isDelete = false;
			         

			          //ストック記事テーブルから記事を削除する際に、このプロパティを設定しておくと便利なため
	  				  resultAddedIsStock_3[j].domain = "qiita";

			          this.allArticleDataSorted.push(resultAddedIsStock_3[j]);		          
			        }		        			                      

			      
			      console.log("this.allArticleDataSorted of qiita");
			      console.log(this.allArticleDataSorted);

			    } else {
			    	break;

			    }

			  }

		     
		      
		       

		    //検索対象のドメインがqiita以外の場合  
			} else {


				//googleのAPIを用いて、指定したドメインにおける検索結果を取得する
				//ただし、無料使用の場合、１日１００クエリという厳しい制限があるので
				//今後機能を削除する可能性あり
				this.isOtherDomainSearchResultDisplay=true;

				

				

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

		      	//
		      	url = "https://www.googleapis.com/customsearch/v1?key=" + process.env.GOOGLE_API + "&cx=" + process.env.SEARCH_ENGINE_ID + "&q=allintitle:" + "+" + urlParameter;

		      	

	      		console.log("url");
	      		console.log(url);

	      		    		

	      		let status = await this.$axios.$get(url)
					.then(response =>{

						result = response;
						return 200;
					})
		        	.catch(err => {
		        	  console.log("err");
				      console.log(err);
				      this.isAPIError=true;
				      //result = null;
				      return err.response.status;
				    });


				console.log("status of google search");
	      	  	console.log(status);    

		        console.log("result of google search");
	      	  	console.log(result);	      	  	




	      	  	if(status === 200){	      	  		

	      	  		//result.searchInformation.totalResults === "0" の場合はresult.itemsが存在しない
	      	  		//よってresult.items.lengthでエラーが出る
	      	  		//そこで検索結果が0でない場合にのみ以下の処理を行うこととする
	      	  		//検索結果が0の場合は、this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);で配列allArticleDataSortedは初期化されるので、lengthは0となる
	      	  		if(result.searchInformation.totalResults !== "0"){

	      	  		

		      	  		for(let i=0; i<result.items.length; i++){		            
					       

					       resultAddedIsStock_3[i] = _.cloneDeep(result.items[i]);

					       //ストック記事を削除する際に使うフラグを設定 		          
		  				   resultAddedIsStock_3[i].isDelete = false;

		  				   //QiitaのAPI取得データと同じurlプロパティを設定
		  				   //ストック記事をテーブルに表示する際に、urlというプロパティが必要になるため  				   
		  				   resultAddedIsStock_3[i].url = resultAddedIsStock_3[i].link;

		  				   //ストック記事テーブルから記事を削除する際に、このプロパティを設定しておくと便利なため
		  				   resultAddedIsStock_3[i].domain = "otherThanQiita";



					       
					       this.allArticleDataSorted.push(resultAddedIsStock_3[i]);
				      	} 

				      	console.log("this.allArticleDataSorted of google search");
			      		console.log(this.allArticleDataSorted);
			      	}
			      	

	      	  	}


	      		

	      		

	      			      		

		    }
		    //アニメーションを停止
		    this.loading = false;

		},
	},
}
</script>