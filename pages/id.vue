<template>
	<div>
    <global-navi></global-navi>
		<!--ここは永続化させる必要があるのか検討必要-->				
    <h2>{{ $store.getters['persistedParameter/getUserData'].nick_name }}さんのプロフィール</h2>		
    <img :src="$store.getters['persistedParameter/getUserData'].image_url" class="profileimage">
		<!--<p>自己紹介</p>		-->
    <p>{{$store.getters['persistedParameter/getUserData'].self_introduction}}</p>
    <br>
    <br>
    <h2>お気に入り記事</h2>
    <table border="1">
      <thead>
        <tr>
          <th>記事タイトル</th>          
          <th>こんな人におすすめ！</th>
          <th>まとめ</th>
        </tr>
      </thead>
      <tbody>           
        <tr v-for="item in allLikeArticlesData" v-bind:key="item.title"> 
          <td>                
            <a v-bind:href="item.url" >{{ item.title }}</a>                                  
        　</td>          
          <td>
            {{item.recommendation}}
          </td>
          <td>
            {{item.free_text_area}}
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>    
		<h2>コメントを残す</h2>		
		<textarea v-model="userComment"></textarea>
		<br>
		<button v-on:click="registerComment">コメントを送信する</button>
		<br>
		<h2>コメント一覧</h2>    
    <el-table 
      ref="filterTable"
      :data="tableData2"       
      style="width: 100%" 
      >
      <el-table-column                    
        >
        <div slot-scope="{row}" v-bind:style="{marginLeft:getMarginLeft(row)}">
          <span>{{row.nick_name_from}}</span>
          <!--
          <div>
            {{row.nick_name_from}} <span><router-link v-if="row.replyButtonFlag" v-on:click.native="setCommentData(row)" v-bind:to="{ path: `/reply` }">返信する</router-link></span>
          </div>
          -->
          <div>
            {{row.comment}}
          </div>
          <!--
          <div>
            {{row.createdAt}}
          </div>
          -->
          <span>{{row.createdAt}}</span>
          <router-link v-if="row.replyButtonFlag" v-on:click.native="setCommentData(row)" v-bind:to="{ path: `/reply` }">返信する</router-link>
        </div>
      </el-table-column>
    </el-table>
    <br>
    <br>
    <!--以下はデバッグ用として表示-->
    <el-table 
      ref="filterTable"
      :data="tableData2"       
      style="width: 100%" 
      >
      <!--
      <el-table-column
        label="コメント番号"
        prop="commentNumber"       
        
        >
      </el-table-column>
      -->
      <el-table-column
        label="コメントID"
        prop="commentId"       
        
        >
      </el-table-column>
      <el-table-column
        label="日時"
        prop="createdAt"       
        
        >
      </el-table-column>
      <el-table-column
        label="投稿者"
        prop="nick_name_from"       
        
        >
      </el-table-column>
      <el-table-column
        label="コメント"
        prop="comment"       
        
        >
      </el-table-column>
      <el-table-column
        label="返信"            
        
        >
        <div slot-scope="{row}">
          <router-link v-if="row.replyButtonFlag" v-on:click.native="setCommentData(row)" v-bind:to="{ path: `/reply` }">返信する</router-link>
          <!--{{row.replyButtonFlag}}-->
        </div>
      </el-table-column>
      <el-table-column
        label="reply_comment_id"
               
        
        >
        <div slot-scope="{row}">
          {{row.reply_comment_id}}
        </div>
      </el-table-column>
      <el-table-column
        label="ネスト数"
               
        
        >
        <div slot-scope="{row}">
          {{row.nestCount}}
        </div>
      </el-table-column>
      <!--
      <el-table-column
        label="返信するコメント番号"
               
        
        >
        <div slot-scope="{row}">
          {{getReplyCommentNumber(row)}}
        </div>
      </el-table-column>
    -->

    </el-table>
    <br>
    <br>   
	  
	</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import globalNavi from '~/components/global-navi.vue';
import _ from 'lodash';

export default {     
  middleware: 'authenticated', 
  components:{
    "global-navi": globalNavi,

  },
  data () {
    return {            
     userInfo:"",
     userComment:"",
     //allCommentData:[],
     replyContent:"",
     //tableData:[],
     tableData2:[],
     allLikeArticlesData:[],
      
    }
  },
  methods:{  	

    getMarginLeft(row){
      //コメントに返信する場合、元のコメントより右に少しずらす
      //このマージンをコメントのネスト数から算出する

      let value = Number(row.nestCount)*10;
      let marginLeft = value + "px";
      console.log("marginLeft");
      console.log(marginLeft);

      return marginLeft;

    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    /*
  	getReplyCommentNumber(element){
  		//elementでreply_comment_idが存在する場合は、テーブルデータ配列のcommentIdと照合を行い
  		//一致したcommentIdを持つ要素のcommentNumberを取得してくる
  		if(element.reply_comment_id){
        for(let i=0;i<this.$store.getters['persistedParameter/getAllCommentData'].length;i++){        
          if(this.$store.getters['persistedParameter/getAllCommentData'][i].commentId === element.reply_comment_id){
            return this.$store.getters['persistedParameter/getAllCommentData'][i].commentNumber;
          }
        }         		
  		}
  	},
    */
  	setCommentData(element){ 		      
      //返信ボタンが押されたら、そのコメントを取得し、保存永続化させる
      //reply.vueにて、この永続化されたコメントデータを呼び出す
      this.$store.commit('persistedParameter/commentDataSet',element);

  	},  	  	
  	registerComment(){
      //コメントをDBに登録      
      //今後の改善：reply_comment_idを付与してnullにしておく
  		db.collection("user_comment").add({
  			user_id_from:this.$store.state.persistedParameter.userIdPersisted,
  			user_id_to:this.userInfo.user_id,
  			comment:this.userComment,
  			createdAt: new Date(),
            
        })
        .then(() => {
            alert("コメントの登録完了");            
            //以下の処理はおそらく不要
            this.$store.dispatch('persistedParameter/allCommentDataInitAction');
            //リロードする
            this.$router.go({path: this.$router.currentRoute.path, force: true});
                        
        })          
        .catch(function(error) {
            alert(error.message)
        });  
  	}, 	
  },
  //   	
  created:function(){    
    //この処理はおそらく不要
    this.$store.dispatch('persistedParameter/allCommentDataInitAction');

    //お気に入り記事（like_articlesテーブルに保管されている）を取得する
    db.collection("like_articles").get()
        .then((querySnapshot)=>{        
          querySnapshot.forEach((doc)=>{
            const data = _.cloneDeep(doc.data());
            //このプロフィールページのユーザ（user_name）のお気に入り記事を取得する
            //各お気に入り記事には、user_nameプロパティが設定されていて、誰のお気に入りなのか判別できる
            //お気に入り記事のuser_nameが、現在表示しているページのuser_nameと一致する場合
            //this.$store.getters['persistedParameter/getUsersData']にuser_profileの全データが保管されている
                        
            if(data.user_name === this.$store.getters['persistedParameter/getUserData'].user_name){
              
              this.allLikeArticlesData.push(data);
            }                        

          });
          console.log("this.allLikeArticlesData");
          console.log(this.allLikeArticlesData);

          //authenticationから会員の全ユーザIDを取得する方法が分からない
          console.log("firebase.auth()");
          console.log(firebase.auth());

        })
        .catch(function(error) {
            alert(error.message)
        });

  },
  mounted () {  
    //this.userInfo = this.$store.getters['persistedParameter/getUserData'];
    //このthis.userInfoは、プロフィールページのユーザ情報となる
    //よって、プロフィール登録していないユーザがコメントした場合は、以下の処理でcommentIdが空になったりするエラーが発生する
    //プロフィール登録していないユーザがコメントできないように制限する必要がある
    
    this.userInfo = _.cloneDeep(this.$store.getters['persistedParameter/getUserData']);
  	
    //DBからコメントデータを取得した際に、データを一時退避させる配列
  	let dataStockArray = [];

    //デバッグ用にもう１つ退避先の配列を用意
    let dataStockArray_1 = [];
  	
    //このプロフィールに向けられたコメント（初回コメント）と返信コメント(ネストしたコメント)をすべて取得    
    db.collection("user_comment").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          
          const data = _.cloneDeep(doc.data());
          const data_1 = _.cloneDeep(doc.data());           
                    
          //初回コメントを取得
          //初回コメントはreply_comment_idがnullで、user_id_toがこのプロフィールページユーザのものとなっている
          //返信コメント(ネストしたコメント)は、reply_comment_id
          //このプロフィールページのユーザのユーザIDが、コメントデータのユーザIDと一致する場合
          if(this.userInfo.user_id === data_1.user_id_to){                       

            //全ユーザのプロフィール情報を探索する
            for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){

              //コメント投稿者のニックネームを調べる
              //各ユーザのプロフィールのユーザIDをチェックしていき、コメントの投稿者のユーザIDと一致した場合
              if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data_1.user_id_from){

                //コメントデータにニックネーム情報を追加する
                data_1.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;

                //コメントデータのコメントIDをドキュメントIDとする
                data_1.commentId = doc.id;
                //console.log("doc.id if");
                //console.log(doc.id); 
                
              }
            }
            //console.log("data_1.commentId");
            //console.log(data_1.commentId);                                   
            dataStockArray_1.push(data_1);

          //このプロフィールページのユーザが返信したコメントを取得
          //実際には、各プロフィールページにIDを設けて、ユーザがどのプロフィールページでやり取りしているのかを識別できるようにする  
          } else if (data_1.reply_comment_id && this.userInfo.user_id === data_1.user_id_from){
            for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){
              //コメント投稿者のニックネームを調べる
              if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data_1.user_id_from){
                
                data_1.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;
                data_1.commentId = doc.id;
                //console.log("doc.id else if");
                //console.log(doc.id); 
              }
            }             
            dataStockArray_1.push(data_1);

          }

          /////////////////////////////////////////////////////////

          //このプロフィールに向けられたコメントを収集                    
          if(this.userInfo.user_id === data.user_id_to){          	           
            for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){
              //コメント投稿者のニックネームを調べる
              if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data.user_id_from){
                data.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;
                data.commentId = doc.id;
                
              }
            }            	                     	
          	dataStockArray.push(data);

          } else if (data.reply_comment_id && this.userInfo.user_id === data.user_id_from){
            for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){
              //コメント投稿者のニックネームを調べる
              if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data.user_id_from){
                
                data.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;
                data.commentId = doc.id;
              }
            }             
          	dataStockArray.push(data);

          }       	          	          	                    	       	    	                       
        });
        
        
        for(let i=0;i<dataStockArray.length;i++){
        	dataStockArray[i].createdAt = dataStockArray[i].createdAt.toDate();      		
      	}

        for(let i=0;i<dataStockArray_1.length;i++){
          dataStockArray_1[i].createdAt = dataStockArray_1[i].createdAt.toDate();         
        }

        dataStockArray.sort(sortFunc);
        dataStockArray_1.sort(sortFunc2);

        //コメント一覧を投稿日時でソートするための関数を定義
  	    function sortFunc(a,b){
  	      return b.createdAt - a.createdAt;
  	    }

        function sortFunc2(a,b){
          return a.createdAt - b.createdAt;
        }
        
        for(let i=0;i<dataStockArray.length;i++){
        	let month = String(Number(dataStockArray[i].createdAt.getMonth())+1);
        	let dateInfo = dataStockArray[i].createdAt.getFullYear() + "年" + month + "月" + dataStockArray[i].createdAt.getDate() + "日" + dataStockArray[i].createdAt.getHours()+ "時" + dataStockArray[i].createdAt.getMinutes() + "分";
        	dataStockArray[i].createdAt = dateInfo;      		
      	}

        for(let i=0;i<dataStockArray_1.length;i++){
          let month = String(Number(dataStockArray_1[i].createdAt.getMonth())+1);
          let dateInfo = dataStockArray_1[i].createdAt.getFullYear() + "年" + month + "月" + dataStockArray_1[i].createdAt.getDate() + "日" + dataStockArray_1[i].createdAt.getHours()+ "時" + dataStockArray_1[i].createdAt.getMinutes() + "分";
          dataStockArray_1[i].createdAt = dateInfo;         
        }
      	      	
        //commentNumberの設定
    		for(let i=0;i<dataStockArray.length;i++){
    			dataStockArray[i].commentNumber = i;

    		}        

        for(let i=0;i<dataStockArray_1.length;i++){
          dataStockArray_1[i].commentNumber = i;

        }  

        //replyButtonFlagの初期化
        for(let i=0;i<dataStockArray.length;i++){
          dataStockArray[i].replyButtonFlag = true;

        }

        for(let i=0;i<dataStockArray_1.length;i++){
          dataStockArray_1[i].replyButtonFlag = true;
          //console.log(`dataStockArray_1[${i}].commentId:`);
          //console.log(dataStockArray_1[i].commentId);

        }
       

        //replyButtonFlagを設定        
        //プロフィールページのユーザがログインしている場合
        if(this.$store.getters['persistedParameter/getUserIdPersisted'] === this.userInfo.user_id){
          //投稿者がプロフィールページユーザのコメントをfalseにする
          for(let j=0;j<dataStockArray.length;j++){
            if(dataStockArray[j].user_id_from === this.userInfo.user_id){
              dataStockArray[j].replyButtonFlag = false;
            }
          }          
          for(let j=0;j<dataStockArray_1.length;j++){
            if(dataStockArray_1[j].user_id_from === this.userInfo.user_id){
              dataStockArray_1[j].replyButtonFlag = false;
            }
          } 
          
        } else {//プロフィールページユーザ以外のユーザAがログインしている場合
          //投稿者がAのコメントをfalseにする
          for(let j=0;j<dataStockArray.length;j++){
            if( dataStockArray[j].user_id_from === this.$store.getters['persistedParameter/getUserIdPersisted'] ){
              dataStockArray[j].replyButtonFlag = false;
            }
          } 

          for(let j=0;j<dataStockArray_1.length;j++){
            if( dataStockArray_1[j].user_id_from === this.$store.getters['persistedParameter/getUserIdPersisted'] ){
              dataStockArray_1[j].replyButtonFlag = false;
            }
          }                  
        }                                    

        /**/
        //コメントデータを適切な順番に並び替える
        //並び替え完了後のコメントデータ配列
        let displayArray=[];

        //追加したい要素がコメントデータ配列に含まれているかをチェックするフラグ
        let isDataIncluded=false;

        //ネストコメント保管用
        let storedReplyArray=[];

        //処理前の配列確認
        for(let p=0;p<dataStockArray_1.length;p++){
          /**/
          //console.log(`dataStockArray_1[${p}].commentId:`);
          //console.log(dataStockArray_1[p].commentId);
          //console.log(`dataStockArray_1[${p}].reply_comment_id:`);
          //console.log(dataStockArray_1[p].reply_comment_id);
          
        }

        //ネストカウントを初期化
        for(let p=0;p<dataStockArray_1.length;p++){
          dataStockArray_1[p].nestCount=0;
          /*
          console.log(`dataStockArray_1[${p}].commentId:`);
          console.log(dataStockArray_1[p].commentId);
          console.log(`dataStockArray_1[${p}].reply_comment_id:`);
          console.log(dataStockArray_1[p].reply_comment_id);
          */
        }

        //昇順で並んだデータdataStockArray_1において、ネストされたコメントを取り出す
        for(let i=0;i<dataStockArray_1.length;i++){
          //親コメントにネストされた全コメントを取得
          searchReply(dataStockArray_1[i].commentId, i);

          //ネストされた全コメントを取得できているか確認
          /*
          console.log(`i=${i}-----------------`);
          for(let p=0;p<storedReplyArray.length;p++){
            //console.log("storedReplyArray:");
            console.log(storedReplyArray[p].commentId);
          }
          */

          //ストックされたデータを表示用配列に格納する
          /*
          for(let k=0;k<storedReplyArray.length;k++){

            let data = _.cloneDeep(storedReplyArray[k]);
            displayArray.push(data);
          }
          */

          /**/
          //ネストを含む親コメント要素を表示用配列に格納
          for(let k=0;k<storedReplyArray.length;k++){
            //並び替え後配列に追加したい要素
            let data = _.cloneDeep(storedReplyArray[k]);

            //追加したい要素が並び替え後配列に含まれているかをチェック
            for(let u=0;u<displayArray.length;u++){
              if(data.commentId ===  displayArray[u].commentId){
                //console.log(storedReplyArray);              
                isDataIncluded = true;
              }
            }

            if(!isDataIncluded){
              displayArray.push(data);              
            } else {
              isDataIncluded = false;
            }
            
          }
          




          //一時保管配列の初期化
          storedReplyArray.splice(-storedReplyArray.length);

          function searchReply(commentId, index){

            storedReplyArray.push(dataStockArray_1[index]);
            
            for(let j=index+1;j<dataStockArray_1.length;j++){

              if(dataStockArray_1[j].reply_comment_id === undefined){
                dataStockArray_1[j].reply_comment_id="";
                //console.log("property is not defined");
                console.log(dataStockArray_1[j].reply_comment_id);//undefined
              }
              //追加したい要素のコメントに対して、返信があるか確認する
              //親：dataStockArray_1[j]
              if( dataStockArray_1[j].reply_comment_id !== "" && commentId === dataStockArray_1[j].reply_comment_id){

                dataStockArray_1[j].nestCount = dataStockArray_1[index].nestCount + 1;

                let data1 =_.cloneDeep(dataStockArray_1[j]);
                //返信がある場合は、そのコメントを一時ストック配列に格納する
                //子要素をストック配列に格納する
                //storedReplyArray.push(data1);
                /*
                console.log("storedReplyArray before call recursive function<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                for(let z=0;z<storedReplyArray.length;z++){
                  console.log(storedReplyArray[z].commentId);
                }
                */
                


                searchReply(dataStockArray_1[j].commentId, j);
              }
              /*
              try{
                if(dataStockArray_1[j].reply_comment_id === undefined){
                  dataStockArray_1[j].reply_comment_id="xxxx";
                  //console.log("property is not defined");
                  console.log(dataStockArray_1[j].reply_comment_id);//undefined
                }
                
                if( commentId === dataStockArray_1[j].reply_comment_id){
                  let data1 =_.cloneDeep(dataStockArray_1[j]);
                  storedReplyArray.push(data1);

                }

              } catch(e){
                //console.log("property is not defined");

              }
              */
              
              /*
              if(dataStockArray_1[j].reply_comment_id === undefined || dataStockArray_1[j].reply_comment_id === null){
                
                console.log("property is not defined");
                console.log(dataStockArray_1[j].reply_comment_id);//undefined
              }
              else if( commentId === dataStockArray_1[j].reply_comment_id){
                let data1 =_.cloneDeep(dataStockArray_1[j]);
                storedReplyArray.push(data1);

              }
              */
            }
            //一時保存配列の先頭に親要素を追加する
            //storedReplyArray.unshift(dataStockArray_1[index]);
            /*
            console.log("storedReplyArray after unshift>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");                   
            for(let zz=0;zz<storedReplyArray.length;zz++){
              console.log(storedReplyArray[zz].commentId);
            }
            */
          }

        }
        console.log("displayArray:");
        console.log(displayArray);
        







      	for(let i=0;i<dataStockArray.length;i++){      		
          this.$store.dispatch('persistedParameter/allCommentDataSetAction',dataStockArray[i]);
      	}        

        for(let i=0;i<dataStockArray_1.length;i++){         
          //this.tableData.push(dataStockArray_1[i]);
        }
        //console.log(dataStockArray_1);
        for(let i=0;i<displayArray.length;i++){         
          this.tableData2.push(displayArray[i]);
        }
        
                 
      })
      .catch(function(error) {
          alert(error.message)
      });  	
  },
}
</script>