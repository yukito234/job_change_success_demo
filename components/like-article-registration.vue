<template>
  <div>
  	<b-button v-b-toggle.collapse-4 variant="primary">お気に入り記事の登録・編集・削除</b-button>
  	<b-collapse id="collapse-4" class="mt-2">
  		<!--  			
  			this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']はdashboard.vueで設定している
			test4@t.com以前のユーザは、DBにlike_article_countが設定されていないので正しく動作しない
			ログアウトするときに、ブラウザのお気に入り記事数のカウントをnullにしておく
  		-->
  		<div v-if="this.$store.getters['persistedParameter/getisAdditionOfLikeArticle']">
  		
	  		<b-card bg-variant="light">
	  			
		        <b-form-group
		          label-cols-lg="3"
		          label="お気に入り記事の登録"
		          label-size="lg"
		          label-class="font-weight-bold pt-0"
		          class="mb-0"
		        >

		        <p>ここで登録された記事は、プロフィールページに反映されます。<br>あと{{ 3 - this.$store.getters['persistedParameter/getLikeArticleCount'] }}記事登録が可能です。（最大３記事）</p>
		          <b-form-group
		            label-cols-sm="3"
		            label="記事タイトル:"
		            label-align-sm="right"
		            
		          >
		            <b-form-input  v-model="title"></b-form-input>
		          </b-form-group>

		          <b-form-group
		            label-cols-sm="3"
		            label="URL:"
		            label-align-sm="right"
		            
		          >
		            <b-form-input  v-model="url"></b-form-input>	            	            
		          </b-form-group>

		          <b-form-group
		            label-cols-sm="3"
		            label="おすすめしたい人:"
		            label-align-sm="right"
		            label-for="nested-city"
		            placeholder="例：ポートフォリオの作り方が分からず悩んでいる人..."
		          >
		            <b-form-input v-model="recommendation"></b-form-input>	            	            
		          </b-form-group>

		          <b-form-group
		            label-cols-sm="3"
		            label="コメント:"
		            label-align-sm="right"
		            
		          >
		            <b-form-textarea
		              id="textarea"
		              v-model="freeTextArea"
		              placeholder="記事の共感ポイントや学びなどを簡単にまとめてください..."
		              rows="3"
		              max-rows="6"
		            ></b-form-textarea>
		          </b-form-group>

		          <b-form-group
		            label-cols-sm="3"
		            label=""
		            label-align-sm="right"
		            
		          >
		            <b-button v-on:click="registerLikeArticle()">お気に入り記事を登録する</b-button>
		          </b-form-group>
		        </b-form-group>
		      </b-card> 		  

  		</div>
	  	<div v-else>
	  		
	  		<b-card bg-variant="light">
		  		<p>{{errorMessage}}</p>
		  		<p>現在{{this.$store.getters['persistedParameter/getLikeArticleCount']}}記事が登録されています。（上限３記事）</p>
		  		<p>上限に達している場合は、以下より記事を削除してください。</p>
		  	</b-card>			
			
	  	</div>
	  	<div>
	  		
      		<b-card bg-variant="light">
      			<h4>お気に入り記事の編集・削除</h4>
	      		<p>編集ボタンを押すと、おすすめする人やコメントの修正ができます。<br>
	      		削除ボタンを押すと、記事をお気に入りから削除できます。
		  		</p>

		  		<b-table 			      
			      :items="obtainLikeArticlesData" 
			      :fields="fields"
			      responsive="sm"
			     			      			      
			      >
			      <!-- :style="{width:'50%'}"-->
			      	<template v-slot:cell(titleLink)="data" :style="{width:'100px'}">
				        <a v-bind:href="data.item.url">{{data.item.title}}</a>
				        
				    </template>

				    <template v-slot:cell(deleteButton)="data">
				        <b-button v-on:click="deleteLikeArticles(data.item)">削除</b-button>
				        
				    </template>

			      	<template v-slot:cell(editButton)="row">
				        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
				         
				          {{ row.detailsShowing ? '閉じる' : '開く'}}
				        </b-button>				        
				        
				    </template>
				    <template v-slot:row-details="row">
				        <b-card>
				          <b-row class="mb-2">
				            <b-col sm="3" class="text-sm-right"><b>おすすめする人:</b></b-col>
				            
				            <b-col><b-form-input v-model="row.item.recommendation"></b-form-input></b-col>				            
				            
				          </b-row>

				          <b-row class="mb-2">
				            <b-col sm="3" class="text-sm-right"><b>コメント:</b></b-col>
				            
				            <b-col>
				            	<b-form-textarea
							      id="textarea"
							      v-model="row.item.free_text_area"						      
							      rows="3"
							      max-rows="6"
							    ></b-form-textarea>
							</b-col>
				          </b-row>

				          <b-button size="sm" @click="confirm(row.item)">編集を確定</b-button>
				         
				        </b-card>
				    </template>
			    </b-table>
		  	</b-card>
	  		
	  	</div>

	  	
	  </b-collapse>
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
			fields:[		        
		        {
		          key:'titleLink',
		          label:'記事タイトル',
		        },
		        {
		          key:'editButton',
		          label:'編集ボタン',
		        },
		        /*
		        {
		          key:'recommendation',
		          label:'おすすめする人',
		        },
		        {
		          key:'freeTextArea',
		          label:'コメント',
		        },
		        */
		        {
		          key:'deleteButton',
		          label:'削除ボタン',
		        },

	        ],
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
		//console.log("this.likeArticleCount");
	    //console.log(this.likeArticleCount);

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
	        //console.log("this.likeArticlesData");
	        //console.log(this.likeArticlesData);      	        

	      })
	      .catch(function(error) {
	          alert(error.message)
	      });     	      

	},
	watch:{	

	},
	methods:{
		confirm(item){
			console.log("item");
			console.log(item);
			db.collection("like_articles").doc(item.documentId)
		        .update({                   
		        	//recommendation:this.editedRecommendationContent
		        	recommendation:item.recommendation,
		        	free_text_area:item.free_text_area,


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
		        	free_text_area:targetContent
		        	        	

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
		    /**/
		    //記事を削除した後で、DB(usersテーブル)のお気に入り記事数のカウントを更新する
		    //そのために、ドキュメントIDを取得しておく
		    let docId = this.$store.getters['persistedParameter/getDocIdForUpdatelikeArticleCount'];

		    //お気に入り記事数のカウントを１減らす
		    let newLikeArticleCount = this.$store.getters['persistedParameter/getLikeArticleCount'] - 1;

		    console.log("newLikeArticleCount after -1");
			console.log(newLikeArticleCount);
			console.log("docId");
			console.log(docId);			
			

			//まずはお気に入り記事のデータをDBから削除する
			//今後の課題：以下はtransaction処理に変更する
			db.collection("like_articles").doc(item.documentId).delete()
			.then(() => {
				
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