(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{366:function(t,e,n){"use strict";var r=n(54),o=n.n(r),l=(n(113),{data:function(){return{userFlag:this.$store.getters["persistedParameter/getIsLoginUser"]}},methods:{signOut:function(){var t=this;this.$store.commit("nameInit"),this.$store.commit("persistedParameter/userIdPersistedInit"),this.$store.dispatch("persistedParameter/changeIsLoginUserAction",!1),this.$store.commit("persistedParameter/changeIsEmpty",!0),o.a.auth().signOut().then((function(){t.$router.go({path:t.$router.currentRoute.path,force:!0}),t.$router.push("/")}))}},computed:{checkUser:function(){return this.userFlag}}}),c=n(36),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-menu",{attrs:{mode:"horizontal",router:!0}},[n("el-menu-item",{attrs:{index:"1",route:{path:"/"}}},[t._v("\n    トップ\n  ")]),t._v(" "),n("el-menu-item",{attrs:{index:"2",route:{path:"/success-graph"}}},[t._v("\n    成功者グラフ\n  ")]),t._v(" "),t.checkUser?n("el-menu-item",{attrs:{index:"3",route:{path:"/member"}}},[t._v("\n    ユーザ一覧\n  ")]):t._e(),t._v(" "),t.checkUser?n("el-menu-item",{attrs:{index:"4",route:{path:"/dashboard"}}},[t._v("\n    ダッシュボード\n  ")]):t._e(),t._v(" "),t.checkUser?t._e():n("el-menu-item",{attrs:{index:"5",route:{path:"/signin-signup"}}},[t._v("\n    ログイン\n  ")]),t._v(" "),t.checkUser?n("el-menu-item",{attrs:{index:"6",route:{path:"/"}},on:{click:t.signOut}},[t._v("\n    ログアウト\n  ")]):t._e()],1)}),[],!1,null,null,null);e.a=component.exports},382:function(t,e,n){var content=n(541);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(56).default)("ec445c22",content,!0,{sourceMap:!1})},540:function(t,e,n){"use strict";var r=n(382);n.n(r).a},541:function(t,e,n){(e=n(55)(!1)).push([t.i,".article-list-container{margin:20px}",""]),t.exports=e},543:function(t,e,n){var map={"./af":385,"./af.js":385,"./ar":386,"./ar-dz":387,"./ar-dz.js":387,"./ar-kw":388,"./ar-kw.js":388,"./ar-ly":389,"./ar-ly.js":389,"./ar-ma":390,"./ar-ma.js":390,"./ar-sa":391,"./ar-sa.js":391,"./ar-tn":392,"./ar-tn.js":392,"./ar.js":386,"./az":393,"./az.js":393,"./be":394,"./be.js":394,"./bg":395,"./bg.js":395,"./bm":396,"./bm.js":396,"./bn":397,"./bn.js":397,"./bo":398,"./bo.js":398,"./br":399,"./br.js":399,"./bs":400,"./bs.js":400,"./ca":401,"./ca.js":401,"./cs":402,"./cs.js":402,"./cv":403,"./cv.js":403,"./cy":404,"./cy.js":404,"./da":405,"./da.js":405,"./de":406,"./de-at":407,"./de-at.js":407,"./de-ch":408,"./de-ch.js":408,"./de.js":406,"./dv":409,"./dv.js":409,"./el":410,"./el.js":410,"./en-SG":411,"./en-SG.js":411,"./en-au":412,"./en-au.js":412,"./en-ca":413,"./en-ca.js":413,"./en-gb":414,"./en-gb.js":414,"./en-ie":415,"./en-ie.js":415,"./en-il":416,"./en-il.js":416,"./en-nz":417,"./en-nz.js":417,"./eo":418,"./eo.js":418,"./es":419,"./es-do":420,"./es-do.js":420,"./es-us":421,"./es-us.js":421,"./es.js":419,"./et":422,"./et.js":422,"./eu":423,"./eu.js":423,"./fa":424,"./fa.js":424,"./fi":425,"./fi.js":425,"./fo":426,"./fo.js":426,"./fr":427,"./fr-ca":428,"./fr-ca.js":428,"./fr-ch":429,"./fr-ch.js":429,"./fr.js":427,"./fy":430,"./fy.js":430,"./ga":431,"./ga.js":431,"./gd":432,"./gd.js":432,"./gl":433,"./gl.js":433,"./gom-latn":434,"./gom-latn.js":434,"./gu":435,"./gu.js":435,"./he":436,"./he.js":436,"./hi":437,"./hi.js":437,"./hr":438,"./hr.js":438,"./hu":439,"./hu.js":439,"./hy-am":440,"./hy-am.js":440,"./id":441,"./id.js":441,"./is":442,"./is.js":442,"./it":443,"./it-ch":444,"./it-ch.js":444,"./it.js":443,"./ja":445,"./ja.js":445,"./jv":446,"./jv.js":446,"./ka":447,"./ka.js":447,"./kk":448,"./kk.js":448,"./km":449,"./km.js":449,"./kn":450,"./kn.js":450,"./ko":451,"./ko.js":451,"./ku":452,"./ku.js":452,"./ky":453,"./ky.js":453,"./lb":454,"./lb.js":454,"./lo":455,"./lo.js":455,"./lt":456,"./lt.js":456,"./lv":457,"./lv.js":457,"./me":458,"./me.js":458,"./mi":459,"./mi.js":459,"./mk":460,"./mk.js":460,"./ml":461,"./ml.js":461,"./mn":462,"./mn.js":462,"./mr":463,"./mr.js":463,"./ms":464,"./ms-my":465,"./ms-my.js":465,"./ms.js":464,"./mt":466,"./mt.js":466,"./my":467,"./my.js":467,"./nb":468,"./nb.js":468,"./ne":469,"./ne.js":469,"./nl":470,"./nl-be":471,"./nl-be.js":471,"./nl.js":470,"./nn":472,"./nn.js":472,"./pa-in":473,"./pa-in.js":473,"./pl":474,"./pl.js":474,"./pt":475,"./pt-br":476,"./pt-br.js":476,"./pt.js":475,"./ro":477,"./ro.js":477,"./ru":478,"./ru.js":478,"./sd":479,"./sd.js":479,"./se":480,"./se.js":480,"./si":481,"./si.js":481,"./sk":482,"./sk.js":482,"./sl":483,"./sl.js":483,"./sq":484,"./sq.js":484,"./sr":485,"./sr-cyrl":486,"./sr-cyrl.js":486,"./sr.js":485,"./ss":487,"./ss.js":487,"./sv":488,"./sv.js":488,"./sw":489,"./sw.js":489,"./ta":490,"./ta.js":490,"./te":491,"./te.js":491,"./tet":492,"./tet.js":492,"./tg":493,"./tg.js":493,"./th":494,"./th.js":494,"./tl-ph":495,"./tl-ph.js":495,"./tlh":496,"./tlh.js":496,"./tr":497,"./tr.js":497,"./tzl":498,"./tzl.js":498,"./tzm":499,"./tzm-latn":500,"./tzm-latn.js":500,"./tzm.js":499,"./ug-cn":501,"./ug-cn.js":501,"./uk":502,"./uk.js":502,"./ur":503,"./ur.js":503,"./uz":504,"./uz-latn":505,"./uz-latn.js":505,"./uz.js":504,"./vi":506,"./vi.js":506,"./x-pseudo":507,"./x-pseudo.js":507,"./yo":508,"./yo.js":508,"./zh-cn":509,"./zh-cn.js":509,"./zh-hk":510,"./zh-hk.js":510,"./zh-tw":511,"./zh-tw.js":511};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=543},548:function(t,e,n){"use strict";n.r(e);n(54);var r=n(113),o=(n(11),n(367)),l=n.n(o),c={data:function(){return{totalRows:1,filter:null,filterOn:[],tableData:[],fields:["index",{key:"titleLink",label:"記事タイトル"},{key:"age",label:"年齢"},{key:"educational_background",label:"学歴"},{key:"study_term",label:"勉強期間（ヶ月）",sortable:!0},{key:"school_presence",label:"スクール有無"},{key:"company",label:"転職先"}]}},mounted:function(){},created:function(){var t=this;r.a.collection("experience_articles").get().then((function(e){e.forEach((function(e){l.a.cloneDeep(e.data());var n=l.a.cloneDeep(e.data());t.tableData.push(n)})),t.totalRows=t.tableData.length,console.log("this.totalRows"),console.log(t.totalRows)})).catch((function(t){alert(t.message)}))},methods:{onFiltered:function(t){this.totalRows=t.length},mySortCompare:function(a,b,t,e){return"study_term"===t&&(console.log(e),e?Number(a[t])-Number(b[t])>0?1:Number(a[t])-Number(b[t])<0?-1:0:""===a[t]&&""===b[t]?0:""===a[t]?1:""===b[t]?-1:Number(a[t])-Number(b[t])>0?1:Number(a[t])-Number(b[t])<0?-1:0)}}},h=(n(540),n(36)),d=Object(h.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-list-container"},[n("h3",[t._v("上のグラフのデータ一覧")]),t._v(" "),t._m(0),t._v(" "),n("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"filterInput"}},[n("b-input-group",{attrs:{size:"sm"}},[n("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),n("b-input-group-append",[n("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1),t._v(" "),n("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter On","label-cols-sm":"3","label-align-sm":"right","label-size":"sm",description:"Leave all unchecked to filter on all data"}},[n("b-form-checkbox-group",{staticClass:"mt-1",model:{value:t.filterOn,callback:function(e){t.filterOn=e},expression:"filterOn"}},[n("b-form-checkbox",{attrs:{value:"age"}},[t._v("年齢")]),t._v(" "),n("b-form-checkbox",{attrs:{value:"educational_background"}},[t._v("学歴")]),t._v(" "),n("b-form-checkbox",{attrs:{value:"school_presence"}},[t._v("スクール有無")]),t._v(" "),n("b-form-checkbox",{attrs:{value:"company"}},[t._v("転職先")])],1)],1),t._v(" "),n("b-table",{attrs:{striped:"",hover:"",items:t.tableData,fields:t.fields,"sticky-header":"600px","sort-compare":t.mySortCompare,filter:t.filter,filterIncludedFields:t.filterOn},on:{filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(index)",fn:function(data){return[t._v("\n      "+t._s(data.index+1)+"\n    ")]}},{key:"cell(titleLink)",fn:function(data){return[n("a",{attrs:{href:data.item.url}},[t._v(t._s(data.item.title))])]}}])})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("下表では、年齢・学歴、スクール有無、転職先の項目でフィルターできます。\n    "),e("br"),this._v("気になる項目でフィルターをかけて表のデータを比較してみると新たな発見があるかもしれません。\n    "),e("br"),this._v("また、勉強期間では昇順・降順で並び替えができます。\n    "),e("br"),this._v("※空白はデータなしです。\n  ")])}],!1,null,null,null).exports,m=n(546),j=m.b.reactiveProp,f={extends:m.a,mixins:[j],props:["chartData"],watch:{chartData:function(){this.updateGraph()}},data:function(){return{options:{responsive:!0,title:{display:!0,text:this.$store.state.graphType},legend:{position:"right"}}}},methods:{updateGraph:function(){this.options.title.text=this.$store.state.graphType,this.renderChart(this.chartData,this.options)}},mounted:function(){this.renderChart(this.chartData,this.options)}},v={data:function(){return{optionsOfgraphSelection:[{value:"age",text:"年齢"},{value:"educational_background",text:"学歴"},{value:"study_term",text:"勉強期間"},{value:"school_presence",text:"スクール有無"},{value:"company",text:"転職先"}],graphSelection:"age"}},methods:{},computed:{graphChange:function(){return this.graphSelection},graphChangeOfBootstrap:function(){return this.graphSelectionOfBootstrap}},watch:{graphChange:function(){console.log("graphChange called in watch"),this.$store.dispatch("graphTypeChangeAction",this.graphSelection),this.$store.dispatch("itemCountAction",this.graphSelection),this.$store.dispatch("createLabelQuantityColorAction"),this.$emit("graphChangeNotice")}}},_={components:{"article-list":d,"doughnut-graph":Object(h.a)(f,void 0,void 0,!1,null,null,null).exports,"doughnut-graph-select":Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",[t._v("グラフタイプを選択してください。")]),t._v(" "),n("b-form-select",{attrs:{options:t.optionsOfgraphSelection},model:{value:t.graphSelection,callback:function(e){t.graphSelection=e},expression:"graphSelection"}}),t._v(" "),n("span",[t._v(t._s(t.graphChange))])],1)}),[],!1,null,null,null).exports,"global-navi":n(366).a},data:function(){return{datacollection:null,loading:!0}},mounted:function(){var t=this;this.loading=!1,r.a.collection("experience_articles").get().then((function(e){e.forEach((function(e){var data=e.data();t.$store.dispatch("allArticlesForGraphGetAction",data)})),t.$store.dispatch("itemCountAction",t.$store.state.graphType),t.$store.dispatch("createLabelQuantityColorAction"),t.datacollection={labels:t.$store.state.graphLabels,datasets:[{data:t.$store.state.graphQuantity,backgroundColor:t.$store.state.graphColor}]}})).catch((function(t){alert(t.message)}))},methods:{redrawGraph:function(){this.datacollection={labels:this.$store.state.graphLabels,datasets:[{data:this.$store.state.graphQuantity,backgroundColor:this.$store.state.graphColor}]}}}},k=Object(h.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("global-navi"),t._v(" "),n("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],attrs:{small:""}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}]},[n("h2",[t._v("未経験から転職に成功した人のデータ")]),t._v(" "),t._m(0),t._v(" "),n("doughnut-graph",{staticClass:"small",attrs:{"chart-data":t.datacollection}}),t._v(" "),n("doughnut-graph-select",{on:{graphChangeNotice:t.redrawGraph}}),t._v(" "),n("article-list")],1)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("転職成功者のデータ（年齢・学歴・勉強期間・スクール有無・転職先）をまとめたので、\n      "),e("br"),this._v("あなたが気になる項目をチェックしてみてください。\n    ")])}],!1,null,null,null);e.default=k.exports}}]);