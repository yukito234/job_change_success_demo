<template>
	<div id="doughnut-graph-select-area">
		<span>
			グラフタイプ:
		</span>
		<b-form-select
			v-model="graphSelection"
			class="select-element"
			:options="optionsOfgraphSelection"
		/>
	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
export default {
	data() {
		return {
			optionsOfgraphSelection: [
				{ value: "age", text: "年齢" },
				{ value: "educational_background", text: "学歴" },
				{ value: "study_term", text: "勉強期間" },
				{ value: "school_presence", text: "スクール有無" },
				{ value: "company", text: "転職先" },
			],
			graphSelection: "age",
		};
	},
	watch: {
		graphSelection: function () {
			console.log("graphSelection in watch");
			console.log(this.graphSelection);
			this.$emit("graphChangeNoticeToDoughnutGraphSection", this.graphSelection);
		},
	},
	created() {
		console.log("created in doughnut-graph-select");
		console.log(this.graphSelection);
		this.$emit("graphChangeNoticeToDoughnutGraphSection", this.graphSelection);
	},
};
</script>

<style scoped>
.select-element {
	width: 300px;
}
</style>
