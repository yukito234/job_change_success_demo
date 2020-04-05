/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	isEmpty : true,	
	userIdPersisted: "",
	//userIdPersisted: null,
	stockedArticles: [],
	usedAPI:"",	
	commentData:"",//reply.vueに表示するコメント
	allCommentData:[],//id.vueのコメント表の全データ
	userData:"",//users-list.vueでセットされるプロフィールページユーザの情報
	allProfilePersisted:[],//users-list.vueでセットされる全プロフィールページユーザの情報
	isLoginUser:false,//ログアウト状態でfalse、ログイン状態でtrue
	likeArticleCount:null,//ログインユーザのお気に入り記事の個数
	docIdForUpdatelikeArticleCount:"",//お気に入り記事の個数を更新する際に必要となるfirebaseのドキュメントID
	isAdditionOfLikeArticle:true,//お気に入り記事の登録数が２記事以下のときtrue
	usersData:[],//member.vueにてセットされるusersテーブルの全データ
	namePersisted:"",//ログインユーザのユーザ名

})

export const getters = {	
	getNamePersisted(state){		
		return state.namePersisted;
	},
	getUsersData(state){		
		return state.usersData;
	},
	getisAdditionOfLikeArticle(state){		
		return state.isAdditionOfLikeArticle;
	},
	getDocIdForUpdatelikeArticleCount(state){		
		return state.docIdForUpdatelikeArticleCount;
	},
	getLikeArticleCount(state){		
		return state.likeArticleCount;
	},
	getIsLoginUser(state){		
		return state.isLoginUser;
	},
	getAllProfilePersisted(state){		
		return state.allProfilePersisted;
	},
	getUserData(state){		
		return state.userData;
	},
	getAllCommentData(state){		
		return state.allCommentData;
	},
	getCommentData(state){		
		return state.commentData;
	},
	getUserIdPersisted(state){
		return state.userIdPersisted;
	},
	getStockedArticles(state){		
		return state.stockedArticles;
	},

}

export const mutations ={
	changeIsAdditionOfLikeArticle(state, count){
		if(count<3){
			state.isAdditionOfLikeArticle=true;
		}else{
			state.isAdditionOfLikeArticle=false;
		}
		
	},
	docIdForUpdatelikeArticleCountSet(state, id){
		state.docIdForUpdatelikeArticleCount=id;
	},
	likeArticleCountSet(state, count){
		state.likeArticleCount=count;
	},
	changeIsLoginUser(state, flag){		
		state.isLoginUser = flag ;
		console.log("state.isLoginUser");
		console.log(state.isLoginUser);
		
	},
	userIdPersistedInit(state){
		state.userIdPersisted = "";

	},
	allProfilePersistedSet(state,data){
		state.allProfilePersisted.push(data);		

	},
	allCommentDataInit(state){
		state.allCommentData.splice(-state.allCommentData.length);

	},
	userDataSet(state,element){
		state.userData = element;
	
	},
	allCommentDataSet(state,element){
		state.allCommentData.push(element);

	},
	commentDataSet(state,element){
		state.commentData = element;

	},	
	changeUsedAPI(state, name){
		state.usedAPI=name;
		console.log("state.usedAPI");
		console.log(state.usedAPI);
	},
	changeIsEmpty(state, flag){		
		state.isEmpty = flag ;
		
	},	
	changeUserIdPersisted(state, id){		
		state.userIdPersisted = id ;
		
	},
	changeStockedArticles(state, element){
		let isDuplication=false;				
		for(let i=0; i<state.stockedArticles.length; i++){
			if(state.stockedArticles[i].id === element.id){
				 isDuplication=true;
				 break;
			}
		}
		if(!isDuplication){
			state.stockedArticles.push(element);
		}
		
	},
	deleteStockItems(state, stockDataArray){

		console.log("state.stockedArticles before");
		console.log(state.stockedArticles);		

		//ストック記事保管用配列をいったん初期化する
		state.stockedArticles.splice(-state.stockedArticles.length);

		for(let i=0; i<stockDataArray.length; i++){
			if( !stockDataArray[i].isStock ){
				//削除しない要素をストック記事保管用配列に挿入する
				state.stockedArticles.push(stockDataArray[i]);
			} 
		}		

		console.log("state.stockedArticles after");
		console.log(state.stockedArticles);

	},
	deleteStockedArticles(state, element){				
		state.stockedArticles.splice(-state.stockedArticles.length);
	},
	usersDataSet(state, data){				
		state.usersData.push(data);
	},
	namePersistedSet(state, name){				
		state.namePersisted=name;
	},
	
}	

export const actions = {
	changeIsAdditionOfLikeArticleAction(context, count){		
		context.commit('changeIsAdditionOfLikeArticle', count);
	},
	changeIsLoginUserAction(context, flag){		
		context.commit('changeIsLoginUser', flag);
	},
	allProfilePersistedSetAction(context, data){		
		context.commit('allProfilePersistedSet', data);
	},
	allCommentDataInitAction(context){
		context.commit('allCommentDataInit');
	},
	allCommentDataSetAction(context,element){		
		context.commit('allCommentDataSet', element);

	},
	changeUserIdPersistedAction(context, id){		
		context.commit('changeUserIdPersisted', id);
	},
	/**/
	likeArticleCountSetAction(context, count){		
		context.commit('likeArticleCountSet', count);
	},
	docIdForUpdatelikeArticleCountSetAction(context, id){		
		context.commit('docIdForUpdatelikeArticleCountSet', id);
	},
	usersDataSetAction(context, data){		
		context.commit('usersDataSet', data);
	},
	namePersistedSetAction(context, name){		
		context.commit('namePersistedSet', name);
	},
	

}