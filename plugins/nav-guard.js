/* eslint-disable */
import firebase from 'firebase'

export default ({ app }) => {

    //各ページへの移動前の処理を定義
	app.router.beforeEach((to, from, next) => {  
       
        const requiresAuth = to.matched.some(function(record){
            //recordのmetaプロパティにrequiresAuthが正しくセットされたかを確認
            console.log("record"); 
            console.log(record); 
            return record.meta.requiresAuth;
        });       

        //const requiresAuth = to.matched.some(record => record.meta.requiresAuth);       
        
        console.log("requiresAuth");
        console.log(requiresAuth);
	  
    	//認証が必要なページにアクセスしてきた場合
        if (requiresAuth) {

    		firebase.auth().onAuthStateChanged(function (user) {
                //登録ユーザの場合
    			if (user) {
                    console.log("user");
                    console.log(user);
                    //ストアにユーザ名を保存    
        			this.$store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);

        			next()//移動を許可
    			} else {
        			next({                        
                        //パスをトップページに振り替える
        				path: '/',
        				query: { redirect: to.fullPath }
        			})
    			}
    		})

 		} else {
            console.log("enter else section");
    		next() //移動を許可
  		}
	})

}

