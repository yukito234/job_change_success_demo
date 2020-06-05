<template>
  <div >
  	<!--
  		<b-breadcrumb :items="items"></b-breadcrumb>
		<b-breadcrumb :items="getItems" v-if="checkIsDisplay"></b-breadcrumb>
		v-if="isDisplay"
  	-->
  	<b-breadcrumb :items="items" v-if="isDisplay"></b-breadcrumb>
  	
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import _cloneDeep from 'lodash/cloneDeep';

export default {


data(){
	return {
		items:[],
		isDisplay:false,
		pass:"",



	}
	

},
created(){
	//this.pass = this.$route.name;

},
watch:{


	$route:function(){
		console.log("enter watch in bread-crumb");
		console.log("this.$route");
		console.log(this.$route);
		this.getItems();
		this.checkIsDisplay();

		//console.log("this.isDisplay:");
		//console.log(this.isDisplay);



	},
	/*
	{$route.name}:function(){
		console.log("enter watch in bread-crumb");
		this.getItems();
		this.checkIsDisplay();

		//console.log("this.isDisplay:");
		//console.log(this.isDisplay);



	},
	*/
	/*
	pass:function(){

		this.getItems();
		this.checkIsDisplay();

		//console.log("this.isDisplay:");
		//console.log(this.isDisplay);



	},
	*/


},

methods:{
	/*
	checkIsDisplay(){
		if(this.items.length >= 1){
			this.isDisplay =  true;
		} else{
			this.isDisplay = false;
		}


	},
	*/
	checkIsDisplay(){
		if(this.items.length >= 1){
			this.isDisplay =  true;
			//return true;
		} else{
			this.isDisplay = false;
			//return false;
		}


	},
	async getItems(){

		console.log("enter getItems in bread-crumb.vue");
		this.items.splice(-this.items.length);

		let array=[];
		let nickName="";
		let urlOfThisUser="";
		let allProfiles = [];

		console.log("this.$route.name");
		console.log(this.$route.name);

		switch(this.$route.name){

			case "success-graph":
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: '成功者グラフ',
						active: true
					},	
						
				];
				break;
			case "members":
				
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバーズ',
						active: true
					},	
						
						
				];
				break;		
			case "members-userid":
				//他のメンバーのプロフィールをクリックしたとき、１つ前のプロフィールの名前が表示されてしまう
				//おそらくクリックしたプロフィールの名前がsessionに保存される前に、このページの処理が実行されてしまうためだと考えられる
				//nickName = this.$store.getters['sessionStorageParameter/getClickedProfileData'].nick_name;

				//console.log("nickName:");
				//console.log(nickName);


				//対策として、全プロフィールデータからクリックされたユーザのニックネームを検索する

				console.log("enter case members-userid");

				if( !this.$store.getters['getIsAllProfiles'] ){

					console.log("enter !this.$store.getters['getIsAllProfiles']");

			      this.$store.dispatch('allProfilesInitAction');
			      //全プロフィールデータを取得してindex.jsに保存する
			      await this.$store.dispatch('allProfilesGetAction');

			      //取得が完了したら、フラグをtrueにして、2回目以降のアクセスではDBとのやり取りが発生しないようにする
			      this.$store.dispatch('changeIsAllProfilesAction',true);

			    }

				console.log("this.$route.params.userid:");
				console.log(this.$route.params.userid);


				allProfiles = _cloneDeep( this.$store.getters['getAllProfiles'] );

				console.log("allProfiles:");
				console.log(allProfiles);

				for(let i=0; i<allProfiles.length; i++){

					if(allProfiles[i].user_id === this.$route.params.userid){
						nickName = allProfiles[i].nick_name;

					}
				}


				
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバーズ',
						to: { name: 'members' }
					},	
					{	
						text: nickName,
						active: true
					},	
						
				];
				break;		
			case "members-userid-comments-commentid":
				nickName = this.$store.getters['sessionStorageParameter/getClickedProfileData'].nick_name;
				urlOfThisUser = '/members/' + this.$store.getters['sessionStorageParameter/getClickedProfileData'].user_id;
				console.log("urlOfThisUser");
				console.log(urlOfThisUser);
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバー一覧',
						to: { name: 'members' }
					},	
					{	
						text: nickName,
						//href: urlOfThisUser //
						to: { path: urlOfThisUser }

					},	
					{	
						text: '返信',
						active: true
					},	
				];
				break;
			case "dashboard":
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'ダッシュボード',
						active: true
					},	
						
				];
				break;			
			case "signin-signup":
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'ログインor会員登録',
						active: true
					},	
						
				];
				break;		

		}

		for(let i=0; i<array.length; i++){
			this.items.push(array[i]);
		}

		console.log("this.items:");
		console.log(this.items);

		//this.checkIsDisplay();

		//console.log("this.isDisplay:");
		//console.log(this.isDisplay);


		//return this.items;



	},

},

computed:{
	/*
	getIsDisplay(){
		if(this.items.length >= 1){
			return true;
		}

		return false;


	},
	*/
	/*
	checkIsDisplay(){
		if(this.items.length >= 1){
			//this.isDisplay =  true;
			return true;
		} else{
			//this.isDisplay = false;
			return false;
		}


	},
	*/
	/*
	getItems(){

		console.log("enter getItems in bread-crumb.vue");
		this.items.splice(-this.items.length);

		let array=[];
		let nickName="";
		let urlOfThisUser="";

		switch(this.$route.name){

			case "success-graph":
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: '成功者グラフ',
						active: true
					},	
						
				];
				break;
			case "members":
				
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバーズ',
						active: true
					},	
						
						
				];
				break;		
			case "members-userid":
				nickName = this.$store.getters['sessionStorageParameter/getClickedProfileData'].nick_name;
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバーズ',
						to: { name: 'members' }
					},	
					{	
						text: nickName,
						active: true
					},	
						
				];
				break;		
			case "members-userid-comments-commentid":
				nickName = this.$store.getters['sessionStorageParameter/getClickedProfileData'].nick_name;
				urlOfThisUser = '/members/' + this.$store.getters['sessionStorageParameter/getClickedProfileData'].user_id;
				console.log("urlOfThisUser");
				console.log(urlOfThisUser);
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'メンバー一覧',
						to: { name: 'members' }
					},	
					{	
						text: nickName,
						//href: urlOfThisUser //
						to: { path: urlOfThisUser }

					},	
					{	
						text: '返信',
						active: true
					},	
				];
				break;
			case "dashboard":
				array = [		
					{	
						text: 'トップ',
						to: { name: 'index' }
					},	
					{	
						text: 'ダッシュボード',
						active: true
					},	
						
				];
				break;			

		}

		for(let i=0; i<array.length; i++){
			this.items.push(array[i]);
		}

		console.log("this.items:");
		console.log(this.items);

		//this.checkIsDisplay();

		console.log("this.isDisplay:");
		console.log(this.isDisplay);


		return this.items;



	},
	*/




},






}


</script>

<style scoped>

#bread-crumb{

	
	color:red;
}


/*

width:60%;
font-size:10px;
*/
</style>