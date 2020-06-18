<template>
	<div class="section-container">
		<div>
			<h2 class="h2title">
				コメント一覧
			</h2>
		</div>
		<b-table
			v-if="!getIsCommentMessage"
			:items="commentsForTable"
			:fields="fieldsOfCommentData"
			responsive="sm"
		>
			<template v-slot:cell(content)="data" :style="{ width: '100px' }">
				<div :style="{ marginLeft: getMarginLeft(data.item) }">
					<b-img :src="data.item.image_url" v-bind="mainProps" />

					<span>
						{{ data.item.nick_name_from }}
					</span>

					<p>
						{{ data.item.comment }}
					</p>
					<span>
						{{ data.item.createdAt }}
					</span>

					<nuxt-link
						v-if="data.item.replyButtonFlag"
						:to="{
							path: `/members/${$store.getters['sessionStorageParameter/getClickedProfileData'].user_id}/comments/${data.item.commentId}`,
						}"
						@click.native="setCommentData(data.item)"
					>
						返信する
					</nuxt-link>
					<!--
					<p>
						<span>
							commentId:
						</span>
						{{ data.item.commentId }}
					</p>
					<p>
						<span>
							reply_comment_id:
						</span>
						{{ data.item.reply_comment_id }}
					</p>
					-->
				</div>
			</template>
		</b-table>
		<p v-if="getIsCommentMessage">
			まだコメントのやり取りはありません。
		</p>
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
	//props: ["isCallGetComments"],
	props: {
		isCallGetComments: {
			type: Boolean,
		},
	},
	data() {
		return {
			commentsForTable: [],
			fieldsOfCommentData: [
				{
					key: "content",
					label: "",
				},
			],
			mainProps: {
				width: 30,
				block: false,
			},
		};
	},
	computed: {
		getIsCommentMessage() {
			if (this.commentsForTable.length >= 1) {
				return false;
			}
			return true;
		},
	},
	watch: {
		isCallGetComments: function () {
			//console.log("enter isCallGetComments");
			if (this.isCallGetComments) {
				this.getComments();
			}
		},
	},
	created() {
		this.getComments();
	},
	methods: {
		getComments() {
			//console.log("enter getComments");
			//ここでは、このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う

			//必要なデータを取得 + 初期化
			let allComments = _cloneDeep(this.$store.getters["getAllComments"]);
			let firstCommentsOfThisPage = [];
			let commentsOfThisPage = [];
			//const allProfiles = this.$store.getters["getAllProfiles"];
			const profileDataOfThisPage = this.$store.getters[
				"sessionStorageParameter/getClickedProfileData"
			];
			const loginUserData = this.$store.getters["sessionStorageParameter/getLoginUserData"];

			//console.log("allProfiles");
			//console.log(allProfiles);

			//console.log("profileDataOfThisPage");
			//console.log(profileDataOfThisPage);

			//初回コメントを取得する
			//他のユーザーによる初コメント

			//全コメントの中から、このページに向けられた初回コメントを取得してくる
			for (let i = 0; i < allComments.length; i++) {
				//このページへの初回コメントか判定する
				//初回コメントにはreply_comment_idが設定されていない
				if (
					allComments[i].reply_comment_id === undefined &&
					profileDataOfThisPage.user_id === allComments[i].user_id_to
				) {
					allComments[i].isAddition = true;
					allComments[i].nestCount = 0;

					//push後にcommentsOfThisPageの要素を書き換えると、元のallCommentsのデータも更新されるので注意
					firstCommentsOfThisPage.push(allComments[i]);
				}
			}

			//console.log("firstCommentsOfThisPage");
			//console.log(firstCommentsOfThisPage);

			//初回コメントを時系列の古い順に並べ替える
			firstCommentsOfThisPage.sort(sortFunc);

			//コメント一覧を投稿日時でソートするための関数を定義
			function sortFunc(a, b) {
				return a.createdAt - b.createdAt;
			}

			//ネスト1以上のコメントを取得し、整列させる

			//firstCommentsOfThisPageから初回コメントを１つずつ取り出し、
			//その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
			for (let i = 0; i < firstCommentsOfThisPage.length; i++) {
				//初回コメントを表示用配列に入れる
				commentsOfThisPage.push(firstCommentsOfThisPage[i]);

				//commentsOfThisPageの中身を確認
				for (let j = 0; j < commentsOfThisPage.length; j++) {
					//console.log(`commentsOfThisPage[${j}]`);
					//console.log(commentsOfThisPage[j]);
				}
				//ネスト数１以上の返信コメントを取得して、表示用配列に入れる
				getNestCommet(i, 1);
			}

			//ネスト数１以上のコメントを見つける
			function getNestCommet(index, currentNestCount) {
				//console.log("enter getNestCommet");
				//allComments2[x].reply_comment_idの比較対象が、ネスト数２以上の場合とは異なることに注意
				if (currentNestCount === 1) {
					//ネスト１のコメントが存在するかチェック
					for (let j = 0; j < allComments.length; j++) {
						//ネスト０のコメントIDにリプライIDが一致するコメントがあるかチェック
						if (
							allComments[j].reply_comment_id ===
							firstCommentsOfThisPage[index].commentId
						) {
							//console.log(`allComments[${j}]`);
							//console.log(allComments[j].comment);
							//console.log(`firstCommentsOfThisPage[${index}]`);

							//ネスト１のコメントを表示用配列に挿入
							setNestCount(j, currentNestCount);

							//挿入したネスト１のコメントに対して、ネスト２以上のコメントがぶら下がっていないか調べる
							getNestCommet(j, currentNestCount + 1);
						}
					}
					//ここに到達しているときは
					//ネスト０のコメントに対して、返信がない場合
					//ネスト０のコメントに対して、ネスト１以上のコメントをすべて探し出し、表示用に格納できた場合である
					//いずれにせよ、これ以降の処理は必要がないのでリターンする
					return;
				}

				//currentNestCount=2以上、
				//つまり、ネスト数２以降のコメントを検索する場合は、以下の処理を行う
				for (let i = 0; i < allComments.length; i++) {
					if (allComments[i].reply_comment_id === allComments[index].commentId) {
						//console.log(`nest=${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}`);
						//console.log("allComments[i].reply_comment_id");
						//console.log(allComments[i].reply_comment_id);
						//console.log(`allComments[i=${i}]`);
						//console.log(`allComments[index=${index}]`);
						setNestCount(i, currentNestCount);

						//ネスト数は３までとする
						if (currentNestCount + 1 === 4) {
							//ブレイクした場合、そのままgetNestCommetを抜ける
							break;
						}
						getNestCommet(i, currentNestCount + 1);
					}
				}
			}
			//setNestCount関数の役割
			//表示用配列に格納する要素にネスト数を付与
			//表示用配列に追加済みの要素にフラグを立てる

			function setNestCount(index, currentNestCount) {
				//console.log(`index=${index}`);
				//console.log(`currentNestCount=${currentNestCount}`);
				//console.log(`allComments[${index}]=`);
				//console.log(allComments[index].comment);
				//初回コメントの次のインデックスにネスト数１の返信データを格納する
				//見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック
				if (!allComments[index].isAddition) {
					//ネスト配列に格納される要素のisAdditionをtrueに変更
					allComments[index].isAddition = true;

					//コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
					allComments[index].nestCount = currentNestCount;

					//commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
					let element = _cloneDeep(allComments[index]);

					//firstCommentsOfThisPage[j].nestArray.push(nest1);
					//ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
					commentsOfThisPage.push(element);
				}
			}

			/*
			console.log("--------------------------------------------------------");
			for(let i=0; i<commentsOfThisPage.length; i++){
				console.log(`commentsOfThisPage[${i}]`);
				console.log(commentsOfThisPage[i]);
			}
			//console.log("--------------------------------------------------------");
			*/

			//7:日付の表示方法の変更
			for (let i = 0; i < commentsOfThisPage.length; i++) {
				let month = String(Number(commentsOfThisPage[i].createdAt.getMonth()) + 1);
				let dateInfo =
					commentsOfThisPage[i].createdAt.getFullYear() +
					"年" +
					month +
					"月" +
					commentsOfThisPage[i].createdAt.getDate() +
					"日" +
					commentsOfThisPage[i].createdAt.getHours() +
					"時" +
					commentsOfThisPage[i].createdAt.getMinutes() +
					"分";
				commentsOfThisPage[i].createdAt = dateInfo;
			}

			//8:返信ボタンの設置
			//8-1:replyButtonFlagの初期化
			for (let i = 0; i < commentsOfThisPage.length; i++) {
				commentsOfThisPage[i].replyButtonFlag = false;
			}

			//8-2:replyButtonFlagを設定
			//このページを作成者本人である会員Aが閲覧している場合
			if (loginUserData.uid === profileDataOfThisPage.user_id) {
				//ネスト０とネスト２のコメントに返信ボタンをつける
				//ただし、その下にネストが存在する場合は返信ボタンをつけない
				//これは、j+1番目の要素のネスト数が０になっているかで判断できる
				//なお、配列の最後の要素がネスト0の場合は返信ボタンをつける
				for (let j = 0; j < commentsOfThisPage.length; j++) {
					//本人が自分のプロフィールにコメントしている場合は、そのコメントに返信ボタンをつけない
					//コメントのuser_id_fromがloginUserData.uidと一致する
					//コメントのuser_id_fromがloginUserData.uidと異なる場合に以下を行う
					if (commentsOfThisPage[j].user_id_from !== loginUserData.uid) {
						//配列の最後の要素がネスト0の場合
						if (
							commentsOfThisPage[j].nestCount === 0 &&
							j === commentsOfThisPage.length - 1
						) {
							commentsOfThisPage[j].replyButtonFlag = true;
							//ネスト０で次の要素もネスト０の場合
						} else if (
							commentsOfThisPage[j].nestCount === 0 &&
							commentsOfThisPage[j + 1].nestCount === 0
						) {
							commentsOfThisPage[j].replyButtonFlag = true;
						}
						//配列の最後の要素がネスト2の場合
						if (
							commentsOfThisPage[j].nestCount === 2 &&
							j === commentsOfThisPage.length - 1
						) {
							commentsOfThisPage[j].replyButtonFlag = true;

							//ネスト2で次の要素がネスト０の場合
						} else if (
							commentsOfThisPage[j].nestCount === 2 &&
							commentsOfThisPage[j + 1].nestCount === 0
						) {
							commentsOfThisPage[j].replyButtonFlag = true;
						}
					} else {
						console.log("以下のコメントは、このプロフィールページの作成者のものです");
					}
				}
				//このページを作成者(会員A)ではない会員Bが閲覧している場合
			} else {
				//ネスト１のコメントで、なおかつuser_id_toが会員Bのものは返信ボタンをつける
				//ただし、その下にネストが存在する場合は返信をつけない
				//プロフィールページでは、返信ボタンを使った作成者を介さないコメントのやり取りはできない
				//そのため、会員Aのページで会員Bと会員Cが返信機能を使って筆談することはできない
				for (let j = 0; j < commentsOfThisPage.length; j++) {
					//配列の最後の要素がネスト1の場合
					if (
						commentsOfThisPage[j].nestCount === 1 &&
						commentsOfThisPage[j].user_id_to === loginUserData.uid &&
						j === commentsOfThisPage.length - 1
					) {
						commentsOfThisPage[j].replyButtonFlag = true;

						//ネスト１で次の要素がネスト０
					} else if (
						commentsOfThisPage[j].nestCount === 1 &&
						commentsOfThisPage[j].user_id_to === loginUserData.uid &&
						commentsOfThisPage[j + 1].nestCount === 0
					) {
						commentsOfThisPage[j].replyButtonFlag = true;
					}
				}
			}

			//この初期化を行わないと、テーブルに重複が生じる
			this.commentsForTable.splice(-this.commentsForTable.length);

			//テーブルの表示用配列にデータを入れる
			for (let i = 0; i < commentsOfThisPage.length; i++) {
				this.commentsForTable.push(commentsOfThisPage[i]);
			}
			console.log("this.commentsForTable");
			console.log(this.commentsForTable);
		},
		getMarginLeft(row) {
			//コメントに返信する場合、元のコメントより右に少しずらす
			//このマージンをコメントのネスト数から算出する
			let value = Number(row.nestCount) * 30;
			let marginLeft = value + "px";
			return marginLeft;
		},
		setCommentData(element) {
			//console.log("element:");
			//console.log(element);
			//返信ボタンが押されたら、そのコメントを取得し、sessoinに保存
			//reply.vueでリロードされた場合を想定し、データはsessionに保存しておく
			//reply.vueにて、この保存されたコメントデータを呼び出す
			this.$store.commit("sessionStorageParameter/commentDataSet", element);
		},
	},
};
</script>
