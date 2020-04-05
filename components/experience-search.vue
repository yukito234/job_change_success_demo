<template>
	<div>		
		<br>
		<br>
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
	    <h3>step2.ドメインを選ぶ</h3>
	    <p>検索したいドメインを選んでください。</p>
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
	    <p>step2で選んだドメインを対象に検索を行います。<br>ここでは検索したいキーワードを直接入力することもできます。<br>こちらの検索ボックスに入力されているキーワードをすべてタイトルに含む記事が表示されます。</p>
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
		          <!--<th>URL</th>-->	          
		        </tr>
		  	  </thead>
		  	  <tbody>                
	        	<tr v-for="element in allArticleData" v-bind:key="element.link">
	          	  <td>
	          	  	<a v-bind:href="element.link">{{ element.title }}</a>
	          	  </td>
	          	  <!--
	          	  <td>
	          	  	{{ element.link }}
	          	  </td>
	          	  -->
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
		        <tr v-for="(element,index) in allArticleDataForDisplay" v-bind:key="element.id">
		          <td>		            
		            <button type="button" v-on:click="addStockArray(element)">ストック</button>
		          </td>		          
		          <td>
		            <!--
		            	{{ element.articleNumber+1 }} 
		            	{{ (index+1)+(pageNum-1)*10 }}
		            -->           
		            {{ (index+1)+(pageNum-1)*perPage }}
		          </td>
		          <td>
		            {{ element.updated_at.slice(0,10) }}
		          </td>
		          <td>
		          	<a v-bind:href="element.url" >{{ element.title }}</a>
		          </td>
		          <!--
		          <td>
		            <button type="button" v-on:click="showBodyText(element)">表示</button>
		            {{ element.body }}
		          </td>
		          -->
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
		      <!--
		      <el-pagination background layout="prev, pager, next" v-bind:total="allArticleData.length" v-bind:page-size="10" @current-change="onchange">
		      </el-pagination>
		  		-->
		  	  <el-pagination background layout="prev, pager, next" v-bind:total="allArticleData.length" v-bind:page-size="getPerPage" @current-change="onchange">
		      </el-pagination>
		    </div>
		    <br> 
		    <br> 
		    <p>1ページの表示件数を変更する</p>
		    <p>表示件数を入力してください</p>
		    <!--<input type="number" v-model.number="perPage">-->
		    <input type="number" v-model.number="perPageOfUserInput">
		    <button type="button" v-on:click="changePerPage()">表示件数を変更する</button>
		    <br> 
		    <button type="button" v-on:click="displayAllArticles()">全件表示する</button>
		    <br>
		    <br>
		    <p>{{ perPage }}</p>		    
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
	      perPage:10,//現在の1ページあたりの記事表示数
	      perPageOfUserInput:10,//ユーザが入力した表示数の一時保存用
	      suggestKeywords: [], //キーワード候補の格納用
	      allArticleData:[], //QiitaやGoogleのAPIから取得する全検索結果データの格納用
	      searchBoxContent: "", //検索ボックスの内容確認用(この変数は不要かも)
	      searchBox:"", //検索ボックスの内容
	      searchBoxContentArray:[],//検索ボックスの複合キーワードを分割して格納する配列
	      allArticleDataForDisplay:[], //検索結果として表示する記事データ格納用
	      sortType: "relationSort",//検索結果の表示方法
	      allArticleDataSorted: [],//sortTypeに従って並べ替えられた後の記事データ格納用
	      pageNum: 1,//ページネーションの現在ページ
	      allArticleDataStocked: [],//isStockプロパティを含むQiitaから取得した全データ格納用(この変数は不要かも) 
	      
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
	    sortChange:function(){ 	        
	      //データをソートする前に、ディープコピーをとる    
	      let dataStoredArray = _.cloneDeep(this.allArticleDataSorted);
	      
	      //ディープコピーでソートを実行
	      //いいね順
	      if(this.sortType === "likeSort"){
	        dataStoredArray.sort(likesSortFunc);

	      //新着順  
	      } else if(this.sortType === "newSort"){
	        dataStoredArray.sort(dateSortFunc);

	      //Qiitaからデータを取得したときのデフォルト状態（関連順）  
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
	      //いったん初期化
	      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
	      for(let j=0; j<dataStoredArray.length; j++){
	        this.allArticleDataSorted.push(dataStoredArray[j]);
	      }       
	      //現在ページの表示データを更新する
	      this.onchange(this.pageNum);
	      
	    }
	    
	},
	computed:{    
		getPerPage(){
			//現在のページ番号を返す
			console.log("this.perPage in computed");
			console.log(this.perPage);
			console.log(typeof this.perPage);			
			return this.perPage;
		},
	    sortChange(){
	      //現在の記事表示順を返す      
	      return this.sortType;

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

		displayAllArticles(){
			//全件表示ボタンがクリックされたとき、１ページ目に全データを表示させる

			//1ページあたりの表示数をqiita取得の全データ数とする
			this.perPage = this.allArticleDataSorted.length;
			console.log("this.perPage");
	    	console.log(this.perPage);
	    	this.onchange( 1 );

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
		/*
		//記事の本文の内容を確認するためのメソッド
		showBodyText(element){ 
			//alert(element.body);
			console.log("element.body");
			console.log(element.body);

			console.log("element.rendered_body");
			console.log(element.rendered_body);

		},
		*/
		deleteStock(){
		  //ストック記事をすべて削除する	
	      this.$store.commit('persistedParameter/deleteStockedArticles');      

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
	    	    
	    deleteCheck(element){
	    	//ストック記事の削除用チェックボックスがチェックされた場合の挙動

	    	//チェックされた要素を見つけてトグルする   	
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
	    	//記事の選択削除ボタンがクリックされた場合の挙動

	    	let data = _.cloneDeep(this.allStockedData);
	    	console.log("data");
	    	console.log(data);

	    	//永続化されたストック記事を削除する
	    	this.$store.commit('persistedParameter/deleteStockItems',data);
	    	
	    },
	    changePerPage(){
	    	//ユーザによって、１ページあたりの記事表示数が変更された場合の挙動

	    	//ユーザが入力した表示数を現在の表示数とする
			this.perPage = this.perPageOfUserInput;

			//表示数を変更した場合に、最後のページの番号を求める
			let lastPage = Math.ceil(this.allArticleDataSorted.length/this.perPage);
			console.log("lastPage");
			console.log(lastPage);

			//現在表示しているページが、表示数変更後に存在しなくなる場合は、最終ページを表示する
			//それ以外の場合は、今のページを表示したまま、データだけ適切なものに変更する
			if( this.pageNum > lastPage ){

				this.onchange( lastPage );
			} else {

				this.onchange( this.pageNum );
			}					

		},	   
	    onchange( page ){
	      //ページネーションのページ番号ボタンがクリックされたときの挙動

	      //クリックされたページ番号を現在ページとする
	      this.pageNum = page;

	      //現在ページの表示に必要なデータを取得する
	      let data = this.getRangeByPage(page);

	      //表示用配列の初期化
	      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);

	      //リアクティブな表示用配列に必要なデータを格納する
	      for(let j=0; j<data.length; j++){
	        this.allArticleDataForDisplay.push(data[j]);
	      } 
	     
	    },
	    getRangeByPage( page ){

	       //現在の1ページの表示数を切り出すサイズとする
	       const SIZE = this.perPage;

	       //現在のリアクティブな全記事データのコピーをとる
	       const dataStoredArray = _.cloneDeep(this.allArticleDataSorted);

	       //全記事データから現在のページの表示に必要なデータのみを切り出して返す	      
	       return dataStoredArray.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);	       
	       
	    },
		async doSearch(){		
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
		      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);
		      this.allArticleDataStocked.splice(-this.allArticleDataStocked.length);
		      
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
		      let resultAddedIsStock_1=[];
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

		      //最初は１ページ目に１０件の検索結果を表示する
		      let dataPage1 = this.getRangeByPage(1);
		      
		      //表示用配列に必要なデータを入れる
		      for(let j=0; j<dataPage1.length; j++){
		        this.allArticleDataForDisplay.push(dataPage1[j]);      
		      }  

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
		    }

		},
	},
}
</script>