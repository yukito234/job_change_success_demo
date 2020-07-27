<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
	extends: Doughnut,
	mixins: [reactiveProp],
	props: ["chartData", "graphType"],
	data() {
		return {
			//グラフのオプション設定
			options: {
				responsive: true,
				title: {
					display: true,
					text: this.graphType,
				},
				legend: {
					position: "right",
				},
			},
		};
	},
	watch: {
		//グラフデータの更新を検知して、再描画
		//グラフデータはdoughnut-graph-section.vueから送られてくる
		chartData: function () {
			this.updateGraph();
		},
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	},
	methods: {
		updateGraph() {
			this.options.title.text = this.graphType;
			//再描画の実行
			this.renderChart(this.chartData, this.options);
		},
	},
};
</script>
