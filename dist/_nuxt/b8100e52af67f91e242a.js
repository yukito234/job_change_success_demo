(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{511:function(t,e,n){var content=n(666);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(49).default)("7fc4f853",content,!0,{sourceMap:!1})},512:function(t,e,n){var content=n(668);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(49).default)("ab538a20",content,!0,{sourceMap:!1})},513:function(t,e,n){var content=n(670);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(49).default)("7a19904e",content,!0,{sourceMap:!1})},665:function(t,e,n){"use strict";var r=n(511);n.n(r).a},666:function(t,e,n){(e=n(48)(!1)).push([t.i,".profileimage[data-v-2cdbe4a2]{width:250px}",""]),t.exports=e},667:function(t,e,n){"use strict";var r=n(512);n.n(r).a},668:function(t,e,n){(e=n(48)(!1)).push([t.i,".submit-button[data-v-897257f8]{display:block;margin-left:auto}",""]),t.exports=e},669:function(t,e,n){"use strict";var r=n(513);n.n(r).a},670:function(t,e,n){(e=n(48)(!1)).push([t.i,".individual-section[data-v-08df935c]{margin-bottom:20px}",""]),t.exports=e},688:function(t,e,n){"use strict";n.r(e);n(65);var r=n(19),o={computed:{getProfile:function(){return this.$store.getters["sessionStorageParameter/getClickedProfileData"]}}},l=(n(665),n(39)),c=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-container"},[n("div",{staticClass:"h2title-area"},[n("h2",{staticClass:"h2title"},[t._v("\n\t\t\t"+t._s(t.getProfile.nick_name)+"\n\t\t\t"),n("span",[t._v("\n\t\t\t\tさんのプロフィール\n\t\t\t")])])]),t._v(" "),n("b-card",{attrs:{"no-body":""}},[n("b-row",[n("b-col",{attrs:{md:"6"}},[n("b-img",{staticClass:"profileimage",attrs:{src:t.getProfile.image_url,alt:""}})],1),t._v(" "),n("b-col",{attrs:{md:"6"}},[n("b-card-body",{attrs:{title:t.getProfile.nick_name}},[n("b-card-text",[t._v("\n\t\t\t\t\t\t"+t._s(t.getProfile.self_introduction)+"\n\t\t\t\t\t")])],1)],1)],1)],1)],1)}),[],!1,null,"2cdbe4a2",null).exports,m=n(46),d=n.n(m),f=n(81),h=n(0),v={components:{BIcon:f.a,BIconX:h.ik,BIconQuestionCircle:h.fi,BIconChevronDown:h.dd,BIconChevronUp:h.hd},data:function(){return{likeArticles:[],fieldsOfLikeArticle:[{key:"titleLink",label:"記事タイトル"},{key:"detailButton",label:"コメント"}]}},computed:{getIsTableDisplay:function(){return this.likeArticles.length>=1}},created:function(){this.getLikeArticles()},methods:{getLikeArticles:function(){this.likeArticles.splice(-this.likeArticles.length);for(var t=d()(this.$store.getters.getAllLikeArticles),e=this.$store.getters["sessionStorageParameter/getClickedProfileData"],i=0;i<t.length;i++)void 0!==t[i].user_id&&t[i].user_id===e.user_id&&this.likeArticles.push(t[i]);return this.likeArticles}}},_=Object(l.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-container"},[n("div",{staticClass:"h2title-area"},[n("h2",{staticClass:"h2title"},[t._v("\n\t\t\tお気に入り記事\n\t\t")]),t._v(" "),n("b-icon",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-like-article-title",modifiers:{"modal-like-article-title":!0}}],attrs:{icon:"question-circle"}}),t._v(" "),n("b-modal",{attrs:{id:"modal-like-article-title","ok-only":""}},[n("p",{staticClass:"my-4"},[t._v("\n\t\t\t\tこちらの会員さんのお気に入りの記事をチェックできます。\n\t\t\t\t"),n("br"),t._v("お気に入り記事はダッシュボードで登録できますよ！\n\t\t\t")])])],1),t._v(" "),t.getIsTableDisplay?n("b-table",{attrs:{items:t.likeArticles,fields:t.fieldsOfLikeArticle,responsive:"sm"},scopedSlots:t._u([{key:"cell(titleLink)",fn:function(data){return[n("a",{attrs:{href:data.item.url}},[t._v("\n\t\t\t\t"+t._s(data.item.title)+"\n\t\t\t")])]}},{key:"cell(detailButton)",fn:function(e){return[n("b-button",{staticClass:"mr-2",attrs:{size:"sm",variant:"primary"},on:{click:e.toggleDetails}},[t._v("\n\t\t\t\t"+t._s(e.detailsShowing?"閉じる":"開く")+"\n\t\t\t\t"),e.detailsShowing?t._e():n("b-icon",{attrs:{icon:"chevron-down"}}),t._v(" "),e.detailsShowing?n("b-icon",{attrs:{icon:"chevron-up"}}):t._e()],1)]}},{key:"row-details",fn:function(e){return[n("b-card",[n("b-row",{staticClass:"mb-2"},[n("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[n("b",[t._v("\n\t\t\t\t\t\t\tおすすめする人:\n\t\t\t\t\t\t")])]),t._v(" "),n("b-col",[t._v("\n\t\t\t\t\t\t"+t._s(e.item.recommendation)+"\n\t\t\t\t\t")])],1),t._v(" "),n("b-row",{staticClass:"mb-2"},[n("b-col",{staticClass:"text-sm-right",attrs:{sm:"3"}},[n("b",[t._v("\n\t\t\t\t\t\t\tコメント:\n\t\t\t\t\t\t")])]),t._v(" "),n("b-col",[t._v("\n\t\t\t\t\t\t"+t._s(e.item.free_text_area)+"\n\t\t\t\t\t")])],1)],1)]}}],null,!1,1679323931)}):t._e()],1)}),[],!1,null,null,null).exports,C=n(501),k=n.n(C),A={data:function(){return{userComment:"",loading:!1}},computed:{getIsProfileRegistration:function(){return this.$store.getters["sessionStorageParameter/getLoginUserData"].is_profile_registration}},methods:{registerComment:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loading=!0,""!==k()(t.userComment)){e.next=5;break}return alert("コメントを入力してください！"),t.loading=!1,e.abrupt("return");case 5:return e.next=7,t.$store.dispatch("registerCommentAction",k()(t.userComment));case 7:return e.next=9,t.$store.dispatch("commentsGetAction");case 9:t.$emit("commentRegisteredNotice"),t.userComment="",t.loading=!1,alert("コメントの登録完了");case 13:case"end":return e.stop()}}),e)})))()}}},w=(n(667),Object(l.a)(A,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-container"},[t._m(0),t._v(" "),t.getIsProfileRegistration?n("b-card",{attrs:{"bg-variant":"light"}},[n("b-form-textarea",{attrs:{id:"textarea",placeholder:"コメントを入力してください！",rows:"3","max-rows":"6"},model:{value:t.userComment,callback:function(e){t.userComment="string"==typeof e?e.trim():e},expression:"userComment"}}),t._v(" "),n("div",[n("b-button",{staticClass:"submit-button button-with-gradation",attrs:{variant:"primary",disabled:t.loading},on:{click:t.registerComment}},[n("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{small:""}}),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]},[t._v("\n\t\t\t\t\t送信中...\n\t\t\t\t")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}]},[t._v("\n\t\t\t\t\tコメントを送信\n\t\t\t\t")])],1)],1)],1):n("b-card",{attrs:{"bg-variant":"light"}},[n("p",[t._v("\n\t\t\tコメントを残すには、ダッシュボードページでプロフィール登録をしてください！\n\t\t")]),t._v(" "),n("b-form-textarea",{attrs:{id:"textarea",placeholder:"コメントを入力できません。",rows:"3","max-rows":"6",disabled:"disabled"},model:{value:t.userComment,callback:function(e){t.userComment="string"==typeof e?e.trim():e},expression:"userComment"}}),t._v(" "),n("div",[n("b-button",{staticClass:"submit-button",attrs:{disabled:!t.getIsProfileRegistration},on:{click:t.registerComment}},[t._v("\n\t\t\t\tコメントを送信できません\n\t\t\t")])],1)],1)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"h2title-area"},[e("h2",{staticClass:"h2title"},[this._v("\n\t\t\tコメントを残す\n\t\t")])])}],!1,null,"897257f8",null).exports),x=(n(21),{props:{isCallGetComments:{type:Boolean}},data:function(){return{commentsForTable:[],fieldsOfCommentData:[{key:"content",label:""}],mainProps:{width:30,block:!1}}},computed:{getIsCommentMessage:function(){return!(this.commentsForTable.length>=1)}},watch:{isCallGetComments:function(){this.isCallGetComments&&this.getComments()}},created:function(){this.getComments()},methods:{getComments:function(){for(var t=[],e=[],n=d()(this.$store.getters.getAllComments),r=this.$store.getters["sessionStorageParameter/getClickedProfileData"],o=this.$store.getters["sessionStorageParameter/getLoginUserData"],i=0;i<n.length;i++)void 0===n[i].reply_comment_id&&r.user_id===n[i].user_id_to&&(n[i].isAddition=!0,n[i].nestCount=0,t.push(n[i]));t.sort((function(a,b){return a.createdAt-b.createdAt}));for(var l=0;l<t.length;l++)e.push(t[l]),c(l,1);function c(e,r){if(1!==r){for(var o=0;o<n.length;o++)if(n[o].reply_comment_id===n[e].commentId){if(m(o,r),r+1===4)break;c(o,r+1)}}else for(var l=0;l<n.length;l++)n[l].reply_comment_id===t[e].commentId&&(m(l,r),c(l,r+1))}function m(t,r){if(!n[t].isAddition){n[t].isAddition=!0,n[t].nestCount=r;var element=d()(n[t]);e.push(element)}}for(var f=0;f<e.length;f++){var h=String(Number(e[f].createdAt.getMonth())+1),v=e[f].createdAt.getFullYear()+"年"+h+"月"+e[f].createdAt.getDate()+"日"+e[f].createdAt.getHours()+"時"+e[f].createdAt.getMinutes()+"分";e[f].createdAt=v}for(var _=0;_<e.length;_++)e[_].replyButtonFlag=!1;if(o.uid===r.user_id)for(var C=0;C<e.length;C++)e[C].user_id_from!==o.uid&&(0===e[C].nestCount&&C===e.length-1?e[C].replyButtonFlag=!0:0===e[C].nestCount&&0===e[C+1].nestCount&&(e[C].replyButtonFlag=!0),2===e[C].nestCount&&C===e.length-1?e[C].replyButtonFlag=!0:2===e[C].nestCount&&0===e[C+1].nestCount&&(e[C].replyButtonFlag=!0));else for(var k=0;k<e.length;k++)1===e[k].nestCount&&e[k].user_id_to===o.uid&&k===e.length-1?e[k].replyButtonFlag=!0:1===e[k].nestCount&&e[k].user_id_to===o.uid&&0===e[k+1].nestCount&&(e[k].replyButtonFlag=!0);this.commentsForTable.splice(-this.commentsForTable.length);for(var A=0;A<e.length;A++)this.commentsForTable.push(e[A])},getMarginLeft:function(t){return 30*Number(t.nestCount)+"px"},setCommentData:function(element){this.$store.commit("sessionStorageParameter/commentDataSet",element)}}}),y={middleware:"authenticated",components:{"profile-infomation":c,"like-articles":_,"do-comment":w,"comment-list":Object(l.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-container"},[t._m(0),t._v(" "),t.getIsCommentMessage?t._e():n("b-table",{attrs:{items:t.commentsForTable,fields:t.fieldsOfCommentData,responsive:"sm"},scopedSlots:t._u([{key:"cell(content)",fn:function(data){return[n("div",{style:{marginLeft:t.getMarginLeft(data.item)}},[n("b-img",t._b({attrs:{src:data.item.image_url}},"b-img",t.mainProps,!1)),t._v(" "),n("span",[t._v("\n\t\t\t\t\t"+t._s(data.item.nick_name_from)+"\n\t\t\t\t")]),t._v(" "),n("p",[t._v("\n\t\t\t\t\t"+t._s(data.item.comment)+"\n\t\t\t\t")]),t._v(" "),n("span",[t._v("\n\t\t\t\t\t"+t._s(data.item.createdAt)+"\n\t\t\t\t")]),t._v(" "),data.item.replyButtonFlag?n("nuxt-link",{attrs:{to:{path:"/members/"+t.$store.getters["sessionStorageParameter/getClickedProfileData"].user_id+"/comments/"+data.item.commentId}},nativeOn:{click:function(e){return t.setCommentData(data.item)}}},[t._v("\n\t\t\t\t\t返信する\n\t\t\t\t")]):t._e()],1)]}}],null,!1,2787502970)}),t._v(" "),t.getIsCommentMessage?n("p",[t._v("\n\t\tまだコメントのやり取りはありません。\n\t")]):t._e()],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",{staticClass:"h2title"},[this._v("\n\t\t\tコメント一覧\n\t\t")])])}],!1,null,null,null).exports},fetch:function(t){var e=t.store;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.getters.getIsAllLikeArticles){t.next=4;break}return t.next=3,e.dispatch("likeArticlesGetAction");case 3:e.dispatch("changeIsAllLikeArticlesAction",!0);case 4:if(e.getters.getIsAllComments){t.next=9;break}return console.log("enter !store.getters['getIsAllComments']"),t.next=8,e.dispatch("commentsGetAction");case 8:e.dispatch("changeIsAllCommentsAction",!0);case 9:case"end":return t.stop()}}),t)})))()},data:function(){return{isCallGetComments:!1,show:!1,loading:!0,mainProps:{width:30,block:!1},fieldsOfCommentData:[{key:"content",label:""}],userInfo:"",userComment:"",replyContent:"",allLikeArticlesData:[],likeArticles:[],commentsForTable:[]}},computed:{obtainIsCallGetComments:function(){return this.isCallGetComments}},methods:{changeIsCallGetComments:function(){this.isCallGetComments=!0}},head:function(){return{title:"プロフィールページ",meta:[{hid:"description",name:"description",content:"あなたがプロフィール登録済みであれば、このページの会員にコメントを残せます。また、お気に入り記事やコメントのやり取りを閲覧できます。"}]}}},I=(n(669),Object(l.a)(y,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-container"},[e("div",{staticClass:"individual-section"},[e("profile-infomation")],1),this._v(" "),e("div",{staticClass:"individual-section"},[e("like-articles")],1),this._v(" "),e("div",{staticClass:"individual-section"},[e("do-comment",{on:{commentRegisteredNotice:this.changeIsCallGetComments}})],1),this._v(" "),e("div",{staticClass:"individual-section"},[e("comment-list",{attrs:{"is-call-get-comments":this.obtainIsCallGetComments}})],1)])}),[],!1,null,"08df935c",null));e.default=I.exports}}]);