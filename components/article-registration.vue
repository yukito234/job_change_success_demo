<template>
	<div>
		<b-button
			id="experience-open-close-button"
			v-b-toggle.collapse-experience
			variant="primary"
			@click="changeIsExperienceModalDisplay"
		>
			体験記の登録
			<b-icon v-if="!isExperienceModalDisplay" icon="chevron-down" />
			<b-icon v-if="isExperienceModalDisplay" icon="chevron-up" />
		</b-button>

		<b-collapse id="collapse-experience" class="mt-2">
			<b-card bg-variant="light">
				<b-form-group
					label-cols-lg="3"
					label="体験記の登録"
					label-size="lg"
					label-class="font-weight-bold pt-0"
					class="mb-0"
				>
					<p>
						ここで登録された記事は、成功者グラフページに反映されます。
					</p>
					<b-form-group
						label-cols-sm="3"
						label="記事タイトル(必須):"
						label-align-sm="right"
					>
						<b-form-input v-model.trim="title" />
					</b-form-group>

					<b-form-group label-cols-sm="3" label="記事URL(必須):" label-align-sm="right">
						<b-form-input v-model.trim="url" />
					</b-form-group>

					<b-form-group label-cols-sm="3" label="年齢:" label-align-sm="right">
						<b-form-select v-model="age" :options="optionsOfAge" />
					</b-form-group>

					<b-form-group label-cols-sm="3" label="学歴:" label-align-sm="right">
						<b-form-select
							v-model="educationalBackground"
							:options="optionsOfEducationalBackground"
						/>
					</b-form-group>
					<b-form-group label-cols-sm="3" label="勉強期間(ヶ月):" label-align-sm="right">
						<b-form-input v-model.number="studyTerm" type="number" />
					</b-form-group>
					<b-form-group label-cols-sm="3" label="スクール有無:" label-align-sm="right">
						<b-form-select
							v-model="schoolPresence"
							:options="optionsOfSchoolPresence"
						/>
					</b-form-group>
					<b-form-group label-cols-sm="3" label="転職先:" label-align-sm="right">
						<b-form-select v-model="company" :options="optionsOfCompany" />
					</b-form-group>
					<div>
						<b-button
							id="experience-article-registration-button"
							variant="primary"
							:disabled="loading"
							@click="registerArticle"
						>
							<b-spinner v-show="loading" small />
							<span v-show="loading">
								登録中...
							</span>
							<span v-show="!loading">
								記事を登録
							</span>
						</b-button>
					</div>
				</b-form-group>
			</b-card>
		</b-collapse>
	</div>
</template>

<script>
import sanitizeHTML from "sanitize-html";
import _cloneDeep from "lodash/cloneDeep";

import { BIcon, BIconChevronDown, BIconChevronUp } from "bootstrap-vue";

export default {
	//name: 'ArticleRegistration',
	components: {
		BIcon,
		BIconChevronDown,
		BIconChevronUp,
	},
	data() {
		return {
			loading: false,
			editFlag: false,
			url: "",
			title: "",
			age: "",
			educationalBackground: "",
			studyTerm: "",
			schoolPresence: "",
			company: "",
			optionsOfAge: [
				{ value: "", text: "選択してください" },
				{ value: "20代前半", text: "20代前半" },
				{ value: "20代後半", text: "20代後半" },
				{ value: "30代前半", text: "30代前半" },
				{ value: "30代後半", text: "30代後半" },
				{ value: "40代前半", text: "40代前半" },
				{ value: "40代後半", text: "40代後半" },
				{ value: "50代", text: "50代" },
				{ value: "60代以降", text: "60代以降" },
			],
			optionsOfEducationalBackground: [
				{ value: "", text: "選択してください" },
				{ value: "高卒", text: "高卒" },
				{ value: "高専卒", text: "高専卒" },
				{ value: "大卒", text: "大卒" },
				{ value: "大学院卒", text: "大学院卒" },
			],
			optionsOfSchoolPresence: [
				{ value: "", text: "選択してください" },
				{ value: "あり", text: "あり" },
				{ value: "なし", text: "なし" },
			],
			optionsOfCompany: [
				{ value: "", text: "選択してください" },
				{ value: "自社開発", text: "自社開発" },
				{ value: "受託", text: "受託" },
				{ value: "SIer", text: "SIer" },
				{ value: "SES", text: "SES" },
				{ value: "その他", text: "その他" },
			],
			isExperienceModalDisplay: false,
		};
	},

	methods: {
		changeIsExperienceModalDisplay() {
			if (this.isExperienceModalDisplay) {
				this.isExperienceModalDisplay = false;
			} else {
				this.isExperienceModalDisplay = true;
			}
		},
		addExperience() {
			//体験記の追加ボタンが押されたときの挙動
			this.editFlag = true;
		},
		async registerArticle() {
			this.loading = true;

			console.log("enter registerArticle");
			this.url = sanitizeHTML(this.url);
			this.title = sanitizeHTML(this.title);

			if (this.url === "" || this.title === "") {
				alert("記事タイトルとURLは入力必須です");
				this.loading = false;
				return;
			}

			//urlの簡易チェック
			if (this.url.match(/^(http|https):\/\//i) === null) {
				alert("URLを正しく入力してください");
				this.loading = false;
				return;
			}

			const articleData = {
				url: this.url,
				title: this.title,
				age: this.age,
				educationalBackground: this.educationalBackground,
				studyTerm: this.studyTerm,
				schoolPresence: this.schoolPresence,
				company: this.company,
			};

			console.log("articleData:");
			console.log(articleData);
			//firebaseに体験記データを追加
			const result = await this.$store.dispatch(
				"registerArticleAction",
				_cloneDeep(articleData)
			);
			//入力欄の初期化
			if (result === "success") {
				this.url = "";
				this.title = "";
				//this.age = null;
				this.age = "";
				//this.educationalBackground = null;
				this.educationalBackground = "";
				this.studyTerm = "";
				//this.schoolPresence = null;
				this.schoolPresence = "";
				//this.company = null;
				this.company = "";

				//success-graph.vueが表示されたとき、新たにDBと通信して最新の体験記データを取得する
				this.$store.dispatch("changeIsExperienceArticlesAction", false);
				this.loading = false;
				alert("記事の登録完了");
			} else {
				alert(`記事登録時にエラーが発生しました。${result}`);
			}
		},
	},
};
</script>

<style scoped>
#experience-open-close-button {
	width: 400px;
}

#experience-article-registration-button {
	display: block;
	margin-left: auto;
}
</style>
