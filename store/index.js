//import Vue from 'vue'
//import Vuex from 'vuex'
import firebase from "firebase";
import db from "../plugins/firebase_config";
import _cloneDeep from "lodash/cloneDeep";

export const state = () => ({
	isExperienceArticles: false,
	isAllProfiles: false,
	isAllLikeArticles: false,
	isAllComments: false,
	allExperienceArticles: [], //検索結果の記事を格納
	allProfiles: [],
	currentUserName: "",
	allArticles: [],
	allArticlesForGraph: [],
	allLikeArticles: [],
	allComments: [],
	likeArticlesDataOfThisPage: [],
	usedAPI: "",
});

export const getters = {
	getAllExperienceArticles(state) {
		return state.allExperienceArticles;
	},
	getAllComments(state) {
		return state.allComments;
	},
	getAllLikeArticles(state) {
		return state.allLikeArticles;
	},
	getAllProfiles(state) {
		return state.allProfiles;
	},
	getIsAllComments(state) {
		return state.isAllComments;
	},
	getIsAllLikeArticles(state) {
		return state.isAllLikeArticles;
	},
	getIsAllProfiles(state) {
		return state.isAllProfiles;
	},
	getAllArticlesForGraph(state) {
		return state.allArticlesForGraph;
	},
	getIsExperienceArticles(state) {
		return state.isExperienceArticles;
	},
};

export const mutations = {
	allStateDataInit(state) {
		console.log("enter allStateDataInit of index.js");
		state.isExperienceArticles = false;
		state.isAllProfiles = false;
		state.isAllLikeArticles = false;
		state.isAllComments = false;
		state.allExperienceArticles = []; //検索結果の記事を格納
		state.allProfiles = [];
		state.currentUserName = "";
		state.allArticles = [];
		state.allArticlesForGraph = [];
		state.allLikeArticles = [];
		state.allComments = [];
		state.likeArticlesDataOfThisPage = [];
		state.usedAPI = "";
	},
	allLikeArticlesInit(state) {
		state.allLikeArticles.splice(-state.allLikeArticles.length);
	},
	allArticlesForGraphInit(state) {
		state.allArticlesForGraph.splice(-state.allArticlesForGraph.length);
	},
	allProfilesInit(state) {
		state.allProfiles.splice(-state.allProfiles.length);
	},
	allCommentsInit(state) {
		console.log("enter allCommentsInit");
		state.allComments.splice(-state.allComments.length);
	},
	allExperienceArticlesInit(state) {
		console.log("enter allExperienceArticlesInit");
		state.allExperienceArticles.splice(-state.allExperienceArticles.length);
	},
	allExperienceArticlesSet(state, data) {
		console.log("enter allExperienceArticlesSet");
		state.allExperienceArticles.push(data);
	},
	likeArticlesDataOfThisPageSet(state, data) {
		console.log("enter likeArticlesDataOfThisPageSet");
		state.likeArticlesDataOfThisPage.push(data);
	},
	allLikeArticlesSet(state, data) {
		console.log("enter allLikeArticlesSet");
		state.allLikeArticles.push(data);
	},
	allProfilesGet(state, data) {
		state.allProfiles.push(data);
	},
	changeIsAllLikeArticles(state, flag) {
		state.isAllLikeArticles = flag;
	},
	changeIsExperienceArticles(state, flag) {
		state.isExperienceArticles = flag;
		console.log("state.isExperienceArticles");
		console.log(state.isExperienceArticles);
	},
	changeIsAllProfiles(state, flag) {
		state.isAllProfiles = flag;
	},
	changeIsAllComments(state, flag) {
		state.isAllComments = flag;
	},
	changeUsedAPI(state, name) {
		console.log("enter changeUsedAPI");
		state.usedAPI = name;
	},
	allCommentsSet(state, data) {
		state.allComments.push(data);
	},
	nameSet(state, name) {
		state.currentUserName = name;
	},
	nameInit(state) {
		state.currentUserName = "";
	},
	allArticlesGet(state, data) {
		state.allArticles.push(data);
	},
	allArticlesForGraphGet(state, data) {
		state.allArticlesForGraph.push(data);
	},
};

export const actions = {
	allArticlesForGraphInitAction(context) {
		context.commit("allArticlesForGraphInit");
	},
	allProfilesInitAction(context) {
		context.commit("allProfilesInit");
	},
	allCommentsInitAction(context) {
		context.commit("allCommentsInit");
	},
	async doSearchInGoogleAction(context, data) {
		let urlParameter = "";
		let url = "";
		let result = [];
		let isError = false;

		for (let i = 0; i < data.searchBoxContentArray.length; i++) {
			if (i === data.searchBoxContentArray.length - 1) {
				urlParameter = urlParameter + data.searchBoxContentArray[i];
			} else {
				urlParameter = urlParameter + data.searchBoxContentArray[i] + "+";
			}
		}

		switch (data.domain) {
			case "hatenablog":
				urlParameter =
					urlParameter + "+" + "site:hatenablog.com" + "+" + "-site:paiza.hatenablog.com";
				break;
			case "note":
				urlParameter = urlParameter + "+" + "site:note.com";
				break;
			case "others":
				urlParameter =
					urlParameter +
					"+" +
					"-site:note.com" +
					"+" +
					"-site:hatenablog.com" +
					"+" +
					"-site:qiita.com";
				break;
		}

		url =
			"https://www.googleapis.com/customsearch/v1?key=" +
			process.env.GOOGLE_API +
			"&cx=" +
			process.env.SEARCH_ENGINE_ID +
			"&q=allintitle:" +
			"+" +
			urlParameter;

		console.log("url");
		console.log(url);
		//$nuxt.$router.push('/member');
		let status = await this.$axios
			.$get(url)
			.then((response) => {
				result = response;
				return 200;
			})
			.catch((err) => {
				console.log("err");
				console.log(err);
				return err.response.status;
			});

		console.log("status of google search");
		console.log(status);

		console.log("result of google search");
		console.log(result);

		if (status === 200) {
			//result.searchInformation.totalResults === "0" の場合はresult.itemsが存在しない
			//よってresult.items.lengthでエラーが出る
			//そこで検索結果が0でない場合にのみ以下の処理を行うこととする
			//検索結果が0の場合は、this.array.splice(-this.array.length);で
			//配列は初期化されるので、lengthは0となる
			if (result.searchInformation.totalResults !== "0") {
				for (let i = 0; i < result.items.length; i++) {
					//ストック記事を削除する際に使うフラグを設定
					result.items[i].isDelete = false;

					//QiitaのAPI取得データと同じurlプロパティを設定
					//ストック記事をテーブルに表示する際に、urlというプロパティが必要になるため
					result.items[i].url = result.items[i].link;

					//ストック記事テーブルから記事を削除する際に、このプロパティを設定しておくと便利なため
					result.items[i].domain = "otherThanQiita";

					context.commit("allExperienceArticlesSet", _cloneDeep(result.items[i]));
				}
			}
		} else {
			isError = true;
		}
		return isError;
	},
	async doSearchInQiitaAction(context, searchBoxContentArray) {
		let urlParameter = "";
		let url = "";
		let isError = false;

		//APIから取得したデータの格納用
		let result = [];

		const pageMax = 5;
		//pageMaxの決め方
		//Qiitaから取得する体験記の記事数の最大値(予想)は、現状で約500件
		//以下はQiitaで実際に検索をかけたときの検索キーワードと取得記事数
		//title:未経験・・・478件
		//title:転職・・・269件
		//実際には500件を超える可能性もあるが、ユーザが表示方法や検索キーワードを変えずに
		//すべての（500件以上の）記事をチェックする可能性は低いので、これで問題ないと考える

		//QiitaAPIマニュアルよりper_page=100(MAX)なので、pageMax=5としておけば必要な記事をすべて取得できる
		//pageMax=5
		//per_page=100

		//検索ボックスのキーワードを取得
		//タイトルにすべてのキーワードを含む記事のみを検索対象とする
		for (let i = 0; i < searchBoxContentArray.length; i++) {
			if (i === searchBoxContentArray.length - 1) {
				urlParameter = urlParameter + "title:" + searchBoxContentArray[i];
			} else {
				urlParameter = urlParameter + "title:" + searchBoxContentArray[i] + "+";
			}
		}

		url = "https://qiita.com/api/v2/items?query=" + urlParameter;

		console.log("url:");
		console.log(url);

		//APIを利用して検索結果を取得する
		for (let i = 0; i < pageMax; i++) {
			url =
				"https://qiita.com/api/v2/items?query=" +
				urlParameter +
				`&page=${i + 1}&per_page=100`;

			let status = await this.$axios
				.$get(url)
				.then((response) => {
					//responseオブジェクトからstatusを取得できないので、
					//axiosの処理が正常に終了した場合は200を返す
					result = response;
					return 200;
				})
				.catch((err) => {
					console.log("err");
					console.log(err);
					return err.response.status;
				});

			console.log("status of qiita search");
			console.log(status);

			console.log("result of qiita search");
			console.log(result);

			if (status === 200) {
				//取得数が上限の500件未満の場合は、途中でQiitaから空配列が返ってくるので、
				//その時点で、必要なデータをゲットできたと判断し、取得処理を中止する
				if (result === []) {
					break;
				}

				for (let j = 0; j < result.length; j++) {
					//isStockプロパティを付与した配列を作成
					//ストック記事を削除する際に使うフラグ
					result[j].isDelete = false;

					//ストック記事テーブルから記事を削除する際に、このプロパティを設定しておくと便利なため
					result[j].domain = "qiita";
					context.commit("allExperienceArticlesSet", _cloneDeep(result[j]));
				}
				//console.log("this.allArticleDataSorted of qiita");
				//console.log(this.allArticleDataSorted);
			} else {
				isError = true;
				break;
			}
		}
		return isError;
	},
	async isProfileRegistrationUpdateAction(context, data) {
		console.log("enter isProfileRegistrationUpdateAction");
		console.log("data");
		console.log(data);

		await db
			.collection("users")
			.doc(data.documentId)
			.update({
				is_profile_registration: true,
			})
			.then(() => {
				//プロフィールの登録状態をtrueに変更
				context.dispatch("sessionStorageParameter/changeIsProfileRegistrationAction", true);
				//この後リロードすると、dashboard.vueにてDBとの通信が起こり、全プロフィールデータの取得が行われる
				//更新したプロフィールのみをDBから取得するように変更した方がいい
				//dashboard.vueにおいても全ユーザのプロフィールを取得するのではなく、そのページのユーザのみにした方が負担が小さい
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerProfileAction(context, data) {
		console.log("enter registerProfileAction");
		const firestorage = firebase.storage();

		//最初に画像をストレージに保存する
		//ストレージへの保存に成功したら、DBに登録する
		await firestorage
			.ref(data.file.name)
			.put(data.file)
			.then(async (snapshot) => {
				await snapshot.ref.getDownloadURL().then(async (url) => {
					//imageUrl = url;
					data.profile.image_url = url;
					console.log("data.profile.image_url");
					console.log(data.profile.image_url);

					await db
						.collection("user_profile")
						.add(data.profile)
						.then(async () => {
							console.log("プロフィールの登録完了");
							//usersコレクションのデータを更新
							await context.dispatch(
								"isProfileRegistrationUpdateAction",
								_cloneDeep(data)
							);
						})
						.catch((error) => {
							alert(error.message);
						});
				});
			});
	},
	async updateProfileAction(context, data) {
		if (data.file !== undefined) {
			console.log("enter if(data.file !== undefined)");
			const firestorage = firebase.storage();
			//最初に画像をストレージに保存する
			//ストレージへの保存に成功したら、DBに登録する
			await firestorage
				.ref(data.file.name)
				.put(data.file)
				.then(async (snapshot) => {
					await snapshot.ref.getDownloadURL().then(async (url) => {
						data.profile.image_url = url;
						console.log("data in index.js");
						console.log(data);

						await db
							.collection("user_profile")
							.doc(data.documentId)
							.update(data.profile)
							.then(async () => {
								//console.log("finish  db.collection(user_profile).doc(data.documentId)");
							})
							.catch((error) => {
								alert(error.message);
							});
					});
				});
		} else {
			console.log("enter async updateProfileAction");
			await db
				.collection("user_profile")
				.doc(data.documentId)
				.update(data.profile)
				.then(function () {
					//alert("プロフィールの編集が完了しました");
				})
				.catch((error) => {
					alert(error.message);
				});
		}
		//console.log("end of ");
	},
	async registerArticleAction(context, articleData) {
		console.log("enter registerArticleAction");
		const result = await db
			.collection("experience_articles")
			.add({
				url: articleData.url,
				title: articleData.title,
				age: articleData.age,
				educational_background: articleData.educationalBackground,
				study_term: articleData.studyTerm,
				school_presence: articleData.schoolPresence,
				company: articleData.company,
			})
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		return result;
	},
	async replyAction(context, commentData) {
		//test2(uid=Th6xW8fwLuSgSlDrKiPFDdi2N8G2)のプロフィールにtest3(uid=u2jzNG3iuuZpDSdoyF4vI4X1QJ92)がコメント
		//このtest3のコメントにtest2が返信する場合

		//元のコメントのデータ(test2のプロフィールにtest3がしたコメント)
		//console.log("context.getters['sessionStorageParameter/getCommentData'].user_id_to");
		//console.log(context.getters['sessionStorageParameter/getCommentData'].user_id_to);//Th6xW8fwLuSgSlDrKiPFDdi2N8G2

		//console.log("context.getters['sessionStorageParameter/getCommentData'].user_id_from");
		//console.log(context.getters['sessionStorageParameter/getCommentData'].user_id_from);//u2jzNG3iuuZpDSdoyF4vI4X1QJ92

		//console.log("context.getters['sessionStorageParameter/getCommentData'].commentId");
		//console.log(context.getters['sessionStorageParameter/getCommentData'].commentId);

		const result = await db
			.collection("user_comments")
			.add({
				user_id_from: context.getters["sessionStorageParameter/getCommentData"].user_id_to,
				user_id_to: context.getters["sessionStorageParameter/getCommentData"].user_id_from,
				comment: commentData,
				createdAt: new Date(),
				reply_comment_id:
					context.getters["sessionStorageParameter/getCommentData"].commentId,
			})
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		return result;
	},
	async commentsGetAction(context) {
		//id.vueでリロードされた場合は、index.jsのプロフィールデータが消失する
		//よって、プロフィールデータがない場合はDBと通信して取得する必要がある
		if (!context.getters["getIsAllProfiles"]) {
			await context.dispatch("allProfilesGetAction");
		}

		const allProfiles = _cloneDeep(context.getters["getAllProfiles"]);

		//プロフィールデータはsessionに保存しておかないと、id.vueでリロードされたときにindex.jsのデータが消えてしまう
		//そのページでのみ必要とされるデータであればindex.jsに入れておけばいい
		//複数ページで利用される場合は、いずれかのページでリロードされた瞬間にデータが消失してしまう
		//const allProfiles = _cloneDeep( context.getters['sessionStorageParameter/getAllProfiles'] );
		console.log("allProfiles");
		console.log(allProfiles);

		//これを実行しておかないとid.vueのコメント一覧に重複が生じる
		context.dispatch("allCommentsInitAction");

		//全コメントデータを取得し、後の処理で役立つプロパティを付与しておく
		await db
			.collection("user_comments")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();

					//コメントデータにコメントIDを付与
					//コメントIDはドキュメントIDとする
					data.commentId = doc.id;

					//初回コメントと返信コメントを正しい順番で表示用配列に格納していく際に、
					//allCommentsの要素で,すでに表示用配列に追加されたものはisAddition=trueとしておくことで、
					//allCommentsでのコメントの探索が効率よく行える
					data.isAddition = false;

					//コメントの種類（初回、返信）やネストの深さを判別しやすくするためにnestCountを設定する
					data.nestCount = null;

					//コメントデータに投稿者のニックネームと、プロフィール画像を付与する
					for (let j = 0; j < allProfiles.length; j++) {
						if (data.user_id_from === allProfiles[j].user_id) {
							data.nick_name_from = allProfiles[j].nick_name;
							data.image_url = allProfiles[j].image_url;
						}
					}

					//DBから取得したコメントの更新日時データをDate型に変換
					//data.createdAtがundefinedのデータもあるので、ifで分岐させないとエラーが出る
					if (data.createdAt) {
						data.createdAt = data.createdAt.toDate();
					}

					//console.log("data:");
					//console.log(data);
					context.commit("allCommentsSet", data);
					//allComments.push(data);
				});
				console.log("context.getters['getAllComments']:");
				console.log(context.getters["getAllComments"]);
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerLikeArticleAction(context, data) {
		console.log("enter registerLikeArticleAction");
		let documentId = context.getters["sessionStorageParameter/getLoginUserData"].documentId;
		let newLikeArticleCount =
			context.getters["sessionStorageParameter/getLoginUserData"].like_article_count + 1;

		console.log("documentId");
		console.log(documentId);

		console.log("newLikeArticleCount");
		console.log(newLikeArticleCount);

		await db
			.collection("like_articles")
			.add(data)
			.then(async () => {
				console.log("finish db.collection(like_articles).add");
				await db
					.collection("users")
					.doc(documentId)
					.update({
						like_article_count: newLikeArticleCount,
					})
					.then(async () => {
						console.log("finish db.collection(users).update");
						await context.dispatch("likeArticlesGetAction");
						await context.dispatch("changeIsAllLikeArticlesAction", true);
						await context.dispatch("getUsersCollectionAction");
						context.dispatch("sessionStorageParameter/changeIsLoginUserAction", true);
					})
					.catch((error) => {
						alert(error.message);
					});
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async deleteLikeArticleAction(context, item) {
		console.log("enter deleteLikeArticleAction");
		//console.log("context.getters['sessionStorageParameter/getLoginUserData'].like_article_count");
		//console.log(context.getters['sessionStorageParameter/getLoginUserData'].like_article_count);

		let documentId = context.getters["sessionStorageParameter/getLoginUserData"].documentId;
		let newLikeArticleCount =
			context.getters["sessionStorageParameter/getLoginUserData"].like_article_count - 1;

		console.log("newLikeArticleCount after -1");
		console.log(newLikeArticleCount);
		console.log("documentId");
		console.log(documentId);
		console.log("item.documentId");
		console.log(item.documentId);

		await db
			.collection("like_articles")
			.doc(item.documentId)
			.delete()
			.then(async () => {
				//記事の削除に成功したら、DBのお気に入り記事数カウントを更新
				await db
					.collection("users")
					.doc(documentId)
					.update({
						like_article_count: newLikeArticleCount,
					})
					.then(async () => {
						await context.dispatch("likeArticlesGetAction");
						await context.dispatch("changeIsAllLikeArticlesAction", true);
						await context.dispatch("getUsersCollectionAction");
						context.dispatch("sessionStorageParameter/changeIsLoginUserAction", true);
					})
					.catch((error) => {
						alert(error.message);
					});
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async editLikeArticleAction(context, item) {
		console.log("enter editLikeArticleAction");
		await db
			.collection("like_articles")
			.doc(item.documentId)
			.update({
				recommendation: item.recommendation,
				free_text_area: item.free_text_area,
			})
			.then(async () => {
				alert("おすすめの人の編集が完了しました");
				await context.dispatch("likeArticlesGetAction");
				context.dispatch("changeIsAllLikeArticlesAction", true);
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async likeArticlesGetAction(context) {
		console.log("enter likeArticlesGetAction");
		//この初期化を行わないと、リロードするたびに同じ要素が配列に追加されていく
		context.commit("sessionStorageParameter/likeArticlesDataOfLoginUserInit");
		context.commit("allLikeArticlesInit");

		await db
			.collection("like_articles")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					//全お気に入り記事のデータ保管用の配列に挿入
					context.commit("allLikeArticlesSet", _cloneDeep(data));

					//このプロフィールページのユーザのお気に入り記事を取得する
					//各お気に入り記事には、user_idプロパティが設定されていて、誰のお気に入りなのか判別できる
					//お気に入り記事のuser_idが、現在表示しているページのuser_idと一致する場合
					if (
						data.user_id !== undefined &&
						data.user_id ===
							context.getters["sessionStorageParameter/getClickedProfileData"].user_id
					) {
						const dataOfDeepCopy = _cloneDeep(data);
						context.commit("likeArticlesDataOfThisPageSet", dataOfDeepCopy);
					}

					// ログインユーザのお気に入り記事を取得する
					if (
						data.user_id !== undefined &&
						data.user_id ===
							context.getters["sessionStorageParameter/getLoginUserData"].uid
					) {
						data.documentId = doc.id;
						const dataOfDeepCopy = _cloneDeep(data);
						context.commit(
							"sessionStorageParameter/likeArticlesDataOfLoginUserSet",
							dataOfDeepCopy
						);
					}
				});
				//お気に入り記事紹介テーブルの最初の記事の詳細だけあらかじめ表示させておくために設定する
				//ただ、ボタンが正しく動作しないのでやめた
				//それぞれのボタンが区別されていないので、下のボタンをクリックすると上の表示まで閉じてしまう
				//this.allLikeArticlesData[0]._showDetails= true;
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerCommentAction(context, comment) {
		console.log("enter registerCommentAction");
		//usersコレクションから取得
		//uidが存在しないユーザーもいるので注意
		const userIdFrom = context.getters["sessionStorageParameter/getLoginUserData"].uid;
		//user_profileコレクションから取得
		//user_idが存在しないユーザーもいるので注意
		const userIdTo = context.getters["sessionStorageParameter/getClickedProfileData"].user_id;

		console.log("userIdFrom:");
		console.log(userIdFrom);

		await db
			.collection("user_comments")
			.add({
				user_id_from: userIdFrom,
				user_id_to: userIdTo,
				comment: comment,
				createdAt: new Date(),
			})
			.then(() => {
				//DBへのコメントの登録が完了したら、storeのisAllCommentsをfalseにする
				//これにより、id.vueに戻ったときfetchで再度DBと通信して最新のコメントデータを取得する
				//本来は  user_id_toで設定したユーザのページに戻ったときのみDBと通信して、他のユーザのページに移動したときはコメント一覧に変更はないので通信はしない方がいい
				//index.jsのstoreのallCommentsに新規登録されたコメントだけを挿入したいのだが、commentsGetActionで行っているプロパティの付与などを自力で行う必要があり、手間
				//そもそもDBのドキュメントIDは、DBから読み出すときでないと取得できないため不可能
				//結局DBと通信して最新のコメントを取得する方法しかない
				context.dispatch("changeIsAllCommentsAction", false);
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async allProfilesGetAction(context) {
		await db
			.collection("user_profile")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					//profile-registration.vueにてプロフィールの更新を行う際に使う
					//ログインユーザのプロフィールにのみ必要なプロパティ
					//ここでログインユーザのプロフィールデータも保存しておいた方がいいかも
					data.documentId = doc.id;
					context.commit("allProfilesGet", data);
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async getUsersCollectionAction(context) {
		//sessionのallUsersDataを初期化
		context.dispatch("sessionStorageParameter/allUsersDataInitAction");
		const result = await db
			.collection("users")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					//全ユーザのデータをsessionに保存
					context.dispatch("sessionStorageParameter/allUsersDataSetAction", data);

					//ログインユーザのデータをsessionに保存
					//必要なときに検索せず,すぐに取り出すため
					//test5@t.comより前のユーザは、usersコレクションにuidが保存されていないので、undefinedのエラーが出る
					if (data.uid !== undefined && data.uid === firebase.auth().currentUser.uid) {
						data.documentId = doc.id;
						console.log("data");
						console.log(data);
						context.dispatch("sessionStorageParameter/loginUserDataSetAction", data);
					}
				});
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		//console.log("result of getUsersCollectionAction in index.js");
		//console.log(result);
		return result;
	},
	async signInAction(context, data) {
		//authenticationでログイン処理を行う
		const resultOfSignIn = await firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then(() => {
				//console.log("firebase.auth().currentUser in signInAction");
				//console.log(firebase.auth().currentUser);//uid取得可能
				return "success";
			})
			.catch((error) => {
				return error.message;
			});

		console.log("resultOfSignIn of signInAction in index.js");
		console.log(resultOfSignIn);

		let resultOfUsersCollectionTreatment = "";

		//ログインに成功した場合は、usersコレクションから必要なデータをsessionに保存する
		if (resultOfSignIn === "success") {
			resultOfUsersCollectionTreatment = await context.dispatch("getUsersCollectionAction");
			//ログインに失敗した場合は、エラーを表示して終了
		} else {
			alert(`${resultOfSignIn}`);
			return;
		}

		if (resultOfUsersCollectionTreatment === "success") {
			//ログイン有無はsessionに保存する
			context.dispatch("sessionStorageParameter/changeIsLoginUserAction", true);

			this.app.router.push("/members");
			//this.$nuxt.$router.push("/members");
			//$nuxt.$router.push("/members");

			//usersコレクションからのデータ取得に失敗した場合は、エラーを表示してログアウトさせる
			//like_article_countはログイン後に更新される可能性があるので、取得に失敗した場合は即退出させる
		} else {
			alert(
				`${resultOfUsersCollectionTreatment}｜エラーが発生したのでログアウトして終了します。`
			);
			context.dispatch("signOutAction");
		}
	},
	async signUpAction(context, data) {
		//会員登録処理
		const resultOfSignUp = await firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then(() => {
				//console.log("firebase.auth().currentUser in signUpAction");
				//console.log(firebase.auth().currentUser);//uid取得可能
				return "success";
			})
			.catch((error) => {
				return error.message;
			});

		console.log("resultOfSignUp of signUpAction in index.js");
		console.log(resultOfSignUp);

		let resultOfUsersCollectionTreatment = "";

		//正常に登録が完了した場合は、usersコレクションにユーザIDとお気に入り記事の登録数を入れる処理を実行する
		if (resultOfSignUp === "success") {
			resultOfUsersCollectionTreatment = await context.dispatch(
				"addUsersCollectionAction",
				data.userName
			);
		} else {
			//signupのエラーを返す
			return resultOfSignUp;
		}
		return resultOfUsersCollectionTreatment;
	},
	//会員登録後のusersコレクションの処理
	async addUsersCollectionAction(context, userName) {
		const result = await db
			.collection("users")
			.add({
				uid: firebase.auth().currentUser.uid,
				name: userName,
				like_article_count: 0, //お気に入り記事の登録数
				is_profile_registration: false, //ユーザのプロフィール登録有無.profile-registration.vueにて表示コンテンツの切り替えに使う
			})
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		console.log("result of addUsersCollectionAction in index.js");
		console.log(result);
		return result;
	},
	async allArticlesForSuccessGraphGetAction(context) {
		console.log("enter allArticlesForSuccessGraphGetAction of index.js");
		await db
			.collection("experience_articles")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					context.commit("allArticlesForGraphGet", data);
				});
				console.log("getting data is finished of index.js");
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	allStateDataInitAction(context) {
		context.commit("allStateDataInit");
	},
	async signOutAction(context) {
		//index.jsのstateのデータをすべて初期化する
		context.dispatch("allStateDataInitAction");

		//sessionのstateのデータをすべて初期化する
		context.dispatch("sessionStorageParameter/allStateDataInitAction");

		//ログアウトする
		await firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("ログアウトしました");
			})
			.catch((error) => {
				alert(`ログアウト時にエラーが発生しました。 (${error.message})`);
			});
		//$nuxt.$router.push("/"); //この記述だとeslintから"$nuxt" is not definedというエラーが出る
		//this.$nuxt.$router.push("/");
		console.log("this.app");
		console.log(this.app);
		this.app.router.push("/");
	},
	loginUserProfileGetAction(context) {
		console.log("enter getLoginUserProfile in index.js");
		//全プロフィールデータを取得
		const allProfiles = context.getters["getAllProfiles"];
		const loginUserData = context.getters["sessionStorageParameter/getLoginUserData"];
		console.log("allProfiles");
		console.log(allProfiles);

		console.log("loginUserData");
		console.log(loginUserData);

		//ユーザIDを照合してログインユーザのプロフィールデータを取得
		for (let i = 0; i < allProfiles.length; i++) {
			if (allProfiles[i].user_id === loginUserData.uid) {
				//ログインユーザのプロフィールデータをsessionに保存
				context.commit(
					"sessionStorageParameter/loginUserProfileSet",
					_cloneDeep(allProfiles[i])
				);
				break;
			}
		}
	},
	nameSetAction(context, name) {
		context.commit("nameSet", name);
	},
	allArticlesGetAction(context, data) {
		context.commit("allArticlesGet", data);
	},
	allArticlesForGraphGetAction(context, data) {
		context.commit("allArticlesForGraphGet", data);
	},
	changeIsExperienceArticlesAction(context, flag) {
		context.commit("changeIsExperienceArticles", flag);
	},
	changeIsAllProfilesAction(context, flag) {
		context.commit("changeIsAllProfiles", flag);
	},
	changeIsAllLikeArticlesAction(context, flag) {
		console.log("enter changeIsAllLikeArticlesAction");
		context.commit("changeIsAllLikeArticles", flag);
	},
	changeIsAllCommentsAction(context, flag) {
		context.commit("changeIsAllComments", flag);
	},
};
