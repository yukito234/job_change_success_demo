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
};
</script>
