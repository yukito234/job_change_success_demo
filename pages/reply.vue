<template>
	<div>		
		<global-navi></global-navi>
		<nuxt-link v-bind:to="{ path: `/id` }">個別ページに戻る</nuxt-link>
		<br>
		<h2>返信する</h2>
		<p>以下の内容に対して返信します</p>					
		<p>commentNumber:{{ $store.getters['persistedParameter/getCommentData'].commentNumber }}</p>
		<p>commentId:{{ $store.getters['persistedParameter/getCommentData'].commentId }}</p>
		<p>投稿日時:{{ $store.getters['persistedParameter/getCommentData'].createdAt }}</p>
		<p>投稿者ニックネーム:{{ $store.getters['persistedParameter/getCommentData'].nick_name_from }}</p>
		<p>コメント:{{ $store.getters['persistedParameter/getCommentData'].comment }}</p>		
		<textarea v-model="replyComment"></textarea>
		<button v-on:click="doReply()">この内容で返信する</button>
	</div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import globalNavi from '~/components/global-navi.vue';

export default {  
	//middleware: 'authenticated', 
	components:{
	    "global-navi": globalNavi,

	 },
	data () {
		return {            			
			replyComment: ">>" + this.$store.getters['persistedParameter/getCommentData'].comment,

		}
	},
	methods:{
		doReply(){			
	  		db.collection("user_comment").add({
	  			user_id_from: this.$store.getters['persistedParameter/getCommentData'].user_id_to,	  			
	  			user_id_to: this.$store.getters['persistedParameter/getCommentData'].user_id_from,	  			
	  			comment:this.replyComment,
	  			createdAt: new Date(),
	  			reply_comment_id: this.$store.getters['persistedParameter/getCommentData'].commentId,	            

	        })
	        .then(() => {
	            alert("コメントの返信登録完了");
	            //this.$router.go({path: this.$router.currentRoute.path, force: true});	       	                        
	        })          
	        .catch(function(error) {
	            alert(error.message)
	        }); 	        
	  	},
	},
}	
</script>