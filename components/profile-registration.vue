<template>
	<div>
		<div v-if="!getIsProfileRegistration">
			<b-button
				id="profile-open-close-button"
				v-b-toggle.collapse-profile
				variant="primary"
				@click="changeIsProfileModalDisplay"
			>
				プロフィールを登録
				<b-icon v-if="!isProfileModalDisplay" icon="chevron-down" />
				<b-icon v-if="isProfileModalDisplay" icon="chevron-up" />
			</b-button>

			<b-collapse id="collapse-profile" class="mt-2">
				<b-card bg-variant="light">
					<b-form-group
						label-cols-lg="3"
						label="プロフィールの作成"
						label-size="lg"
						label-class="font-weight-bold pt-0"
						class="mb-0"
					>
						<!--
						<p>
							<span>
								すべて
							</span>
							<span id="text-input-required">
								入力必須
							</span>
							<span>
								です。
							</span>
						</p>
						-->
						<b-form-group
							label-cols-sm="3"
							label="ニックネーム(必須):"
							label-align-sm="right"
						>
							<b-form-input v-model.trim="getAndSetNickName" />
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="プロフィール画像(必須):"
							label-align-sm="right"
						>
							<b-form-file
								v-model="file"
								:state="Boolean(file)"
								browse-text="選択"
								placeholder="Choose a file or drop it here..."
								drop-placeholder="Drop file here..."
								accept="image/*"
								@input="onFileInput"
							/>
							<img :src="uploadedImage" />
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="自己紹介文(必須):"
							label-align-sm="right"
						>
							<b-form-textarea
								id="textarea"
								v-model.trim="getAndSetSelfIntroduction"
								placeholder="Enter something..."
								rows="3"
								max-rows="6"
							/>
						</b-form-group>

						<b-form-group label-cols-sm="3" label="" label-align-sm="right">
							<div>
								<b-button
									id="profile-registration-button"
									variant="primary"
									:disabled="loading"
									@click="registerProfile"
								>
									<b-spinner v-show="loading" small />
									<span v-show="loading">
										登録中...
									</span>
									<span v-show="!loading">
										プロフィールを新規登録
									</span>
								</b-button>
							</div>
						</b-form-group>
					</b-form-group>
				</b-card>
			</b-collapse>
		</div>

		<div v-else>
			<b-button
				id="profile-open-close-button"
				v-b-toggle.collapse-profile
				variant="primary"
				@click="changeIsProfileModalDisplay"
			>
				プロフィールを編集
				<b-icon v-if="!isProfileModalDisplay" icon="chevron-down" />
				<b-icon v-if="isProfileModalDisplay" icon="chevron-up" />
			</b-button>

			<b-collapse id="collapse-profile" class="mt-2">
				<b-card bg-variant="light">
					<b-form-group
						label-cols-lg="3"
						label="プロフィールの編集"
						label-size="lg"
						label-class="font-weight-bold pt-0"
						class="mb-0"
					>
						<b-form-group
							label-cols-sm="3"
							label="ニックネーム:"
							label-align-sm="right"
						>
							<b-form-input v-model.trim="getAndSetNickName" />
						</b-form-group>

						<b-form-group
							label-cols-sm="3"
							label="プロフィール画像:"
							label-align-sm="right"
						>
							<b-form-file
								v-model="file"
								:state="Boolean(file)"
								browse-text="選択"
								placeholder="Choose a file or drop it here..."
								drop-placeholder="Drop file here..."
								accept="image/*"
								@input="onFileInput"
							/>
							<img :src="uploadedImage" />
						</b-form-group>

						<b-form-group label-cols-sm="3" label="自己紹介文:" label-align-sm="right">
							<b-form-textarea
								id="textarea"
								v-model.trim="getAndSetSelfIntroduction"
								placeholder="Enter something..."
								rows="3"
								max-rows="6"
							/>
						</b-form-group>

						<b-form-group label-cols-sm="3" label="" label-align-sm="right">
							<div>
								<b-button
									id="profile-update-button"
									variant="primary"
									:disabled="loading"
									@click="updateProfile"
								>
									<b-spinner v-show="loading" small />
									<span v-show="loading">
										更新中...
									</span>
									<span v-show="!loading">
										プロフィールを更新
									</span>
								</b-button>
							</div>
						</b-form-group>
					</b-form-group>
				</b-card>
			</b-collapse>
		</div>
	</div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import sanitizeHTML from "sanitize-html";
import {
	BIcon,
	BIconX,
	BIconQuestionCircle,
	BIconChevronDown,
	BIconChevronUp,
} from "bootstrap-vue";

export default {
	components: {
		BIcon,
		BIconX,
		BIconQuestionCircle,
		BIconChevronDown,
		BIconChevronUp,
	},
	data() {
		return {
			loading: false,
			file: null,
			//file: "",//左のように空で初期化すると、エラーが出るInvalid prop: type check failed for prop "value". Expected File, Array, got String with value ""
			uploadedImage: "",
			nickName: "",
			selfIntroduction: "",
			editFlag: false,
			documentId: "",
			isProfileModalDisplay: false,
			isExperienceModalDisplay: false,
		};
	},
	computed: {
		getIsProfileRegistration() {
			return this.$store.getters["sessionStorageParameter/getLoginUserData"]
				.is_profile_registration;
		},
		getAndSetNickName: {
			get() {
				//プロフィール未登録の場合
				//getIsProfileRegistrationはtrueだが、DBからのプロフィール情報のダウンロードに失敗することもある
				//この場合、DBにプロフィールは登録されている
				//Object.keys:指定されたオブジェクトが持つプロパティの名前の配列を返す
				//この配列のlengthが０のとき、プロフィールデータが存在しないと判断する
				//console.log("Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] )");
				//console.log(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ));

				if (
					Object.keys(this.$store.getters["sessionStorageParameter/getLoginUserProfile"])
						.length === 0
				) {
					console.log("ログインユーザのプロフィール情報はありません");
					return "";
				}

				const nickName = this.$store.getters["sessionStorageParameter/getLoginUserProfile"]
					.nick_name;

				//nickName = sanitizeHTML(nickName);
				console.log("nickName");
				console.log(nickName);
				//eslintのside effectsエラーにかかるので以下を削除
				//this.nickName = nickName;
				this.setNickName(nickName);
				return nickName;
			},
			set(newValue) {
				console.log("enter getAndSetNickName");
				console.log(newValue);
				this.nickName = sanitizeHTML(newValue);
			},
		},
		getAndSetSelfIntroduction: {
			get() {
				//共通の処理はミックスインに切り出す
				//プロフィール未登録の場合
				if (
					Object.keys(this.$store.getters["sessionStorageParameter/getLoginUserProfile"])
						.length === 0
				) {
					console.log("ログインユーザのプロフィール情報はありません");
					return "";
				}
				//const selfIntroduction = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction );

				const selfIntroduction = this.$store.getters[
					"sessionStorageParameter/getLoginUserProfile"
				].self_introduction;

				//selfIntroduction = sanitizeHTML(selfIntroduction);
				console.log("selfIntroduction");
				console.log(selfIntroduction);
				//eslintのside effectsエラーにかかるので以下を削除
				//this.selfIntroduction = selfIntroduction;
				this.setSelfIntroduction(selfIntroduction);
				return selfIntroduction;
			},
			set(newValue) {
				console.log("enter getAndSetSelfIntroduction");
				console.log(newValue);
				this.selfIntroduction = sanitizeHTML(newValue);
			},
		},
	},
	methods: {
		setNickName(nickName) {
			this.nickName = nickName;
		},
		setSelfIntroduction(selfIntroduction) {
			this.selfIntroduction = selfIntroduction;
		},
		changeIsProfileModalDisplay() {
			if (this.isProfileModalDisplay) {
				this.isProfileModalDisplay = false;
			} else {
				this.isProfileModalDisplay = true;
			}
		},
		editProfile() {
			this.editFlag = true;
		},
		async updateProfile() {
			console.log("enter updateProfile");
			this.loading = true;
			let data = {};
			data.profile = {};
			//console.log("this.nickName.length:");
			//console.log(this.nickName.length);
			console.log("this.nickName");
			console.log(this.nickName);

			console.log("this.selfIntroduction:");
			console.log(this.selfIntroduction);

			this.nickName = sanitizeHTML(this.nickName);
			this.selfIntroduction = sanitizeHTML(this.selfIntroduction);

			//ニックネームと自己紹介文は1文字以上が入力されていること
			//v-modelのtrimを使っているので空白の入力は防げるはず
			if (this.nickName === "" || this.selfIntroduction === "") {
				alert("ニックネームと自己紹介文が空のままでは更新できません");
				this.loading = false;
				return;
			}
			//すべての項目に変更がない場合は、DBの更新は行わないようにしたい
			//更新ボタンもdisabledにしておく
			//プロフィール画像については、URLの情報しかないので、アップロードされたものがsessionのものと同一か判定できない

			console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
			console.log(this.$store.getters["sessionStorageParameter/getLoginUserProfile"]);

			//uploadedImageが空の場合は、session画像のURLをプロフィール画像のURLとする
			//空の場合はプロフィール画像を変更しないと判断する
			//ニックネームと自己紹介文のみを更新する
			if (this.uploadedImage === "") {
				console.log("this.uploadedImageが空です");
				this.uploadedImage = this.$store.getters[
					"sessionStorageParameter/getLoginUserProfile"
				].image_url;
				console.log(this.uploadedImage);
				//alert("プロフィール画像が選択されていません");
				//return;
			}

			if (
				this.nickName !==
				this.$store.getters["sessionStorageParameter/getLoginUserProfile"].nick_name
			) {
				data.profile.nick_name = this.nickName;
			}

			if (
				this.selfIntroduction !==
				this.$store.getters["sessionStorageParameter/getLoginUserProfile"].self_introduction
			) {
				data.profile.self_introduction = this.selfIntroduction;
			}

			if (this.file !== null) {
				data.file = this.file;
			}

			data.profile.user_id = _cloneDeep(
				this.$store.getters["sessionStorageParameter/getLoginUserProfile"].user_id
			);

			data.documentId = _cloneDeep(
				this.$store.getters["sessionStorageParameter/getLoginUserProfile"].documentId
			);

			console.log("data in profile-registration");
			console.log(data);

			await this.$store.dispatch("updateProfileAction", data);

			this.$store.dispatch("allProfilesInitAction");

			//DBから最新の全プロフィールを取得
			//全プロフィールはmemberページに反映されるので、更新後に最新のものをダウンロードする必要がある
			await this.$store.dispatch("allProfilesGetAction");

			//console.log("this.$store.getters['getAllProfiles'] after await this.$store.dispatch('allProfilesGetAction')");
			//console.log(this.$store.getters["getAllProfiles"]);

			//その中からログインユーザーの最新プロフィールをsessionに保存
			this.$store.dispatch("loginUserProfileGetAction");

			console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
			console.log(this.$store.getters["sessionStorageParameter/getLoginUserProfile"]);

			this.loading = false;
			this.editFlag = false;

			alert("プロフィールの更新完了");
		},

		async registerProfile() {
			this.loading = true;

			this.nickName = sanitizeHTML(this.nickName);
			this.selfIntroduction = sanitizeHTML(this.selfIntroduction);

			//ニックネームと自己紹介文は1文字以上が入力されていること
			if (this.nickName === "" || this.selfIntroduction === "" || this.file === null) {
				alert("すべての項目が入力必須です");
				this.loading = false;
				return;
			}

			let data = {};
			data.profile = {};
			data.profile.nick_name = this.nickName;
			data.profile.self_introduction = this.selfIntroduction;
			data.file = this.file;

			//プロフィール未登録なので以下では取得できない
			//usersテーブルのログインユーザのデータをsessionに保存する際に、ドキュメントIDも保存しておく

			//data.userId = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].user_id );

			//プロフィールはまだ存在しないので、getLoginUserDataを使う
			//updateとは式が異なるので注意
			data.profile.user_id = _cloneDeep(
				this.$store.getters["sessionStorageParameter/getLoginUserData"].uid
			);

			//getUsersCollectionActionを参照
			data.documentId = _cloneDeep(
				this.$store.getters["sessionStorageParameter/getLoginUserData"].documentId
			);
			console.log("data");
			console.log(data);

			await this.$store.dispatch("registerProfileAction", data);

			this.$store.dispatch("allProfilesInitAction");

			//DBから最新の全プロフィールを取得
			//全プロフィールはmemberページに反映されるので、更新後に最新のものをダウンロードする必要がある
			await this.$store.dispatch("allProfilesGetAction");

			//console.log("this.$store.getters['getAllProfiles'] after await this.$store.dispatch('allProfilesGetAction')");
			//console.log(this.$store.getters["getAllProfiles"]);

			//その中からログインユーザーの最新プロフィールをsessionに保存
			this.$store.dispatch("loginUserProfileGetAction");

			console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
			console.log(this.$store.getters["sessionStorageParameter/getLoginUserProfile"]);

			this.loading = false;

			alert("プロフィールの登録完了");
		},
		//onFileChangeの後に呼ばれる
		onFileInput() {
			console.log("this.file onFileInput");
			console.log(this.file);

			if (this.file) {
				//this.storedFile = this.file;
				console.log("in if");
				//console.log("this.storedFile");
				//console.log(this.storedFile);
				this.createImage(this.file);
			} else {
				this.uploadedImage = "";
			}
		},
		createImage(file) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.uploadedImage = e.target.result;
				//console.log("this.uploadedImage in createImage");
				//console.log(this.uploadedImage);
			};
			reader.readAsDataURL(file);
		},
	},
};
</script>

<style scoped>
#profile-open-close-button {
	width: 400px;
}

#profile-registration-button,
#profile-update-button {
	display: block;
	margin-left: auto;
}

#text-input-required {
	color: red;
}
</style>
