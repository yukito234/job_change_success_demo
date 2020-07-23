<template>
	<div class="page-container">
		<easy-signin />
		<signin />
		<signup />
	</div>
</template>

<script>
import Signup from "~/components/signup.vue";
import Signin from "~/components/signin.vue";
import EasySignin from "~/components/easy-signin.vue";

export default {
	components: {
		Signup,
		Signin,
		"easy-signin": EasySignin,
	},
	head() {
		return {
			title: "ログイン・会員登録ページ",
			meta: [
				{
					hid: "description",
					name: "description",
					content:
						"会員登録を行ってログインすることで、他の会員のプロフィールの閲覧、コメント、お気に入り記事の登録などの機能を使えるようになります。また、簡単ログイン機能を使うと、会員登録することなくログインが可能です。",
				},
			],
		};
	},
};
</script>
