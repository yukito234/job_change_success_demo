import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['sessionStorageParameter'],  // sessionStorageに保存したいstoreを入れる
    storage: window.sessionStorage,
  })(store);
  
};