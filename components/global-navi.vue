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
			return this.$store.getters["sessionStorageParameter/getIsLoginUser"];
		},
	},
	watch: {
		$route: function (newVal, oldVal) {
			this.routeNameChange.new = newVal.name;
			this.routeNameChange.old = oldVal.name;
			this.setActiveIndex();
		},
		checkUser: function (newVal, oldVal) {
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
				return "rgb(64, 158, 255)";
			}
		},
		getSigninColor() {
			if (this.activeIndex === "index5") {
				return "#303133";
			}
		},
		getSuccessBottomColor() {
			//ログイン状態でsuccess-graphページにてログアウトすると、
			//このページのグローバルメニューボタンがアクティブな状態(青色下線表示、文字色濃いめ)のままとなってしまう
			//この問題を解決するため、上記条件でログアウトしたときだけ、
			//success-graphページのグローバルメニューボタンをインアクティブな状態とする
			if (this.activeIndex === "index1") {
				if (
					this.routeNameChange.new === "index" &&
					this.routeNameChange.old === "success-graph" &&
					!this.checkUserChange.new &&
					this.checkUserChange.old
				) {
					return "transparent";
				}
			}
		},
		getSuccessColor() {
			//getSuccessBottomColorと同様の理由で設定したメソッド
			if (this.activeIndex === "index1") {
				if (
					this.routeNameChange.new === "index" &&
					this.routeNameChange.old === "success-graph" &&
					!this.checkUserChange.new &&
					this.checkUserChange.old
				) {
					return "#909399";
				}
			}
		},
		getMembersBottomColor() {
			//ログインしたとき、membersページに遷移するが、
			//membersのメニューがアクティブなスタイルにならない不具合がある
			//この問題を解決するため、強制的にスタイルを設定している
			if (this.activeIndex === "index3") {
				return "rgb(64, 158, 255)";
			}
		},
		getMembersColor() {
			//getMembersBottomColorと同じ理由で設定
			if (this.activeIndex === "index3") {
				return "#303133";
			}
		},
		getTopBottomColor() {
			//ログアウト時にトップページに遷移するが、
			//トップページのメニューがアクティブなスタイルにならない不具合がある
			//この問題を解決するため、強制的にスタイルを設定している
			if (this.activeIndex === "index1") {
				return "rgb(64, 158, 255)";
			}
		},
		getTopColor() {
			//getTopColorと同じ理由で設定
			if (this.activeIndex === "index1") {
				return "#303133";
			}
		},
		setActiveIndex() {
			//現在のページをチェックして、アクティブなスタイルにさせるメニューを決定する
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
	 * b-iconではデフォルトでvertical-align: -0.15em;が設定されている
	 * そのため、デフォルトのままだとアイコンとテキストの下端が揃わない
	 * そこで以下を設定して下端が揃うように修正をかけている
	 */
	vertical-align: -0.3em;
}

.menu-text {
	font-size: 18px;
}
</style>
