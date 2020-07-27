<template>
	<div class="section-container">
		<div>
			<h2 class="h2title">
				ログイン
			</h2>
		</div>
		<div>
			<b-card bg-variant="light">
				<b-form-group
					label-cols-lg="3"
					label-size="lg"
					label-class="font-weight-bold pt-0"
					class="mb-0"
				>
					<b-form-group
						label-cols-sm="3"
						label="メールアドレス:"
						label-align-sm="right"
						label-for="email-signin"
					>
						<b-form-input id="email-signin" v-model="userData.email" />
					</b-form-group>

					<b-form-group
						label-cols-sm="3"
						label="パスワード:"
						label-align-sm="right"
						label-for="password-signin"
					>
						<b-form-input
							id="password-signin"
							v-model="userData.password"
							type="password"
						/>
					</b-form-group>
					<b-form-group label-cols-sm="3" label="" label-align-sm="right">
						<div>
							<b-button
								id="signin-button"
								class="button-with-gradation"
								variant="primary"
								:disabled="loading"
								@click="signIn"
							>
								<b-spinner v-show="loading" small />
								<span v-show="loading">
									ログイン処理中...
								</span>
								<span v-show="!loading">
									ログイン
								</span>
							</b-button>
						</div>
					</b-form-group>
				</b-form-group>
			</b-card>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userData: {
				email: "",
				password: "",
			},
			loading: false,
		};
	},
	methods: {
		async signIn() {
			this.loading = true;

			const data = {
				email: this.userData.email,
				password: this.userData.password,
			};

			for (let key in this.userData) {
				this.userData[key] = "";
			}

			await this.$store.dispatch("signInAction", data);
			this.$router.push("/members");
			this.loading = false;
		},
	},
};
</script>

<style>
#signin-button {
	display: block;
	margin-left: auto;
}
</style>
