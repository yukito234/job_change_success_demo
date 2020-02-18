/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({
	//url : "test",
	url : "",
	title: "",
	age: "",
	educationalBackground: "",
	studyTerm: "",
	schoolPresence: "",
	language: [],
	framework: [],
	company: "",
})
	
export const actions = {
		
	/*
	nameSetAction(context, name){
		context.commit('nameSet', name);
	}
	*/

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
		//state.url = urlData + 'x';
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
		//let languageDataJoined = languageData.join(",");
		//state.language = languageDataJoined ;
		state.language = languageData;
		
	},
	changeFramework(state, frameworkData){
		
		state.framework = frameworkData ;
		
	},
	changeCompany(state, companyData){
		
		state.company = companyData ;
		
	},
	/*
	nameSet(state, name){

		state.currentUserName = name;

		
	},
	nameInit(state){
		state.currentUserName = "";


	},
	*/
}
	