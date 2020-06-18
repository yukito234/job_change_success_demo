<template>
	<el-menu :default-active="activeIndex" mode="horizontal" :router="true">
		<!--
			<el-menu-item
				:style="{ borderBottomColor: getTopPageMenuColor() }"
				index="index1"
				:route="{ path: '/' }"
			>
			<el-menu-item
				:class="{ activeMenu: getIsActiveMenu() }"
				index="index1"
				:route="{ path: '/' }"
			>
			<el-menu-item :id="{ activeMenu: getIsActiveMenu() }" index="index1" :route="{ path: '/' }">
				<el-menu-item :id="{ active: getIsActiveMenu() }" index="index1" :route="{ path: '/' }">
		-->
		<el-menu-item
			:style="{ borderBottomColor: getTopBottomColor(), color: getTopColor() }"
			index="index1"
			:route="{ path: '/' }"
		>
			トップ
		</el-menu-item>
		<el-menu-item index="index2" :route="{ path: '/success-graph' }">
			成功者グラフ
		</el-menu-item>
		<!--
			<el-menu-item
				v-if="checkUser"
				:style="{ borderBottomColor: getMembersMenuColor() }"
				index="index3"
				:route="{ path: '/members' }"
			>
		-->
		<el-menu-item
			v-if="checkUser"
			:style="{ borderBottomColor: getMembersBottomColor(), color: getMembersColor() }"
			index="index3"
			:route="{ path: '/members' }"
		>
			ユーザ一覧
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="index4" :route="{ path: '/dashboard' }">
			ダッシュボード
		</el-menu-item>
		<el-menu-item v-if="!checkUser" index="index5" :route="{ path: '/signin-signup' }">
			ログイン
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="index6" :route="{ path: '/' }" @click="signOut">
			ログアウト
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: "",
		};
	},
	computed: {
		checkUser() {
			console.log("enter checkUser in global-navi");
			console.log("this.activeIndex");
			console.log(this.activeIndex);
			//this.setActiveIndex();
			return this.$store.getters["sessionStorageParameter/getIsLoginUser"];
		},
	},
	watch: {
		$route: function () {
			console.log("enter $route watch in global-navi");
			this.setActiveIndex();
		},
	},
	mounted() {
		this.setActiveIndex();
	},
	methods: {
		/*
		getMembersMenuColor() {
			//ログイン後にmembersページのメニューボタンがアクティブにならず、青色下線が表示されない
			//また、その後の操作でもこのボタンだけアクティブにならない
			//そこでactiveIndexをチェックして強制的に青色下線を表示させるようにした
			if (this.activeIndex === "index3") {
				//return "red";
				return "rgb(64, 158, 255)";
			}
		},
		*/
		getMembersBottomColor() {
			if (this.activeIndex === "index3") {
				//return "red";
				return "rgb(64, 158, 255)";
			}
		},
		getMembersColor() {
			if (this.activeIndex === "index3") {
				//return "red";
				return "#303133";
			}
		},
		getTopBottomColor() {
			if (this.activeIndex === "index1") {
				//return "red";
				return "rgb(64, 158, 255)";
			}
		},
		getTopColor() {
			if (this.activeIndex === "index1") {
				//return "red";
				return "#303133";
			}
		},
		/*
		getTopPageMenuColor() {
			//ログアウト後にトップページのメニューボタンがアクティブにならず、青色下線が表示されない
			//そこでactiveIndexをチェックして強制的に青色下線を表示させるようにした
			if (this.activeIndex === "index1") {
				//return "red";
				return "rgb(64, 158, 255)";
			}
		},
		*/
		/*
		getIsActiveMenu() {
			console.log("enter getIsActiveMenuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
			if (this.activeIndex === "index1") {
				//return "red";
				return true;
			}
		},
		*/
		setActiveIndex() {
			console.log("enter setActiveIndex in global-navi");
			switch (this.$route.name) {
				case "index":
					this.activeIndex = "index1";
					break;
				case "success-graph":
					this.activeIndex = "index2";
					break;
				case "members":
					this.activeIndex = "index3";
					break;
				case "dashboard":
					this.activeIndex = "index4";
					break;
				case "signin-signup":
					this.activeIndex = "index5";
					break;
			}
			console.log("this.$route.name");
			console.log(this.$route.name);
		},
		async signOut() {
			await this.$store.dispatch("signOutAction");
		},
	},
};
</script>

<style scoped>
/*
#active {
	border-bottom-color: red;
	color: #303133;
}
#active {
	border-bottom-color: red;
	color: #303133;
}
ケバブを使わなくても失敗
#active {
	border-bottom-color: rgb(64, 158, 255) !important;
	color: #303133 !important;
	font-size: 40px;
	background-color: red;
}
idでは失敗
#active-menu {
	border-bottom-color: rgb(64, 158, 255) !important;
	color: #303133 !important;
}
クラスでは失敗
.active-menu {
	border-bottom-color: rgb(64, 158, 255);
	color: #303133;
}
*/
.inactive-menu {
	border-bottom-color: transparent;
	color: #909399;
}
</style>
