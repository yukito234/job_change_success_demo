<template><!-- eslint-disable --><!-- prettier-ignore -->
	
	<div>		
			
		
		<h2>返信する</h2>
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
			
			<!--<nuxt-link v-bind:to="{ path: `/id` }">戻る</nuxt-link>-->
		</b-overlay>
	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../../plugins/firebase_config'
import globalNavi from '~/components/global-navi.vue';

export default {  
	middleware: 'authenticated', 
	components:{
	    "global-navi": globalNavi,

	},
	data () {
		return {            			
			show:false,
			//replyComment: ">>" + this.$store.getters['persistedParameter/getCommentData'].comment,
			replyComment:"",
			mainProps:{		        
	        	width: 30,		        
	        	block:false,
	        },

		}
	},
	created:function(){
		console.log(this.$store.getters['persistedParameter/getCommentData']);

	},
	methods:{
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
	},
}	
</script>