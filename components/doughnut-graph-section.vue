<template>
	<div class="section-container">
		<div class="h2title-area">
			<h2 class="h2title">
				転職成功者のグラフ
			</h2>
			<b-icon v-b-modal.modal-success-graph-title icon="question-circle" />
			<b-modal id="modal-success-graph-title" ok-only>
				<p class="my-4">
					転職成功者のデータ（年齢・学歴・勉強期間・スクール有無・転職先）をまとめたので、
					<br />あなたが気になる項目をチェックしてみてください。
				</p>
			</b-modal>
		</div>
		<doughnut-graph-select
			id="doughnut-graph-selection"
			@graphChangeNoticeToDoughnutGraphSection="changeGraphData"
		/>
		<doughnut-graph
			id="doughnut-graph"
			:chart-data="datacollectionChange"
			:graph-type="graphType"
		/>
	</div>
</template>

<script>
import DoughnutGraph from "~/components/doughnut.vue";
import DoughnutGraphSelect from "~/components/doughnut-graph-select.vue";
import { BIcon, BIconQuestionCircle } from "bootstrap-vue";

export default {
	components: {
		BIcon,
		BIconQuestionCircle,
		"doughnut-graph": DoughnutGraph,
		"doughnut-graph-select": DoughnutGraphSelect,
	},
	data() {
		return {
			datacollection: null,
			graphLabels: [],
			graphQuantity: [],
			graphColor: [],
			graphItemData: {},
			graphType: null,
		};
	},
	computed: {
		datacollectionChange() {
			//グラフタイプが変化したら、更新されたグラフデータを返す
			if (this.graphType !== null) {
				this.defineDatacollection();
			}
			return this.datacollection;
		},
	},
	methods: {
		defineDatacollection() {
			this.datacollection = {
				labels: this.graphLabels,
				datasets: [
					{
						data: this.graphQuantity,
						backgroundColor: this.graphColor,
					},
				],
			};
		},
		changeGraphData(graphType) {
			//グラフタイプの変化をキャッチしたら
			//再描画に必要なデータを生成する
			this.graphType = graphType;
			this.itemCount(graphType);
			this.createLabelQuantityColor();
		},
		createLabelQuantityColor() {
			//ラベル配列と度数配列を初期化
			this.graphLabels.splice(-this.graphLabels.length);
			this.graphQuantity.splice(-this.graphQuantity.length);

			//ラベル配列と度数配列を生成
			for (let graphLabel in this.graphItemData) {
				this.graphLabels.push(graphLabel);
				this.graphQuantity.push(this.graphItemData[graphLabel]);
			}

			//カラーパレット(20色)を用意
			const colorPalette = [
				"#4E79A7",
				"#A0CBE8",
				"#F28E2B",
				"#FFBE7D",
				"#59A14F",
				"#8CD17D",
				"#B6992D",
				"#F1CE63",
				"#499894",
				"#86BCB6",
				"#E15759",
				"#FF9D9A",
				"#79706E",
				"#BAB0AC",
				"#D37295",
				"#FABFD2",
				"#B07AA1",
				"#D4A6C8",
				"#9D7660",
				"#D7B5A6",
			];

			//カラー配列を初期化
			this.graphColor.splice(-this.graphColor.length);

			//ラベルの個数分だけカラーパレットから色を取得
			for (let i = 0; i < this.graphLabels.length; i++) {
				this.graphColor.push(colorPalette[i]);
			}
		},
		itemCount(graphType) {
			//グラフデータ(項目と度数)を格納するオブジェクトを初期化
			this.graphItemData = {};

			let key = "";
			let keyCheckFlag = "";

			//全体験記データを取得
			const allArticlesForGraph = this.$store.getters["getAllArticlesForGraph"];

			//選択されたグラフタイプにおいて、全体験記データから各項目のデータ数(度数)をカウントする
			for (let i = 0; i < allArticlesForGraph.length; i++) {
				key = allArticlesForGraph[i][graphType];
				console.log("key");
				console.log(key);

				if (key !== "") {
					if (graphType === "study_term") {
						key = key + "ヶ月";
					}
					//各項目の個数をカウントする
					keyCheckFlag = key in this.graphItemData;

					if (keyCheckFlag) {
						this.graphItemData[key] += 1;
					} else {
						this.graphItemData[key] = 1;
					}
				}
			}
		},
	},
};
</script>

<style scoped>
#doughnut-graph {
	width: 60%;
}

.h2title {
	display: inline-block;
}
</style>
