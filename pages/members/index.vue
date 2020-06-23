<template>
	<div class="page-container">
		<div class="section-container">
			<div class="h2title-area">
				<h2 class="h2title">
					ユーザ一覧
				</h2>
				<b-icon v-b-modal.modal-user-list-title icon="question-circle" />
				<b-modal id="modal-user-list-title" ok-only>
					<p class="my-4">
						ニックネームをクリックすると詳細ページに移動できます。
						<br />ダッシュボードで、あなたもプロフィールを作成できるので、ぜひ使ってみてください！
					</p>
				</b-modal>
			</div>
			<b-table :items="getTableData" :fields="fields" :outlined="true">
				<template v-slot:cell(userImage)="data">
					<img :src="data.item.image_url" class="profileimage" />
				</template>
				<template v-slot:cell(titleLink)="data">
					<nuxt-link
						:to="{ path: `/members/${data.item.user_id}` }"
						@click.native="setUserData(data.item)"
					>
						{{ data.item.nick_name }}
					</nuxt-link>
					<p>
						{{ data.item.self_introduction }}
					</p>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
import { BIcon, BIconX, BIconQuestionCircle } from "bootstrap-vue";

export default {
	middleware: "authenticated",
	components: {
		BIcon,
		BIconX,
		BIconQuestionCircle,
	},
	async fetch({ store }) {
		if (!store.getters["getIsAllProfiles"]) {
			store.dispatch("allProfilesInitAction");
			//全プロフィールデータを取得してindex.jsに保存する
			await store.dispatch("allProfilesGetAction");
			//取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			store.dispatch("changeIsAllProfilesAction", true);
		}
	},
	data() {
		return {
			fields: [
				{
					key: "userImage",
					label: "",
					thStyle: {
						display: "none",
					},
				},
				{
					key: "titleLink",
					label: "",
					thStyle: {
						display: "none",
					},
				},
			],
		};
	},
	computed: {
		getTableData() {
			return this.$store.getters["getAllProfiles"];
		},
	},
	methods: {
		setUserData(element) {
			//クリックされたプロフィールページのユーザ情報を保存
			//リロード対策としてユーザのデータはsessionに保存する
			this.$store.commit("sessionStorageParameter/clickedProfileDataSet", element);
		},
	},
	head() {
		return {
			title: "会員ページ",
		};
	},
};
</script>

<style scoped>
.profileimage {
	width: 150px;
}
</style>
