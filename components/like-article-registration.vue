<template>
	<div>
		<b-button
			id="like-open-close-button"
			v-b-toggle.collapse-like
			variant="primary"
			@click="changeIsLikeModalDisplay"
		>
			お気に入り記事の登録・編集・削除
			<b-icon v-if="!isLikeModalDisplay" icon="chevron-down" />
			<b-icon v-if="isLikeModalDisplay" icon="chevron-up" />
		</b-button>
		<b-collapse id="collapse-like" class="mt-2">
			<div v-if="getIsProfileRegistration">
				<div v-if="getIsAddableLikeArticle">
					<b-card bg-variant="light">
						<b-form-group
							label-cols-lg="3"
							label="お気に入り記事の登録"
							label-size="lg"
							label-class="font-weight-bold pt-0"
							class="mb-0"
						>
							<p>
								<span>
									あと
								</span>
								<span id="number-of-addable-like-article">
									{{ getNumberOfAddableLikeArticle }}
								</span>
								<span>
									記事登録が可能。（最大３記事）
								</span>
							</p>
							<b-form-group
								label-cols-sm="3"
								label="記事タイトル(必須):"
								label-align-sm="right"
							>
								<b-form-input v-model.trim="title" />
							</b-form-group>

							<b-form-group
								label-cols-sm="3"
								label="URL(必須):"
								label-align-sm="right"
							>
								<b-form-input v-model.trim="url" />
							</b-form-group>

							<b-form-group
								label-cols-sm="3"
								label="おすすめしたい人:"
								label-align-sm="right"
								label-for="nested-city"
								placeholder="例：ポートフォリオの作り方が分からず悩んでいる人..."
							>
								<b-form-input v-model.trim="recommendation" />
							</b-form-group>

							<b-form-group
								label-cols-sm="3"
								label="コメント:"
								label-align-sm="right"
							>
								<b-form-textarea
									id="textarea"
									v-model.trim="freeTextArea"
									placeholder="記事の共感ポイントや学びなどを簡単にまとめてください..."
									rows="3"
									max-rows="6"
								/>
							</b-form-group>

							<b-form-group label-cols-sm="3" label="" label-align-sm="right">
								<div>
									<b-button
										id="like-article-registration-button"
										class="button-with-gradation"
										variant="primary"
										:disabled="loading"
										@click="registerLikeArticle()"
									>
										<b-spinner v-show="loading" small />
										<span v-show="loading">
											登録中...
										</span>
										<span v-show="!loading">
											お気に入り記事を登録
										</span>
									</b-button>
								</div>
							</b-form-group>
						</b-form-group>
					</b-card>
				</div>

				<div v-else>
					<b-card bg-variant="light">
						<p>
							{{ errorMessage }}
						</p>
						<!--
						<p>
							{{ getMessageAboutNumberOfLikeArticle }}
						</p>
						-->
						<p>
							<span>
								現在
							</span>
							<span>
								{{ getNumberOfLikeArticle }}
							</span>
							<span>
								記事が登録されています。（上限３記事）
							</span>
						</p>
						<p>
							上限に達している場合は、以下より記事を削除してください。
						</p>
					</b-card>
				</div>

				<div v-if="getIsEditAndDeleteSectionDisplay">
					<b-card bg-variant="light">
						<h4>
							お気に入り記事の編集・削除
						</h4>
						<p>
							編集ボタンを押すと、おすすめする人やコメントの修正ができます。
							<br />削除ボタンを押すと、記事をお気に入りから削除できます。
						</p>

						<b-table :items="obtainLikeArticles" :fields="fields" responsive="sm">
							<template v-slot:cell(titleLink)="data" :style="{ width: '100px' }">
								<a :href="data.item.url">
									{{ data.item.title }}
								</a>
							</template>
							<template v-slot:cell(deleteButton)="data">
								<b-button variant="primary" @click="deleteLikeArticles(data.item)">
									削除
								</b-button>
							</template>
							<template v-slot:cell(editButton)="row">
								<b-button class="mr-2" variant="primary" @click="row.toggleDetails">
									{{ row.detailsShowing ? "閉じる" : "開く" }}
									<b-icon v-if="!row.detailsShowing" icon="chevron-down" />
									<b-icon v-if="row.detailsShowing" icon="chevron-up" />
								</b-button>
							</template>
							<template v-slot:row-details="row">
								<b-card>
									<b-row class="mb-2">
										<b-col sm="3" class="text-sm-right">
											<b>
												おすすめする人:
											</b>
										</b-col>
										<b-col>
											<b-form-input v-model="row.item.recommendation" />
										</b-col>
									</b-row>
									<b-row class="mb-2">
										<b-col sm="3" class="text-sm-right">
											<b>
												コメント:
											</b>
										</b-col>
										<b-col>
											<b-form-textarea
												id="textarea"
												v-model="row.item.free_text_area"
												rows="3"
												max-rows="6"
											/>
										</b-col>
									</b-row>
									<div>
										<b-button
											id="confirm-button"
											size="sm"
											variant="primary"
											@click="confirm(row.item)"
										>
											編集を確定
										</b-button>
									</div>
								</b-card>
							</template>
						</b-table>
					</b-card>
				</div>
				<div v-else>
					<b-card bg-variant="light">
						<p>
							まだお気に入り記事が登録されていないので、編集・削除機能は利用できません。
						</p>
					</b-card>
				</div>
			</div>
			<div v-if="!getIsProfileRegistration">
				<b-card bg-variant="light">
					<b-form-group
						label-cols-lg="3"
						label="お気に入り記事の登録"
						label-size="lg"
						label-class="font-weight-bold pt-0"
						class="mb-0"
					>
						<p id="message-profile-registration-needed">
							プロフィールの登録が必要です。
						</p>
						<b-form-group
							label-cols-sm="3"
							label="記事タイトル(必須):"
							label-align-sm="right"
						>
							<b-form-input v-model.trim="title" disabled="disabled" />
						</b-form-group>

						<b-form-group label-cols-sm="3" label="URL(必須):" label-align-sm="right">
							<b-form-input v-model.trim="url" disabled="disabled" />
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="おすすめしたい人:"
							label-align-sm="right"
							label-for="nested-city"
							placeholder="例：ポートフォリオの作り方が分からず悩んでいる人..."
						>
							<b-form-input v-model.trim="recommendation" disabled="disabled" />
						</b-form-group>

						<b-form-group label-cols-sm="3" label="コメント:" label-align-sm="right">
							<b-form-textarea
								id="textarea"
								v-model.trim="freeTextArea"
								placeholder="プロフィールの登録を行ってください！！"
								rows="3"
								max-rows="6"
								disabled="disabled"
							/>
						</b-form-group>

						<b-form-group label-cols-sm="3" label="" label-align-sm="right">
							<div>
								<b-button id="like-article-registration-button" disabled="disabled">
									<span>
										お気に入り記事を登録できません
									</span>
								</b-button>
							</div>
						</b-form-group>
					</b-form-group>
				</b-card>
			</div>
		</b-collapse>
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import sanitizeHTML from "sanitize-html";
import {
	BIcon,
	BIconX,
	BIconQuestionCircle,
	BIconChevronDown,
	BIconChevronUp,
} from "bootstrap-vue";

export default {
	middleware: "authenticated",
	components: {
		BIcon,
		BIconX,
		BIconQuestionCircle,
		BIconChevronDown,
		BIconChevronUp,
	},
	data() {
		return {
			fields: [
				{
					key: "titleLink",
					label: "記事タイトル",
				},
				{
					key: "editButton",
					label: "編集ボタン",
				},
				{
					key: "deleteButton",
					label: "削除ボタン",
				},
			],
			editFlag: false, //お気に入り記事を追加・削除するのボタンがクリックされるとtrueになる
			title: "",
			url: "",
			recommendation: "",
			freeTextArea: "",
			errorMessage: "",
			likeArticlesData: [], //ログインユーザのお気に入りデータを格納
			allUsersData: [],
			isLikeModalDisplay: false,
			loading: false,
		};
	},
	computed: {
		getIsProfileRegistration() {
			return this.$store.getters["sessionStorageParameter/getLoginUserData"]
				.is_profile_registration;
		},
		getIsAddableLikeArticle() {
			//const numberOfLikeArticles = this.$store.getters['sessionStorageParameter/getLoginUserData'].like_article_count;
			//console.log("numberOfLikeArticles");
			//console.log(numberOfLikeArticles);
			if (this.getNumberOfLikeArticle <= 2) {
				console.log("this.getNumberOfLikeArticle in getIsAddableLikeArticle");
				console.log(this.getNumberOfLikeArticle);
				return true;
			} else {
				return false;
			}
		},
		getNumberOfAddableLikeArticle() {
			console.log("3 - this.getNumberOfLikeArticle in getNumberOfAddableLikeArticle");
			console.log(3 - this.getNumberOfLikeArticle);
			return 3 - this.getNumberOfLikeArticle;
		},
		getNumberOfLikeArticle() {
			const numberOfLikeArticles = this.$store.getters[
				"sessionStorageParameter/getLoginUserData"
			].like_article_count;

			console.log("numberOfLikeArticles in getNumberOfLikeArticle");
			console.log(numberOfLikeArticles);
			return numberOfLikeArticles;
		},
		/*
		getMessageAboutNumberOfLikeArticle() {
			return `現在${this.numberOfLikeArticle}記事が登録されています。（上限３記事）`;
		},
		*/
		obtainLikeArticles() {
			//console.log("this.$store.getters['sessionStorageParameter/getLikeArticlesDataOfLoginUser'] in obtainLikeArticles");
			//console.log(this.$store.getters["sessionStorageParameter/getLikeArticlesDataOfLoginUser"]);
			return _cloneDeep(
				this.$store.getters["sessionStorageParameter/getLikeArticlesDataOfLoginUser"]
			);
			//return this.likeArticlesData;
		},
		getIsEditAndDeleteSectionDisplay() {
			console.log("this.obtainLikeArticles.length");
			console.log(this.obtainLikeArticles.length);
			if (this.obtainLikeArticles.length >= 1) {
				return true;
			}
			return false;
		},
	},
	methods: {
		changeIsLikeModalDisplay() {
			if (this.isLikeModalDisplay) {
				this.isLikeModalDisplay = false;
			} else {
				this.isLikeModalDisplay = true;
			}
		},
		confirm(item) {
			console.log("enter confirm");
			console.log("item");
			console.log(item);
			this.$store.dispatch("editLikeArticleAction", _cloneDeep(item));
		},
		deleteLikeArticles(item) {
			console.log("enter deleteLikeArticles");
			console.log("item");
			console.log(item);
			this.$store.dispatch("deleteLikeArticleAction", item);
		},
		async registerLikeArticle() {
			this.loading = true;
			console.log("enter registerLikeArticle");

			this.url = sanitizeHTML(this.url);
			this.title = sanitizeHTML(this.title);
			this.recommendation = sanitizeHTML(this.recommendation);
			this.freeTextArea = sanitizeHTML(this.freeTextArea);

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
			//let urlResult = this.url.match(/^(http|https):\/\//i);
			//console.log("urlResult");
			//console.log(urlResult);

			const allLikeArticles = this.$store.getters["getAllLikeArticles"];

			const userId = this.$store.getters["sessionStorageParameter/getLoginUserData"].uid;

			console.log("allLikeArticles");
			console.log(allLikeArticles);

			console.log("userId");
			console.log(userId);

			for (let i = 0; i < allLikeArticles.length; i++) {
				if (allLikeArticles[i].url === this.url) {
					console.log("allLikeArticles[i]");
					console.log(allLikeArticles[i]);
					alert("すでに同じ記事が登録されています");
					this.loading = false;
					return;
				}
			}

			let data = {
				title: this.title,
				url: this.url,
				recommendation: this.recommendation,
				free_text_area: this.freeTextArea,
				user_id: userId,
			};

			console.log("data");
			console.log(data);

			await this.$store.dispatch("registerLikeArticleAction", _cloneDeep(data));
			this.url = "";
			this.title = "";
			this.recommendation = "";
			this.freeTextArea = "";
			this.loading = false;
		},
	},
};
</script>

<style scoped>
#like-open-close-button {
	width: 400px;
}

#like-article-registration-button {
	display: block;
	margin-left: auto;
}

#number-of-addable-like-article,
#message-profile-registration-needed {
	color: red;
}

#confirm-button {
	display: block;
	margin-left: auto;
}
</style>
