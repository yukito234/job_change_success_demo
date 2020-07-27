export const state = () => ({
	isEmpty: true,
	userIdPersisted: "",
	stockedArticles: [],
	stockedArticlesInGoogleSearch: [],
	commentData: "",
	allCommentData: [],
	userData: "",
	allProfilePersisted: [],
	isLoginUser: false,
	likeArticleCount: null,
	docIdForUpdatelikeArticleCount: "",
	isAdditionOfLikeArticle: true,
	usersData: [],
	namePersisted: "",
});

export const getters = {
	getNamePersisted(state) {
		return state.namePersisted;
	},
	getUsersData(state) {
		return state.usersData;
	},
	getisAdditionOfLikeArticle(state) {
		return state.isAdditionOfLikeArticle;
	},
	getDocIdForUpdatelikeArticleCount(state) {
		return state.docIdForUpdatelikeArticleCount;
	},
	getLikeArticleCount(state) {
		return state.likeArticleCount;
	},
	getIsLoginUser(state) {
		return state.isLoginUser;
	},
	getAllProfilePersisted(state) {
		return state.allProfilePersisted;
	},
	getUserData(state) {
		return state.userData;
	},
	getAllCommentData(state) {
		return state.allCommentData;
	},
	getCommentData(state) {
		return state.commentData;
	},
	getUserIdPersisted(state) {
		return state.userIdPersisted;
	},
	getStockedArticles(state) {
		return state.stockedArticles;
	},
	getStockedArticlesInGoogleSearch(state) {
		return state.stockedArticlesInGoogleSearch;
	},
};

export const mutations = {
	changeIsAdditionOfLikeArticle(state, count) {
		if (count < 3) {
			state.isAdditionOfLikeArticle = true;
		} else {
			state.isAdditionOfLikeArticle = false;
		}
	},
	docIdForUpdatelikeArticleCountSet(state, id) {
		state.docIdForUpdatelikeArticleCount = id;
	},
	likeArticleCountSet(state, count) {
		state.likeArticleCount = count;
	},
	changeIsLoginUser(state, flag) {
		state.isLoginUser = flag;
	},
	userIdPersistedInit(state) {
		state.userIdPersisted = "";
	},
	allProfilePersistedSet(state, data) {
		state.allProfilePersisted.push(data);
	},
	allCommentDataInit(state) {
		state.allCommentData.splice(-state.allCommentData.length);
	},
	userDataSet(state, element) {
		state.userData = element;
	},
	allCommentDataSet(state, element) {
		state.allCommentData.push(element);
	},
	commentDataSet(state, element) {
		state.commentData = element;
	},
	changeIsEmpty(state, flag) {
		state.isEmpty = flag;
	},
	changeUserIdPersisted(state, id) {
		state.userIdPersisted = id;
	},
	changeStockedArticlesInGoogleSearch(state, element) {
		let isDuplication = false;
		for (let i = 0; i < state.stockedArticlesInGoogleSearch.length; i++) {
			if (state.stockedArticlesInGoogleSearch[i].cacheId === element.cacheId) {
				isDuplication = true;
				break;
			}
		}
		if (!isDuplication) {
			state.stockedArticlesInGoogleSearch.push(element);
		}
	},
	changeStockedArticles(state, element) {
		let isDuplication = false;
		for (let i = 0; i < state.stockedArticles.length; i++) {
			if (state.stockedArticles[i].id === element.id) {
				isDuplication = true;
				break;
			}
		}
		if (!isDuplication) {
			state.stockedArticles.push(element);
		}
	},
	deleteSingleStockedArticle(state, stockDataArray) {
		//Qiita記事の削除ボタンがクリックされた場合、stockDataArrayにはQiitaのストック記事一覧が格納されている
		//つまり、先頭データのドメインをチェックすれば、渡された配列がQiitaのストック記事一覧なのか、
		//Googleのストック記事一覧か識別できる
		if (stockDataArray[0].domain === "qiita") {
			//Qiitaのストック記事格納用の配列を初期化
			state.stockedArticles.splice(-state.stockedArticles.length);

			for (let i = 0; i < stockDataArray.length; i++) {
				if (!stockDataArray[i].isDelete) {
					//削除しない要素をストック記事保管用配列に挿入する
					state.stockedArticles.push(stockDataArray[i]);
				}
			}
		} else {
			//Googleのストック記事格納用の配列を初期化
			state.stockedArticlesInGoogleSearch.splice(-state.stockedArticlesInGoogleSearch.length);

			for (let i = 0; i < stockDataArray.length; i++) {
				if (!stockDataArray[i].isDelete) {
					//削除しない要素をストック記事保管用配列に挿入する
					state.stockedArticlesInGoogleSearch.push(stockDataArray[i]);
				}
			}
		}
	},
	deleteStockedArticles(state) {
		//Qiitaのストック記事を削除
		state.stockedArticles.splice(-state.stockedArticles.length);
		//Googleから取得したストック記事を削除
		state.stockedArticlesInGoogleSearch.splice(-state.stockedArticlesInGoogleSearch.length);
	},
	usersDataSet(state, data) {
		state.usersData.push(data);
	},
	namePersistedSet(state, name) {
		state.namePersisted = name;
	},
};

export const actions = {
	changeIsAdditionOfLikeArticleAction(context, count) {
		context.commit("changeIsAdditionOfLikeArticle", count);
	},
	changeIsLoginUserAction(context, flag) {
		context.commit("changeIsLoginUser", flag);
	},
	allProfilePersistedSetAction(context, data) {
		context.commit("allProfilePersistedSet", data);
	},
	allCommentDataInitAction(context) {
		context.commit("allCommentDataInit");
	},
	allCommentDataSetAction(context, element) {
		context.commit("allCommentDataSet", element);
	},
	changeUserIdPersistedAction(context, id) {
		context.commit("changeUserIdPersisted", id);
	},
	likeArticleCountSetAction(context, count) {
		context.commit("likeArticleCountSet", count);
	},
	docIdForUpdatelikeArticleCountSetAction(context, id) {
		context.commit("docIdForUpdatelikeArticleCountSet", id);
	},
	usersDataSetAction(context, data) {
		context.commit("usersDataSet", data);
	},
	namePersistedSetAction(context, name) {
		context.commit("namePersistedSet", name);
	},
};
