<template>
	<div class="page-container">
		<h2>
			返信する
		</h2>
		<b-card>
			<b-img :src="getComment.image_url" v-bind="mainProps" />
			<span>
				{{ getComment.nick_name_from }}
			</span>
			<p>
				{{ getComment.comment }}
			</p>
			<span>
				{{ getComment.createdAt }}
			</span>
		</b-card>
		<p>
			上のコメントに対して返信します。
		</p>
		<b-form-textarea
			id="textarea"
			v-model="replyComment"
			placeholder="返信コメントを入力してください..."
			rows="3"
			max-rows="6"
		/>
		<div>
			<b-button class="submit-button" variant="primary" @click="doReply()">
				この内容で返信する
			</b-button>
		</div>
	</div>
</template>

<script>
import sanitizeHTML from "sanitize-html";

export default {
	middleware: "authenticated",
	data() {
		return {
			replyComment: "",
			mainProps: {
				width: 30,
				block: false,
			},
		};
	},
	computed: {
		getComment() {
			return this.$store.getters["sessionStorageParameter/getCommentData"];
		},
	},
	methods: {
		async doReply() {
			if (sanitizeHTML(this.replyComment) === "") {
				alert("コメントを入力してください！");
				return;
			}
			//コメントをDBに登録する
			const result = await this.$store.dispatch(
				"replyAction",
				sanitizeHTML(this.replyComment)
			);

			if (result === "success") {
				//個別ページに戻ったときに再度DBと通信して、最新のコメントデータを取得する
				this.$store.dispatch("changeIsAllCommentsAction", false);

				//ここでindex.jsのallCommentsを空にする
				//そうしないと、個別ページに戻ったときに再度DBから全コメントが取得されるので、
				//allCommentsに重複が生じる
				this.$store.dispatch("allCommentsInitAction");
				alert("コメントの返信完了");
				this.replyComment = "";
			} else {
				alert(result);
			}
		},
	},
};
</script>

<style scoped>
.submit-button {
	display: block;
	margin-left: auto;
}

.return-button {
	display: inline-block;
	float: right;
}
</style>
