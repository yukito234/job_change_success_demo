<template>
	<div>
    <global-navi></global-navi>
    <b-spinner small v-show="loading"></b-spinner>
    <div v-show="!loading">
  		<!--ここは永続化させる必要があるのか検討必要-->				
      <h2>{{ $store.getters['persistedParameter/getUserData'].nick_name }}さんのプロフィール</h2>		
      
      <b-card no-body  style="max-width: 540px;">
        <b-row >
          <b-col md="6">
            
            <b-img :src="$store.getters['persistedParameter/getUserData'].image_url" alt="" ></b-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="$store.getters['persistedParameter/getUserData'].nick_name">
              <b-card-text>
                {{$store.getters['persistedParameter/getUserData'].self_introduction}}
                abcdedffgadfasdfeilsdjfksjfoeilsdfjksjdfif
                asdfalsfjieasjdlfjalskjdflsjdlfaskdjflsajdlfa
                asjdfjlasdjflasjdflkjasdlfkjlasdjflasdjflajsdf
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <h2>お気に入り記事</h2>

      <b-table            
        :items="allLikeArticlesData" 
        :fields="fieldsOfLikeArticle"
        responsive="sm"                       
        >
        <template v-slot:cell(titleLink)="data">
            <a v-bind:href="data.item.url">{{data.item.title}}</a>
            
        </template>
        
        <template v-slot:cell(detailButton)="row" >
            <b-button size="sm" @click="row.toggleDetails" class="mr-2" >
            
              {{ row.detailsShowing ? '閉じる' : '詳細'}}
            </b-button>               
            
        </template>

        <template v-slot:row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>おすすめする人:</b></b-col>
                
                <b-col>{{ row.item.recommendation }}</b-col>                
                
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>コメント:</b></b-col>
                
                <b-col>{{ row.item.free_text_area }}</b-col>                                  
          
              </b-row>              
              
            </b-card>
        </template>
      </b-table>      
          
  		<h2>コメントを残す</h2>		
      <b-overlay :show="show" rounded="sm">
        <b-card bg-variant="light">
          
              <b-form-textarea
                id="textarea"
                v-model="userComment"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
             
            <b-button v-on:click="registerComment" >コメントを送信する</b-button>
            
        </b-card>
      </b-overlay>
     
  		<h2>コメント一覧</h2>    
      <b-table            
        :items="tableData3" 
        :fields="fieldsOfCommentData"
        responsive="sm"                       
        >
        <template v-slot:cell(content)="data" :style="{width:'100px'}">
          <div v-bind:style="{marginLeft:getMarginLeft(data.item)}">
            <b-img :src="data.item.image_url" v-bind="mainProps" ></b-img>
            <span>{{data.item.nick_name_from}}</span>
            <p>{{data.item.comment}}</p>
            <span>{{data.item.createdAt}}</span>
            <!--<router-link v-if="data.item.replyButtonFlag" v-on:click.native="setCommentData(data.item)" v-bind:to="{ path: `/reply` }">返信する</router-link>
              
            -->
            <router-link v-if="data.item.replyButtonFlag" v-on:click.native="setCommentData(data.item)" v-bind:to="{ path: `/members/${$route.params.username}/reply/${data.item.commentId}` }">返信する</router-link>
            <p>commentId:  {{data.item.commentId}}</p>
            
            <p>reply_comment_id:  {{data.item.reply_comment_id}}</p>

          </div>
            
            
        </template>

      </b-table>
      
	  </div>
	</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../../../plugins/firebase_config'
import globalNavi from '~/components/global-navi.vue';
import _ from 'lodash';

export default {     
  middleware: 'authenticated', 
  components:{
    "global-navi": globalNavi,

  },
  data () {
    return { 
      show:false,
      loading:true,
      mainProps:{
        //center: true,
        //fluidGrow: true,
        //blank: true,
        //blankColor: '#bbb',
        width: 30,
        //height: 400,
        //class: 'my-5'
        //display:incline-block
        block:false,
      },
      fieldsOfCommentData:[
        /*
        {
          key:'titleLink',
          label:'記事タイトル',
        },
        */
        {
          key:'content',
          label:'',
        },
      ],
      tableData3:[],
      fieldsOfLikeArticle:[            
        {
          key:'titleLink',
          label:'記事タイトル',
        },
        {
          key:'detailButton',
          label:'詳細',
        },               

      ],           
     userInfo:"",
     userComment:"",
     //allCommentData:[],
     replyContent:"",
     //tableData:[],
     //tableData2:[],
     allLikeArticlesData:[],
      
    }
  },
  methods:{  	
    getMarginLeft(row){
      //コメントに返信する場合、元のコメントより右に少しずらす
      //このマージンをコメントのネスト数から算出する
      let value = Number(row.nestCount)*30;
      let marginLeft = value + "px";
      return marginLeft;

    },
    
  	setCommentData(element){ 		      
      //返信ボタンが押されたら、そのコメントを取得し、保存永続化させる
      //reply.vueにて、この永続化されたコメントデータを呼び出す
      this.$store.commit('persistedParameter/commentDataSet',element);


  	},  	  	
  	registerComment(){
      //プロフィールユーザがログインしているときは、コメントの投稿機能は非表示にする
      this.show=true;
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
            this.show=false;
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
          //お気に入り記事紹介テーブルの最初の記事の詳細だけあらかじめ表示させておくために設定する
          //ただ、ボタンが正しく動作しないのでやめた
          //それぞれのボタンが区別されていないので、下のボタンをクリックすると上の表示まで閉じてしまう
          //this.allLikeArticlesData[0]._showDetails= true;
          //console.log("this.allLikeArticlesData");
          //console.log(this.allLikeArticlesData);

          //authenticationから会員の全ユーザIDを取得する方法が分からない
          //console.log("firebase.auth()");
          //console.log(firebase.auth());

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

    //DBからコメントデータを取得した際に、データを一時保存させる配列
    let dataStockArray_2 = [];
  	
    //このプロフィールに向けられたコメント（初回コメント）と返信コメント(ネストしたコメント)をすべて取得    
    db.collection("user_comment").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          
          const data = _.cloneDeep(doc.data());          

          const data_2 = _.cloneDeep(doc.data());

          //コメントデータのコメントIDをドキュメントIDとする
          data_2.commentId = doc.id;            

          //初回コメントと返信コメントを正しい順番で表示用配列に格納していく際に、dataStockArray_2の要素ですでに追加されたものはtrueにしておくことで、コメントの探索が効率よく行える
          data_2.isAddition = false;

          //同様にコメントの種類（初回、返信）やネストの深さを判別しやすくするために設定する
          data_2.nestCount = null;

          //返信コメント格納用
          data_2.nestArray =[];

          //nestArrayの制御変数
          data_2.numberForNestArray = 0;

          for(let i=0;i<this.$store.getters['persistedParameter/getAllProfilePersisted'].length;i++){

            if(this.$store.getters['persistedParameter/getAllProfilePersisted'][i].user_id === data_2.user_id_from){
              //コメントデータにニックネーム情報を追加する
              data_2.nick_name_from = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].nick_name;

              data_2.image_url = this.$store.getters['persistedParameter/getAllProfilePersisted'][i].image_url;
              //console.log("this.$store.getters['persistedParameter/getAllProfilePersisted'][i]");
              //console.log(this.$store.getters['persistedParameter/getAllProfilePersisted'][i]);

            }
          
          }

          //data_2.createdAt = data_2.createdAt.toDate(); 
          //以下配列に全コメントが格納される
          dataStockArray_2.push(data_2);          
                	          	          	                    	       	    	                       
        });//querySnapshot.forEach((doc)=>{

        console.log("DBから取得した全コメント:");
        console.log("dataStockArray_2:");
        console.log(dataStockArray_2);

       
        for(let i=0;i<dataStockArray_2.length;i++){
          //console.log("dataStockArray_2[i].createdAt before");
          //console.log(dataStockArray_2[i].createdAt);

          //dataStockArray_2[i].createdAtがundefinedのデータもあるので、ifで分岐させないとエラーが出る
          if(dataStockArray_2[i].createdAt){
            dataStockArray_2[i].createdAt = dataStockArray_2[i].createdAt.toDate();
          }
                   
          //console.log("dataStockArray_2[i].createdAt after");
          //console.log(dataStockArray_2[i].createdAt);
        }       

        //A（閲覧プロフィール）に向けられた初回と返信コメントを格納する  
        let targetDataArray_2 =[];  
        //全コメントの中から、A（閲覧プロフィール）に向けられた初回コメントを取得してくる  
        for(let i=0;i<dataStockArray_2.length;i++){

          //Aへの初回コメントか判定する
          if(dataStockArray_2[i].reply_comment_id === undefined && this.userInfo.user_id === dataStockArray_2[i].user_id_to) {

            dataStockArray_2[i].isAddition = true;
            dataStockArray_2[i].nestCount = 0;
            let commetData = _.cloneDeep(dataStockArray_2[i]);
            targetDataArray_2.push(commetData);

          } 

        }        

        //初回コメントを時系列の古い順に並べ替える
        targetDataArray_2.sort(sortFunc2);

        console.log("プロフィールユーザ向けの初回コメント（時系列順）:");
        console.log("targetDataArray_2:");
        console.log(targetDataArray_2);

        //表示用配列
        let displayArray_2=[];

        //初回コメントを１つずつチェック
        for(let j=0;j<targetDataArray_2.length;j++){

         //console.log(`targetDataArray_2[${j}].nestArray`);
          //console.log(targetDataArray_2[j].nestArray);
          displayArray_2.push(targetDataArray_2[j]);

          for(let i=0;i<dataStockArray_2.length;i++){
            //初回コメントのコメントIDと一致する返信データを見つける
            //ネスト数１の返信コメントを取得
            if(dataStockArray_2[i].reply_comment_id === targetDataArray_2[j].commentId){

              //返信データを初回コメントのネスト配列に格納             

              if(!dataStockArray_2[i].isAddition){
                dataStockArray_2[i].isAddition=true;
                dataStockArray_2[i].nestCount = 1;
                let nest1 = _.cloneDeep(dataStockArray_2[i]);
                targetDataArray_2[j].nestArray.push(nest1);

                displayArray_2.push(nest1);
              }                           

              //ネスト数2
              for(let m=0; m<dataStockArray_2.length; m++){
                if(dataStockArray_2[m].reply_comment_id === dataStockArray_2[i].commentId ){                                    
                  if(!dataStockArray_2[m].isAddition){
                    dataStockArray_2[m].isAddition=true;
                    dataStockArray_2[m].nestCount = 2;
                    let nest2 = _.cloneDeep(dataStockArray_2[m]);

                    targetDataArray_2[j].nestArray.push(nest2);

                    displayArray_2.push(nest2);
                    
                  }                  
                  
                  //ネスト数3
                  for(let n=0; n<dataStockArray_2.length; n++){

                    if(dataStockArray_2[n].reply_comment_id === dataStockArray_2[m].commentId ){                                          
                      if(!dataStockArray_2[n].isAddition){
                        dataStockArray_2[n].isAddition=true;
                        dataStockArray_2[n].nestCount = 3;
                        let nest3 = _.cloneDeep(dataStockArray_2[n]);
                        targetDataArray_2[j].nestArray.push(nest3);

                        displayArray_2.push(nest3);
                        
                      }                      
                    }
                  }
                }
              }
            }
          }
        }

        console.log("プロフィールユーザ向けの初回コメントと返信コメント:");
        console.log("targetDataArray_2:");
        console.log(targetDataArray_2);
        
        console.log("displayArray_2:");
        console.log(displayArray_2);

        //日付の表示方法の変更
        for(let i=0;i<displayArray_2.length;i++){
          let month = String(Number(displayArray_2[i].createdAt.getMonth())+1);
          let dateInfo = displayArray_2[i].createdAt.getFullYear() + "年" + month + "月" + displayArray_2[i].createdAt.getDate() + "日" + displayArray_2[i].createdAt.getHours()+ "時" + displayArray_2[i].createdAt.getMinutes() + "分";
          displayArray_2[i].createdAt = dateInfo;         
        }


        //replyButtonFlagの初期化
        for(let i=0;i<displayArray_2.length;i++){
          displayArray_2[i].replyButtonFlag = false;

        }

        //replyButtonFlagを設定        
        //プロフィールページのユーザ本人のAがログインしている場合
        if(this.$store.getters['persistedParameter/getUserIdPersisted'] === this.userInfo.user_id){
          
          //ネスト０とネスト２のコメントに返信ボタンをつける
          //ただし、その下にネストが存在する場合は返信をつけない
          //これは、j+1番目の要素のネスト数が０になっているかで判断できる
          for(let j=0;j<displayArray_2.length;j++){

            //ネスト０の最後の要素
            if(displayArray_2[j].nestCount === 0 && j === displayArray_2.length - 1 ){
              displayArray_2[j].replyButtonFlag = true;

            //ネスト０で次の要素もネスト０の場合  
            } else if (displayArray_2[j].nestCount === 0 && displayArray_2[j+1].nestCount === 0){
              displayArray_2[j].replyButtonFlag = true;
            }


             //ネスト2の最後の要素
            if(displayArray_2[j].nestCount === 2 && j === displayArray_2.length - 1 ){
              displayArray_2[j].replyButtonFlag = true;

            //ネスト2で次の要素がネスト０の場合  
            } else if (displayArray_2[j].nestCount === 2 && displayArray_2[j+1].nestCount === 0){
              displayArray_2[j].replyButtonFlag = true;
            }



            /*
            if(displayArray_2[j].nestCount === 0 && displayArray_2[j+1].nestCount === 0){
              displayArray_2[j].replyButtonFlag = true;
            }
            if(displayArray_2[j].nestCount === 2 && displayArray_2[j+1].nestCount === 0){
              displayArray_2[j].replyButtonFlag = true;
            }
            */
           
          }                   
          
        } else {//プロフィールページユーザ以外のユーザBがログインしている場合
          //ネスト１のコメントで、なおかつuser_id_toがユーザBのものは返信ボタンをつける
          //ただし、その下にネストが存在する場合は返信をつけない

          for(let j=0;j<displayArray_2.length;j++){

            //ネスト１の最終要素
            if( displayArray_2[j].nestCount === 1 &&
             displayArray_2[j].user_id_to === this.userInfo.user_id &&
             j === displayArray_2.length-1){

              displayArray_2[j].replyButtonFlag = true;

            //ネスト１で次の要素がネスト０
            } else if( displayArray_2[j].nestCount === 1 &&
             displayArray_2[j].user_id_to === this.userInfo.user_id &&
             displayArray_2[j+1].nestCount === 0
             ){
              displayArray_2[j].replyButtonFlag = true;

            }

            /*
            if( displayArray_2[j].nestCount === 1 &&
             displayArray_2[j].user_id_to === this.userInfo.user_id &&
             displayArray_2[j+1].nestCount === 0){

              displayArray_2[j].replyButtonFlag = true;
            }
            */

          }                         
        }      

        console.log("displayArray_2 after replyButton addition:");
        console.log(displayArray_2);

        //テーブル表示用配列にデータを入れる
        for(let i=0;i<displayArray_2.length;i++){         
          this.tableData3.push(displayArray_2[i]);
        }                                  

        //コメント一覧を投稿日時でソートするための関数を定義 	   
        function sortFunc2(a,b){
          return a.createdAt - b.createdAt;
        }               

        this.loading=  false;        
                 
      })
      .catch(function(error) {
          alert(error.message)
      });  	
  },
}
</script>