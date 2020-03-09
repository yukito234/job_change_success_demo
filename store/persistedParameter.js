/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	isEmpty : true,	
	userIdPersisted: "",
	
})

export const mutations ={	
	changeIsEmpty(state, flag){		
		state.isEmpty = flag ;
		
	},	
	changeUserIdPersisted(state, id){		
		state.userIdPersisted = id ;
		
	},
	
}	

export const actions = {
	changeUserIdPersistedAction(context, id){		
		context.commit('changeUserIdPersisted', id);
	},

}







