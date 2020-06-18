<template>
	<div class="section-container">
		<div>
			<h2 class="h2title">
				コメントを残す
			</h2>
		</div>
		<b-card v-if="getIsProfileRegistration" bg-variant="light">
			<b-form-textarea
				id="textarea"
				v-model.trim="userComment"
				placeholder="コメントを入力してください！"
				rows="3"
				max-rows="6"
			/>
			<div>
				<b-button
					class="submit-button"
					variant="primary"
					:disabled="loading"
					@click="registerComment"
				>
					<b-spinner v-show="loading" small />
					<span v-show="loading">
						送信中...
					</span>
					<span v-show="!loading">
						コメントを送信
					</span>
				</b-button>
			</div>
		</b-card>
		<b-card v-else bg-variant="light">
			<p>
				コメントを残すには、ダッシュボードページでプロフィール登録をしてください！
			</p>
			<b-form-textarea
				id="textarea"
				v-model.trim="userComment"
				placeholder="コメントを入力できません。"
				rows="3"
				max-rows="6"
				disabled="disabled"
			/>
			<div>
				<b-button
					class="submit-button"
					:disabled="!getIsProfileRegistration"
					@click="registerComment"
				>
					コメントを送信できません
				</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
import sanitizeHTML from "sanitize-html";

export default {
	data() {
		return {
			userComment: "",
			loading: false,
		};
	},
	computed: {
		getIsProfileRegistration() {
			return this.$store.getters["sessionStorageParameter/getLoginUserData"]
				.is_profile_registration;
		},
	},
	methods: {
		async registerComment() {
			this.loading = true;

			console.log("this.userComment in registerComment");
			console.log(this.userComment);

			//コメント欄に文字が入力されていない場合はエラーを出す
			//コメントが入力されていないときはボタンをdisabledの状態にしておく
			//v-modelにtrimを設定しているが、全角空白と半角空白のみを入れて送信したときに
			//以下にキャッチされるか確認する

			if (sanitizeHTML(this.userComment) === "") {
				alert("コメントを入力してください！");
				this.loading = false;
				return;
			}

			await this.$store.dispatch("registerCommentAction", sanitizeHTML(this.userComment));

			//DBから最新の全コメントを取得する
			await this.$store.dispatch("commentsGetAction");

			this.$emit("commentRegisteredNotice");
			this.userComment = "";
			this.loading = false;
			alert("コメントの登録完了");
		},
	},
};
</script>

<style scoped>
.submit-button {
	display: block;
	margin-left: auto;
}
</style>
