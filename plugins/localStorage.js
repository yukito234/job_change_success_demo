import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
	createPersistedState({
		paths: ["persistedParameter"], //localStorageに保存したいstoreを入れる
	})(store);
};
