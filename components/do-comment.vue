<template><!-- eslint-disable --><!-- prettier-ignore -->
  
	<div>
		<h2>コメントを残す</h2> 

       
      <!--
      	<b-overlay :show="show" rounded="sm">
      	</b-overlay>
      -->

        <b-card bg-variant="light" v-if="getIsProfileRegistration">
          
              <b-form-textarea
                id="textarea"
                v-model.trim="userComment"
                placeholder="コメントを入力してください！"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            <div>
              <b-button v-on:click="registerComment" v-bind:disabled="loading" class="submit-button" variant="primary">                                
                <b-spinner small v-show="loading"></b-spinner>
                <span v-show="loading">送信中...</span>
                <span v-show="!loading">コメントを送信</span>
              </b-button>
            </div>
        </b-card>
        <!--

          <b-button v-on:click="registerComment" class="submit-button" variant="primary">コメントを送信</b-button>

          <b-button variant="primary" v-bind:disabled="loading" v-on:click="doSearch" id="search-button">
            <b-spinner small v-show="loading"></b-spinner>
            <span v-show="loading">Loading...</span>
            <span v-show="!loading">検索</span>
          </b-button>

        -->
        <b-card bg-variant="light" v-else>
              <p>コメントを残すには、ダッシュボードページでプロフィール登録をしてください！</p>
              <b-form-textarea
                id="textarea"
                v-model.trim="userComment"
                placeholder="コメントを入力できません。"
                rows="3"
                max-rows="6"
                disabled="disabled"
              ></b-form-textarea>
            <div> 
              <b-button v-on:click="registerComment" v-bind:disabled="!getIsProfileRegistration" class="submit-button">コメントを送信できません</b-button>
            </div>
        </b-card>
      

	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import sanitizeHTML from 'sanitize-html';

export default { 

data(){
	return {
		//show:false,
		userComment:"",
    loading:false,


	}

},

computed:{
    getIsProfileRegistration(){

      //return this.$store.getters['sessionStorageParameter/getLoginUserData'].isProfileRegistration;
      return this.$store.getters['sessionStorageParameter/getLoginUserData'].is_profile_registration;


    },
},

methods:{ 
	async registerComment(){
    this.loading = true;
		//this.show=true;
      console.log("this.userComment in registerComment");
      console.log(this.userComment);


      //コメント欄に文字が入力されていない場合はエラーを出す
      //コメントが入力されていないときはボタンをdisabledの状態にしておく
      //v-modelにtrimを設定しているが、全角空白と半角空白のみを入れて送信したときに
      //以下にキャッチされるか確認する

      if(this.userComment === ""){
        alert("コメントを入力してください！");
        return;
      }
      
      await this.$store.dispatch('registerCommentAction', sanitizeHTML(this.userComment) );
      

      //DBから最新の全コメントを取得する
      await this.$store.dispatch('commentsGetAction');




      //このページに表示すべきコメントデータを取得し、表示用に並べ替え、リターンする処理を行う
      //this.getComments();

      this.$emit('commentRegisteredNotice');





      this.userComment = '';

      this.loading= false;

      alert("コメントの登録完了");

      //this.show=false;
      //リロードする
      //最新のコメントデータをDBから取得する
      //リロードではなく、必要な箇所のみ再描画させる
      //this.$router.go({path: this.$router.currentRoute.path, force: true});


    },


},



}

/*
.submit-button{

  display:block;
  margin-left:auto;
}
.submit-button{

  text-align:right;
}
*/

</script>


<style scoped>
/* prettier-ignore */

.submit-button{

  display:block;
  margin-left:auto;
}

</style>