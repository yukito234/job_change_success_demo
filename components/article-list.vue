<template>
	<div class="section-container">
		<div class="h2title-area">
			<h2 class="h2title">
				転職成功者のデータ一覧表
			</h2>
			<b-icon v-b-modal.modal-graph-data-list-title icon="question-circle" />
			<b-modal id="modal-graph-data-list-title" ok-only>
				<p class="my-4">
					下表では、フィルター機能が使えます。
					<br />キーワード(文字列や数値)を入力することで、キーワードを含む行を抽出できます。
					<br />チェックボックスでは、フィルタリングする列を指定できます。（複数指定可）
					<br />※空白はデータなしです。
				</p>
			</b-modal>
		</div>
		<div>
			<b-form-group
				label="フィルター："
				label-cols-sm="3"
				label-align-sm="right"
				label-size="sm"
				label-for="filterInput"
				class="mb-0"
			>
				<b-input-group size="sm">
					<b-form-input
						id="filterInput"
						v-model="filter"
						type="search"
						placeholder="文字列や数値を入力してください"
					/>
					<b-input-group-append>
						<b-button :disabled="!filter" variant="primary" @click="filter = ''">
							クリア
						</b-button>
					</b-input-group-append>
				</b-input-group>
			</b-form-group>
			<b-form-group
				label="フィルタリングする列："
				label-cols-sm="3"
				label-align-sm="right"
				label-size="sm"
				description="※チェックを入れない場合は、すべての列が検索対象となります"
				class="mb-0"
			>
				<b-form-checkbox-group v-model="filterOn" class="mt-1">
					<b-form-checkbox value="title">
						記事タイトル
					</b-form-checkbox>
					<b-form-checkbox value="age">
						年齢
					</b-form-checkbox>
					<b-form-checkbox value="educational_background">
						学歴
					</b-form-checkbox>
					<b-form-checkbox value="study_term">
						勉強期間
					</b-form-checkbox>
					<b-form-checkbox value="school_presence">
						スクール有無
					</b-form-checkbox>
					<b-form-checkbox value="company">
						転職先
					</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>
		</div>
		<b-table
			striped
			hover
			sticky-header="600px"
			:items="tableData"
			:fields="fields"
			:sort-compare="mySortCompare"
			:filter="filter"
			:filterIncludedFields="filterOn"
			@filtered="onFiltered"
		>
			<template v-slot:cell(index)="data">
				{{ data.index + 1 }}
			</template>
			<template v-slot:cell(titleLink)="data">
				<a :href="data.item.url">
					{{ data.item.title }}
				</a>
			</template>
		</b-table>
	</div>
</template>

<script>
import { BIcon, BIconQuestionCircle } from "bootstrap-vue";

export default {
	components: {
		BIcon,
		BIconQuestionCircle,
	},
	data() {
		return {
			totalRows: 1,
			filter: null,
			filterOn: [],
			tableData: [],
			fields: [
				"index",
				{
					key: "titleLink",
					label: "記事タイトル",
				},
				{
					key: "age",
					label: "年齢",
				},
				{
					key: "educational_background",
					label: "学歴",
				},
				{
					key: "study_term",
					label: "勉強期間（ヶ月）",
					sortable: true,
				},
				{
					key: "school_presence",
					label: "スクール有無",
				},
				{
					key: "company",
					label: "転職先",
				},
			],
		};
	},
	created() {
		//DBから取得した全体験記をテーブル配列に挿入
		this.tableData = this.$store.getters["getAllArticlesForGraph"];
		this.totalRows = this.tableData.length;
	},
	methods: {
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length;
		},
		mySortCompare(a, b, key, sortDesc) {
			//昇順、降順にソートさせつつ、空白データを最後に移動させる
			if (key === "study_term") {
				console.log(sortDesc);

				//降順
				if (sortDesc) {
					//数字のソート
					if (Number(a[key]) - Number(b[key]) > 0) {
						//aを前方に移動(a を b より小さい添字にソート)
						return 1;
					} else if (Number(a[key]) - Number(b[key]) < 0) {
						//bを前方に移動
						return -1;
					}
					return 0;

					//昇順
				} else {
					//空要素のソート
					if (a[key] === "" && b[key] === "") {
						//a と b を並び替えしない
						return 0;
					}

					if (a[key] === "") {
						//bを前方へ移動させる
						return 1;
					}

					if (b[key] === "") {
						//aを前方へ移動させる
						return -1;
					}

					//数字のソート
					if (Number(a[key]) - Number(b[key]) > 0) {
						//bを前方へ移動させる
						return 1;
					} else if (Number(a[key]) - Number(b[key]) < 0) {
						//aを前方へ移動させる
						return -1;
					}
					return 0;
				}
			} else {
				return false;
			}
		},
	},
};
</script>
