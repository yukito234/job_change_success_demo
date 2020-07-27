<template>
	<div class="section-container">
		<div>
			<h2 class="h2title">
				簡単ログイン
			</h2>
		</div>
		<p>会員登録することなく、ログインできます。</p>
		<div>
			<b-button
				id="signin-button"
				class="button-with-gradation"
				variant="primary"
				:disabled="loading"
				@click="easySignIn"
			>
				<b-spinner v-show="loading" small />
				<span v-show="loading">
					簡単ログイン処理中...
				</span>
				<span v-show="!loading">
					簡単ログイン
				</span>
			</b-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
		};
	},
	methods: {
		async easySignIn() {
			this.loading = true;
			await this.$store.dispatch("easySignInAction");
			this.$router.push("/members");
			this.loading = false;
		},
	},
};
</script>
