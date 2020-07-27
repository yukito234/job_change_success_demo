<template>
	<div class="section-container">
		<div class="h2title-area">
			<h2 class="h2title">
				{{ getProfile.nick_name }}
				<span>
					さんのプロフィール
				</span>
			</h2>
		</div>
		<b-card no-body>
			<b-row>
				<b-col md="6">
					<b-img :src="getProfile.image_url" alt="" class="profileimage" />
				</b-col>
				<b-col md="6">
					<b-card-body :title="getProfile.nick_name">
						<b-card-text>
							{{ getProfile.self_introduction }}
						</b-card-text>
					</b-card-body>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
export default {
	computed: {
		getProfile() {
			return this.$store.getters["sessionStorageParameter/getClickedProfileData"];
		},
	},
};
</script>

<style scoped>
.profileimage {
	width: 250px;
}
</style>
