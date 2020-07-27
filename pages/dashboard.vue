<template>
	<div class="page-container">
		<div class="section-container">
			<div class="h2title-area">
				<h2 class="h2title">
					ダッシュボードの機能を使う
				</h2>
			</div>
			<div class="dashboard-section">
				<profile-registration />
			</div>

			<div class="dashboard-section">
				<like-article-registration />
			</div>

			<div class="dashboard-section">
				<article-registration />
			</div>
		</div>
	</div>
</template>

<script>
import ArticleRegistration from "~/components/article-registration.vue";
import ProfileRegistration from "~/components/profile-registration.vue";
import LikeArticleRegistration from "~/components/like-article-registration.vue";

export default {
	middleware: "authenticated",
	components: {
		"article-registration": ArticleRegistration,
		"profile-registration": ProfileRegistration,
		"like-article-registration": LikeArticleRegistration,
	},
	async fetch({ store }) {
		//メンバーページで全プロフィールデータを取得していない場合や
		//リロード等により全プロフィールデータが消失している場合
		//再度DBと通信してデータを取得する
		if (!store.getters["getIsAllProfiles"]) {
			store.dispatch("allProfilesInitAction");

			//全プロフィールデータを取得してindex.jsに保存する
			await store.dispatch("allProfilesGetAction");

			//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			store.dispatch("changeIsAllProfilesAction", true);
		}
		//全プロフィールデータの中からログインユーザのデータを見つけ出し、sessionに保存
		store.dispatch("loginUserProfileGetAction");

		if (!store.getters["getIsAllLikeArticles"]) {
			await store.dispatch("likeArticlesGetAction");
			store.dispatch("changeIsAllLikeArticlesAction", true);
		}
	},
	head() {
		return {
			title: "ダッシュボードページ",
			meta: [
				{
					hid: "description",
					name: "description",
					content:
						"プロフィールを作成する機能、お役立ち記事を他のユーザに紹介する機能、転職成功者データを登録する機能を利用できます。",
				},
			],
		};
	},
};
</script>

<style scoped>
.member-container {
	margin: 20px;
}

.dashboard-section {
	margin-bottom: 30px;
}
</style>
