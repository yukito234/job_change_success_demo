<template>
	<div class="page-container">
		<div class="individual-section">
			<profile-infomation />
		</div>
		<div class="individual-section">
			<like-articles />
		</div>
		<div class="individual-section">
			<do-comment @commentRegisteredNotice="changeIsCallGetComments" />
		</div>
		<div class="individual-section">
			<!--<comment-list :is-call-get-comments="obtainIsCallGetComments" />-->
			<comment-list
				:is-call-get-comments="obtainIsCallGetComments"
				@newCommentsObtainedNotice="initIsCallGetComments"
			/>
		</div>
	</div>
</template>

<script>
import Profile from "~/components/profile.vue";
import LikeArticles from "~/components/like-articles.vue";
import DoComment from "~/components/do-comment.vue";
import CommentList from "~/components/comment-list.vue";

export default {
	middleware: "authenticated",
	components: {
		"profile-infomation": Profile,
		"like-articles": LikeArticles,
		"do-comment": DoComment,
		"comment-list": CommentList,
	},
	async fetch({ store }) {
		//ここでは、お気に入り記事のデータと、コメントデータの取得を行う

		//1:お気に入り記事のデータを取得
		//全お気に入り記事のデータがstoreにない場合（初回アクセス時またはリロード後）
		if (!store.getters["getIsAllLikeArticles"]) {
			//DBから全お気に入り記事のデータと、このページユーザのお気に入り記事を保管
			await store.dispatch("likeArticlesGetAction");

			//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			store.dispatch("changeIsAllLikeArticlesAction", true);
		}

		//2:コメントデータを取得
		//全コメントデータがstoreにない場合（初回アクセス時またはリロード後）
		if (!store.getters["getIsAllComments"]) {
			console.log("enter !store.getters['getIsAllComments']");
			//DBから全コメントデータを取得し、必要なプロパティを付与する
			await store.dispatch("commentsGetAction");

			//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			store.dispatch("changeIsAllCommentsAction", true);
		}
	},
	data() {
		return {
			//do-comment.vueにてユーザがコメントを投稿したときtrueに変わり
			//comment-list.vueに最新のコメントをDBから取得するよう促す役割がある
			isCallGetComments: false,
			show: false,
			loading: true,
			mainProps: {
				width: 30,
				block: false,
			},
			fieldsOfCommentData: [
				{
					key: "content",
					label: "",
				},
			],
			userInfo: "",
			userComment: "",
			replyContent: "",
			allLikeArticlesData: [],
			likeArticles: [],
			commentsForTable: [],
		};
	},
	computed: {
		obtainIsCallGetComments() {
			return this.isCallGetComments;
		},
	},
	methods: {
		changeIsCallGetComments() {
			//子のdo-comment.vueにてユーザがコメントを投稿すると発動するメソッド
			//isCallGetCommentsをtrueに切り替えることで
			//comment-list.vueに最新のコメント取得を促す
			this.isCallGetComments = true;
		},
		initIsCallGetComments() {
			//comment-list.vueにて最新コメントの表示が完了したら、isCallGetCommentsを初期化
			//この処理を行わないと、２回目以降のコメントをリアクティブに表示できない
			this.isCallGetComments = false;
		},
	},
	head() {
		return {
			title: "プロフィールページ",
			meta: [
				{
					hid: "description",
					name: "description",
					content:
						"あなたがプロフィール登録済みであれば、このページの会員にコメントを残せます。また、お気に入り記事やコメントのやり取りを閲覧できます。",
				},
			],
		};
	},
};
</script>

<style scoped>
.individual-section {
	margin-bottom: 20px;
}
</style>
