<template>
	<div class="page-container">
		<experience-search />
		<stock-articles />
	</div>
</template>

<script>
import ExperienceSearch from "~/components/experience-search.vue";
import StockArticles from "~/components/stock-articles.vue";

export default {
	components: {
		"experience-search": ExperienceSearch,
		"stock-articles": StockArticles,
	},
};
</script>
