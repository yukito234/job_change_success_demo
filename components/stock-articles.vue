<template>
	<div id="stock-articles-container" class="section-container">
		<div class="h2title-area">
			<h2 class="h2title">
				ストック記事の一覧
			</h2>
		</div>
		<p v-if="!isStockTableDisplay">
			まだストック記事は追加されていません。
		</p>
		<div v-if="isStockTableDisplay">
			<b-table :items="stockedArticles" :fields="fieldsOfStockedArticles" responsive="sm">
				<template v-slot:cell(titleLink)="data">
					<a :href="data.item.url">
						{{ data.item.title }}
					</a>
				</template>
				<template v-slot:cell(deleteButton)="data">
					<b-button variant="outline-primary" @click="deleteStockArray(data.item)">
						削除
					</b-button>
				</template>
			</b-table>
			<b-button
				id="all-delete-button"
				class="button-with-gradation"
				variant="primary"
				@click="deleteStock"
			>
				ストック記事を全部削除
			</b-button>
		</div>
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
	data() {
		return {
			isStockTableDisplay: false,
			fieldsOfStockedArticles: [
				{
					key: "titleLink",
					label: "記事タイトル",
				},
				{
					key: "deleteButton",
					label: "削除",
				},
			],
			stockedArticles: [],
			stockedDataInQiita: [],
			stockedDataInGoogle: [],
		};
	},
	watch: {
		//記事がストックされたら、即ストック一覧に表示させる
		stockedDataInQiita: function () {
			this.obtainStockedArticles();
			this.checkIsStockTableDisplay();
		},
		stockedDataInGoogle: function () {
			this.obtainStockedArticles();
			this.checkIsStockTableDisplay();
		},
	},
	created() {
		this.obtainStockedArticles();
		this.checkIsStockTableDisplay();

		//ローカルストレージのストック配列を監視するため、シャローコピーをとっておく
		//experience-search.vueにてストック配列に記事が追加されたら、
		//こちらで検知してリアクティブにテーブルに反映させる
		this.stockedDataInQiita = this.$store.getters["persistedParameter/getStockedArticles"];

		this.stockedDataInGoogle = this.$store.getters[
			"persistedParameter/getStockedArticlesInGoogleSearch"
		];
	},
	methods: {
		checkIsStockTableDisplay() {
			if (this.stockedArticles.length !== 0) {
				this.isStockTableDisplay = true;
			} else {
				this.isStockTableDisplay = false;
			}
		},
		obtainStockedArticles() {
			//全ストック記事を取得する
			//Qiitaのストック記事を取得
			const stockedDataInQiita = _cloneDeep(
				this.$store.getters["persistedParameter/getStockedArticles"]
			);

			//Googleからストックした記事を取得
			const stockedDataInGoogle = _cloneDeep(
				this.$store.getters["persistedParameter/getStockedArticlesInGoogleSearch"]
			);

			//全ストック記事
			const concatArray = stockedDataInQiita.concat(stockedDataInGoogle);

			this.stockedArticles.splice(-this.stockedArticles.length);
			for (let i = 0; i < concatArray.length; i++) {
				this.stockedArticles.push(concatArray[i]);
			}
		},
		deleteStock() {
			//ストック記事をすべて削除する
			this.$store.commit("persistedParameter/deleteStockedArticles");
			this.isStockTableDisplay = false;
		},
		deleteStockArray(element) {
			//Qiitaの記事がクリックされた場合
			if (element.domain === "qiita") {
				//Qiitaのストック記事を取得
				const stockedDataInQiita = _cloneDeep(
					this.$store.getters["persistedParameter/getStockedArticles"]
				);

				//押下された要素を特定する
				for (let i = 0; i < stockedDataInQiita.length; i++) {
					if (stockedDataInQiita[i].id === element.id) {
						//削除する要素のフラグをtrueに変更
						stockedDataInQiita[i].isDelete = true;
					}
				}

				this.$store.commit(
					"persistedParameter/deleteSingleStockedArticle",
					stockedDataInQiita
				);

				//Googleの記事がクリックされた場合
			} else {
				//Googleからストックした記事を取得
				const stockedDataInGoogle = _cloneDeep(
					this.$store.getters["persistedParameter/getStockedArticlesInGoogleSearch"]
				);

				//押下された要素を特定する
				for (let i = 0; i < stockedDataInGoogle.length; i++) {
					if (stockedDataInGoogle[i].cacheId === element.cacheId) {
						//削除する要素のフラグをtrueに変更
						stockedDataInGoogle[i].isDelete = true;
					}
				}

				this.$store.commit(
					"persistedParameter/deleteSingleStockedArticle",
					stockedDataInGoogle
				);
			}
		},
	},
};
</script>

<style scoped>
.h2title {
	display: inline-block;
}

#all-delete-button {
	display: block;
	margin-left: auto;
}

#stock-articles-container {
}
</style>
