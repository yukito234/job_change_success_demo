<template>
	<div class="page-container">
		<doughnut-graph-section />
		<article-list />
	</div>
</template>

<script>
import ArticleList from "~/components/article-list.vue";
import DoughnutGraphSection from "~/components/doughnut-graph-section.vue";

export default {
	components: {
		"article-list": ArticleList,
		"doughnut-graph-section": DoughnutGraphSection,
	},
	async fetch({ store }) {
		//体験記データがstoreにない場合（初回アクセス時またはリロード後）
		if (!store.getters["getIsExperienceArticles"]) {
			store.dispatch("allArticlesForGraphInitAction");
			//初回のみDBと通信して体験記データを取得
			await store.dispatch("allArticlesForSuccessGraphGetAction");

			//DBからのデータ取得有無を表すflagを"取得済"に変更する
			store.dispatch("changeIsExperienceArticlesAction", true);
		}
	},
};
</script>
