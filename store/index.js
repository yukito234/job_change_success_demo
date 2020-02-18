/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

//Vue.use(Vuex)

export const state = () => ({

	currentUserName : "",
	allArticles: [],
})
	
export const actions = {
		
	nameSetAction(context, name){
		context.commit('nameSet', name);
	},
	allArticlesGetAction(context, data){
		console.log("allArticlesGetActionが呼ばれました");
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
		console.log("allArticlesGetが呼ばれました");

		state.allArticles.push(data);


	},


}
	



/*
const store = new Vuex.Store({
	state:{
		//currentUserEmail: "",
		currentUserName : "",
	},
	
	actions:{
		
		nameSetAction(context, name){
			context.commit('nameSet', name);
		}

	},
	mutations:{
		
		nameSet(state, name){

			state.currentUserName = name;

			
		},
		nameInit(state){
			state.currentUserName = "";


		},
	},
	
})

export default store
*/