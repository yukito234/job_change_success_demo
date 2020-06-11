<template>
	<div class="page-container">
		<!-- eslint-disable --><!-- prettier-ignore -->

	
	
	
	<div class="individual-section">
	  <profile ></profile>
	</div>
	  <!--    
	  <h2>{{ getProfile.nick_name }}さんのプロフィール</h2>    
	  
	  <b-card no-body  style="max-width: 540px;">
		<b-row >
		  <b-col md="6">
			
			<b-img :src="getProfile.image_url" alt="" ></b-img>
		  </b-col>
		  <b-col md="6">
			
			<b-card-body :title="getProfile.nick_name">

			  
			  <b-card-text>
				{{getProfile.self_introduction}}
				
			  </b-card-text>
			</b-card-body>
		  </b-col>
		</b-row>
	  </b-card>
	  -->

	<div class="individual-section">  
	  <like-articles ></like-articles>
	</div>
	  <!--
	  <h2>お気に入り記事</h2>
	  <p>あなたのお気に入り記事を他のメンバーに紹介できます。<br>
		ダッシュボードページでお気に入り記事を登録しましょう！！
	  </p>


	  
	  <b-table    
		v-if="getIsTableDisplay"        
		:items="likeArticles" 
		:fields="fieldsOfLikeArticle"
		responsive="sm"                       
		>
		<template v-slot:cell(titleLink)="data">
			<a v-bind:href="data.item.url">{{data.item.title}}</a>
			
		</template>
		
		<template v-slot:cell(detailButton)="row" >
			<b-button size="sm" @click="row.toggleDetails" class="mr-2" >
			
			  {{ row.detailsShowing ? '閉じる' : '詳細'}}
			</b-button>               
			
		</template>

		<template v-slot:row-details="row">
			<b-card>
			  
			  <b-row class="mb-2">
				<b-col sm="3" class="text-sm-right"><b>おすすめする人:</b></b-col>
				
				<b-col>{{ row.item.recommendation }}</b-col>                
				
			  </b-row>

			  <b-row class="mb-2">
				<b-col sm="3" class="text-sm-right"><b>コメント:</b></b-col>
				
				<b-col>{{ row.item.free_text_area }}</b-col>                                  
		  
			  </b-row>  
						 
			  
			</b-card>
		</template>
	  </b-table>  
	  --> 
	<div class="individual-section">
	  <do-comment  v-on:commentRegisteredNotice="changeIsCallGetComments"></do-comment>
	</div>

	  <!--    
	  <h2>コメントを残す</h2>    
	  <b-overlay :show="show" rounded="sm">
		<b-card bg-variant="light" v-if="getIsProfileRegistration">
		  
			  <b-form-textarea
				id="textarea"
				v-model.trim="userComment"
				placeholder="コメントを入力してください！"
				rows="3"
				max-rows="6"
			  ></b-form-textarea>
			 
			<b-button v-on:click="registerComment" >コメントを送信する</b-button>
			
		</b-card>
		<b-card bg-variant="light" v-else>
			  <p>コメントを残すには、ダッシュボードページでプロフィール登録をしてください！</p>
			  <b-form-textarea
				id="textarea"
				v-model.trim="userComment"
				placeholder="コメントを入力できません。"
				rows="3"
				max-rows="6"
				disabled="disabled"
			  ></b-form-textarea>
			 
			<b-button v-on:click="registerComment" v-bind:disabled="!getIsProfileRegistration">コメントを送信できません</b-button>
			
		</b-card>
	  </b-overlay>
	  -->
	<div class="individual-section">

	  <comment-list  v-bind:is-call-get-comments="obtainIsCallGetComments"></comment-list>
	</div>
	 <!--
	  <h2>コメント一覧</h2>    
	  <b-table            
		:items="commentsForTable" 
		:fields="fieldsOfCommentData"
		responsive="sm"                       
		>
		<template v-slot:cell(content)="data" :style="{width:'100px'}">
		  <div v-bind:style="{marginLeft:getMarginLeft(data.item)}">
			<b-img :src="data.item.image_url" v-bind="mainProps" ></b-img>
			<span>{{data.item.nick_name_from}}</span>
			<p>{{data.item.comment}}</p>
			<span>{{data.item.createdAt}}</span>
			
			<nuxt-link v-if="data.item.replyButtonFlag" v-on:click.native="setCommentData(data.item)" v-bind:to="{ path: `/reply` }">返信する</nuxt-link>
			<p>commentId:  {{data.item.commentId}}</p>
			<p>reply_comment_id:  {{data.item.reply_comment_id}}</p>

		  </div>
			
			
		</template>

	  </b-table>
	  <p v-if="getIsCommentMessage">まだコメントのやり取りはありません。</p>
	-->


	
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import sanitizeHTML from 'sanitize-html';

import _cloneDeep from 'lodash/cloneDeep';

import profile from '~/components/profile.vue';
import likeArticles from '~/components/like-articles.vue';
import doComment from '~/components/do-comment.vue';
import commentList from '~/components/comment-list.vue';


export default {     
  middleware: 'authenticated', 
  components:{
	'profile': profile, 
	'like-articles': likeArticles,
	'do-comment': doComment,
	'comment-list':commentList,

  },
  data () {
	return { 
	  isCallGetComments:false,
	  show:false,
	  loading:true,
	  mainProps:{
		//center: true,
		//fluidGrow: true,
		//blank: true,
		//blankColor: '#bbb',
		width: 30,
		//height: 400,
		//class: 'my-5'
		//display:incline-block
		block:false,
	  },
	  fieldsOfCommentData:[
		/*
		{
		  key:'titleLink',
		  label:'記事タイトル',
		},
		*/
		{
		  key:'content',
		  label:'',
		},
	  ],
	  tableData3:[],
	  /*
	  fieldsOfLikeArticle:[            
		{
		  key:'titleLink',
		  label:'記事タイトル',
		},
		{
		  key:'detailButton',
		  label:'詳細',
		},               

	  ], 
	  */          
	 userInfo:"",
	 userComment:"",
	 //allCommentData:[],
	 replyContent:"",
	 //tableData:[],
	 //tableData2:[],
	 allLikeArticlesData:[],
	 likeArticles: [],
	 commentsForTable: [],

	  
	}
  },
  async fetch ({ store }) {

	//ここでは、お気に入り記事のデータと、コメントデータの取得を行う

	//1:お気に入り記事のデータを取得
	//全お気に入り記事のデータがstoreにない場合（初回アクセス時またはリロード後）
	if( !store.getters['getIsAllLikeArticles'] ){


	  
	  //console.log("enter !store.getters['getIsAllLikeArticles']");
	  //DBから全お気に入り記事のデータと、このページユーザのお気に入り記事を保管
	  //await store.dispatch('sessionStorageParameter/likeArticlesGetAction');
	  await store.dispatch('likeArticlesGetAction');

	  //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
	  store.dispatch('changeIsAllLikeArticlesAction', true);

	 
	 
	} 


	//2:コメントデータを取得
	//全コメントデータがstoreにない場合（初回アクセス時またはリロード後）
	if( !store.getters['getIsAllComments'] ){
	  console.log("enter !store.getters['getIsAllComments']");
	  //DBから全コメントデータを取得し、必要なプロパティを付与する
	  //await store.dispatch('sessionStorageParameter/likeArticlesGetAction');
	  await store.dispatch('commentsGetAction');

	  //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
	  store.dispatch('changeIsAllCommentsAction', true);
	 
	 
	} 









  },
  created(){
	//this.getLikeArticles();
	//this.getComments();



  },
  computed:{
	obtainIsCallGetComments(){
	  console.log("enter obtainIsCallGetComments");

	  return this.isCallGetComments;

	},
	/*
	getIsProfileRegistration(){

	  //return this.$store.getters['sessionStorageParameter/getLoginUserData'].isProfileRegistration;
	  return this.$store.getters['sessionStorageParameter/getLoginUserData'].is_profile_registration;


	},
	*/
	/*
	getProfile(){
	  return this.$store.getters['sessionStorageParameter/getClickedProfileData'];

	},
	*/
	/*
	getIsTableDisplay(){

		if(this.likeArticles.length >= 1){
		  return true;
		}
		return false;
	},
	*/
	/*
	getIsCommentMessage(){
		if(this.commentsForTable.length >= 1){
		  return false;
		}
		return true;


	},
	*/
	/*
	//以下処理はmethodsに記述し、createdから呼び出すようにする
	getLikeArticles(){

	  //このページユーザのお気に入り記事を格納する配列を初期化
	  this.likeArticles.splice(-this.likeArticles.length);

	  //全お気に入り記事のデータ
	  const allLikeArticles = _cloneDeep(this.$store.getters['getAllLikeArticles']);

	  //このページユーザのプロフィール情報（ユーザーIDが必要）
	  const clickedProfileData = _cloneDeep(this.$store.getters['sessionStorageParameter/getClickedProfileData']);

	  //storeの全お気に入り記事のデータより、このページのお気に入り記事データを抽出する
	  for(let i=0; i<allLikeArticles.length; i++){

		if(allLikeArticles[i].user_id !== undefined && 
		  allLikeArticles[i].user_id === clickedProfileData.user_id){  

		  this.likeArticles.push(allLikeArticles[i]);

		}


	  }

	  console.log("this.likeArticles");
	  console.log(this.likeArticles);

	  return this.likeArticles;



	},
	*/
	/*
	//以下だと詳細ボタンをクリックしても下におすすめする人などの情報が表示されない
	//しかも詳細ボタンをクリックするたびに、なぜか以下の処理が呼び出されてしまう
	getLikeArticles(){
	  
	  

	  //このページユーザのお気に入り記事を格納する配列を初期化
	  this.likeArticles.splice(-this.likeArticles.length);

	  //全お気に入り記事のデータ
	  const allLikeArticles = _cloneDeep(this.$store.getters['getAllLikeArticles']);

	  //このページユーザのプロフィール情報（ユーザーIDが必要）
	  const clickedProfileData = _cloneDeep(this.$store.getters['sessionStorageParameter/getClickedProfileData']);

	  //storeの全お気に入り記事のデータより、このページのお気に入り記事データを抽出する
	  for(let i=0; i<allLikeArticles.length; i++){

		if(allLikeArticles[i].user_id !== undefined && 
		  allLikeArticles[i].user_id === clickedProfileData.user_id){  

		  this.likeArticles.push(allLikeArticles[i]);

		}


	  }

	  console.log("this.likeArticles");
	  console.log(this.likeArticles);

	  return this.likeArticles;



	},
	*/
	/*
	getComments(){

	  //ここでは、このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う
	  
	  //1:必要なデータを取得 + 初期化
	  let allComments = this.$store.getters['getAllComments'];
	  let firstCommentsOfThisPage = [];
	  let commentsOfThisPage = [];
	  const allProfiles = this.$store.getters['getAllProfiles'];
	  const profileDataOfThisPage = this.$store.getters['sessionStorageParameter/getClickedProfileData'];
	  const loginUserData = this.$store.getters['sessionStorageParameter/getLoginUserData'];


	  //:初回コメントを取得する
	  //他のユーザーによる初コメント

	  //全コメントの中から、このページに向けられた初回コメントを取得してくる  
	  for(let i=0; i<allComments.length; i++){

		//このページへの初回コメントか判定する
		//初回コメントにはreply_comment_idが設定されていない
		if(allComments[i].reply_comment_id === undefined && profileDataOfThisPage.user_id === allComments[i].user_id_to) {

		  allComments[i].isAddition = true;
		  allComments[i].nestCount = 0;

		  //push後にcommentsOfThisPageの要素を書き換えると、元のallCommentsのデータも更新されるので注意
		  firstCommentsOfThisPage.push(allComments[i]);

		} 

	  }  

	  //5:初回コメントを時系列の古い順に並べ替える
	  firstCommentsOfThisPage.sort(sortFunc);


	  //コメント一覧を投稿日時でソートするための関数を定義      
	  function sortFunc2(a,b){
		return a.createdAt - b.createdAt;
	  } 


	  //6:初回コメントと返信コメントを、適切な順番で表示用配列に挿入していく
	  
	  //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
	  //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
	  for(let i=0; i<firstCommentsOfThisPage.length; i++){

		//初回コメントを表示用配列に入れる  
		commentsOfThisPage.push( firstCommentsOfThisPage[i] );

		//ネスト数１の返信コメントを取得して、表示用配列に入れる
		for(let j=0; j<allComments.length; j++){

		  //返信コメントIDが初回コメントのコメントIDと一致する返信データを見つける             
		  if( allComments[j].reply_comment_id === firstCommentsOfThisPage[i].commentId ){


			//初回コメントの次のインデックスにネスト数１の返信データを格納する
			//見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
			if( !allComments[j].isAddition ){

			  //ネスト配列に格納される要素のisAdditionをtrueに変更                  
			  allComments[j].isAddition=true;

			  //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
			  allComments[j].nestCount = 1;

			  //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
			  let nest1 = _cloneDeep( allComments[j] );
			  
			  //firstCommentsOfThisPage[j].nestArray.push(nest1);

			  //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
			  commentsOfThisPage.push(nest1);
			}                           

			//ネスト数2の返信コメントを取得して、表示用配列に入れる
			for(let m=0; m<allComments.length; m++){

			  //返信コメントIDが、ネスト数１の返信データのコメントIDと一致する返信データを見つける     
			  if(allComments[m].reply_comment_id === allComments[j].commentId ){    

				if(!allComments[m].isAddition){

				  allComments[m].isAddition=true;
				  allComments[m].nestCount = 2;

				  let nest2 = _cloneDeep(allComments[m]);

				  //firstCommentsOfThisPage[j].nestArray.push(nest2);

				  //ネスト1のallComments[j]に対する返信コメントnest2を表示用配列に挿入する
				  commentsOfThisPage.push(nest2);
				  
				}                  
				
				//ネスト数3の返信コメントを取得して、表示用配列に入れる
				for(let n=0; n<allComments.length; n++){

				  //返信コメントIDが、ネスト数2の返信データのコメントIDと一致する返信データを見つける  
				  if(allComments[n].reply_comment_id === allComments[m].commentId ){    

					if(!allComments[n].isAddition){

					  allComments[n].isAddition=true;
					  allComments[n].nestCount = 3;

					  let nest3 = _cloneDeep(allComments[n]);
					  //firstCommentsOfThisPage[j].nestArray.push(nest3);
					  //ネスト2のallComments[m]に対する返信コメントnest3を表示用配列に挿入する
					  commentsOfThisPage.push(nest3);
					  
					}                      
				  }
				}//for(let n=0; n<allComments.length; n++){
			  }
			}//for(let m=0; m<allComments.length; m++){
		  }
		}
	  } 

	  //7:日付の表示方法の変更

	  for(let i=0;i<commentsOfThisPage.length;i++){
		let month = String( Number( commentsOfThisPage[i].createdAt.getMonth() ) + 1 );
		let dateInfo = commentsOfThisPage[i].createdAt.getFullYear() + "年" + month + "月" + commentsOfThisPage[i].createdAt.getDate() + "日" + commentsOfThisPage[i].createdAt.getHours()+ "時" + commentsOfThisPage[i].createdAt.getMinutes() + "分";
		commentsOfThisPage[i].createdAt = dateInfo;         
	  }


	  //8:返信ボタンの設置

	  //8-1:replyButtonFlagの初期化
	  for(let i=0;i<commentsOfThisPage.length;i++){
		commentsOfThisPage[i].replyButtonFlag = false;

	  }

	  //8-2:replyButtonFlagを設定        
	  //このページを作成者本人である会員Aが閲覧している場合
	  if( loginUserData.uid === profileDataOfThisPage.user_id){
	  
		//ネスト０とネスト２のコメントに返信ボタンをつける
		//ただし、その下にネストが存在する場合は返信ボタンをつけない
		//これは、j+1番目の要素のネスト数が０になっているかで判断できる
		//なお、配列の最後の要素がネスト0の場合は返信ボタンをつける
		for(let j=0; j<commentsOfThisPage.length; j++){

		  //配列の最後の要素がネスト0の場合
		  if(commentsOfThisPage[j].nestCount === 0 && j === commentsOfThisPage.length - 1 ){
			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト０で次の要素もネスト０の場合  
		  } else if (commentsOfThisPage[j].nestCount === 0 && commentsOfThisPage[j+1].nestCount === 0){
			commentsOfThisPage[j].replyButtonFlag = true;
		  }


		   //配列の最後の要素がネスト2の場合
		  if(commentsOfThisPage[j].nestCount === 2 && j === commentsOfThisPage.length - 1 ){
			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト2で次の要素がネスト０の場合  
		  } else if (commentsOfThisPage[j].nestCount === 2 && commentsOfThisPage[j+1].nestCount === 0){
			commentsOfThisPage[j].replyButtonFlag = true;
		  }



		 
		}                   
	   //このページを作成者(会員A)ではない会員Bが閲覧している場合 
	  } else {

		//ネスト１のコメントで、なおかつuser_id_toが会員Bのものは返信ボタンをつける
		//ただし、その下にネストが存在する場合は返信をつけない
		//プロフィールページでは、返信ボタンを使った作成者を介さないコメントのやり取りはできない
		//そのため、会員Aのページで会員Bと会員Cが返信機能を使って筆談することはできない

		for(let j=0;j<commentsOfThisPage.length;j++){

		  //配列の最後の要素がネスト1の場合
		  if( commentsOfThisPage[j].nestCount === 1 &&
		   commentsOfThisPage[j].user_id_to === loginUserData.uid &&
		   j === commentsOfThisPage.length-1){

			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト１で次の要素がネスト０
		  } else if( commentsOfThisPage[j].nestCount === 1 &&
		  commentsOfThisPage.user_id_to === loginUserData.uid &&
		   commentsOfThisPage[j+1].nestCount === 0
		   ){
		   commentsOfThisPage[j].replyButtonFlag = true;

		  }

		  

		}  

	  } 

	  //テーブルの表示用配列にデータを入れる
	  for(let i=0;i<commentsOfThisPage.length;i++){         
		this.commentsForTable.push(commentsOfThisPage[i]);
	  }  


	  return this.commentsForTable;


	  








	},
	*/



  },
  methods:{ 
	changeIsCallGetComments(){
	  console.log("enter changeIsCallGetComments");
	  this.isCallGetComments = true;

	  console.log("this.isCallGetComments");
	  console.log(this.isCallGetComments);


	},
	/*
	getComments(){
	  console.log("enter getComments");
	  //ここでは、このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う
	  
	  //1:必要なデータを取得 + 初期化
	  let allComments = _cloneDeep( this.$store.getters['getAllComments'] );
	  let firstCommentsOfThisPage = [];
	  let commentsOfThisPage = [];
	  const allProfiles = this.$store.getters['getAllProfiles'];
	  const profileDataOfThisPage = this.$store.getters['sessionStorageParameter/getClickedProfileData'];
	  const loginUserData = this.$store.getters['sessionStorageParameter/getLoginUserData'];

	  console.log("allProfiles");
	  console.log(allProfiles);

	  console.log("profileDataOfThisPage");
	  console.log(profileDataOfThisPage);

	  //test0~test5までのユーザでログインした場合、以下が空となる
	  //これはindex.jsのgetUsersCollectionActionにて
	  //uidプロパティを持たないユーザはsessionにログインユーザ情報が保存されないため
	  //コメントと返信機能が正しく動作するか確かめるにはtest6となる新たなユーザを登録する
	  console.log("loginUserData");
	  console.log(loginUserData);


	  //:初回コメントを取得する
	  //他のユーザーによる初コメント

	  //全コメントの中から、このページに向けられた初回コメントを取得してくる  
	  for(let i=0; i<allComments.length; i++){

		//このページへの初回コメントか判定する
		//初回コメントにはreply_comment_idが設定されていない
		if(allComments[i].reply_comment_id === undefined && profileDataOfThisPage.user_id === allComments[i].user_id_to) {

		  allComments[i].isAddition = true;
		  allComments[i].nestCount = 0;

		  //push後にcommentsOfThisPageの要素を書き換えると、元のallCommentsのデータも更新されるので注意
		  firstCommentsOfThisPage.push(allComments[i]);

		} 

	  }  


	  console.log("firstCommentsOfThisPage");
	  console.log(firstCommentsOfThisPage);

	  //5:初回コメントを時系列の古い順に並べ替える
	  firstCommentsOfThisPage.sort(sortFunc);


	  //コメント一覧を投稿日時でソートするための関数を定義      
	  function sortFunc(a,b){
		return a.createdAt - b.createdAt;
	  } 


	  //6:初回コメントと返信コメントを、適切な順番で表示用配列に挿入していく
	  
	  //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
	  //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
	  for(let i=0; i<firstCommentsOfThisPage.length; i++){

		//初回コメントを表示用配列に入れる  
		commentsOfThisPage.push( firstCommentsOfThisPage[i] );

		//ネスト数１の返信コメントを取得して、表示用配列に入れる
		for(let j=0; j<allComments.length; j++){

		  //返信コメントIDが初回コメントのコメントIDと一致する返信データを見つける             
		  if( allComments[j].reply_comment_id === firstCommentsOfThisPage[i].commentId ){


			//初回コメントの次のインデックスにネスト数１の返信データを格納する
			//見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
			if( !allComments[j].isAddition ){

			  //ネスト配列に格納される要素のisAdditionをtrueに変更                  
			  allComments[j].isAddition=true;

			  //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
			  allComments[j].nestCount = 1;

			  //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
			  let nest1 = _cloneDeep( allComments[j] );
			  
			  //firstCommentsOfThisPage[j].nestArray.push(nest1);

			  //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
			  commentsOfThisPage.push(nest1);
			}                           

			//ネスト数2の返信コメントを取得して、表示用配列に入れる
			for(let m=0; m<allComments.length; m++){

			  //返信コメントIDが、ネスト数１の返信データのコメントIDと一致する返信データを見つける     
			  if(allComments[m].reply_comment_id === allComments[j].commentId ){    

				if(!allComments[m].isAddition){

				  allComments[m].isAddition=true;
				  allComments[m].nestCount = 2;

				  let nest2 = _cloneDeep(allComments[m]);

				  //firstCommentsOfThisPage[j].nestArray.push(nest2);

				  //ネスト1のallComments[j]に対する返信コメントnest2を表示用配列に挿入する
				  commentsOfThisPage.push(nest2);
				  
				}                  
				
				//ネスト数3の返信コメントを取得して、表示用配列に入れる
				for(let n=0; n<allComments.length; n++){

				  //返信コメントIDが、ネスト数2の返信データのコメントIDと一致する返信データを見つける  
				  if(allComments[n].reply_comment_id === allComments[m].commentId ){    

					if(!allComments[n].isAddition){

					  allComments[n].isAddition=true;
					  allComments[n].nestCount = 3;

					  let nest3 = _cloneDeep(allComments[n]);
					  //firstCommentsOfThisPage[j].nestArray.push(nest3);
					  //ネスト2のallComments[m]に対する返信コメントnest3を表示用配列に挿入する
					  commentsOfThisPage.push(nest3);
					  
					}                      
				  }
				}//for(let n=0; n<allComments.length; n++){
			  }
			}//for(let m=0; m<allComments.length; m++){
		  }
		}
	  } 

	  console.log("commentsOfThisPage");
	  console.log(commentsOfThisPage);

	  //7:日付の表示方法の変更

	  for(let i=0;i<commentsOfThisPage.length;i++){
		let month = String( Number( commentsOfThisPage[i].createdAt.getMonth() ) + 1 );
		let dateInfo = commentsOfThisPage[i].createdAt.getFullYear() + "年" + month + "月" + commentsOfThisPage[i].createdAt.getDate() + "日" + commentsOfThisPage[i].createdAt.getHours()+ "時" + commentsOfThisPage[i].createdAt.getMinutes() + "分";
		commentsOfThisPage[i].createdAt = dateInfo;         
	  }


	  //8:返信ボタンの設置

	  //8-1:replyButtonFlagの初期化
	  for(let i=0;i<commentsOfThisPage.length;i++){
		commentsOfThisPage[i].replyButtonFlag = false;

	  }

	  //8-2:replyButtonFlagを設定        
	  //このページを作成者本人である会員Aが閲覧している場合
	  if( loginUserData.uid === profileDataOfThisPage.user_id){
	  
		//ネスト０とネスト２のコメントに返信ボタンをつける
		//ただし、その下にネストが存在する場合は返信ボタンをつけない
		//これは、j+1番目の要素のネスト数が０になっているかで判断できる
		//なお、配列の最後の要素がネスト0の場合は返信ボタンをつける
		for(let j=0; j<commentsOfThisPage.length; j++){

		  //配列の最後の要素がネスト0の場合
		  if(commentsOfThisPage[j].nestCount === 0 && j === commentsOfThisPage.length - 1 ){
			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト０で次の要素もネスト０の場合  
		  } else if (commentsOfThisPage[j].nestCount === 0 && commentsOfThisPage[j+1].nestCount === 0){
			commentsOfThisPage[j].replyButtonFlag = true;
		  }


		   //配列の最後の要素がネスト2の場合
		  if(commentsOfThisPage[j].nestCount === 2 && j === commentsOfThisPage.length - 1 ){
			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト2で次の要素がネスト０の場合  
		  } else if (commentsOfThisPage[j].nestCount === 2 && commentsOfThisPage[j+1].nestCount === 0){
			commentsOfThisPage[j].replyButtonFlag = true;
		  }
		 
		}  

	   //このページを作成者(会員A)ではない会員Bが閲覧している場合 
	  } else {

		//ネスト１のコメントで、なおかつuser_id_toが会員Bのものは返信ボタンをつける
		//ただし、その下にネストが存在する場合は返信をつけない
		//プロフィールページでは、返信ボタンを使った作成者を介さないコメントのやり取りはできない
		//そのため、会員Aのページで会員Bと会員Cが返信機能を使って筆談することはできない

		for(let j=0;j<commentsOfThisPage.length;j++){

		  //配列の最後の要素がネスト1の場合
		  if( commentsOfThisPage[j].nestCount === 1 &&
		   commentsOfThisPage[j].user_id_to === loginUserData.uid &&
		   j === commentsOfThisPage.length-1){

			commentsOfThisPage[j].replyButtonFlag = true;

		  //ネスト１で次の要素がネスト０
		  } else if( commentsOfThisPage[j].nestCount === 1 &&
		  commentsOfThisPage.user_id_to === loginUserData.uid &&
		   commentsOfThisPage[j+1].nestCount === 0
		   ){
		   commentsOfThisPage[j].replyButtonFlag = true;

		  }

		  

		}  

	  } 

	  //テーブルの表示用配列にデータを入れる
	  for(let i=0;i<commentsOfThisPage.length;i++){         
		this.commentsForTable.push(commentsOfThisPage[i]);
	  }  


	  console.log("this.commentsForTable");
	  console.log(this.commentsForTable);


	  








	},
	*/
	/*
	getLikeArticles(){

	  //このページユーザのお気に入り記事を格納する配列を初期化
	  this.likeArticles.splice(-this.likeArticles.length);

	  //全お気に入り記事のデータ
	  //this.likeArticlesにpushするため、ディープコピーをとっておく      
	  const allLikeArticles = _cloneDeep(this.$store.getters['getAllLikeArticles']);

	  //このページユーザのプロフィール情報（ユーザーIDが必要）
	  const clickedProfileData = this.$store.getters['sessionStorageParameter/getClickedProfileData'];

	  //storeの全お気に入り記事のデータより、このページのお気に入り記事データを抽出する
	  for(let i=0; i<allLikeArticles.length; i++){

		if(allLikeArticles[i].user_id !== undefined && 
		  allLikeArticles[i].user_id === clickedProfileData.user_id){  


		  this.likeArticles.push(allLikeArticles[i]);

		}


	  }

	  console.log("this.likeArticles");
	  console.log(this.likeArticles);

	  return this.likeArticles;



	},
	*/
	//以下を:items="obtainLikeArticles()"のようにテーブルに記述すると無限にthis.likeArticlesがconsoleに表示されるエラーが出る
	//おそらくb-table では、常に:items="tableData"で設定されるテーブルデータを監視しているのではないか
	//そのために、以下処理をcomputedに記述すると、詳細ボタンをクリックするたびに以下の処理が呼び出されてしまう
	//よって、:items=" "にはmethodsやcomputedを設定してはいけない
	//以下はcreatedから呼び出す形にすればいい
	/*
	obtainLikeArticles(){
	  //このページユーザのお気に入り記事を格納する配列を初期化
	  this.likeArticles.splice(-this.likeArticles.length);

	  //全お気に入り記事のデータ
	  const allLikeArticles = _cloneDeep(this.$store.getters['getAllLikeArticles']);

	  //このページユーザのプロフィール情報（ユーザーIDが必要）
	  const clickedProfileData = _cloneDeep(this.$store.getters['sessionStorageParameter/getClickedProfileData']);

	  //storeの全お気に入り記事のデータより、このページのお気に入り記事データを抽出する
	  for(let i=0; i<allLikeArticles.length; i++){

		if(allLikeArticles[i].user_id !== undefined && 
		  allLikeArticles[i].user_id === clickedProfileData.user_id){  

		  this.likeArticles.push(allLikeArticles[i]);

		}


	  }

	  console.log("this.likeArticles");
	  console.log(this.likeArticles);

	  return this.likeArticles;


	},
	*/

	/*
	getMarginLeft(row){
	  //コメントに返信する場合、元のコメントより右に少しずらす
	  //このマージンをコメントのネスト数から算出する
	  let value = Number(row.nestCount)*30;
	  let marginLeft = value + "px";
	  return marginLeft;

	},
	*/
	/*
	setCommentData(element){  
	  console.log("element:");       
	  console.log(element); 
	  //返信ボタンが押されたら、そのコメントを取得し、sessoinに保存
	  //reply.vueでリロードされた場合を想定し、データはsessionに保存しておく
	  //reply.vueにて、この保存されたコメントデータを呼び出す
	  this.$store.commit('sessionStorageParameter/commentDataSet',element);
	  //this.$store.commit('persistedParameter/commentDataSet',element);


	}, 
	*/
	/* 
	async registerComment(){

	  console.log("this.userComment");
	  console.log(this.userComment);


	  //コメント欄に文字が入力されていない場合はエラーを出す
	  //コメントが入力されていないときはボタンをdisabledの状態にしておく
	  //v-modelにtrimを設定しているが、全角空白と半角空白のみを入れて送信したときに
	  //以下にキャッチされるか確認する

	  if(this.userComment === ""){
		alert("コメントを入力してください！");
		return;
	  }
	  
	  await this.$store.dispatch('registerCommentAction', sanitizeHTML(this.userComment) );

	  //DBから最新の全コメントを取得する
	  await this.$store.dispatch('commentsGetAction');

	  //このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う
	  this.getComments();
	  this.userComment = '';
	  //リロードする
	  //最新のコメントデータをDBから取得する
	  //リロードではなく、必要な箇所のみ再描画させる
	  //this.$router.go({path: this.$router.currentRoute.path, force: true});


	},
	*/

	/*      
	registerComment(){
	  //プロフィールユーザがログインしているときは、コメントの投稿機能は非表示にする
	  this.show=true;
	  //コメントをDBに登録      
	  //今後の改善：reply_comment_idを付与してnullにしておく
	  db.collection("user_comment").add({
		user_id_from:this.$store.state.persistedParameter.userIdPersisted,
		user_id_to:this.userInfo.user_id,
		comment:this.userComment,
		createdAt: new Date(),

			
		})
		.then(() => {
			
			alert("コメントの登録完了");            
			this.show=false;
			//以下の処理はおそらく不要
			this.$store.dispatch('persistedParameter/allCommentDataInitAction');
			//リロードする
			this.$router.go({path: this.$router.currentRoute.path, force: true});
						
		})          
		.catch(function(error) {
			alert(error.message)
		});  
	},
	*/  
  },

  //  
  /*  
  created:function(){    
	//この処理はおそらく不要
	this.$store.dispatch('persistedParameter/allCommentDataInitAction');

	//お気に入り記事（like_articlesテーブルに保管されている）を取得する
	//dashboard.vueに先にアクセスした場合は、そこで全ユーザのお気に入り記事を取得し、セッションに保存する
	db.collection("like_articles").get()
		.then((querySnapshot)=>{        
		  querySnapshot.forEach((doc)=>{
			const data = _.cloneDeep(doc.data());
			//このプロフィールページのユーザ（user_name）のお気に入り記事を取得する
			//各お気に入り記事には、user_nameプロパティが設定されていて、誰のお気に入りなのか判別できる
			//お気に入り記事のuser_nameが、現在表示しているページのuser_nameと一致する場合
			//this.$store.getters['persistedParameter/getUsersData']にuser_profileの全データが保管されている
						
			if(data.user_name === this.$store.getters['persistedParameter/getUserData'].user_name){             
			  this.allLikeArticlesData.push(data);
			}                        

		  });
		  //お気に入り記事紹介テーブルの最初の記事の詳細だけあらかじめ表示させておくために設定する
		  //ただ、ボタンが正しく動作しないのでやめた
		  //それぞれのボタンが区別されていないので、下のボタンをクリックすると上の表示まで閉じてしまう
		  //this.allLikeArticlesData[0]._showDetails= true;
		  //console.log("this.allLikeArticlesData");
		  //console.log(this.allLikeArticlesData);

		  //authenticationから会員の全ユーザIDを取得する方法が分からない
		  //console.log("firebase.auth()");
		  //console.log(firebase.auth());

		})
		.catch(function(error) {
			alert(error.message)
		});

  },
  */

  /*
  mounted () {  

	//this.userInfo = this.$store.getters['persistedParameter/getUserData'];
	//このthis.userInfoは、プロフィールページのユーザ情報となる
	//よって、プロフィール登録していないユーザがコメントした場合は、以下の処理でcommentIdが空になったりするエラーが発生する
	//プロフィール登録していないユーザがコメントできないように制限する必要がある
	
	this.userInfo = _.cloneDeep(this.$store.getters['persistedParameter/getUserData']);
	
	//DBからコメントデータを取得した際に、データを一時退避させる配列
	let dataStockArray = [];    

	//DBからコメントデータを取得した際に、データを一時保存させる配列
	let dataStockArray_2 = [];
	
	//このプロフィールに向けられたコメント（初回コメント）と返信コメント(ネストしたコメント)をすべて取得    
	db.collection("user_comment").get()
	  .then((querySnapshot)=>{        
		querySnapshot.forEach((doc)=>{
		  
		  const data = _.cloneDeep(doc.data());          

		  const data_2 = _.cloneDeep(doc.data());

		  //コメントデータのコメントIDをドキュメントIDとする
		  data_2.commentId = doc.id;            

		  //初回コメントと返信コメントを正しい順番で表示用配列に格納していく際に、dataStockArray_2の要素ですでに追加されたものはtrueにしておくことで、コメントの探索が効率よく行える
		  data_2.isAddition = false;

		  //同様にコメントの種類（初回、返信）やネストの深さを判別しやすくするために設定する
		  data_2.nestCount = null;

		  //返信コメント格納用
		  data_2.nestArray =[];

		  //nestArrayの制御変数
		  data_2.numberForNestArray = 0;

		  for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){

			if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data_2.user_id_from){
			  //コメントデータにニックネーム情報を追加する
			  data_2.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;

			  data_2.image_url = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].image_url;
			  //console.log("this.$store.getters['persistedParameter/getAllProfilePersisted'][i]");
			  //console.log(this.$store.getters['persistedParameter/getAllProfilePersisted'][i]);

			}
		  
		  }

		  //data_2.createdAt = data_2.createdAt.toDate(); 
		  //以下配列に全コメントが格納される
		  dataStockArray_2.push(data_2);          
																									 
		});//querySnapshot.forEach((doc)=>{

		console.log("DBから取得した全コメント:");
		console.log("dataStockArray_2:");
		console.log(dataStockArray_2);

	   
		for(let i=0;i<dataStockArray_2.length;i++){
		  //console.log("dataStockArray_2[i].createdAt before");
		  //console.log(dataStockArray_2[i].createdAt);

		  //dataStockArray_2[i].createdAtがundefinedのデータもあるので、ifで分岐させないとエラーが出る
		  if(dataStockArray_2[i].createdAt){
			dataStockArray_2[i].createdAt = dataStockArray_2[i].createdAt.toDate();
		  }
				   
		  //console.log("dataStockArray_2[i].createdAt after");
		  //console.log(dataStockArray_2[i].createdAt);
		}       

		//A（閲覧プロフィール）に向けられた初回と返信コメントを格納する  
		let targetDataArray_2 =[];  
		//全コメントの中から、A（閲覧プロフィール）に向けられた初回コメントを取得してくる  
		for(let i=0;i<dataStockArray_2.length;i++){

		  //Aへの初回コメントか判定する
		  if(dataStockArray_2[i].reply_comment_id === undefined && this.userInfo.user_id === dataStockArray_2[i].user_id_to) {

			dataStockArray_2[i].isAddition = true;
			dataStockArray_2[i].nestCount = 0;
			let commetData = _.cloneDeep(dataStockArray_2[i]);
			targetDataArray_2.push(commetData);

		  } 

		}        

		//初回コメントを時系列の古い順に並べ替える
		targetDataArray_2.sort(sortFunc2);

		console.log("プロフィールユーザ向けの初回コメント（時系列順）:");
		console.log("targetDataArray_2:");
		console.log(targetDataArray_2);

		//表示用配列
		let displayArray_2=[];

		//初回コメントを１つずつチェック
		for(let j=0;j<targetDataArray_2.length;j++){

		 //console.log(`targetDataArray_2[${j}].nestArray`);
		  //console.log(targetDataArray_2[j].nestArray);
		  displayArray_2.push(targetDataArray_2[j]);

		  for(let i=0;i<dataStockArray_2.length;i++){
			//初回コメントのコメントIDと一致する返信データを見つける
			//ネスト数１の返信コメントを取得
			if(dataStockArray_2[i].reply_comment_id === targetDataArray_2[j].commentId){

			  //返信データを初回コメントのネスト配列に格納             

			  if(!dataStockArray_2[i].isAddition){
				dataStockArray_2[i].isAddition=true;
				dataStockArray_2[i].nestCount = 1;
				let nest1 = _.cloneDeep(dataStockArray_2[i]);
				targetDataArray_2[j].nestArray.push(nest1);

				displayArray_2.push(nest1);
			  }                           

			  //ネスト数2
			  for(let m=0; m<dataStockArray_2.length; m++){
				if(dataStockArray_2[m].reply_comment_id === dataStockArray_2[i].commentId ){                                    
				  if(!dataStockArray_2[m].isAddition){
					dataStockArray_2[m].isAddition=true;
					dataStockArray_2[m].nestCount = 2;
					let nest2 = _.cloneDeep(dataStockArray_2[m]);

					targetDataArray_2[j].nestArray.push(nest2);

					displayArray_2.push(nest2);
					
				  }                  
				  
				  //ネスト数3
				  for(let n=0; n<dataStockArray_2.length; n++){

					if(dataStockArray_2[n].reply_comment_id === dataStockArray_2[m].commentId ){                                          
					  if(!dataStockArray_2[n].isAddition){
						dataStockArray_2[n].isAddition=true;
						dataStockArray_2[n].nestCount = 3;
						let nest3 = _.cloneDeep(dataStockArray_2[n]);
						targetDataArray_2[j].nestArray.push(nest3);

						displayArray_2.push(nest3);
						
					  }                      
					}
				  }
				}
			  }
			}
		  }
		}

		console.log("プロフィールユーザ向けの初回コメントと返信コメント:");
		console.log("targetDataArray_2:");
		console.log(targetDataArray_2);
		
		console.log("displayArray_2:");
		console.log(displayArray_2);

		//日付の表示方法の変更
		for(let i=0;i<displayArray_2.length;i++){
		  let month = String(Number(displayArray_2[i].createdAt.getMonth())+1);
		  let dateInfo = displayArray_2[i].createdAt.getFullYear() + "年" + month + "月" + displayArray_2[i].createdAt.getDate() + "日" + displayArray_2[i].createdAt.getHours()+ "時" + displayArray_2[i].createdAt.getMinutes() + "分";
		  displayArray_2[i].createdAt = dateInfo;         
		}


		//replyButtonFlagの初期化
		for(let i=0;i<displayArray_2.length;i++){
		  displayArray_2[i].replyButtonFlag = false;

		}

		//replyButtonFlagを設定        
		//プロフィールページのユーザ本人のAがログインしている場合
		if(this.$store.getters['persistedParameter/getUserIdPersisted'] === this.userInfo.user_id){
		  
		  //ネスト０とネスト２のコメントに返信ボタンをつける
		  //ただし、その下にネストが存在する場合は返信をつけない
		  //これは、j+1番目の要素のネスト数が０になっているかで判断できる
		  for(let j=0;j<displayArray_2.length;j++){

			//ネスト０の最後の要素
			if(displayArray_2[j].nestCount === 0 && j === displayArray_2.length - 1 ){
			  displayArray_2[j].replyButtonFlag = true;

			//ネスト０で次の要素もネスト０の場合  
			} else if (displayArray_2[j].nestCount === 0 && displayArray_2[j+1].nestCount === 0){
			  displayArray_2[j].replyButtonFlag = true;
			}


			 //ネスト2の最後の要素
			if(displayArray_2[j].nestCount === 2 && j === displayArray_2.length - 1 ){
			  displayArray_2[j].replyButtonFlag = true;

			//ネスト2で次の要素がネスト０の場合  
			} else if (displayArray_2[j].nestCount === 2 && displayArray_2[j+1].nestCount === 0){
			  displayArray_2[j].replyButtonFlag = true;
			}



		   
		  }                   
		  
		} else {//プロフィールページユーザ以外のユーザBがログインしている場合
		  //ネスト１のコメントで、なおかつuser_id_toがユーザBのものは返信ボタンをつける
		  //ただし、その下にネストが存在する場合は返信をつけない

		  for(let j=0;j<displayArray_2.length;j++){

			//ネスト１の最終要素
			if( displayArray_2[j].nestCount === 1 &&
			 displayArray_2[j].user_id_to === this.userInfo.user_id &&
			 j === displayArray_2.length-1){

			  displayArray_2[j].replyButtonFlag = true;

			//ネスト１で次の要素がネスト０
			} else if( displayArray_2[j].nestCount === 1 &&
			 displayArray_2[j].user_id_to === this.userInfo.user_id &&
			 displayArray_2[j+1].nestCount === 0
			 ){
			  displayArray_2[j].replyButtonFlag = true;

			}

			

		  }                         
		}      

		console.log("displayArray_2 after replyButton addition:");
		console.log(displayArray_2);

		//テーブル表示用配列にデータを入れる
		for(let i=0;i<displayArray_2.length;i++){         
		  this.tableData3.push(displayArray_2[i]);
		}                                  

		//コメント一覧を投稿日時でソートするための関数を定義      
		function sortFunc2(a,b){
		  return a.createdAt - b.createdAt;
		}               

		this.loading=  false;        
				 
	  })
	  .catch(function(error) {
		  alert(error.message)
	  });   
  },
  */
}
</script>

<style scoped>
/* prettier-ignore */

.individual-section{

  margin-bottom: 20px;
}



</style>