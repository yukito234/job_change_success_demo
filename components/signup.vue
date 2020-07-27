<template>
	<div class="section-container">
		<div>
			<h2 class="h2title">
				会員登録（無料）
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
						label="ユーザ名:"
						label-align-sm="right"
						label-for="user-name-signup"
					>
						<b-form-input id="user-name-signup" v-model="userData.userName" />
					</b-form-group>

					<b-form-group
						label-cols-sm="3"
						label="メールアドレス:"
						label-align-sm="right"
						label-for="email-signup"
					>
						<b-form-input id="email-signup" v-model="userData.email" />
					</b-form-group>
					<b-form-group
						label-cols-sm="3"
						label="パスワード:"
						label-align-sm="right"
						label-for="password-signup"
					>
						<b-form-input
							id="password-signup"
							v-model="userData.password"
							type="password"
						/>
					</b-form-group>
					<b-form-group label-cols-sm="3" label="" label-align-sm="right">
						<div>
							<b-button
								id="signup-button"
								class="button-with-gradation"
								variant="primary"
								:disabled="loading"
								@click="signUp"
							>
								<b-spinner v-show="loading" small />
								<span v-show="loading">
									会員登録中...
								</span>
								<span v-show="!loading">
									新規登録
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
	name: "Signup",
	data() {
		return {
			userData: {
				userName: "",
				email: "",
				password: "",
			},
			loading: false,
		};
	},
	methods: {
		async signUp() {
			this.loading = true;

			const dataForSignUp = {
				userName: this.userData.userName,
				email: this.userData.email,
				password: this.userData.password,
			};

			const dataForSignIn = {
				email: this.userData.email,
				password: this.userData.password,
			};

			for (let key in this.userData) {
				this.userData[key] = "";
			}

			//authenticationで会員登録の処理を行う
			const resultOfSignUp = await this.$store.dispatch("signUpAction", dataForSignUp);

			//正常に会員登録が完了した場合は、そのままログインする
			if (resultOfSignUp === "success") {
				await this.$store.dispatch("signInAction", dataForSignIn);
				this.$router.push("/members");
				this.loading = false;
				//登録に失敗した場合は、エラーを表示して終了
			} else {
				alert(`${resultOfSignUp}`);
				this.loading = false;
			}
		},
	},
};
</script>

<style scoped>
#signup-button {
	display: block;
	margin-left: auto;
}
</style>
