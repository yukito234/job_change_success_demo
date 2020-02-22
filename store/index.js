/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({
	currentUserName : "",
	//authenticated : "",
	allArticles: [],
})
	
export const actions = {		
	nameSetAction(context, name){
		console.log("in nameSetAction");
		context.commit('nameSet', name);
	},
	allArticlesGetAction(context, data){		
		context.commit('allArticlesGet', data);
	},
}

export const mutations ={

	nameSet(state, name){
		console.log("in nameSet");
		state.currentUserName = name;
		//state.authenticated = name;
		
	},
	nameInit(state){
		state.currentUserName = "";
		//state.authenticated = "";

	},
	allArticlesGet(state, data){		
		state.allArticles.push(data);

	},
}