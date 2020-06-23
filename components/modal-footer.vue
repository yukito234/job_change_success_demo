<template v-slot:modal-footer>
	<div class="w-100">
		<b-button variant="primary" size="sm" class="float-right" @click="closeButtonClicked()">
			閉じる
		</b-button>
	</div>
</template>

<script>
export default {
	methods: {
		closeButtonClicked() {
			this.$emit("closeButtonClickedNotice");
		},
	},
};
</script>
