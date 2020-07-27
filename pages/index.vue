<template>
	<div class="page-container">
		<experience-search />
		<stock-articles />
		<how-to-use />
	</div>
</template>

<script>
import ExperienceSearch from "~/components/experience-search.vue";
import StockArticles from "~/components/stock-articles.vue";
import HowToUse from "~/components/how-to-use.vue";

export default {
	components: {
		"experience-search": ExperienceSearch,
		"stock-articles": StockArticles,
		"how-to-use": HowToUse,
	},
	head() {
		return {
			title: "トップページ",
			meta: [
				{
					hid: "description",
					name: "description",
					content:
						"Qiitaやhatena、noteなどのドメインで、未経験からwebエンジニアに転職した人のお役立ち体験記を効率よく検索できます。また、記事情報はローカルストレージに保存できます。",
				},
			],
		};
	},
};
</script>
