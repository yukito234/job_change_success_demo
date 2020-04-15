(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{366:function(e,t,r){"use strict";var n=r(54),l=r.n(n),o=(r(113),{data:function(){return{userFlag:this.$store.getters["persistedParameter/getIsLoginUser"]}},methods:{signOut:function(){var e=this;this.$store.commit("nameInit"),this.$store.commit("persistedParameter/userIdPersistedInit"),this.$store.dispatch("persistedParameter/changeIsLoginUserAction",!1),this.$store.commit("persistedParameter/changeIsEmpty",!0),l.a.auth().signOut().then((function(){e.$router.go({path:e.$router.currentRoute.path,force:!0}),e.$router.push("/")}))}},computed:{checkUser:function(){return this.userFlag}}}),c=r(36),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-menu",{attrs:{mode:"horizontal",router:!0}},[r("el-menu-item",{attrs:{index:"1",route:{path:"/"}}},[e._v("\n    トップ\n  ")]),e._v(" "),r("el-menu-item",{attrs:{index:"2",route:{path:"/success-graph"}}},[e._v("\n    成功者グラフ\n  ")]),e._v(" "),e.checkUser?r("el-menu-item",{attrs:{index:"3",route:{path:"/member"}}},[e._v("\n    ユーザ一覧\n  ")]):e._e(),e._v(" "),e.checkUser?r("el-menu-item",{attrs:{index:"4",route:{path:"/dashboard"}}},[e._v("\n    ダッシュボード\n  ")]):e._e(),e._v(" "),e.checkUser?e._e():r("el-menu-item",{attrs:{index:"5",route:{path:"/signin-signup"}}},[e._v("\n    ログイン\n  ")]),e._v(" "),e.checkUser?r("el-menu-item",{attrs:{index:"6",route:{path:"/"}},on:{click:e.signOut}},[e._v("\n    ログアウト\n  ")]):e._e()],1)}),[],!1,null,null,null);t.a=component.exports},380:function(e,t,r){var content=r(537);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(56).default)("28c8b24f",content,!0,{sourceMap:!1})},381:function(e,t,r){var content=r(539);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(56).default)("1a7d02e2",content,!0,{sourceMap:!1})},536:function(e,t,r){"use strict";var n=r(380);r.n(n).a},537:function(e,t,r){(t=r(55)(!1)).push([e.i,".signup-container{margin:20px}",""]),e.exports=t},538:function(e,t,r){"use strict";var n=r(381);r.n(n).a},539:function(e,t,r){(t=r(55)(!1)).push([e.i,".signin-container{margin:20px}",""]),e.exports=t},549:function(e,t,r){"use strict";r.r(t);var n=r(54),l=r.n(n),o=r(113),c={name:"Signup",data:function(){return{userName:"",email:"",password:"",show:!1}},methods:{signUp:function(){var e=this;this.show=!0,l.a.auth().createUserWithEmailAndPassword(this.email,this.password).then((function(){l.a.auth().currentUser.updateProfile({displayName:e.userName}),o.a.collection("users").add({name:e.userName,like_article_count:0}).then((function(){e.show=!1,alert("登録完了"),e.password=""})).catch((function(e){alert(e.message)}))})).catch((function(e){alert(e.message)}))}}},m=(r(536),r(36)),d=Object(m.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"signup-container"},[r("b-overlay",{attrs:{show:e.show,rounded:"sm"}},[r("b-card",{attrs:{"bg-variant":"light"}},[r("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-lg":"3",label:"会員登録（無料）はこちら","label-size":"lg","label-class":"font-weight-bold pt-0"}},[r("b-form-group",{attrs:{"label-cols-sm":"3",label:"ユーザ名:","label-align-sm":"right","label-for":"nested-street"}},[r("b-form-input",{attrs:{id:"nested-street"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),e._v(" "),r("b-form-group",{attrs:{"label-cols-sm":"3",label:"メールアドレス:","label-align-sm":"right","label-for":"nested-street"}},[r("b-form-input",{attrs:{id:"nested-street"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v(" "),r("b-form-group",{attrs:{"label-cols-sm":"3",label:"パスワード:","label-align-sm":"right","label-for":"nested-street"}},[r("b-form-input",{attrs:{id:"nested-street"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),r("b-form-group",{attrs:{"label-cols-sm":"3",label:"","label-align-sm":"right","label-for":"nested-country"}},[r("b-button",{on:{click:e.signUp}},[e._v("新規登録")])],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports,h={name:"Signin",data:function(){return{email:"",password:"",show:!1}},methods:{signIn:function(){var e=this;this.show=!0,l.a.auth().signInWithEmailAndPassword(this.email,this.password).then((function(){e.$store.dispatch("nameSetAction",l.a.auth().currentUser.displayName),e.$store.dispatch("persistedParameter/namePersistedSetAction",l.a.auth().currentUser.displayName),e.$store.dispatch("persistedParameter/changeUserIdPersistedAction",l.a.auth().currentUser.uid),e.$store.dispatch("persistedParameter/changeIsLoginUserAction",!0),e.show=!1,e.$router.push("/member")})).catch((function(e){alert(e.message)}))}}},f=(r(538),{components:{Signup:d,Signin:Object(m.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"signin-container"},[r("b-overlay",{attrs:{show:e.show,rounded:"sm"}},[r("b-card",{attrs:{"bg-variant":"light"}},[r("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-lg":"3",label:"ログインはこちら","label-size":"lg","label-class":"font-weight-bold pt-0"}},[r("b-form-group",{attrs:{"label-cols-sm":"3",label:"メールアドレス:","label-align-sm":"right","label-for":"nested-street"}},[r("b-form-input",{attrs:{id:"nested-street"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v(" "),r("b-form-group",{attrs:{"label-cols-sm":"3",label:"パスワード:","label-align-sm":"right","label-for":"nested-street"}},[r("b-form-input",{attrs:{id:"nested-street"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),r("b-form-group",{attrs:{"label-cols-sm":"3",label:"","label-align-sm":"right","label-for":"nested-country"}},[r("b-button",{on:{click:e.signIn}},[e._v("ログイン")])],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports,"global-navi":r(366).a}}),v=Object(m.a)(f,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("global-navi"),this._v(" "),t("signin"),this._v(" "),t("signup")],1)}),[],!1,null,null,null);t.default=v.exports}}]);