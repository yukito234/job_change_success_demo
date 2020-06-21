<template>
	<el-menu :default-active="activeIndex" mode="horizontal" :router="true">
		<el-menu-item
			:style="{ borderBottomColor: getTopBottomColor(), color: getTopColor() }"
			index="index1"
			:route="{ path: '/' }"
		>
			<b-icon icon="house-door" class="menu-icon" />
			<span class="menu-text">
				トップ
			</span>
		</el-menu-item>
		<!--
			<p>
				トップ
			</p>
			<span>
				トップ
			</span>
		-->
		<el-menu-item
			index="index2"
			:style="{ borderBottomColor: getSuccessBottomColor(), color: getSuccessColor() }"
			:route="{ path: '/success-graph' }"
		>
			<b-icon icon="pie-chart-fill" class="menu-icon" />
			<span class="menu-text">
				成功者グラフ
			</span>
		</el-menu-item>
		<el-menu-item
			v-if="checkUser"
			:style="{ borderBottomColor: getMembersBottomColor(), color: getMembersColor() }"
			index="index3"
			:route="{ path: '/members' }"
		>
			<b-icon icon="list-ol" class="menu-icon" />
			<span class="menu-text">
				ユーザ一覧
			</span>
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="index4" :route="{ path: '/dashboard' }">
			<b-icon icon="clipboard" class="menu-icon" />
			<span class="menu-text">
				ダッシュボード
			</span>
		</el-menu-item>
		<el-menu-item
			v-if="!checkUser"
			:style="{ borderBottomColor: getSigninBottomColor(), color: getSigninColor() }"
			index="index5"
			:route="{ path: '/signin-signup' }"
		>
			<b-icon icon="box-arrow-in-right" class="menu-icon" />
			<span class="menu-text">
				ログイン
			</span>
		</el-menu-item>
		<el-menu-item v-if="checkUser" index="index6" :route="{ path: '/' }" @click="signOut">
			<b-icon icon="arrow-bar-right" class="menu-icon" />
			<span class="menu-text">
				ログアウト
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
import {
	BIcon,
	BIconHouseDoor,
	BIconPieChartFill,
	BIconBoxArrowInRight,
	BIconArrowBarRight,
	BIconClipboard,
	BIconListOl,
} from "bootstrap-vue";

export default {
	components: {
		BIcon,
		BIconHouseDoor,
		BIconPieChartFill,
		BIconBoxArrowInRight,
		BIconArrowBarRight,
		BIconClipboard,
		BIconListOl,
	},
	data() {
		return {
			activeIndex: "",
			routeNameChange: {
				new: "",
				old: "",
			},
			checkUserChange: {
				new: "",
				old: "",
			},
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
		$route: function (newVal, oldVal) {
			console.log("enter $route watch in global-navi");
			this.routeNameChange.new = newVal.name;
			this.routeNameChange.old = oldVal.name;
			this.setActiveIndex();
		},
		checkUser: function (newVal, oldVal) {
			console.log("enter checkUser watch in global-navi");
			this.checkUserChange.new = newVal;
			this.checkUserChange.old = oldVal;
		},
	},
	mounted() {
		this.setActiveIndex();
	},
	methods: {
		getSigninBottomColor() {
			if (this.activeIndex === "index5") {
				//return "red";
				return "rgb(64, 158, 255)";
			}
		},
		getSigninColor() {
			if (this.activeIndex === "index5") {
				//return "red";
				return "#303133";
			}
		},
		getSuccessBottomColor() {
			//ログイン状態でsuccess-graphページにてログアウトすると、このページのグローバルメニューボタンがアクティブな状態(青色下線表示、文字色濃いめ)のままとなってしまう
			//この問題の解決策として、上記条件のときにログアウトしたときだけ、success-graphページのグローバルメニューボタンをインアクティブな状態とする
			console.log("enter getSuccessBottomColorrrrrrrrrrrrrr");

			console.log("this.routeNameChange.new");
			console.log(this.routeNameChange.new);

			console.log("this.routeNameChange.old");
			console.log(this.routeNameChange.old);

			console.log("this.checkUserChange.new");
			console.log(this.checkUserChange.new);

			console.log("this.checkUserChange.old");
			console.log(this.checkUserChange.old);
			if (this.activeIndex === "index1") {
				if (
					this.routeNameChange.new === "index" &&
					this.routeNameChange.old === "success-graph" &&
					!this.checkUserChange.new &&
					this.checkUserChange.old
				) {
					console.log("Meets all requirements in getSuccessBottomColor");
					//return "red";
					return "transparent";
				}
				//return "rgb(64, 158, 255)";
			}
		},
		getSuccessColor() {
			if (this.activeIndex === "index1") {
				if (
					this.routeNameChange.new === "index" &&
					this.routeNameChange.old === "success-graph" &&
					!this.checkUserChange.new &&
					this.checkUserChange.old
				) {
					console.log("Meets all requirements in getSuccessColor");
					return "#909399";
				}
			}
		},
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
.menu-icon {
	font-size: 18px;
	/*
	b-iconではデフォルトでvertical-align: -0.15em;が設定されている
	そのため、デフォルトのままだとアイコンとテキストの下端が揃わない
	そこで以下を設定して下端が揃うように修正をかけている
	*/
	vertical-align: -0.3em;
}
/*
font-size: 1.5rem;
font-size: 2rem;
font-size: 20px;
*/
.menu-text {
	font-size: 18px;
}
/*
height: 20px;
*/
</style>
