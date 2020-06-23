export const state = () => ({
	//usersコレクションの全データ
	allUsersData: [],

	//usersコレクションでログインしたユーザのデータ
	loginUserData: {},
	isLoginUser: false,
	isAllProfiles: false,

	//メンバーページでクリックされたユーザのデータ
	clickedProfileData: {},

	//個別ページでクリックされたコメント
	commentData: {},
	allProfiles: [],
	loginUserProfile: {},
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
		state.likeArticlesDataOfLoginUser.push(data);
	},
	changeIsProfileRegistration(state, flag) {
		state.loginUserData.is_profile_registration = flag;
	},
	loginUserProfileSet(state, data) {
		state.loginUserProfile = Object.assign({}, data);
	},
	changeIsAllProfiles(state, flag) {
		state.isAllProfiles = flag;
	},
	allProfilesGet(state, data) {
		state.allProfiles.push(data);
	},
	commentDataSet(state, element) {
		state.commentData = element;
	},
	clickedProfileDataSet(state, data) {
		state.clickedProfileData = data;
	},
	changeIsLoginUser(state, flag) {
		state.isLoginUser = flag;
	},
	loginUserDataSet(state, data) {
		state.loginUserData = data;
	},
	loginUserDataInit(state) {
		state.loginUserData = {};
	},
	allUsersDataInit(state) {
		state.allUsersData.splice(-state.allUsersData.length);
	},
	allUsersDataSet(state, data) {
		state.allUsersData.push(data);
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
		context.commit("allUsersDataSet", data);
	},
	changeIsAllProfilesAction(context, flag) {
		context.commit("changeIsAllProfiles", flag);
	},
	allStateDataInitAction(context) {
		context.commit("allStateDataInit");
	},
};
