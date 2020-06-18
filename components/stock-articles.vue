<template>
	<div id="stock-articles-container" class="section-container">
		<div>
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
			<b-button id="all-delete-button" variant="primary" @click="deleteStock">
				ストック記事を全部削除
			</b-button>
		</div>
	</div>
</template>

<script>
//import { BIcon, BIconX, BIconQuestionCircle } from "bootstrap-vue";
import _cloneDeep from "lodash/cloneDeep";

export default {
	/*
	components: {
		BIcon,
		BIconX,
		BIconQuestionCircle,
	},
	*/
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
		console.log("before this.obtainStockedArticles in created");
		this.obtainStockedArticles();
		this.checkIsStockTableDisplay();

		//ローカルストレージのストック配列を監視するため、シャローコピーをとっておく
		//experience-search.vueにてストック配列に記事が追加されたら、こちらで検知してリアクティブにテーブルに反映させる
		this.stockedDataInQiita = this.$store.getters["persistedParameter/getStockedArticles"];

		this.stockedDataInGoogle = this.$store.getters[
			"persistedParameter/getStockedArticlesInGoogleSearch"
		];
	},
	methods: {
		checkIsStockTableDisplay() {
			console.log("enter checkIsStockTableDisplay");

			if (this.stockedArticles.length !== 0) {
				this.isStockTableDisplay = true;
			} else {
				this.isStockTableDisplay = false;
			}
			console.log("this.isStockTableDisplay");
			console.log(this.isStockTableDisplay);
		},
		obtainStockedArticles() {
			console.log("enter obtainStockedArticles");

			//ユーザがストックしている記事データを返す
			//Qiitaのストック記事を取得
			const stockedDataInQiita = _cloneDeep(
				this.$store.getters["persistedParameter/getStockedArticles"]
			);

			console.log("stockedDataInQiita in obtainStockedArticles");
			console.log(stockedDataInQiita);

			//Googleからストックした記事を取得
			const stockedDataInGoogle = _cloneDeep(
				this.$store.getters["persistedParameter/getStockedArticlesInGoogleSearch"]
			);

			console.log("stockedDataInGoogle in obtainStockedArticles");
			console.log(stockedDataInGoogle);

			//全ストック記事
			const concatArray = stockedDataInQiita.concat(stockedDataInGoogle);

			this.stockedArticles.splice(-this.stockedArticles.length);

			for (let i = 0; i < concatArray.length; i++) {
				this.stockedArticles.push(concatArray[i]);
			}

			console.log("this.stockedArticles in obtainStockedArticles");
			console.log(this.stockedArticles);
		},

		deleteStock() {
			console.log("enter deleteStock");
			//ストック記事をすべて削除する
			this.$store.commit("persistedParameter/deleteStockedArticles");

			this.isStockTableDisplay = false;
			console.log("this.isStockTableDisplay");
			console.log(this.isStockTableDisplay);
		},
		deleteStockArray(element) {
			console.log("enter deleteStockArray");

			//Qiitaの記事がクリックされた場合
			if (element.domain === "qiita") {
				//Qiitaのストック記事を取得

				const stockedDataInQiita = _cloneDeep(
					this.$store.getters["persistedParameter/getStockedArticles"]
				);

				console.log(`stockedDataInQiita in deleteStockArray`);
				console.log(stockedDataInQiita);

				//押下された要素を特定する
				for (let i = 0; i < stockedDataInQiita.length; i++) {
					if (stockedDataInQiita[i].id === element.id) {
						//削除する要素のフラグをtrueに変更
						stockedDataInQiita[i].isDelete = true;
						console.log(`stockedDataInQiita[${i}] in deleteStockArray`);
						console.log(stockedDataInQiita[i]);
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

				console.log(`stockedDataInGoogle in deleteStockArray`);
				console.log(stockedDataInGoogle);

				//押下された要素を特定する
				for (let i = 0; i < stockedDataInGoogle.length; i++) {
					if (stockedDataInGoogle[i].cacheId === element.cacheId) {
						//削除する要素のフラグをtrueに変更
						stockedDataInGoogle[i].isDelete = true;
						console.log(`stockedDataInGoogle[${i}] in deleteStockArray`);
						console.log(stockedDataInGoogle[i]);
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
/* 素材
*/
</style>
