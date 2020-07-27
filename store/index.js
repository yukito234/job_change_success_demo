import firebase from "firebase";
import db from "../plugins/firebase_config";
import _cloneDeep from "lodash/cloneDeep";

export const state = () => ({
	isExperienceArticles: false,
	isAllProfiles: false,
	isAllLikeArticles: false,
	isAllComments: false,
	allExperienceArticles: [],
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
		state.isExperienceArticles = false;
		state.isAllProfiles = false;
		state.isAllLikeArticles = false;
		state.isAllComments = false;
		state.allExperienceArticles = [];
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
		state.allComments.splice(-state.allComments.length);
	},
	allExperienceArticlesInit(state) {
		state.allExperienceArticles.splice(-state.allExperienceArticles.length);
	},
	allExperienceArticlesSet(state, data) {
		state.allExperienceArticles.push(data);
	},
	likeArticlesDataOfThisPageSet(state, data) {
		state.likeArticlesDataOfThisPage.push(data);
	},
	allLikeArticlesSet(state, data) {
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
	},
	changeIsAllProfiles(state, flag) {
		state.isAllProfiles = flag;
	},
	changeIsAllComments(state, flag) {
		state.isAllComments = flag;
	},
	changeUsedAPI(state, name) {
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

		let status = await this.$axios
			.$get(url)
			.then((response) => {
				result = response;
				return 200;
			})
			.catch((err) => {
				return err.response.status;
			});

		if (status === 200) {
			//result.searchInformation.totalResults === "0" の場合はresult.itemsが存在しない
			//よって以下のresult.items.lengthでエラーが出る
			//そこで検索結果が0でない場合にのみ以下の処理を行うこととする
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
		//すべての（500件以上の）記事を全チェックする可能性は低いので、
		//最大取得数は500件で問題ないと考える

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
					return err.response.status;
				});

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
			} else {
				isError = true;
				break;
			}
		}
		return isError;
	},
	async isProfileRegistrationUpdateAction(context, data) {
		await db
			.collection("users")
			.doc(data.documentId)
			.update({
				is_profile_registration: true,
			})
			.then(() => {
				//プロフィールの登録状態をtrueに変更
				context.dispatch("sessionStorageParameter/changeIsProfileRegistrationAction", true);
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerProfileAction(context, data) {
		//最初に画像をストレージに保存する
		//ストレージへの保存に成功したら、DBに登録する
		const firestorage = firebase.storage();
		await firestorage
			.ref(data.file.name)
			.put(data.file)
			.then(async (snapshot) => {
				await snapshot.ref.getDownloadURL().then(async (url) => {
					data.profile.image_url = url;
					await db
						.collection("user_profile")
						.add(data.profile)
						.then(async () => {
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
			const firestorage = firebase.storage();
			//最初に画像をストレージに保存する
			//ストレージへの保存に成功したら、DBに登録する
			await firestorage
				.ref(data.file.name)
				.put(data.file)
				.then(async (snapshot) => {
					await snapshot.ref.getDownloadURL().then(async (url) => {
						data.profile.image_url = url;
						await db
							.collection("user_profile")
							.doc(data.documentId)
							.update(data.profile)
							.then(() => {})
							.catch((error) => {
								alert(error.message);
							});
					});
				});
		} else {
			await db
				.collection("user_profile")
				.doc(data.documentId)
				.update(data.profile)
				.then(() => {})
				.catch((error) => {
					alert(error.message);
				});
		}
	},
	async registerArticleAction(context, articleData) {
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
		if (!context.getters["getIsAllProfiles"]) {
			await context.dispatch("allProfilesGetAction");
		}

		const allProfiles = _cloneDeep(context.getters["getAllProfiles"]);

		//この初期化を実行しておかないと、個別ページのコメント一覧に重複が生じる
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
					if (data.createdAt) {
						data.createdAt = data.createdAt.toDate();
					}

					context.commit("allCommentsSet", data);
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerLikeArticleAction(context, data) {
		let documentId = context.getters["sessionStorageParameter/getLoginUserData"].documentId;
		let newLikeArticleCount =
			context.getters["sessionStorageParameter/getLoginUserData"].like_article_count + 1;

		await db
			.collection("like_articles")
			.add(data)
			.then(async () => {
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
	async deleteLikeArticleAction(context, item) {
		let documentId = context.getters["sessionStorageParameter/getLoginUserData"].documentId;
		let newLikeArticleCount =
			context.getters["sessionStorageParameter/getLoginUserData"].like_article_count - 1;

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
			})
			.catch((error) => {
				alert(error.message);
			});
	},
	async registerCommentAction(context, comment) {
		const userIdFrom = context.getters["sessionStorageParameter/getLoginUserData"].uid;
		const userIdTo = context.getters["sessionStorageParameter/getClickedProfileData"].user_id;

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
				//これにより、再度DBと通信して最新のコメントデータを取得する
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
					if (data.uid !== undefined && data.uid === firebase.auth().currentUser.uid) {
						data.documentId = doc.id;
						context.dispatch("sessionStorageParameter/loginUserDataSetAction", data);
					}
				});
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		return result;
	},
	async easySignInAction(context) {
		const resultOfEasySignIn = await firebase
			.auth()
			.signInWithEmailAndPassword("test0@t.com", "testtest0")
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});

		let resultOfUsersCollectionTreatment = "";

		//ログインに成功した場合は、usersコレクションから必要なデータをsessionに保存する
		if (resultOfEasySignIn === "success") {
			resultOfUsersCollectionTreatment = await context.dispatch("getUsersCollectionAction");
			//ログインに失敗した場合は、エラーを表示して終了
		} else {
			alert(`${resultOfEasySignIn}`);
			return;
		}

		if (resultOfUsersCollectionTreatment === "success") {
			//ログイン有無はsessionに保存する
			context.dispatch("sessionStorageParameter/changeIsLoginUserAction", true);
		} else {
			alert(
				`${resultOfUsersCollectionTreatment}｜エラーが発生したのでログアウトして終了します。`
			);
			context.dispatch("signOutAction");
		}
	},
	async signInAction(context, data) {
		//authenticationでログイン処理を行う
		const resultOfSignIn = await firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});

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
				return "success";
			})
			.catch((error) => {
				return error.message;
			});

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
	async addUsersCollectionAction(context, userName) {
		//会員登録後のusersコレクションの処理
		const result = await db
			.collection("users")
			.add({
				uid: firebase.auth().currentUser.uid,
				name: userName,
				//お気に入り記事の登録数
				like_article_count: 0,
				//ユーザのプロフィール登録有無.profile-registration.vueにて表示コンテンツの切り替えに使う
				is_profile_registration: false,
			})
			.then(() => {
				return "success";
			})
			.catch((error) => {
				return error.message;
			});
		return result;
	},
	async allArticlesForSuccessGraphGetAction(context) {
		await db
			.collection("experience_articles")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					context.commit("allArticlesForGraphGet", data);
				});
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
			.then(() => {})
			.catch((error) => {
				alert(`ログアウト時にエラーが発生しました。 (${error.message})`);
			});
		this.app.router.push("/");
	},
	loginUserProfileGetAction(context) {
		//全プロフィールデータを取得
		const allProfiles = context.getters["getAllProfiles"];
		const loginUserData = context.getters["sessionStorageParameter/getLoginUserData"];

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
