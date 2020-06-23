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
};
</script>
