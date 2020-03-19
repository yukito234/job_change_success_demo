/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	isEmpty : true,	
	userIdPersisted: "",
	stockedArticles: [],
	usedAPI:"",	
	commentData:"",//reply.vueに表示するコメント
	allCommentData:[],//id.vueのコメント表の全データ
	userData:"",//users-list.vueでセットされるプロフィールページユーザの情報
	allProfilePersisted:[],//users-list.vueでセットされる全プロフィールページユーザの情報

})

export const getters = {
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
	deleteStockedArticles(state, element){				
		state.stockedArticles.splice(-state.stockedArticles.length);
	},
	
}	

export const actions = {
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

}