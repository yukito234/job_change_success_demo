/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	profileImageUrl : "",
	nickName:"",
    selfIntroduction:"",
	
})
	
export const actions = {	
	profileImageUrlChangeAction(context, url){
		context.commit('profileImageUrlChange', url);
	},
	nickNameChangeAction(context, name){
		context.commit('nickNameChange', name);
	},
	selfIntroductionChangeAction(context, text){
		context.commit('selfIntroductionChange', text);
	},
}

export const mutations ={	
	profileImageUrlChange(state, url){
		state.profileImageUrl = url ;
		
	},
	nickNameChange(state, name){
		state.nickName = name ;
	},
	selfIntroductionChange(state, text){
		state.selfIntroduction = text ;
		
	},			
	
}	