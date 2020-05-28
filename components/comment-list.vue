<template><!-- eslint-disable --><!-- prettier-ignore -->
  
	<div>
		<h2>コメント一覧</h2>    
      <b-table 
     	 v-if="!getIsCommentMessage"           
        :items="commentsForTable" 
        :fields="fieldsOfCommentData"
        responsive="sm"                       
        >
        <template v-slot:cell(content)="data" :style="{width:'100px'}">
          <div v-bind:style="{marginLeft:getMarginLeft(data.item)}">
            <b-img :src="data.item.image_url" v-bind="mainProps" ></b-img>
            <span>{{data.item.nick_name_from}}</span>
            <p>{{data.item.comment}}</p>
            <span>{{data.item.createdAt}}</span>
            
            <nuxt-link v-if="data.item.replyButtonFlag" v-on:click.native="setCommentData(data.item)" v-bind:to="{ path: `/reply` }">返信する</nuxt-link>
            <p>commentId:  {{data.item.commentId}}</p>
            <p>reply_comment_id:  {{data.item.reply_comment_id}}</p>

          </div>
            
            
        </template>

      </b-table>
      <p v-if="getIsCommentMessage">まだコメントのやり取りはありません。</p>
	</div>

</template>


<script>
// prettier-ignore
/* eslint-disable */
import _cloneDeep from 'lodash/cloneDeep';

export default { 

props:['isCallGetComments'],
data(){
	return {
		commentsForTable: [],
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

	}

},
created(){
    
    this.getComments();



},
watch:{
	isCallGetComments:function(){
		console.log("enter isCallGetComments");
		

		if(this.isCallGetComments){	
			console.log("this.isCallGetComments");
			console.log(this.isCallGetComments);
			this.getComments();

		}


	},

},
computed:{

	getIsCommentMessage(){
        if(this.commentsForTable.length >= 1){
          return false;
        }
        return true;


    },


},
methods:{ 
    

    getComments(){
      console.log("enter getComments");
      //ここでは、このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う
      
      //1:必要なデータを取得 + 初期化
      let allComments = _cloneDeep( this.$store.getters['getAllComments'] );
      let firstCommentsOfThisPage = [];
      let commentsOfThisPage = [];
      const allProfiles = this.$store.getters['getAllProfiles'];
      const profileDataOfThisPage = this.$store.getters['sessionStorageParameter/getClickedProfileData'];
      const loginUserData = this.$store.getters['sessionStorageParameter/getLoginUserData'];

      console.log("allProfiles");
      console.log(allProfiles);

      console.log("profileDataOfThisPage");
      console.log(profileDataOfThisPage);

      //test0~test5までのユーザでログインした場合、以下が空となる
      //これはindex.jsのgetUsersCollectionActionにて
      //uidプロパティを持たないユーザはsessionにログインユーザ情報が保存されないため
      //コメントと返信機能が正しく動作するか確かめるにはtest6となる新たなユーザを登録する
      console.log("loginUserData");
      console.log(loginUserData);


      //:初回コメントを取得する
      //他のユーザーによる初コメント

      //全コメントの中から、このページに向けられた初回コメントを取得してくる  
      for(let i=0; i<allComments.length; i++){

        //このページへの初回コメントか判定する
        //初回コメントにはreply_comment_idが設定されていない
        if(allComments[i].reply_comment_id === undefined && profileDataOfThisPage.user_id === allComments[i].user_id_to) {

          allComments[i].isAddition = true;
          allComments[i].nestCount = 0;

          //push後にcommentsOfThisPageの要素を書き換えると、元のallCommentsのデータも更新されるので注意
          firstCommentsOfThisPage.push(allComments[i]);

        } 

      }  


      console.log("firstCommentsOfThisPage");
      console.log(firstCommentsOfThisPage);

      //5:初回コメントを時系列の古い順に並べ替える
      firstCommentsOfThisPage.sort(sortFunc);


      //コメント一覧を投稿日時でソートするための関数を定義      
      function sortFunc(a,b){
        return a.createdAt - b.createdAt;
      } 






      //6の表示用配列への挿入処理を関数で記述する
      const firstCommentsOfThisPage2 = _cloneDeep(firstCommentsOfThisPage);
      let commentsOfThisPage2 = [];
      let allComments2 = _cloneDeep(allComments);

      console.log("************************************************");

      //
      console.log("firstCommentsOfThisPage2");
      //
      console.log(firstCommentsOfThisPage2);

      


      //
      console.log("allComments2");
      //
      console.log(allComments2);

      console.log("************************************************");








      //6:初回コメントと返信コメントを、適切な順番で表示用配列に挿入していく
      
      //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
      //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
      for(let i=0; i<firstCommentsOfThisPage.length; i++){

        //初回コメントを表示用配列に入れる  
        commentsOfThisPage.push( firstCommentsOfThisPage[i] );

        //ネスト数１の返信コメントを取得して、表示用配列に入れる
        for(let j=0; j<allComments.length; j++){

          //返信コメントIDが初回コメントのコメントIDと一致する返信データを見つける             
          if( allComments[j].reply_comment_id === firstCommentsOfThisPage[i].commentId ){


            //初回コメントの次のインデックスにネスト数１の返信データを格納する
            //見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
            if( !allComments[j].isAddition ){

              //ネスト配列に格納される要素のisAdditionをtrueに変更                  
              allComments[j].isAddition=true;

              //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
              allComments[j].nestCount = 1;

              //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
              let nest1 = _cloneDeep( allComments[j] );
              
              //firstCommentsOfThisPage[j].nestArray.push(nest1);

              //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
              commentsOfThisPage.push(nest1);
            }                           

            //ネスト数2の返信コメントを取得して、表示用配列に入れる
            for(let m=0; m<allComments.length; m++){

              //返信コメントIDが、ネスト数１の返信データのコメントIDと一致する返信データを見つける     
              if(allComments[m].reply_comment_id === allComments[j].commentId ){    

                if(!allComments[m].isAddition){

                  allComments[m].isAddition=true;
                  allComments[m].nestCount = 2;

                  let nest2 = _cloneDeep(allComments[m]);

                  //firstCommentsOfThisPage[j].nestArray.push(nest2);

                  //ネスト1のallComments[j]に対する返信コメントnest2を表示用配列に挿入する
                  commentsOfThisPage.push(nest2);
                  
                }                  
                
                //ネスト数3の返信コメントを取得して、表示用配列に入れる
                for(let n=0; n<allComments.length; n++){

                  //返信コメントIDが、ネスト数2の返信データのコメントIDと一致する返信データを見つける  
                  if(allComments[n].reply_comment_id === allComments[m].commentId ){    

                    if(!allComments[n].isAddition){

                      allComments[n].isAddition=true;
                      allComments[n].nestCount = 3;

                      let nest3 = _cloneDeep(allComments[n]);
                      //firstCommentsOfThisPage[j].nestArray.push(nest3);
                      //ネスト2のallComments[m]に対する返信コメントnest3を表示用配列に挿入する
                      commentsOfThisPage.push(nest3);
                      
                    }                      
                  }
                }//for(let n=0; n<allComments.length; n++){
              }
            }//for(let m=0; m<allComments.length; m++){
          }
        }
      } 

      console.log("commentsOfThisPage");
      console.log(commentsOfThisPage);


      console.log("--------------------------------------------------------");

      for(let i=0; i<commentsOfThisPage.length; i++){

        console.log(`commentsOfThisPage[${i}]`);
        console.log(commentsOfThisPage[i]);

      }

      console.log("--------------------------------------------------------");








      /*************************************************************************
     ******************************************************************************/

      //getNestCommet関数でネスト1以上のコメントを再起処理する(引数改善version)/////////////


      
      console.log("commentsOfThisPage2 before");
      //commentsOfThisPage2はこの時点では空のはず
      //念の為に中身を確認
      for(let j=0; j<commentsOfThisPage2.length; j++){
        console.log(`commentsOfThisPage2[${j}]`);
        console.log(commentsOfThisPage2[j]);
      }


      //5のfirstCommentsOfThisPage2から初回コメントを１つずつ取り出し、
      //その返信コメントを順番に取得し、表示用配列commentsOfThisPage2に格納していく
      for(let i=0; i<firstCommentsOfThisPage2.length; i++){



        //初回コメントを表示用配列に入れる  
        commentsOfThisPage2.push(  firstCommentsOfThisPage2[i] );

        

        console.log("after pushed to commentsOfThisPage2 in head");
        //commentsOfThisPage2の中身を確認
        for(let j=0; j<commentsOfThisPage2.length; j++){
          console.log(`commentsOfThisPage2[${j}]`);
          console.log(commentsOfThisPage2[j]);
        }


        //ネスト数１以上の返信コメントを取得して、表示用配列に入れる
        getNestCommet(i, 1);
        
      }

      
      //ネスト数１以上のコメントを見つける
      function getNestCommet(index, currentNestCount){

        console.log("enter getNestCommet");

        //allComments2[x].reply_comment_idの比較対象が、ネスト数２以上の場合とは異なることに注意
        
        if(currentNestCount === 1){

          //ネスト１のコメントが存在するかチェック
          for(let j=0; j<allComments2.length; j++){

            //ネスト０のコメントIDにリプライIDが一致するコメントがあるかチェック
            if( allComments2[j].reply_comment_id === firstCommentsOfThisPage2[index].commentId ){
              console.log("nest=111111111111111111111111111111111111111111111111111111111111");
              console.log(`allComments2[${j}]`);
              console.log(allComments2[j].comment);
              //console.log(`firstCommentsOfThisPage2[${index}]`);

              //ネスト１のコメントを表示用配列に挿入
              setNestCount(j, currentNestCount);

              //挿入したネスト１のコメントに対して、ネスト２以上のコメントがぶら下がっていないか調べる
              getNestCommet(j, currentNestCount+1);

            }
          }

          //ここに到達しているときは
          //ネスト０のコメントに対して、返信がない場合
          //ネスト０のコメントに対して、ネスト１以上のコメントをすべて探し出し、表示用に格納できた場合である
          //いずれにせよ、これ以降の処理は必要がないのでリターンする
          return;
        }

        //currentNestCount=2以上、
        //つまり、ネスト数２以降のコメントを検索する場合は、以下の処理を行う
        for(let i=0; i<allComments2.length; i++){
          if(allComments2[i].reply_comment_id === allComments2[index].commentId ){ 
            console.log(`nest=${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}${currentNestCount}`);
            console.log("allComments2[i].reply_comment_id");
            console.log(allComments2[i].reply_comment_id);
            //console.log(`allComments2[i=${i}]`);
            //console.log(`allComments2[index=${index}]`);

            setNestCount(i, currentNestCount);

            //ネスト数は３までとする
            if(currentNestCount+1 === 4){
              //ブレイクした場合、そのままgetNestCommetを抜ける
              break;
            };

            getNestCommet(i, currentNestCount+1);

          }

        }

      }
      
      
      //setNestCount関数の役割
      //表示用配列に格納する要素にネスト数を付与
      //表示用配列に追加済みの要素にフラグを立てる
      
      function setNestCount(index, currentNestCount){

        console.log(`seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet`);

        //console.log(`index=${index}`);
        console.log(`currentNestCount=${currentNestCount}`);
        console.log(`allComments2[${index}]=`);
        console.log(allComments2[index].comment);

        //初回コメントの次のインデックスにネスト数１の返信データを格納する
        //見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
        if( !allComments2[index].isAddition ){

          //ネスト配列に格納される要素のisAdditionをtrueに変更                  
          allComments2[index].isAddition=true;

          //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
          allComments2[index].nestCount = currentNestCount;

          //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
          let element = _cloneDeep( allComments2[index] );
          
          //firstCommentsOfThisPage[j].nestArray.push(nest1);

          //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
          commentsOfThisPage2.push(element);



        }   

      }


     






      /**************************************************************************
      

      //getNestCommet関数でネスト1以上のコメントを再起処理する////////////////////////////


      //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
      //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
      for(let i=0; i<firstCommentsOfThisPage2.length; i++){

        //初回コメントを表示用配列に入れる  
        commentsOfThisPage2.push(  firstCommentsOfThisPage2[i] );


        //ネスト数１の返信コメントを取得して、表示用配列に入れる

        getNestCommet(i, 1, allComments2, commentsOfThisPage2)
        
      }

      
      //ネスト数１以上のコメントを見つける
      function getNestCommet(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){

        if(currentNestCount === 1){

          for(let j=0; j<allCommentsArray.length; j++){

            if( allCommentsArray[j].reply_comment_id === firstCommentsOfThisPage2[index].commentId ){

              setNestCount(j, currentNestCount, allCommentsArray, commentsOfThisPageArray);
              getNestCommet(j, currentNestCount+1, allCommentsArray, commentsOfThisPageArray);

            }

          }
        }

        for(let i=0; i<allCommentsArray.length; i++){
          if(allCommentsArray[i].reply_comment_id === allComments2[index].commentId ){ 

            setNestCount(i, currentNestCount, allCommentsArray, commentsOfThisPageArray);

            if(currentNestCount+1 === 4){
              break;
            };

            getNestCommet(i, currentNestCount+1, allCommentsArray, commentsOfThisPageArray);

          }

        }

      }
      
      



      function setNestCount(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){


        //初回コメントの次のインデックスにネスト数１の返信データを格納する
        //見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
        if( !allCommentsArray[index].isAddition ){

          //ネスト配列に格納される要素のisAdditionをtrueに変更                  
          allCommentsArray[index].isAddition=true;

          //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
          allCommentsArray[index].nestCount = currentNestCount;

          //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
          let element = _cloneDeep( allCommentsArray[index] );
          
          //firstCommentsOfThisPage[j].nestArray.push(nest1);

          //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
          commentsOfThisPageArray.push(element);
        }   

      }


      
      //ネスト数２、３のコメントをみつける
      function getNestCommet2(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){


        for(let i=0; i<allCommentsArray.length; i++){
          if(allCommentsArray[i].reply_comment_id === allComments2[index].commentId ){ 

            setNestCount(i, currentNestCount, allCommentsArray, commentsOfThisPageArray);

            if(currentNestCount+1 === 4){
              break;
            };

            getNestCommet(i, currentNestCount+1, allCommentsArray, commentsOfThisPageArray);

          }

        }

      }

      
    ***********************************************************************************/








      /*************************************************************************************
      

      //getNestCommet関数でネスト２以上のコメントを再起処理する//////////////////////////////////////
      //正しく動作することを確認すみ

      //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
      //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
      for(let i=0; i<firstCommentsOfThisPage2.length; i++){

        //初回コメントを表示用配列に入れる  
        commentsOfThisPage2.push(  firstCommentsOfThisPage2[i] );


        //ネスト数１の返信コメントを取得して、表示用配列に入れる
        for(let j=0; j<allComments2.length; j++){
          //返信コメントIDが初回コメントのコメントIDと一致する返信データを見つける             
          if( allComments2[j].reply_comment_id === firstCommentsOfThisPage2[i].commentId ){

             
            setNestCount(j, 1, allComments2, commentsOfThisPage2);

            //ネスト数２以降のデータ検索には再帰関数が使える
            getNestCommet(j, 2, allComments2, commentsOfThisPage2);

            
          }
        }
      }

      
      



      function setNestCount(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){


        //初回コメントの次のインデックスにネスト数１の返信データを格納する
        //見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
        if( !allCommentsArray[index].isAddition ){

          //ネスト配列に格納される要素のisAdditionをtrueに変更                  
          allCommentsArray[index].isAddition=true;

          //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
          allCommentsArray[index].nestCount = currentNestCount;

          //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
          let element = _cloneDeep( allCommentsArray[index] );
          
          //firstCommentsOfThisPage[j].nestArray.push(nest1);

          //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
          commentsOfThisPageArray.push(element);
        }   

      }


     
      //ネスト数２以上のコメントをみつける
      function getNestCommet(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){


        for(let i=0; i<allCommentsArray.length; i++){
          if(allCommentsArray[i].reply_comment_id === allComments2[index].commentId ){ 

            setNestCount(i, currentNestCount, allCommentsArray, commentsOfThisPageArray);

            if(currentNestCount+1 === 4){
              break;
            };

            getNestCommet(i, currentNestCount+1, allCommentsArray, commentsOfThisPageArray);

          }

        }

      }
      


      //未完成の関数 
      function getNestCommet0(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){

        for(let i=0; i<allCommentsArray.length; i++){
          if(allCommentsArray[i].reply_comment_id === allComments2[index].commentId ){ 

            setNestCount(i, currentNestCount, allCommentsArray, commentsOfThisPageArray);

          }

        }

      }
      
      ************************************************************************************/










      /******************************************************************************

      
      //setNestCount関数のみを導入する場合//////////////////////////////////////////////
      
      //5のfirstCommentsOfThisPageから初回コメントを１つずつ取り出し、
      //その返信コメントを順番に取得し、表示用配列commentsOfThisPageに格納していく
      for(let i=0; i<firstCommentsOfThisPage2.length; i++){

        //初回コメントを表示用配列に入れる  
        commentsOfThisPage2.push(  firstCommentsOfThisPage2[i] );

        //ネスト数１の返信コメントを取得して、表示用配列に入れる
        for(let j=0; j<allComments2.length; j++){
          //返信コメントIDが初回コメントのコメントIDと一致する返信データを見つける             
          if( allComments2[j].reply_comment_id === firstCommentsOfThisPage2[i].commentId ){

             
            setNestCount(j, 1, allComments2, commentsOfThisPage2);

            //ネスト数2の返信コメントを取得して、表示用配列に入れる
            for(let m=0; m<allComments2.length; m++){

              //返信コメントIDが、ネスト数１の返信データのコメントIDと一致する返信データを見つける     
              if(allComments2[m].reply_comment_id === allComments2[j].commentId ){

                setNestCount(m, 2, allComments2, commentsOfThisPage2);

                //ネスト数3の返信コメントを取得して、表示用配列に入れる
                for(let n=0; n<allComments2.length; n++){

                  //返信コメントIDが、ネスト数2の返信データのコメントIDと一致する返信データを見つける  
                  if(allComments2[n].reply_comment_id === allComments2[m].commentId ){ 

                    setNestCount(n, 3, allComments2, commentsOfThisPage2);

                  }

                }
              }
            }
          }
        }
      }


      
           



      function setNestCount(index, currentNestCount, allCommentsArray, commentsOfThisPageArray){


        //初回コメントの次のインデックスにネスト数１の返信データを格納する
        //見つかったネスト数１のコメントのisAdditionがfalseであり、まだネスト配列に格納されていないことをチェック        
        if( !allCommentsArray[index].isAddition ){

          //ネスト配列に格納される要素のisAdditionをtrueに変更                  
          allCommentsArray[index].isAddition=true;

          //コメントを表示させるときに、nestCountに応じてmargin-leftを決めるために設定しておく
          allCommentsArray[index].nestCount = currentNestCount;

          //commentsOfThisPageがallCommentsを参照しないように、ディープコピーをとる
          let element = _cloneDeep( allCommentsArray[index] );
          
          //firstCommentsOfThisPage[j].nestArray.push(nest1);

          //ネスト０のfirstCommentsOfThisPage[i]に対する返信コメントnest1を表示用配列に挿入する
          commentsOfThisPageArray.push(element);
        }   

      }

      *******************************************************************************/

      




      console.log("last--------------------------------------------------------");

      for(let i=0; i<commentsOfThisPage2.length; i++){

        console.log(`commentsOfThisPage2[${i}]`);
        console.log(commentsOfThisPage2[i]);

      }

      console.log("--------------------------------------------------------");




      



      
















      //7:日付の表示方法の変更

      for(let i=0;i<commentsOfThisPage.length;i++){
        let month = String( Number( commentsOfThisPage[i].createdAt.getMonth() ) + 1 );
        let dateInfo = commentsOfThisPage[i].createdAt.getFullYear() + "年" + month + "月" + commentsOfThisPage[i].createdAt.getDate() + "日" + commentsOfThisPage[i].createdAt.getHours()+ "時" + commentsOfThisPage[i].createdAt.getMinutes() + "分";
        commentsOfThisPage[i].createdAt = dateInfo;         
      }


      //8:返信ボタンの設置

      //8-1:replyButtonFlagの初期化
      for(let i=0;i<commentsOfThisPage.length;i++){
        commentsOfThisPage[i].replyButtonFlag = false;

      }

      //8-2:replyButtonFlagを設定        
      //このページを作成者本人である会員Aが閲覧している場合
      if( loginUserData.uid === profileDataOfThisPage.user_id){
      
        //ネスト０とネスト２のコメントに返信ボタンをつける
        //ただし、その下にネストが存在する場合は返信ボタンをつけない
        //これは、j+1番目の要素のネスト数が０になっているかで判断できる
        //なお、配列の最後の要素がネスト0の場合は返信ボタンをつける
        for(let j=0; j<commentsOfThisPage.length; j++){

        	//本人が自分のプロフィールにコメントしている場合は、そのコメントに返信ボタンをつけない
        	//コメントのuser_id_fromがloginUserData.uidと一致する

        	//コメントのuser_id_fromがloginUserData.uidと異なる場合に以下を行う
        	if(commentsOfThisPage[j].user_id_from !== loginUserData.uid){

        			
		          //配列の最後の要素がネスト0の場合
		          if(commentsOfThisPage[j].nestCount === 0 && j === commentsOfThisPage.length - 1 ){
		            commentsOfThisPage[j].replyButtonFlag = true;

		          //ネスト０で次の要素もネスト０の場合  
		          } else if (commentsOfThisPage[j].nestCount === 0 && commentsOfThisPage[j+1].nestCount === 0){
		            commentsOfThisPage[j].replyButtonFlag = true;
		          }


		           //配列の最後の要素がネスト2の場合
		          if(commentsOfThisPage[j].nestCount === 2 && j === commentsOfThisPage.length - 1 ){
		            commentsOfThisPage[j].replyButtonFlag = true;

		          //ネスト2で次の要素がネスト０の場合  
		          } else if (commentsOfThisPage[j].nestCount === 2 && commentsOfThisPage[j+1].nestCount === 0){
		            commentsOfThisPage[j].replyButtonFlag = true;
		          }
	      	} else{
	      		console.log("以下のコメントは、このプロフィールページの作成者のものです");
	      	}
         
        }  

       //このページを作成者(会員A)ではない会員Bが閲覧している場合 
      } else {

        //ネスト１のコメントで、なおかつuser_id_toが会員Bのものは返信ボタンをつける
        //ただし、その下にネストが存在する場合は返信をつけない
        //プロフィールページでは、返信ボタンを使った作成者を介さないコメントのやり取りはできない
        //そのため、会員Aのページで会員Bと会員Cが返信機能を使って筆談することはできない

        for(let j=0;j<commentsOfThisPage.length;j++){

          //配列の最後の要素がネスト1の場合
          if( commentsOfThisPage[j].nestCount === 1 &&
           commentsOfThisPage[j].user_id_to === loginUserData.uid &&
           j === commentsOfThisPage.length-1){

            commentsOfThisPage[j].replyButtonFlag = true;

          //ネスト１で次の要素がネスト０
          } else if( commentsOfThisPage[j].nestCount === 1 &&
          commentsOfThisPage.user_id_to === loginUserData.uid &&
           commentsOfThisPage[j+1].nestCount === 0
           ){
           commentsOfThisPage[j].replyButtonFlag = true;

          }

          

        }  

      } 

      //この初期化を行わないと、テーブルに重複が生じる
      this.commentsForTable.splice(-this.commentsForTable.length);

      //テーブルの表示用配列にデータを入れる
      for(let i=0;i<commentsOfThisPage.length;i++){         
        this.commentsForTable.push(commentsOfThisPage[i]);
      }  


      console.log("this.commentsForTable");
      console.log(this.commentsForTable);


      








    },
    getMarginLeft(row){
      //コメントに返信する場合、元のコメントより右に少しずらす
      //このマージンをコメントのネスト数から算出する
      let value = Number(row.nestCount)*30;
      let marginLeft = value + "px";
      return marginLeft;

    },
    
    setCommentData(element){  
      console.log("element:");       
      console.log(element); 
      //返信ボタンが押されたら、そのコメントを取得し、sessoinに保存
      //reply.vueでリロードされた場合を想定し、データはsessionに保存しておく
      //reply.vueにて、この保存されたコメントデータを呼び出す
      this.$store.commit('sessionStorageParameter/commentDataSet',element);
      //this.$store.commit('persistedParameter/commentDataSet',element);


    }, 

},



}

</script>