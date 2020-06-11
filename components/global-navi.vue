<template>
	<el-menu mode="horizontal" :router="true">
		<el-menu-item index="1" :route="{ path: '/' }">
			トップ
		</el-menu-item>
		<el-menu-item index="2" :route="{ path: '/success-graph' }">
			成功者グラフ
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="3" :route="{ path: '/members' }">
			ユーザ一覧
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="4" :route="{ path: '/dashboard' }">
			ダッシュボード
		</el-menu-item>
		<el-menu-item v-if="!checkUser" index="5" :route="{ path: '/signin-signup' }">
			ログイン
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="6" :route="{ path: '/' }" @click="signOut">
			ログアウト
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	computed: {
		checkUser() {
			return this.$store.getters["sessionStorageParameter/getIsLoginUser"];
		},
		displayRoute() {
			return this.$route.name;
		},
	},
	methods: {
		async signOut() {
			await this.$store.dispatch("signOutAction");
		},
	},
};
</script>
