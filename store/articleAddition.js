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
	optionsOfAge: [
        { value: null, text: '選択してください' },
        { value: '20代前半', text: '20代前半' },
        { value: '20代後半', text: '20代後半' },
        { value: '30代前半', text: '30代前半' },
        { value: '30代後半', text: '30代後半' },
        { value: '40代前半', text: '40代前半' },
        { value: '40代後半', text: '40代後半' },
        { value: '50代', text: '50代' },
        { value: '60代以降', text: '60代以降' },
      
    ],
})
	
export const getters = {

	getUrl(state){
		return state.url;

	},

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

export const actions = {	
	
}