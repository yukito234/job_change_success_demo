<template>
  <div>
  	<h2>お気に入り記事の登録・削除</h2>    
    <br>
    <br>
    <button v-on:click="addLikeArticle()">お気に入り記事を追加・削除する</button>
    <br>
    <br>
    <div v-if="editFlag">    	
    	<div v-if="this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']">
	        <p>ここでは、お気に入り記事を追加することができます。<br>ここで登録された記事は、プロフィールページに反映されます。<br>記事はあと{{ 3 - this.$store.getters['persistedParameter/getLikeArticleCount'] }}記事まで登録可能です。（最大３記事）</p>
	        <br>
    		<br>
	  		<h3>記事タイトルを入力してください</h3>
	  		<span>必須</span>
	  		<input type="text" v-model="title">
	  		<br>
    		<br>
	  		<h3>URLを入力してください</h3>
	  		<span>必須</span>
	  		<input type="text" v-model="url">
	  		<br>
    		<br>
	  		<h3>この記事は誰におすすめですか？</h3>
	  		<span>必須</span>
	  		<input type="text" v-model="recommendation">
	  		<br>
    		<br>
	  		<h3>自由記述欄</h3>
	  		<p>ここでは、記事の共感ポイントや学びなどを簡単にまとめてください。</p>
	  		<textarea v-model="freeTextArea"></textarea>  		
	  		<br> 
	  		<button v-on:click="registerLikeArticle()">お気に入り記事を登録する</button>
	  		<br>
    		<br>
	  	</div>

	  	<div v-else>
	  		<p>{{errorMessage}}</p>
	  		<p>あなたの登録記事数は、現在{{this.$store.getters['persistedParameter/getLikeArticleCount']}}記事です。</p>
	  		<p>登録記事数の上限は３つまでです。すでに上限に達している場合は、以下より記事を削除してください。</p>

	  	</div>
	  	<div>
	  		<p>削除ボタンを押すと、記事をお気に入りから削除できます。</p>
	  		<p>編集ボタンを押すと、おすすめする人やコメントの修正ができます。</p>
		  	<table border="1">
		      <thead>
		        <tr>
		          <th>削除ボタン</th>          
		          <th>記事タイトル</th>
		          <th>おすすめする人</th>
		          <th>コメント</th>
		        </tr>
		  	  </thead>
		  	  <tbody>		  	  	
		  	  	<!--<tr v-for="(item,index) in likeArticlesData" v-bind:key="item.title">-->
	  	  		<tr v-for="(item,index) in obtainLikeArticlesData" v-bind:key="item.title">
		  	  		<td>		            
		            	<!--<input type="checkbox" v-on:click="deleteCheck(item)" v-model="item.isChecked">-->
		            	<button type="button" v-on:click="deleteLikeArticles(item)">削除</button>                    		            
		          　</td>  	  		
		            <td>
		          		<a v-bind:href="item.url" >{{ item.title }}</a>
		          	</td>
		          	<td>
		          		<p>{{ item.recommendation }}</p>		          		
		          		<button type="button" v-on:click="editRecommendation(item)">編集</button>
		          		<!--<input type="text" v-if="isEditRecommendation" v-model="editedRecommendationContent">-->
		          		<input type="text" v-if="item.isEditRecommendation" v-model="item.editedRecommendationContent">
		          		<button type="button" v-if="item.isEditRecommendation" v-on:click="confirmRecommendation(item)">確定</button>
		          	</td>
		          	<td>
		          		<p>{{ item.free_text_area }}</p>
		          		<button type="button" v-on:click="editFreeTextArea(item)">編集</button>
		          		<input type="text" v-if="item.isEditFreeTextArea" v-model="item.editedFreeTextAreaContent">
		          		<button type="button" v-if="item.isEditFreeTextArea" v-on:click="confirmFreeTextArea(item)">確定</button>
		          	</td>
		  	  	</tr>
		  	  </tbody>
		  	</table>
		  	<br>
		  	<!--<button type="button" v-on:click="deleteSelectedStock()">選択した記事をお気に入りから削除する</button>  -->
		</div>
  	</div>	
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _ from 'lodash';

export default {
	middleware: 'authenticated',  
	data () {
		return {			            
			editFlag:false,//お気に入り記事を追加・削除するのボタンがクリックされるとtrueになる			
			
			title:"",
			url:"",
			recommendation:"",
			freeTextArea:"",
			errorMessage:"",
			likeArticlesData:[],//ログインユーザのお気に入りデータを格納
			likeArticleCount:this.$store.getters['persistedParameter/getLikeArticleCount'],//現在登録しているお気に入り記事数を監視する。各ユーザがお気に入りに登録できる記事数は３記事まで。
			allUsersData:[],
	    }
	},
	computed:{
		obtainLikeArticlesData(){
			return this.likeArticlesData;

		},

	},
	created:function(){
		console.log("this.likeArticleCount");
	    console.log(this.likeArticleCount);

	   //ログインユーザのお気に入り記事データを取得する
		db.collection("like_articles").get()
	      .then((querySnapshot)=>{        
	        querySnapshot.forEach((doc)=>{
	          const data = _.cloneDeep(doc.data());
	          //data.isChecked=false;

	          //ログインユーザのユーザ名でDBを検索する
	          if(data.user_name === this.$store.getters['persistedParameter/getNamePersisted']){
	          	//このページでの処理に必要な変数を各データにプロパティとして付与しておく
	          	data.documentId = doc.id;
	          	data.isEditRecommendation=false;
	          	data.editedRecommendationContent="";
	          	data.isEditFreeTextArea=false;
	          	data.editedFreeTextAreaContent="";

	          	this.likeArticlesData.push(data);
	          }	          	          

	        });
	        console.log("this.likeArticlesData");
	        console.log(this.likeArticlesData);

	      })
	      .catch(function(error) {
	          alert(error.message)
	      });     	      

	},
	watch:{	

	},
	methods:{
		editFreeTextArea(item){
			//ユーザが編集しようとしている記事を配列から見つける
			for(let j=0; j<this.likeArticlesData.length; j++){
				//一意なデータとしてURLで検索する
				if(this.likeArticlesData[j].url === item.url){
					//編集フラグをtrueにして、編集欄を表示させる
					this.likeArticlesData[j].isEditFreeTextArea=true;
					this.likeArticlesData[j].editedFreeTextAreaContent=item.free_text_area;
				}
			}				
		},
		editRecommendation(item){
			//editFreeTextAreaと同じロジック
			for(let j=0; j<this.likeArticlesData.length; j++){
				if(this.likeArticlesData[j].url === item.url){
					this.likeArticlesData[j].isEditRecommendation=true;
					this.likeArticlesData[j].editedRecommendationContent=item.recommendation;
				}
			}				

		},
		confirmRecommendation(item){
			//編集内容をDBに反映させる

			let targetContent ="";

			//お気に入り記事配列の中から編集されたデータを見つける
			for(let j=0; j<this.likeArticlesData.length; j++){

				if(this.likeArticlesData[j].url === item.url){
					
					targetContent = this.likeArticlesData[j].editedRecommendationContent;
				}
			}
			console.log("targetContent");
			console.log(targetContent);

			console.log("item.documentId");
			console.log(item.documentId);

			/**/
			//編集内容をDBに反映
			db.collection("like_articles").doc(item.documentId)
		        .update({                   
		        	//recommendation:this.editedRecommendationContent
		        	recommendation:targetContent		        	        	

		        }).then(() => {
		           alert("おすすめの人の編集が完了しました");
		           //リロードしないと、連続で編集する際に、直前の編集内容が反映されない
		    	   //リロードして直前の編集内容を読みこむ
		           this.$router.go({path: this.$router.currentRoute.path, force: true});            

		        })
		        .catch(function(error) {            
		            console.error("Error updating document: ", error);
		        });			        	        

		},
		confirmFreeTextArea(item){
			//confirmRecommendationと同じロジック
			let targetContent ="";
			for(let j=0; j<this.likeArticlesData.length; j++){

				if(this.likeArticlesData[j].url === item.url){
					
					targetContent = this.likeArticlesData[j].editedFreeTextAreaContent;
				}
			}
			console.log("targetContent");
			console.log(targetContent);

			console.log("item.documentId");
			console.log(item.documentId);

			/**/
			db.collection("like_articles").doc(item.documentId)
		        .update({                   
		        	recommendation:targetContent
		        	        	

		        }).then(() => {
		           alert("コメントの編集が完了しました");
		           this.$router.go({path: this.$router.currentRoute.path, force: true});            

		        })
		        .catch(function(error) {            
		            console.error("Error updating document: ", error);
		        });					    

		},
		deleteLikeArticles(item){
			
		    console.log("item");    
		    console.log(item);  
		    
		    //記事を削除した後で、DB(usersテーブル)のお気に入り記事数のカウントを更新する
		    //そのために、ドキュメントIDを取得しておく
		    let docId = this.$store.getters['persistedParameter/getDocIdForUpdatelikeArticleCount'];

		    //お気に入り記事数のカウントを１減らす
		    let newLikeArticleCount = this.$store.getters['persistedParameter/getLikeArticleCount'] - 1;

		    console.log("newLikeArticleCount after -1");
			console.log(newLikeArticleCount);
			console.log("docId");
			console.log(docId);			

			/**/
			//まずはお気に入り記事のデータをDBから削除する
			//今後の課題：以下はtransaction処理に変更する
			db.collection("like_articles").doc(item.documentId).delete()
			.then(() => {
				/**/
				//記事の削除に成功したら、DBのお気に入り記事数カウントを更新
				db.collection("users").doc(docId)
			        .update({                   
			        	like_article_count: newLikeArticleCount,              			        	     	
			        }).then(() => {
			        	//ブラウザ側に保存しているお気に入り記事数カウントも更新
			        	this.$store.dispatch('persistedParameter/changeIsAdditionOfLikeArticleAction',newLikeArticleCount);

			        	console.log("this.$store.getters['persistedParameter/getisAdditionOfLikeArticle'] in delete");
            			console.log(this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']);

			            alert(`${item.documentId}を削除しました`);
			            this.$router.go({path: this.$router.currentRoute.path, force: true});        

			        })
			        .catch(function(error) {            
			            console.error("Error updating document: ", error);
			        }); 		       				

			}).catch(function(error) {            
	            console.error("Error updating document: ", error);
	        });
	        


		},
		addLikeArticle(){
			//記事を追加したり、削除した後リロードすると
			//なぜかthis.likeArticleCountの値が更新前の数字になる
			//そのため、例えば登録数が３記事に達しているのに、本来は表示されないはずの登録画面が表示されてしまう	
			//これはdata()にて、likeArticleCount:this.$store.getters['persistedParameter/getLikeArticleCount']と設定することで解決した	

			this.editFlag=true;
			
			//console.log("this.likeArticleCount in addLikeArticle");
			//console.log(this.likeArticleCount);

			console.log("this.editFlag");
			console.log(this.editFlag);						

		},
		registerLikeArticle(){
			/*
			let newLikeArticleCount = this.$store.getters['persistedParameter/getLikeArticleCount'] + 1;
			let docId = this.$store.getters['persistedParameter/getDocIdForUpdatelikeArticleCount'];
			console.log("newLikeArticleCount");
			console.log(newLikeArticleCount);
			console.log("docId");
			console.log(docId);
			*/
			
			//今後の課題：同じ記事を登録できないように改良する

			let newLikeArticleCount = this.$store.getters['persistedParameter/getLikeArticleCount'];

			console.log("newLikeArticleCount before");

			//今後の課題：以下はtransaction処理にする
			db.collection("like_articles").add({
				title: this.title,
				url: this.url,
				recommendation: this.recommendation,
				free_text_area: this.freeTextArea,
				user_id: this.$store.state.persistedParameter.userIdPersisted,
				user_name:this.$store.getters['persistedParameter/getNamePersisted'],

			})
			.then(() => {
				newLikeArticleCount = newLikeArticleCount + 1;

				let docId = this.$store.getters['persistedParameter/getDocIdForUpdatelikeArticleCount'];

				console.log("newLikeArticleCount after");
				console.log(newLikeArticleCount);
				console.log("docId");
				console.log(docId);
				

				/**/
				db.collection("users").doc(docId)
			        .update({                   
			        	like_article_count: newLikeArticleCount,              			        	      	
			        }).then(() => {
			            
						//記事を登録した際にリロードしないと、下の削除選択欄に記事タイトルの情報が反映されない
						//ただし、リロードすると、記事登録画面が表示されないので、再度お気に入り記事追加ボタンをクリックしなければならない
						this.$store.dispatch('persistedParameter/changeIsAdditionOfLikeArticleAction',newLikeArticleCount);
						console.log("this.$store.getters['persistedParameter/getisAdditionOfLikeArticle'] in register");
            			console.log(this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']);

            			alert("記事の登録完了");
						this.$router.go({path: this.$router.currentRoute.path, force: true});

						/*
						this.title="";
						this.url ="";
						this.recommendation =""; 
						this.freeTextArea ="";
						*/           

			        })
			        .catch(function(error) {            
			            console.error("Error updating document: ", error);
			        }); 
			        
			}) 
	        .catch(function(error) {
	        	alert(error.message)
	        });	        
		},
	},
}
</script>