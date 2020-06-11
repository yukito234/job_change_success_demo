<template>
	<div class="page-container">
		<!-- eslint-disable --><!-- prettier-ignore -->
					
		
		
		<h2>返信する</h2>
		<b-card >
			<!--
				<b-img :src="$store.getters['sessionStorageParameter/getCommentData'].image_url" v-bind="mainProps" ></b-img>
				<span>{{$store.getters['sessionStorageParameter/getCommentData'].nick_name_from}}</span>
				<p>{{$store.getters['sessionStorageParameter/getCommentData'].comment}}</p>
				<span>{{$store.getters['sessionStorageParameter/getCommentData'].createdAt}}</span>
			-->
			<b-img :src="getComment.image_url" v-bind="mainProps" ></b-img>
			<span>{{getComment.nick_name_from}}</span>
			<p>{{getComment.comment}}</p>
			<span>{{getComment.createdAt}}</span>
		</b-card>


		<p>上のコメントに対して返信します。</p>
		<b-form-textarea
			id="textarea"
			v-model="replyComment"
			placeholder="返信コメントを入力してください..."
			rows="3"
			max-rows="6"
		></b-form-textarea>
		<div>
			<b-button v-on:click="doReply()" class="submit-button">この内容で返信する</b-button>
		</div>					
		
		<div >
			
			<nuxt-link v-bind:to="{ path: `/id` }" class="return-button">戻る</nuxt-link>
		</div>
		
		<!--
		<b-overlay :show="show" rounded="sm">
			<b-card >
				<b-img :src="$store.getters['persistedParameter/getCommentData'].image_url" v-bind="mainProps" ></b-img>
				<span>{{$store.getters['persistedParameter/getCommentData'].nick_name_from}}</span>
				<p>{{$store.getters['persistedParameter/getCommentData'].comment}}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
				<span>{{$store.getters['persistedParameter/getCommentData'].createdAt}}</span>
			</b-card>

			<p>上のコメントに対して返信します。</p>
			<b-form-textarea
				id="textarea"
				v-model="replyComment"
				placeholder="Enter something..."
				rows="3"
				max-rows="6"
			></b-form-textarea>
			<b-button v-on:click="doReply()" >この内容で返信する</b-button>					
			
			<nuxt-link v-bind:to="{ path: `/id` }">戻る</nuxt-link>
		</b-overlay>
	-->
	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import sanitizeHTML from 'sanitize-html';

export default {  
	middleware: 'authenticated', 
	components:{
		

	},
	data () {
		return {            			
			//show:false,
			//replyComment: ">>" + this.$store.getters['persistedParameter/getCommentData'].comment,
			replyComment:"",
			mainProps:{		        
				width: 30,		        
				block:false,
			},

		}
	},
	created:function(){
		//console.log(this.$store.getters['persistedParameter/getCommentData']);

	},
	computed:{
		getComment(){

			return this.$store.getters['sessionStorageParameter/getCommentData'];


		},

	},
	methods:{
		async doReply(){
			//コメントをDBに登録する
			const result = await this.$store.dispatch('replyAction', sanitizeHTML(this.replyComment) );

			if(result === "success"){

				//id.vueに戻ったときに再度DBと通信して、最新のコメントデータを取得する
				this.$store.dispatch('changeIsAllCommentsAction', false);

				//ここでindex.jsのallCommentsを空にする
				//そうしないと、id.vueに戻ったとき、再度DBから全コメントが取得されるので、allCommentsに重複が生じる

				this.$store.dispatch('allCommentsInitAction');



				alert("コメントの返信完了");

				this.replyComment="";

			} else {

				alert(result);
			}
						
		},
		/*
		doReply(){
			this.show=true;			
			db.collection("user_comment").add({
				user_id_from: this.$store.getters['persistedParameter/getCommentData'].user_id_to,	  			
				user_id_to: this.$store.getters['persistedParameter/getCommentData'].user_id_from,	  			
				comment:this.replyComment,
				createdAt: new Date(),
				reply_comment_id: this.$store.getters['persistedParameter/getCommentData'].commentId,	            
			})
			.then(() => {
				alert("コメントの返信登録完了");
				this.show=false;
				//this.$router.go({path: this.$router.currentRoute.path, force: true});	       	                        
			})          
			.catch(function(error) {
				alert(error.message)
			}); 	        
		},
		*/
	},
}



/*
margin-right:0;
text-align:right;
*/	
</script>


<style scoped>

/* prettier-ignore */
.submit-button{

  display:block;
  margin-left:auto;
}

.return-button{

  display:inline-block;
  float:right;
}

</style>