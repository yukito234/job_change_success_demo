<template>
	<div>
		<b-breadcrumb v-if="isDisplay" id="breadcrumb" :items="items" />
		<!--
			<b-breadcrumb v-if="isDisplay" :items="items" />
			<b-breadcrumb v-if="isDisplay" id="breadcrumb" :items="items" />
		-->
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
			console.log("enter watch in bread-crumb");
			console.log("this.$route");
			console.log(this.$route);
			this.getItems();
			this.checkIsDisplay();
		},
	},
	created() {
		this.getItems();
		this.checkIsDisplay();
	},
	methods: {
		checkIsDisplay() {
			if (this.items.length >= 1) {
				this.isDisplay = true;
				//return true;
			} else {
				this.isDisplay = false;
				//return false;
			}
		},
		async getItems() {
			console.log("enter getItems in bread-crumb.vue");
			this.items.splice(-this.items.length);

			let array = [];
			let nickName = "";
			let urlOfThisUser = "";
			let allProfiles = [];

			console.log("this.$route.name");
			console.log(this.$route.name);

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
					console.log("enter case members-userid");

					if (!this.$store.getters["getIsAllProfiles"]) {
						console.log("enter !this.$store.getters['getIsAllProfiles']");

						this.$store.dispatch("allProfilesInitAction");
						//全プロフィールデータを取得してindex.jsに保存する
						await this.$store.dispatch("allProfilesGetAction");

						//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
						this.$store.dispatch("changeIsAllProfilesAction", true);
					}

					console.log("this.$route.params.userid:");
					console.log(this.$route.params.userid);

					allProfiles = _cloneDeep(this.$store.getters["getAllProfiles"]);

					console.log("allProfiles:");
					console.log(allProfiles);

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
					console.log("urlOfThisUser");
					console.log(urlOfThisUser);

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

			for (let i = 0; i < array.length; i++) {
				this.items.push(array[i]);
			}

			console.log("this.items:");
			console.log(this.items);

			//this.checkIsDisplay();

			//console.log("this.isDisplay:");
			//console.log(this.isDisplay);

			//return this.items;
		},
	},
};
</script>

<style scoped>
#breadcrumb {
	background-color: white;
}
</style>
