/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _cloneDeep from 'lodash/cloneDeep';

export const state = () => ({	

	allUsersData:[],//usersコレクションの全データ
	loginUserData:{},//usersコレクションでログインしたユーザのデータ
	isLoginUser:false,//ログアウト状態でfalse、ログイン状態でtrue
	isAllProfiles: false,
	clickedProfileData:{},//member.vueでクリックされたユーザのデータ
	commentData:{},//reply.vueに表示するコメント。id.vueでクリックされたコメント

	allProfiles: [],
	loginUserProfile: {},//プロパティを設定してしまうと、登録時のオブジェクトの中身が変化した場合に、こちらも書き換える手間が発生する
	likeArticlesDataOfLoginUser: [],



	/*
	//成功者グラフページのデータはindex.jsに保存する
	isExperienceArticles: false,
	allArticlesForGraph: [],
	graphItemData:{},
	graphLabels:[],
	graphQuantity:[],
	graphColor:[],
	graphType: "age",
	*/	



})

export const getters = {
	getLikeArticlesDataOfLoginUser(state){
		return state.likeArticlesDataOfLoginUser;


	},
	getIsAllProfiles(state){
		return state.isAllProfiles;


	},
	getCommentData(state){		
		return state.commentData;
	},
	getClickedProfileData(state){		
		return state.clickedProfileData;
	},
	getIsLoginUser(state){		
		return state.isLoginUser;
	},
	getLoginUserData(state){

		return state.loginUserData;
	},
	getLoginUserProfile(state){

		return state.loginUserProfile;
	},

	getAllUsersData(state){

		return state.allUsersData;
	},
	getAllProfiles(state){

		return state.allProfiles;
	},

	/*
	//成功者グラフページのデータはindex.jsに保存する
	getAllArticlesForGraph(state){
		return state.allArticlesForGraph;


	},
	getGraphType(state){
		return state.graphType;


	},
	getIsExperienceArticles(state){		
		return state.isExperienceArticles;
	},
	getGraphLabels(state){
		return state.graphLabels;


	},
	getGraphQuantity(state){
		return state.graphQuantity;


	},
	getGraphColor(state){
		return state.graphColor;


	},
	*/




}

export const mutations ={
	allStateDataInit(state){
		console.log("enter allStateDataInit of session");
		state.allUsersData= [];
		state.loginUserData= {};
		state.isLoginUser= false;
		state.isAllProfiles= false;
		state.clickedProfileData= {};
		state.commentData= {};

		state.allProfiles= [];
		state.loginUserProfile= {};
		state.likeArticlesDataOfLoginUser= [];

		

	},
	likeArticlesDataOfLoginUserInit(state){

		state.likeArticlesDataOfLoginUser.splice(-state.likeArticlesDataOfLoginUser.length);

	},
	likeArticlesDataOfLoginUserSet(state,data){
		console.log("enter likeArticlesDataOfLoginUserSet");

		//配列を初期化		
		//state.likeArticlesDataOfLoginUser.splice(-state.likeArticlesDataOfLoginUser.length);

		state.likeArticlesDataOfLoginUser.push(data);

	},
	changeIsProfileRegistration(state,flag){
		console.log("enter changeIsProfileRegistration");
		state.loginUserData.is_profile_registration = flag;
		


	},
	loginUserProfileSet(state,data){
		console.log("enter loginUserProfileSet in session");
		console.log("data");
		console.log(data);
		//state.loginUserProfile = data;

		state.loginUserProfile = Object.assign({}, data);

		console.log("state.loginUserProfile");
		console.log(state.loginUserProfile);
		


	},
	changeIsAllProfiles(state,flag){

		state.isAllProfiles = flag;
		


	},
	allProfilesGet(state, data){		
		state.allProfiles.push(data);	
	},
	commentDataSet(state,element){
		state.commentData = element;
		console.log("state.commentData in commentDataSet");
		console.log(state.commentData);

	},	
	clickedProfileDataSet(state, data){		
		state.clickedProfileData = data;
		console.log("state.clickedProfileData in clickedProfileDataSet");
		console.log(state.clickedProfileData);
		
	},
	changeIsLoginUser(state, flag){		
		state.isLoginUser = flag ;
		console.log("state.isLoginUser");
		console.log(state.isLoginUser);
		
	},
	loginUserDataSet(state, data){

		state.loginUserData = data;
		console.log("state.loginUserData in loginUserDataSet");
		console.log(state.loginUserData);
	},
	loginUserDataInit(state){
		console.log("state.loginUserData before loginUserDataInit");
		console.log(state.loginUserData);
		state.loginUserData = {};

		console.log("state.loginUserData after loginUserDataInit");
		console.log(state.loginUserData);


	},
	allUsersDataInit(state){

		state.allUsersData.splice(-state.allUsersData.length);


	},
	allUsersDataSet(state,data){
		//console.log("enter allUsersDataSet in session");
		state.allUsersData.push(data);
		//console.log(state.allUsersData);

	},
	/*
	//成功者グラフページのデータはindex.jsに保存する
	changeIsExperienceArticles(state,flag){

		state.isExperienceArticles = flag;

	},
	allArticlesForGraphGet(state, data){				
		state.allArticlesForGraph.push(data);
	},
	createLabelQuantityColor(state){
		console.log("enter createLabelQuantityColor mutations of sessionStorage");		
		//ラベル配列とデータ配列を初期化		
		state.graphLabels.splice(-state.graphLabels.length);
		state.graphQuantity.splice(-state.graphQuantity.length);

		//ラベル配列とデータ配列を生成
		for(let graphLabel in state.graphItemData){			
			state.graphLabels.push(graphLabel);			
			state.graphQuantity.push(state.graphItemData[graphLabel]);
		}
		
		//カラーパレット(20色)を用意		
		let colorPalette = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6'];
		
		//カラー配列を初期化
		state.graphColor.splice(-state.graphColor.length);

		//ラベルの個数分だけカラーパレットから色を取得
		for(let i=0; i < state.graphLabels.length; i++){
			state.graphColor.push(colorPalette[i]);
		}
	},
	itemCount(state, graphType){
		console.log("enter itemCount mutations of sessionStorage");
		//グラフデータを格納するオブジェクトを初期化
		state.graphItemData = {};						

		//全グラフデータから選択されたグラフタイプにおいて、各項目のデータ数をカウントする
		let key= "";	
		for(let i=0; i < state.allArticlesForGraph.length; i++){
			key = eval(`state.allArticlesForGraph[${i}].` + graphType + ";");			
			if( key !== "" ){
				if( graphType === "study_term"){					
					key = key + "ヶ月";
					let keyCheckFlag = key in state.graphItemData;
				}
				//各項目の個数をカウントする
				let keyCheckFlag = key in state.graphItemData;				
				if(keyCheckFlag){
					state.graphItemData[key] += 1;
				} else {
					state.graphItemData[key] = 1;
				}
			}
		}		
	},
	graphTypeChange(state, graphType){
		state.graphType = graphType;
	},
	*/

}

export const actions = {
	/*
	async allProfilesGetAction(context){
		console.log("enter allProfilesGetAction");  
      		
		await db.collection("user_profile").get()
	      .then((querySnapshot)=>{        
	        querySnapshot.forEach((doc)=>{                                                
	          const data = doc.data();
	          

	          context.commit('sessionStorageParameter/allProfilesGet', data);

	          

	          

	        });    
	        console.log("context.getters['sessionStorageParameter/getAllComments']:");  
      		console.log(context.getters['sessionStorageParameter/getAllComments']); 
	                         
	      })
	      .catch((error) => {
	          alert(error.message)
	      });


	},
	*/
	changeIsProfileRegistrationAction(context, flag){		
		context.commit('changeIsProfileRegistration', flag);
	},	
	changeIsLoginUserAction(context, flag){	
		console.log("enter changeIsLoginUserAction");
		context.commit('changeIsLoginUser', flag);
	},	
	loginUserDataSetAction(context, data){
		context.commit('loginUserDataSet', data);


	},
	loginUserDataInitAction(context){
		context.commit('loginUserDataInit');


	},
	allUsersDataInitAction(context){
		context.commit('allUsersDataInit');


	},
	allUsersDataSetAction(context, data){
		//console.log("enter allUsersDataSetAction in session");
		context.commit('allUsersDataSet', data);
	},
	changeIsAllProfilesAction(context, flag){
		context.commit('changeIsAllProfiles', flag);

	},
	allStateDataInitAction(context){
		context.commit('allStateDataInit');

	},
	/*
	//成功者グラフページのデータはindex.jsに保存する
	allArticlesForGraphGetAction(context, data){			
		context.commit('allArticlesForGraphGet', data);
	},
	createLabelQuantityColorAction(context){		
		context.commit('createLabelQuantityColor');
	},
	itemCountAction(context, graphType){				
		context.commit('itemCount', graphType);
	},
	graphTypeChangeAction(context, graphType){
		context.commit('graphTypeChange', graphType);

	},
	changeIsExperienceArticlesAction(context, flag){
		context.commit('changeIsExperienceArticles', flag);

	},
	*/

}