/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({
	currentUserName : "",
	allArticles: [],
})
	
export const actions = {		
	nameSetAction(context, name){
		context.commit('nameSet', name);
	},
	allArticlesGetAction(context, data){		
		context.commit('allArticlesGet', data);

	},
}

export const mutations ={

	nameSet(state, name){
		state.currentUserName = name;
		
	},
	nameInit(state){
		state.currentUserName = "";

	},
	allArticlesGet(state, data){		
		state.allArticles.push(data);

	},
}