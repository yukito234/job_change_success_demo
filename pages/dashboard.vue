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
		//member.vueで全プロフィールデータを取得していない場合や
		//リロード等により全プロフィールデータが消失している場合
		//再度DBと通信してデータを取得する
		if (!store.getters["getIsAllProfiles"]) {
			console.log("enter !store.getters['getIsAllProfiles'] in dashboard.vue");
			store.dispatch("allProfilesInitAction");

			//全プロフィールデータを取得してindex.jsに保存する
			await store.dispatch("allProfilesGetAction");

			//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			store.dispatch("changeIsAllProfilesAction", true);
		}
		//全プロフィールデータの中からログインユーザのデータを見つけ出し、sessionに保存
		store.dispatch("loginUserProfileGetAction");

		if (!store.getters["getIsAllLikeArticles"]) {
			console.log("enter !store.getters['getIsAllLikeArticles'] in dashboard.vue");
			await store.dispatch("likeArticlesGetAction");
			store.dispatch("changeIsAllLikeArticlesAction", true);
		}
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
