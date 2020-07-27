<template>
	<div>
		<b-breadcrumb v-if="isDisplay" id="breadcrumb" :items="items" />
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";

export default {
	data() {
		return {
			items: [],
			isDisplay: false,
		};
	},
	watch: {
		$route: function () {
			this.getItems();
			this.checkIsDisplay();
		},
	},
	created() {
		//リロード後もパンくずを表示させるために必要
		this.getItems();
		this.checkIsDisplay();
	},
	methods: {
		checkIsDisplay() {
			//トップページ以外ではパンくずを表示
			if (this.items.length >= 1) {
				this.isDisplay = true;
			} else {
				this.isDisplay = false;
			}
		},
		async getItems() {
			//ここでは、パンくず表示に必要なデータを生成し、this.itemsに入れる
			this.items.splice(-this.items.length);

			let array = [];
			let nickName = "";
			let urlOfThisUser = "";
			let allProfiles = [];

			switch (this.$route.name) {
				case "success-graph":
					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "成功者グラフ",
							active: true,
						},
					];
					break;
				case "members":
					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "メンバーズ",
							active: true,
						},
					];
					break;
				case "members-userid":
					//プロフィールページにアクセスしてきた場合、パンくずにニックネームを入れる
					//ニックネームは、全プロフィールデータから検索する
					//よって、まだDBから全プロフィールデータを取得していない場合は、通信して取得する
					if (!this.$store.getters["getIsAllProfiles"]) {
						this.$store.dispatch("allProfilesInitAction");
						//全プロフィールデータを取得してindex.jsに保存する
						await this.$store.dispatch("allProfilesGetAction");

						//取得が完了したら、フラグをtrueにして、
						//2回目以降のアクセスではDBとのやり取りが発生しないようにする
						this.$store.dispatch("changeIsAllProfilesAction", true);
					}

					allProfiles = _cloneDeep(this.$store.getters["getAllProfiles"]);

					for (let i = 0; i < allProfiles.length; i++) {
						if (allProfiles[i].user_id === this.$route.params.userid) {
							nickName = allProfiles[i].nick_name;
						}
					}

					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "メンバーズ",
							to: { name: "members" },
						},
						{
							text: nickName,
							active: true,
						},
					];
					break;
				case "members-userid-comments-commentid":
					nickName = this.$store.getters["sessionStorageParameter/getClickedProfileData"]
						.nick_name;

					urlOfThisUser =
						"/members/" +
						this.$store.getters["sessionStorageParameter/getClickedProfileData"]
							.user_id;

					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "メンバー一覧",
							to: { name: "members" },
						},
						{
							text: nickName,
							to: { path: urlOfThisUser },
						},
						{
							text: "返信",
							active: true,
						},
					];
					break;
				case "dashboard":
					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "ダッシュボード",
							active: true,
						},
					];
					break;
				case "signin-signup":
					array = [
						{
							text: "トップ",
							to: { name: "index" },
						},
						{
							text: "ログインor会員登録",
							active: true,
						},
					];
					break;
			}
			//生成したパンくずデータを配列に入れる
			for (let i = 0; i < array.length; i++) {
				this.items.push(array[i]);
			}
		},
	},
};
</script>

<style scoped>
#breadcrumb {
	background-color: white;
}
</style>
