/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	
	url : "",
	title: "",
	age: null,
	educationalBackground: null,
	studyTerm: "",
	schoolPresence: null,
	language: [],
	framework: [],
	company: null,
})
	
export const actions = {	
	
}

export const mutations ={
	initState(state){
		state.url = "";
		state.title = "";
		state.age = "";
		state.educationalBackground = "";
		state.studyTerm = "";
		state.schoolPresence = "";
		state.language = [];
		state.framework = [];
		state.company = "";

	},
	changeUrl(state, urlData){		
		state.url = urlData ;
		
	},
	changeTitle(state, titleData){		
		state.title = titleData ;
		
	},
	changeAge(state, ageData){		
		state.age = ageData ;
		
	},
	changeEducationalBackground(state, educationalBackgroundData){		
		state.educationalBackground = educationalBackgroundData ;
		
	},
	changeStudyTerm(state, studyTermData){		
		state.studyTerm = studyTermData ;
		
	},
	changeSchoolPresence(state, schoolPresenceData){		
		state.schoolPresence = schoolPresenceData ;
		
	},	
	changeLanguage(state, languageData){		
		state.language = languageData;
		
	},
	changeFramework(state, frameworkData){		
		state.framework = frameworkData ;
		
	},
	changeCompany(state, companyData){		
		state.company = companyData ;
		
	},
	
}	