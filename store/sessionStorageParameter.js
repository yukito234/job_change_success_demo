//import Vue from 'vue'
//import Vuex from 'vuex'
//import firebase from "firebase";
//import db from "../plugins/firebase_config";
//import _cloneDeep from "lodash/cloneDeep";
export const state = () => ({
	allUsersData: [], //usersコレクションの全データ
	loginUserData: {}, //usersコレクションでログインしたユーザのデータ
	isLoginUser: false, //ログアウト状態でfalse、ログイン状態でtrue
	isAllProfiles: false,
	clickedProfileData: {}, //member.vueでクリックされたユーザのデータ
	commentData: {}, //reply.vueに表示するコメント。id.vueでクリックされたコメント
	allProfiles: [],
	loginUserProfile: {}, //プロパティを設定してしまうと、登録時のオブジェクトの中身が変化した場合に、こちらも書き換える手間が発生する
	likeArticlesDataOfLoginUser: [],
});

export const getters = {
	getLikeArticlesDataOfLoginUser(state) {
		return state.likeArticlesDataOfLoginUser;
	},
	getIsAllProfiles(state) {
		return state.isAllProfiles;
	},
	getCommentData(state) {
		return state.commentData;
	},
	getClickedProfileData(state) {
		return state.clickedProfileData;
	},
	getIsLoginUser(state) {
		return state.isLoginUser;
	},
	getLoginUserData(state) {
		return state.loginUserData;
	},
	getLoginUserProfile(state) {
		return state.loginUserProfile;
	},
	getAllUsersData(state) {
		return state.allUsersData;
	},
	getAllProfiles(state) {
		return state.allProfiles;
	},
};

export const mutations = {
	allStateDataInit(state) {
		console.log("enter allStateDataInit of session");
		state.allUsersData = [];
		state.loginUserData = {};
		state.isLoginUser = false;
		state.isAllProfiles = false;
		state.clickedProfileData = {};
		state.commentData = {};

		state.allProfiles = [];
		state.loginUserProfile = {};
		state.likeArticlesDataOfLoginUser = [];
	},
	likeArticlesDataOfLoginUserInit(state) {
		state.likeArticlesDataOfLoginUser.splice(-state.likeArticlesDataOfLoginUser.length);
	},
	likeArticlesDataOfLoginUserSet(state, data) {
		console.log("enter likeArticlesDataOfLoginUserSet");
		//配列を初期化
		//state.likeArticlesDataOfLoginUser.splice(-state.likeArticlesDataOfLoginUser.length);
		state.likeArticlesDataOfLoginUser.push(data);
	},
	changeIsProfileRegistration(state, flag) {
		console.log("enter changeIsProfileRegistration");
		state.loginUserData.is_profile_registration = flag;
	},
	loginUserProfileSet(state, data) {
		console.log("enter loginUserProfileSet in session");
		console.log("data");
		console.log(data);
		//state.loginUserProfile = data;
		state.loginUserProfile = Object.assign({}, data);
		console.log("state.loginUserProfile");
		console.log(state.loginUserProfile);
	},
	changeIsAllProfiles(state, flag) {
		state.isAllProfiles = flag;
	},
	allProfilesGet(state, data) {
		state.allProfiles.push(data);
	},
	commentDataSet(state, element) {
		state.commentData = element;
		console.log("state.commentData in commentDataSet");
		console.log(state.commentData);
	},
	clickedProfileDataSet(state, data) {
		state.clickedProfileData = data;
		console.log("state.clickedProfileData in clickedProfileDataSet");
		console.log(state.clickedProfileData);
	},
	changeIsLoginUser(state, flag) {
		state.isLoginUser = flag;
		console.log("state.isLoginUser");
		console.log(state.isLoginUser);
	},
	loginUserDataSet(state, data) {
		state.loginUserData = data;
		console.log("state.loginUserData in loginUserDataSet");
		console.log(state.loginUserData);
	},
	loginUserDataInit(state) {
		console.log("state.loginUserData before loginUserDataInit");
		console.log(state.loginUserData);
		state.loginUserData = {};
		console.log("state.loginUserData after loginUserDataInit");
		console.log(state.loginUserData);
	},
	allUsersDataInit(state) {
		state.allUsersData.splice(-state.allUsersData.length);
	},
	allUsersDataSet(state, data) {
		//console.log("enter allUsersDataSet in session");
		state.allUsersData.push(data);
		//console.log(state.allUsersData);
	},
};

export const actions = {
	changeIsProfileRegistrationAction(context, flag) {
		context.commit("changeIsProfileRegistration", flag);
	},
	changeIsLoginUserAction(context, flag) {
		console.log("enter changeIsLoginUserAction");
		context.commit("changeIsLoginUser", flag);
	},
	loginUserDataSetAction(context, data) {
		context.commit("loginUserDataSet", data);
	},
	loginUserDataInitAction(context) {
		context.commit("loginUserDataInit");
	},
	allUsersDataInitAction(context) {
		context.commit("allUsersDataInit");
	},
	allUsersDataSetAction(context, data) {
		//console.log("enter allUsersDataSetAction in session");
		context.commit("allUsersDataSet", data);
	},
	changeIsAllProfilesAction(context, flag) {
		context.commit("changeIsAllProfiles", flag);
	},
	allStateDataInitAction(context) {
		context.commit("allStateDataInit");
	},
};
