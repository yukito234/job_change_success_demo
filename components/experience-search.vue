<template>
	<div>
		<div>
			<h2 class="h2title">
				体験記を探す
			</h2>
		</div>

		<span>
			1.検索するサイト
		</span>

		<b-form-select v-model="domain" class="select-element" :options="optionsOfDomain" />

		<span>
			2.検索のヒント
		</span>
		<b-icon v-b-modal.modal-search-hint icon="question-circle" />
		<b-modal id="modal-search-hint" ok-only>
			<p class="my-4">
				キーワードにチェックを入れると、検索ボックスに反映されます。
			</p>
		</b-modal>

		<b-form-group>
			<b-form-checkbox-group v-model="suggestKeywords" :options="optionsOfsuggestKeywords" />
		</b-form-group>
		<!--<p>チェックを入れたキーワード:{{suggestKeywords}}</p>-->

		<span>
			3.検索を実行
		</span>
		<b-icon v-b-modal.modal-do-search icon="question-circle" />
		<b-modal id="modal-do-search" ok-only>
			<p class="my-4">
				すべてのキーワードをタイトルに含む記事が表示されます。
			</p>
		</b-modal>

		<div id="search-box-area">
			<b-form-input
				id="search-box"
				v-model.trim="searchBox"
				placeholder="ヒントから単語を選ぶか直接入力してください！"
				@blur="doOnBlur()"
				@focus="doOnFocus()"
			/>

			<b-icon id="x-button" icon="x" @click="deleteSearchBoxContent()" />

			<b-button id="search-button" variant="primary" :disabled="loading" @click="doSearch">
				<b-spinner v-show="loading" small />
				<span v-show="loading">
					Loading...
				</span>
				<span v-show="!loading">
					検索
				</span>
			</b-button>
		</div>

		<div v-show="!loading">
			<div v-if="isOtherDomainSearchResultDisplay" id="google-search-container">
				<p v-if="isAPIError">
					Googleから記事を取得する際にエラーが発生しました。
				</p>
				<div v-if="!isAPIError">
					<no-search-result v-if="isSearchResultZero" />

					<div v-if="!isSearchResultZero">
						<b-table
							:items="allArticlesOfSearchResult"
							:fields="fieldsOfGoogleSearch"
							responsive="sm"
						>
							<template v-slot:cell(index)="data">
								{{ data.index + 1 }}
							</template>
							<template v-slot:cell(titleLink)="data">
								<a :href="data.item.link">
									{{ data.item.title }}
								</a>
							</template>
							<template v-slot:cell(stockButton)="data">
								<b-button
									variant="outline-primary"
									@click="addStockArrayInGoogleSearch(data.item)"
								>
									ストック
								</b-button>
							</template>

							<template v-slot:head(stockButton)="data">
								<span>
									{{ data.label }}
								</span>
								<b-icon v-b-modal.modal-stock icon="question-circle" />
								<b-modal id="modal-stock" ok-only>
									<p class="my-4">
										記事情報をlocalstorageに保存できます。
										<br />保存した記事情報は、このページの下の方に表示されます。
										<br />とりあえず記事情報だけストックしておいて後で読みたい人や、
										何度も読み返したい記事がある人におすすめの機能！
									</p>
								</b-modal>
							</template>
						</b-table>
					</div>
				</div>
			</div>

			<div v-if="isQiitaSearchResultDisplay" id="qiita-search-container">
				<p v-if="isAPIError">
					Qiitaから記事を取得する際にエラーが発生しました。
				</p>
				<div v-if="!isAPIError">
					<no-search-result v-if="isSearchResultZero" />
					<div v-if="!isSearchResultZero">
						<h3>
							{{ getSentenceOfSearchResult() }}
						</h3>
						<!--
						<h3>
							検索結果:{{ rows }} 件のデータを取得しました
						</h3>
						-->
						<b-pagination
							v-model="currentPage"
							:total-rows="rows"
							:per-page="perPageOfBootstrap"
							aria-controls="my-table"
						/>
						<!--
						<p class="mt-3">
							現在のページ:{{ currentPage }}
						</p>
						-->
						<b-table
							id="my-table"
							:items="allArticlesOfSearchResult"
							:per-page="perPageOfBootstrap"
							:current-page="currentPage"
							:fields="fieldsOfQiitaSearch"
							responsive="sm"
							:sort-compare="mySortCompare"
						>
							<!--
							<template v-slot:cell(index)="data">
								{{ (data.index+1)+(currentPage-1)*perPageOfBootstrap }}
							</template>
							-->
							<template v-slot:cell(index)="data">
								{{ getIndexOfTable(data) }}
							</template>
							<template v-slot:cell(updated)="data">
								{{ getUpdatedAt(data) }}
							</template>
							<template v-slot:cell(titleLink)="data">
								<a :href="data.item.url">
									{{ data.item.title }}
								</a>
							</template>
							<template v-slot:cell(stockButton)="data">
								<b-button
									variant="outline-primary"
									@click="addStockArray(data.item)"
								>
									ストック
								</b-button>
							</template>
							<template v-slot:head(stockButton)="data">
								<span>
									{{ data.label }}
								</span>
								<b-icon v-b-modal.modal-stock icon="question-circle" />
								<b-modal id="modal-stock" ok-only>
									<p class="my-4">
										記事情報をlocalstorageに保存できます。
										<br />保存した記事情報は、このページの下の方に表示されます。
										<br />とりあえず記事情報だけストックしておいて後で読みたい人や、
										何度も読み返したい記事がある人におすすめの機能！
									</p>
								</b-modal>
							</template>
						</b-table>
						<b-pagination
							v-model="currentPage"
							:total-rows="rows"
							:per-page="perPageOfBootstrap"
							aria-controls="my-table"
						/>

						<div>
							<p id="display-number-paragraph">
								表示件数:
							</p>
							<b-icon v-b-modal.modal-per-page icon="question-circle" />
							<b-modal id="modal-per-page" ok-only>
								<p class="my-4">
									以下入力欄で1ページの表示件数を変更できます。
									<br />"全件表示する"を押下すると、検索結果をすべてこのページに表示できます。
								</p>
							</b-modal>
						</div>

						<div id="display-number-area">
							<b-form-input
								id="display-number-box"
								v-model.number="perPageOfUserInput"
								type="number"
								placeholder="表示件数を入力"
							/>
							<span id="or-span">
								or
							</span>
							<b-button
								id="display-number-all-button"
								variant="primary"
								@click="displayAllArticles()"
							>
								全件表示
							</b-button>
						</div>
						<!--
						<p>
							{{ perPageOfBootstrap }}
						</p>
						-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { BIcon, BIconX, BIconQuestionCircle } from "bootstrap-vue";
import NoSearchResult from "~/components/no-search-result.vue";
import sanitizeHTML from "sanitize-html";
import ModalFooter from "~/components/modal-footer.vue";

export default {
	components: {
		BIcon,
		BIconX,
		BIconQuestionCircle,
		"no-search-result": NoSearchResult,
		"modal-footer": ModalFooter,
	},
	data() {
		return {
			show: false,
			fieldsOfQiitaSearch: [
				{
					key: "index",
					label: "",
				},
				{
					key: "updated",
					label: "更新日",
					sortable: true,
					sortDirection: "asc",
				},
				{
					key: "titleLink",
					label: "記事タイトル",
				},
				{
					key: "likes_count",
					//key:'likesCount',
					label: "いいね",
					sortable: true,
					sortDirection: "desc",
				},
				{
					key: "stockButton",
					label: "ストック",
				},
			],
			fieldsOfGoogleSearch: [
				{
					key: "index",
					label: "",
				},
				{
					key: "titleLink",
					label: "記事タイトル",
				},
				{
					key: "stockButton",
					label: "ストック",
					//headerTitle:'ストック<b-icon icon="question-circle"></b-icon>',
				},
			],
			//searchBoxOfBootstrap:"",
			optionsOfDomain: [
				{ value: "qiita", text: "qiita" },
				{ value: "hatenablog", text: "hatenablog" },
				{ value: "note", text: "note" },
				{ value: "others", text: "qiita,hatenablog,note以外" },
			],
			optionsOfsuggestKeywords: [
				{ text: "未経験", value: "未経験" },
				{ text: "転職", value: "転職" },
				{ text: "web", value: "web" },
				{ text: "エンジニア", value: "エンジニア" },
				{ text: "成功", value: "成功" },
				{ text: "体験", value: "体験" },
				{ text: "自社開発", value: "自社開発" },
				{ text: "フロントエンド", value: "フロントエンド" },
				{ text: "バックエンド", value: "バックエンド" },
			],
			isAPIError: false,
			loading: false, //検索ボタンクリック時のアニメーションや結果表示タイミングの制御用
			currentPage: 1,
			perPageOfBootstrap: 10,
			suggestKeywords: [], //キーワード候補の格納用
			searchBox: "", //検索ボックスの内容
			searchBoxContentArray: [], //検索ボックスの複合キーワードを分割して格納する配列
			allArticlesOfSearchResult: [],
			domain: "qiita", //検索対象のドメイン（googleのAPIを用いない場合は不要）
			isOtherDomainSearchResultDisplay: false, //検索結果の表示切り替え用。qiita以外のドメインを対象に検索した場合にtrueになる
			isQiitaSearchResultDisplay: false, //検索結果の表示切り替え用。qiitaで検索したときにtrueとなり、qiitaの検索結果を表示するためのHTMLが表示される
			storedSearchKeywords: [], //検索ボックスの内容を一時保存する配列
			stockedArticles: [],
			isSearchResultZero: false,
			isStockTableDisplay: false,
		};
	},
	computed: {
		rows() {
			console.log("enter rows");
			console.log("this.allArticlesOfSearchResult.length");
			console.log(this.allArticlesOfSearchResult.length);
			//return this.allArticleDataSorted.length;
			return this.allArticlesOfSearchResult.length;
		},
		perPageOfUserInput: {
			get() {
				return this.perPageOfBootstrap;
			},
			set(newValue) {
				this.perPageOfBootstrap = newValue;
			},
		},
	},
	watch: {
		suggestKeywords: function () {
			//検索ヒント配列suggestKeywords[]が変化したら、それを検索ボックスsearchBoxに反映させる

			//ここで、searchBoxの中身は、suggestKeywords[]とstoredSearchKeywords[]をあわせたものとなる
			//storedSearchKeywords[]は、検索ボックスからカーソルが外れたときの検索ボックスの中身

			//storedSearchKeywords[]の役割
			//ユーザが検索ヒントの選択と検索ボックスへの直接入力を繰り返すことを想定し、検索ボックスからカーソルが外れた際に、検索ヒントの再選択に備えて、直前の検索ボックスの内容を保持しておく

			//suggestKeywords[]が空
			if (this.suggestKeywords.length === 0 && this.storedSearchKeywords.length !== 0) {
				//検索ボックスの中身は、直前の検索ボックス配列の要素を連結させたもの
				this.searchBox = this.storedSearchKeywords.join(" ");
				/*
				console.log("suggestKeywords.length === 0");
				console.log("this.storedSearchKeywords");
				console.log(this.storedSearchKeywords);
				console.log("this.searchBox");
				console.log(this.searchBox);
				console.log("------------------------------");
				*/

				//storedSearchKeywords[]が空
			} else if (
				this.suggestKeywords.length !== 0 &&
				this.storedSearchKeywords.length === 0
			) {
				//検索ボックスの中身は、検索ヒント配列の要素を連結させたもの
				this.searchBox = this.suggestKeywords.join(" ");
				/*
				console.log("storedSearchKeywords.length === 0");
				console.log("this.suggestKeywords");
				console.log(this.suggestKeywords);
				console.log("this.searchBox");
				console.log(this.searchBox);
				console.log("------------------------------");
				*/

				//suggestKeywords[]が空でなく、storedSearchKeywords[]も空でない
			} else if (
				this.suggestKeywords.length !== 0 &&
				this.storedSearchKeywords.length !== 0
			) {
				//検索ボックスの中身は、2つの配列の要素を連結させたもの
				this.searchBox =
					this.storedSearchKeywords.join(" ") + " " + this.suggestKeywords.join(" ");
				/*
				console.log("suggestKeywords.length !== 0 && storedSearchKeywords.length !== 0");
				console.log("this.storedSearchKeywords");
				console.log(this.storedSearchKeywords);
				console.log("this.suggestKeywords");
				console.log(this.suggestKeywords);
				console.log("this.searchBox");
				console.log(this.searchBox);
				console.log("------------------------------");
				*/
				//検索ボックス配列と検索ヒント配列が両方空の場合
			} else {
				//検索ボックスの中身は、空
				this.searchBox = "";
				//console.log("suggestKeywords.length === 0 && storedSearchKeywords.length === 0");
			}
		},
		searchBox(val) {
			//検索ボックスの内容確認
			//console.log("val in searchBox");
			//console.log(val);
			//検索ボックスが空でない場合
			if (val !== "") {
				//検索ボックスの内容を半角空白で区切って、検索ワードを配列に格納する
				this.searchBoxContentArray = val.split(/\s+/);
				//console.log("this.searchBoxContentArray in searchBox");
				//console.log(this.searchBoxContentArray);

				//検索ボックスが空のとき
			} else {
				//console.log("this.searchBoxContentArray before");
				//console.log(this.searchBoxContentArray);

				//検索ボックスが空のときは、検索ボックス配列も空にする
				//これを実行しないと、検索ボックスの文字列を手動で全消去しても、searchBoxContentArrayに1文字だけ残ってしまう
				this.searchBoxContentArray = [];
				//console.log("this.searchBoxContentArray after");
				//console.log(this.searchBoxContentArray);
			}
			//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		},
	},
	methods: {
		getIndexOfTable(data) {
			return data.index + 1 + (this.currentPage - 1) * this.perPageOfBootstrap;
		},
		getSentenceOfSearchResult() {
			return `検索結果：${this.rows}件のデータを取得しました`;
		},
		changeShow() {
			console.log("enter changeShow()");
			this.show = false;
		},
		getUpdatedAt(data) {
			//console.log("data.item.updated_at.charAt(1)");
			//console.log(data.item.updated_at.charAt(1));//0
			console.log("data.item.updated_at");
			console.log(data.item.updated_at);

			console.log("data.item.updated_at.slice(0,10)");
			console.log(data.item.updated_at.slice(0, 10));
			return data.item.updated_at.slice(0, 10);
		},
		deleteSearchBoxContent() {
			//検索ボックス内の文字列を全消去
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);
			this.suggestKeywords.splice(-this.suggestKeywords.length);
			//上記２処理の後、watchのsuggestKeywordsにて、this.searchBox = "";が実行される
			//これにより、watchのsearchBoxにて、this.searchBoxContentArray=[];が実行される
		},
		//mySortCompare(a, b, key, sortDesc) {
		mySortCompare(a, b, key) {
			console.log("enter mySortCompare");
			if (key === "updated") {
				return a.updated_at < b.updated_at ? 1 : -1;
			}
		},
		displayAllArticles() {
			//全件表示ボタンがクリックされたとき、１ページ目に全データを表示させる
			//1ページあたりの表示数をqiita取得の全データ数とする
			//this.perPageOfBootstrap = this.allArticleDataSorted.length;
			this.perPageOfBootstrap = this.allArticlesOfSearchResult.length;
		},
		doOnFocus() {
			console.log("enter doOnFocus");
			//一時保存配列を初期化
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);

			//検索ボックスの内容を保存
			for (let j = 0; j < this.searchBoxContentArray.length; j++) {
				this.storedSearchKeywords.push(this.searchBoxContentArray[j]);
			}

			//検索ヒント配列を初期化
			this.suggestKeywords.splice(-this.suggestKeywords.length);
		},
		doOnBlur() {
			//検索ボックスからフォーカスが外れたときに実行される
			//console.log("enter doOnBlur method");

			//検索ボックスの内容を一時保存するための配列を初期化する
			this.storedSearchKeywords.splice(-this.storedSearchKeywords.length);

			//フォーカスが外れる直前の検索ボックスの内容を確認
			//console.log("this.searchBoxContentArray");
			//console.log(this.searchBoxContentArray);

			//フォーカスが外れる直前の検索ボックスの内容を一時保存用の配列に格納する
			for (let j = 0; j < this.searchBoxContentArray.length; j++) {
				this.storedSearchKeywords.push(this.searchBoxContentArray[j]);
			}
			//console.log("this.storedSearchKeywords");
			//console.log(this.storedSearchKeywords);

			//検索ボックスの内容を退避させたら、ヒントキーワードを格納する配列を空にする
			this.suggestKeywords.splice(-this.suggestKeywords.length);
		},
		addStockArrayInGoogleSearch(element) {
			console.log("enter addStockArrayInGoogleSearch");

			for (let i = 0; i < this.allArticlesOfSearchResult.length; i++) {
				if (this.allArticlesOfSearchResult[i].cacheId === element.cacheId) {
					//押下された要素のディープコピーをとる
					//let changeData = _.cloneDeep(this.allArticleDataSorted[i]);
					let changeData = _cloneDeep(this.allArticlesOfSearchResult[i]);

					console.log(`
						this.allArticlesOfSearchResult[${i}] in addStockArrayInGoogleSearch
					`);
					console.log(this.allArticlesOfSearchResult[i]);

					this.$store.commit(
						"persistedParameter/changeStockedArticlesInGoogleSearch",
						changeData
					);
				}
			}
		},
		addStockArray(element) {
			//記事をブラウザに保存して永続化させる
			//後で読みたい記事をストックしておける

			//Qiitaの記事をストックする
			//押下された要素を特定する
			console.log("enter addStockArray");

			for (let i = 0; i < this.allArticlesOfSearchResult.length; i++) {
				if (this.allArticlesOfSearchResult[i].id === element.id) {
					//押下された要素のディープコピーをとる
					//let changeData = _.cloneDeep(this.allArticleDataSorted[i]);
					let changeData = _cloneDeep(this.allArticlesOfSearchResult[i]);

					console.log(`this.allArticlesOfSearchResult[${i}] in addStockArray`);
					console.log(this.allArticlesOfSearchResult[i]);

					this.$store.commit("persistedParameter/changeStockedArticles", changeData);
				}
			}
		},
		async doSearch() {
			console.log("enter doSearch");

			//検索ボックスが空の場合はアラートを出す
			if (this.searchBoxContentArray.length === 0) {
				alert("キーワードを入力してください");
				return;
			}
			//loadingアニメーションの実行
			this.loading = true;

			//APIによるデータ取得時の結果を受けて、検索結果の表示を切り替える変数を初期化
			this.isAPIError = false;

			//APIによるデータ取得時の結果を格納する変数を初期化
			let isAPIError = false;
			//this.$store.dispatch('APIErrorSetAction',false);

			this.isSearchResultZero = false;
			this.allArticlesOfSearchResult.splice(-this.allArticlesOfSearchResult.length);

			//すでに表示されている検索結果を非表示にする
			this.isQiitaSearchResultDisplay = false;
			this.isOtherDomainSearchResultDisplay = false;

			//let urlParameter ='';
			//let url ='';

			//APIから取得したデータの格納用
			//let result=[];

			//resultのコピー用
			//let resultAddedIsStock_3=[];

			//配列の初期化
			//this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);

			//配列の初期化
			//連続での検索に対応
			this.$store.commit("allExperienceArticlesInit");

			//検索キーワードをサニタイズする
			for (let i = 0; i < this.searchBoxContentArray.length; i++) {
				this.searchBoxContentArray[i] = sanitizeHTML(this.searchBoxContentArray[i]);
			}
			console.log("this.searchBoxContentArray in doSearch");
			console.log(this.searchBoxContentArray);

			//検索対象ドメインがqiitaの場合
			if (this.domain === "qiita") {
				console.log("enter this.domain === qiita");
				this.isQiitaSearchResultDisplay = true;

				//qiitaのAPIを利用することをaxios.jsに伝える
				//axios.jsでは、このusedAPIフラグにてどのAPIとやり取りをしているのかを判断し、
				//ヘッダーにトークン情報を付加して通信する

				this.$store.commit("changeUsedAPI", "qiita");

				//QiitaAPIを利用して検索を行い、結果を取得
				//let isError = await this.$store.dispatch('doSearchInQiitaAction', _cloneDeep(this.searchBoxContentArray) );

				//this.isAPIErrorを切り替えるのは、this.allArticlesOfSearchResultにデータを格納した後で
				//this.isAPIError= await this.$store.dispatch('doSearchInQiitaAction', _cloneDeep(this.searchBoxContentArray) );

				isAPIError = await this.$store.dispatch(
					"doSearchInQiitaAction",
					_cloneDeep(this.searchBoxContentArray)
				);

				//console.log("this.isAPIError after this.isAPIError= await this.$store in qiita");
				//console.log(this.isAPIError);
				console.log("isAPIError after isAPIError= await this.$store in qiita");
				console.log(isAPIError);

				//this.allArticleDataSorted = _cloneDeep( this.$store.getters['getAllExperienceArticles'];

				///////////////////////////////////////////////

				//検索対象のドメインがqiita以外の場合
			} else {
				console.log("enter else");
				//doSearchInGoogleActionに渡すデータ
				let dataForGoogle = {
					domain: "",
					searchBoxContentArray: [],
				};
				//googleのAPIを用いて、指定したドメインにおける検索結果を取得する
				//ただし、無料使用の場合、１日１００クエリという厳しい制限があるので
				//今後機能を削除する可能性あり
				this.isOtherDomainSearchResultDisplay = true;

				//this.$store.commit("persistedParameter/changeUsedAPI","google");
				this.$store.commit("changeUsedAPI", "google");

				dataForGoogle.domain = this.domain;

				for (let i = 0; i < this.searchBoxContentArray.length; i++) {
					dataForGoogle.searchBoxContentArray.push(this.searchBoxContentArray[i]);
				}

				//let isError = await this.$store.dispatch('doSearchInGoogleAction', _cloneDeep(dataForGoogle) );
				//this.isAPIError= await this.$store.dispatch('doSearchInGoogleAction', _cloneDeep(dataForGoogle) );

				isAPIError = await this.$store.dispatch(
					"doSearchInGoogleAction",
					_cloneDeep(dataForGoogle)
				);
				//this.allArticleDataSorted = _cloneDeep( this.$store.getters['getAllExperienceArticles'];

				console.log("isAPIError after isAPIError= await this.$store in google");
				console.log(isAPIError);
				///////////////////////////////////////////////
			}

			//APIの利用時にエラーが発生した場合
			if (isAPIError) {
				console.log("enter if isAPIError true");
				this.isAPIError = true;

				console.log("this.isAPIError ");
				console.log(this.isAPIError);
			} else {
				//以下処理の順番に注意
				console.log("enter else isAPIError false");
				this.allArticlesOfSearchResult = _cloneDeep(
					this.$store.getters["getAllExperienceArticles"]
				);

				console.log("this.allArticlesOfSearchResult");
				console.log(this.allArticlesOfSearchResult);

				console.log("this.$store.getters['getAllExperienceArticles']");
				console.log(this.$store.getters["getAllExperienceArticles"]);

				if (this.allArticlesOfSearchResult.length === 0) {
					this.isSearchResultZero = true;
					console.log("this.isSearchResultZero");
					console.log(this.isSearchResultZero);
				}

				this.isAPIError = isAPIError;
				console.log("this.isAPIError ");
				console.log(this.isAPIError);

				console.log("this.isSearchResultZero");
				console.log(this.isSearchResultZero);
			}

			//アニメーションを停止
			this.loading = false;
		},
	},
};
</script>

<style scoped>
.h2title {
	display: inline-block;
}

.select-element {
	width: 300px;
	display: block;
}

#search-box {
	width: 75%;
}

#x-button {
	position: absolute;
	top: 0;
	right: 26%;
	height: 38px;
}

#search-box-area {
	position: relative;
}

#search-button {
	position: absolute;
	top: 0;
	right: 0;
	width: 25%;
}

#display-number-paragraph {
	display: inline-block;
}

#display-number-area {
	position: relative;
}

#display-number-box {
	width: 30%;
	display: inline-block;
}

#or-span {
	width: 10%;
	line-height: 38px;
	text-align: center;
	position: absolute;
	left: 30%;
}

#display-number-all-button {
	width: 22%;
	position: absolute;
	top: 0;
	left: 40%;
}

#qiita-search-container {
	margin-top: 20px;
}

#google-search-container {
	margin-top: 20px;
}
</style>
