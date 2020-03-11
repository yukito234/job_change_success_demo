/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	isEmpty : true,	
	userIdPersisted: "",
	stockedArticles: [],
	
})

export const getters = {
	getStockedArticles(state){		
		return state.stockedArticles;
	},

}

export const mutations ={	
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
	changeUserIdPersistedAction(context, id){		
		context.commit('changeUserIdPersisted', id);
	},

}