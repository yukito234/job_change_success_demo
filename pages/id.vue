<template>
	<div>
		<nuxt-link to="/member">メンバーページに移動する</nuxt-link>				
    <h2>{{ $store.getters['persistedParameter/getUserData'].nick_name }}さんの個別ページです</h2>		
    <img :src="$store.getters['persistedParameter/getUserData'].image_url" class="profileimage">
		<p>自己紹介</p>		
    <p>{{$store.getters['persistedParameter/getUserData'].self_introduction}}</p>
		<p>コメントを残す</p>		
		<textarea v-model="userComment"></textarea>
		<br>
		<button v-on:click="registerComment">コメントを投稿する</button>
		<br>
		
		<table border="1">
	      <thead>
	        <tr>
	          <th>commentNumber</th>
	          <th>commentId</th>
	          <th>投稿日時</th>
	          <th>投稿者ニックネーム</th>
	          <th>コメント</th>
	          <!--<th>投稿者ID</th>-->	          
	          <th>返信</th>
	          <th>reply_comment_id</th>
	          <th>reply_comment_Number</th>		                        
	        </tr>        
	      </thead>
	      <tbody>                	        
          <tr v-for="(element, id) in $store.getters['persistedParameter/getAllCommentData']" v-bind:key="element.commentId">
	          <td>
	          	{{element.commentNumber}}
	          </td>
	        	
	          <td>
	          	{{element.commentId}}
	          </td>
	          <td>
	          	{{element.createdAt}}
	          	
	          	
	          </td>
	          <td>
	          	{{element.nick_name_from}}
	          </td>
	          <td>
	          	{{element.comment}}
	          </td>
	          <!--
	          <td>
	          	{{element.user_id_from}}
	          </td>
	      	  -->	         
	          <td>          	

	          	<router-link v-if="element.replyButtonFlag" v-on:click.native="setCommentData(element)" v-bind:to="{ path: `/reply` }">返信する</router-link>
	          		          		          	
	          </td>
	          <td>
	          	{{element.reply_comment_id}}
	          </td>
	          <td>              
              {{getReplyCommentNumber(element)}}	          
	          </td>
	      	</tr>
	      </tbody>
	  	</table>
	  
	</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {     
  middleware: 'authenticated', 
  data () {
    return {            
     userInfo:"",
     userComment:"",
     //allCommentData:[],
     replyContent:"",
      
    }
  },
  methods:{  	
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
  	setCommentData(element){ 		      
      this.$store.commit('persistedParameter/commentDataSet',element);
  	},  	  	
  	registerComment(){
  		db.collection("user_comment").add({
  			user_id_from:this.$store.state.persistedParameter.userIdPersisted,
  			user_id_to:this.userInfo.user_id,
  			comment:this.userComment,
  			createdAt: new Date(),
            
        })
        .then(() => {
            alert("コメントの登録完了");            
            this.$store.dispatch('persistedParameter/allCommentDataInitAction');
            this.$router.go({path: this.$router.currentRoute.path, force: true});
                        
        })          
        .catch(function(error) {
            alert(error.message)
        });  
  	}, 	
  },
  //   	
  created:function(){    
    this.$store.dispatch('persistedParameter/allCommentDataInitAction');
  },
  mounted () {  
    this.userInfo = this.$store.getters['persistedParameter/getUserData'];
  	
  	let dataStockArray = [];
  	db.collection("user_comment").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();                                       
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
        dataStockArray.sort(sortFunc);

        //コメント一覧を投稿日時でソートするための関数を定義
  	    function sortFunc(a,b){
  	      return b.createdAt - a.createdAt;
  	    }
        
        for(let i=0;i<dataStockArray.length;i++){
        	let month = String(Number(dataStockArray[i].createdAt.getMonth())+1);
        	let dateInfo = dataStockArray[i].createdAt.getFullYear() + "年" + month + "月" + dataStockArray[i].createdAt.getDate() + "日" + dataStockArray[i].createdAt.getHours()+ "時" + dataStockArray[i].createdAt.getMinutes() + "分";
        	dataStockArray[i].createdAt = dateInfo;      		
      	}
      	      	
        //commentNumberの設定
    		for(let i=0;i<dataStockArray.length;i++){
    			dataStockArray[i].commentNumber = i;

    		}        

        //replyButtonFlagの初期化
        for(let i=0;i<dataStockArray.length;i++){
          dataStockArray[i].replyButtonFlag = true;

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
          
        } else {//プロフィールページユーザ以外のユーザAがログインしている場合
          //投稿者がAのコメントをfalseにする
          for(let j=0;j<dataStockArray.length;j++){
            if( dataStockArray[j].user_id_from === this.$store.getters['persistedParameter/getUserIdPersisted'] ){
              dataStockArray[j].replyButtonFlag = false;
            }
          }                  
        }                                    

      	for(let i=0;i<dataStockArray.length;i++){      		
          this.$store.dispatch('persistedParameter/allCommentDataSetAction',dataStockArray[i]);
      	}
        
                 
      })
      .catch(function(error) {
          alert(error.message)
      });  	
  },
}
</script>