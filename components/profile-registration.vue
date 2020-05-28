<template><!-- eslint-disable --><!-- prettier-ignore -->
  
  <div>	  

    <!--
      <p>{{$store.state.persistedParameter.isEmpty}}</p>
      <div v-if="$store.state.persistedParameter.isEmpty">
        <div v-if="!getIsProfileRegistration">
           <b-button v-b-toggle.collapse-11 variant="primary" v-if="getIsProfileRegistration">プロフィールを編集する</b-button>

    -->


    <!--共通の部品は切り出す-->

    <!--
      <b-button v-b-toggle.collapse-11 variant="primary" >プロフィールを登録する</b-button>
     
      <b-collapse id="collapse-11" class="mt-2">
    -->

  	<div v-if="!getIsProfileRegistration">
      <b-button v-b-toggle.collapse-profile variant="primary" id="profile-open-close-button">プロフィールを登録<b-icon icon="chevron-down" ></b-icon></b-button>
     
      <b-collapse id="collapse-profile" class="mt-2">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="プロフィールの作成"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >

            <b-form-group
              label-cols-sm="3"
              label="ニックネーム:"
              label-align-sm="right"
              
            >
            <!--
              <b-form-input  v-model.trim="nickName"></b-form-input>
              <b-form-input  v-model.trim="getAndSetNickName"></b-form-input>
              <b-form-input  v-bind:value="getNickName" v-on:input="setNickName(newName)"></b-form-input>
            -->
              <b-form-input  v-model.trim="getAndSetNickName"></b-form-input>
              
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="プロフィール画像:"
              label-align-sm="right"
              
            >
            <!--
            @change="onFileChange"
            :name="fileName"
            placeholder="Choose a file or drop it here..."
  
            -->
              <b-form-file

                v-model="file"
                
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                v-on:input="onFileInput"
                
              ></b-form-file>
              <img :src="uploadedImage">
              
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="自己紹介文:"
              label-align-sm="right"
              
            >
            <!--v-model.trim="selfIntroduction"-->

              <b-form-textarea
                id="textarea"
                v-model.trim="getAndSetSelfIntroduction"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label=""
              label-align-sm="right"
              
            >
            <div>
              <b-button v-on:click="registerProfile" id="profile-registration-button" variant="primary">プロフィールを新規登録</b-button>
            </div> 
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-collapse>
          	    
  	</div>


    <!--
        以下ボタンを押してもドロップダウンのコンテンツが表示されないことがある
        いったんユーザ一覧のボタンをクリックして、再度このページに戻ると表示される
        firefoxでは、上のif内のb-buttonとb-collapseのidをid="collapse-11"で統一させることで解決した
        ただし、chromeでは解決せず
      -->
    <!-- <b-button v-b-toggle.collapse-11 variant="primary">プロフィールを編集する</b-button>
      <b-collapse id="collapse-11" class="mt-2">
      
      

       -->
  	<div v-else>    
      
      <b-button v-b-toggle.collapse-profile variant="primary" id="profile-open-close-button">プロフィールを編集<b-icon icon="chevron-down" ></b-icon></b-button>
      <b-collapse id="collapse-profile" class="mt-2">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="プロフィールの編集"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >

            <b-form-group
              label-cols-sm="3"
              label="ニックネーム:"
              label-align-sm="right"
              
            >
              <b-form-input  v-model.trim="getAndSetNickName"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="プロフィール画像:"
              label-align-sm="right"
              
            >
            
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                
                v-on:input="onFileInput"
              ></b-form-file>
              <img :src="uploadedImage">
              
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="自己紹介文:"
              label-align-sm="right"
              
            >
              <b-form-textarea
                id="textarea"
                v-model.trim="getAndSetSelfIntroduction"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label=""
              label-align-sm="right"
              
            >
            <div>
              <b-button v-on:click="updateProfile" id="profile-update-button" variant="primary">プロフィールを更新</b-button>
            </div>
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-collapse>
        		    		    
  		
  	</div>
    
  </div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import _cloneDeep from 'lodash/cloneDeep';

import {  BIcon, BIconX, BIconQuestionCircle, BIconChevronDown  } from 'bootstrap-vue';

export default {  
  components: {    
    BIcon,
    BIconX,
    BIconQuestionCircle,
    BIconChevronDown,
  }, 
  data () {
    return {
      file: null,
    	//file: "",//左のように空で初期化すると、エラーが出るInvalid prop: type check failed for prop "value". Expected File, Array, got String with value ""

      uploadedImage:"",
    	//files:"",    	
    	//downloadedImage:"",
    	nickName:"",
    	selfIntroduction:"",
    	//isEmptyChange:true,
    	editFlag:false,
    	documentId:"", 

      //storedImage: "",
      //storedFile: "",
      //fileName: "ファイルを選択してください",
      /*
      myProfileData:{
        nickName:"",
        imageUrl:"",
        selfIntroduction:"",

      },
      */

    }
  },


  created(){   
    //以下のようにuploadedImageを設定してしまうと、初期状態ではthis.file=nullなのにuploadedImageが存在することとなる
    //紛らわしいので、編集時の初期でプロフィール画像は表示させない
    //this.uploadedImage = this.$store.getters['sessionStorageParameter/getLoginUserProfile'].image_url;


  },
  computed:{
    getIsProfileRegistration(){

      //return this.$store.getters['sessionStorageParameter/getLoginUserData'].isProfileRegistration;
      return this.$store.getters['sessionStorageParameter/getLoginUserData'].is_profile_registration;


    },
    /*
    getNickName(){
      //プロフィール未登録の場合
            //getIsProfileRegistrationはtrueだが、DBからのプロフィール情報のダウンロードに失敗することもある
           
            console.log("Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] )")
            console.log(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ))

            if(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
              console.log("ログインユーザのプロフィール情報はありません");
              return "";

            }



            //const nickName = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name );

            const nickName =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name ;

            console.log("nickName");
            console.log(nickName);            
            
            return nickName;


    },
    */
    /**/
    getAndSetNickName:{
      get(){
           

            //プロフィール未登録の場合
            //getIsProfileRegistrationはtrueだが、DBからのプロフィール情報のダウンロードに失敗することもある
           
            console.log("Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] )")
            console.log(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ))

            if(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
              console.log("ログインユーザのプロフィール情報はありません");
              return "";

            }



            //const nickName = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name );

            const nickName =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name ;

            console.log("nickName");
            console.log(nickName);  

            this.nickName =  nickName;         
            
            return nickName;

        },
        set(newValue){
          console.log("enter getAndSetNickName");
          console.log(newValue);
          this.nickName = newValue;



        }



    },
    
    
    /*
    nickName(){
      //プロフィール未登録の場合
      //getIsProfileRegistrationはtrueだが、DBからのプロフィール情報のダウンロードに失敗することもある
     
      console.log("Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] )")
      console.log(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ))

      if(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
        console.log("ログインユーザのプロフィール情報はありません");
        return "";

      }



      //const nickName = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name );

      const nickName =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name ;

      console.log("nickName");
      console.log(nickName);            
      
      return nickName;


    },
    */
    /*
    nickName:{
        get:function(){
           

            //プロフィール未登録の場合
            //getIsProfileRegistrationはtrueだが、DBからのプロフィール情報のダウンロードに失敗することもある
           
            console.log("Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] )")
            console.log(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ))

            if(Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
              console.log("ログインユーザのプロフィール情報はありません");
              return "";

            }



            //const nickName = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name );

            const nickName =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name ;

            console.log("nickName");
            console.log(nickName);            
            
            return nickName;

        }
        
    },
    */
    getAndSetSelfIntroduction:{
      get(){
           

            //共通の処理はミックスインに切り出す
            //プロフィール未登録の場合
            if( Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
              console.log("ログインユーザのプロフィール情報はありません");
              return "";

            }

            //const selfIntroduction = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction );

            const selfIntroduction =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction ;

            console.log("selfIntroduction");
            console.log(selfIntroduction); 
            
            this.selfIntroduction =selfIntroduction;

            return selfIntroduction;

        },
        set(newValue){
          console.log("enter getAndSetSelfIntroduction");
          console.log(newValue);
          this.selfIntroduction = newValue;



        }



    },
    /*
    selfIntroduction(){
      //共通の処理はミックスインに切り出す
      //プロフィール未登録の場合
      if( Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
        console.log("ログインユーザのプロフィール情報はありません");
        return "";

      }

      //const selfIntroduction = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction );

      const selfIntroduction =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction ;

      console.log("selfIntroduction");
      console.log(selfIntroduction); 
      
      return selfIntroduction;


    },
    */
    /*
    selfIntroduction:{
        get:function(){
           

            //共通の処理はミックスインに切り出す
            //プロフィール未登録の場合
            if( Object.keys( this.$store.getters['sessionStorageParameter/getLoginUserProfile'] ) === 0 ){
              console.log("ログインユーザのプロフィール情報はありません");
              return "";

            }

            //const selfIntroduction = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction );

            const selfIntroduction =  this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction ;

            console.log("selfIntroduction");
            console.log(selfIntroduction); 
            
            return selfIntroduction;

        }
        
    },
    */


   



  },

  
  watch:{        
    
  },
  
  methods: { 
    /*
    setNickName(newName){
      console.log("newName in setNickName");
      console.log(newName);
      this.nickName = newName;

    },  
    */
    
  	editProfile(){
  		this.editFlag = true;

  	},
    async updateProfile(){  


      let data = {};
      data.profile={};

      

      console.log("this.nickName.length:");
      console.log(this.nickName.length);

      console.log("this.selfIntroduction:");
      console.log(this.selfIntroduction);

      //ニックネームと自己紹介文は1文字以上が入力されていること
      //v-modelのtrimを使っているので空白の入力は防げるはず
      if( this.nickName === "" || this.selfIntroduction === "" ){
        

        alert("ニックネームと自己紹介文が空のままでは更新できません");
        return;

      }


      

      //すべての項目に変更がない場合は、DBの更新は行わない
      //更新ボタンもdisabledにしておく
      //プロフィール画像については、URLの情報しかないので、アップロードされたものがsessionのものと同一か判定できない

      console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
      console.log(this.$store.getters['sessionStorageParameter/getLoginUserProfile']);

      /*
      if( 
        this.nickName === this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name &&
        this.selfIntroduction === this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction &&

        this.file === null


        ){

        alert("プロフィールに変更がありません");
        return;

      }
      */
      


      //uploadedImageが空の場合は、session画像のURLをプロフィール画像のURLとする
      //空の場合はプロフィール画像を変更しないと判断する
      //ニックネームと自己紹介文のみを更新する
      if(this.uploadedImage === ""){

        console.log("this.uploadedImageが空です");
        this.uploadedImage = this.$store.getters['sessionStorageParameter/getLoginUserProfile'].image_url;
        console.log(this.uploadedImage);
        //alert("プロフィール画像が選択されていません");
        //return;

      }


      

      if(this.nickName !== this.$store.getters['sessionStorageParameter/getLoginUserProfile'].nick_name){

        data.profile.nick_name = this.nickName;


      }

      if(this.selfIntroduction !== this.$store.getters['sessionStorageParameter/getLoginUserProfile'].self_introduction){

        data.profile.self_introduction = this.selfIntroduction;


      }

      if(this.file !== null){

        data.file = this.file;


      }


      data.profile.user_id = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].user_id );

      data.documentId = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].documentId ); 

        
       console.log("data in profile-registration"); 
       console.log(data); 


      /*
      const data = {
        file:this.file,
        documentId:, this.$store.getters['sessionStorageParameter/getLoginUserProfile'].documentId
        profile:{
          user_id: this.$store.getters['sessionStorageParameter/getLoginUserProfile'].user_id
          nick_name: this.nickName,              
          image_url: 後で指定する
          self_introduction: this.selfIntroduction,
        }       

      };
      */

      await this.$store.dispatch('updateProfileAction', data);

      this.$store.dispatch('allProfilesInitAction');

      //DBから最新の全プロフィールを取得
      //全プロフィールはmemberページに反映されるので、更新後に最新のものをダウンロードする必要がある
      await this.$store.dispatch('allProfilesGetAction');

      console.log("this.$store.getters['getAllProfiles'] after await this.$store.dispatch('allProfilesGetAction')");
      console.log(this.$store.getters['getAllProfiles']);

      //その中からログインユーザーの最新プロフィールをsessionに保存
      this.$store.dispatch('loginUserProfileGetAction');

      console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
      console.log(this.$store.getters['sessionStorageParameter/getLoginUserProfile']);


      this.editFlag = false;


    },
    /*
  	registerEditedProfile(){  	


  		//編集したプロフィールをDBに登録してアップデートする
  		db.collection("user_profile").doc(this.documentId)
        .update({                   
        	nick_name: this.nickName,              
        	image_url: this.downloadedImage,
        	self_introduction: this.selfIntroduction,
          user_name: this.$store.getters['persistedParameter/getNamePersisted']        	

        }).then(function() {
           alert("プロフィールの編集が完了しました");            

        })
        .catch(function(error) {            
            console.error("Error updating document: ", error);
        });                

  		this.editFlag = false;

  	},
    */
    async registerProfile(){


      



      //ニックネームと自己紹介文は1文字以上が入力されていること
      if( this.nickName === "" || this.selfIntroduction === "" || this.file === null ){
        alert("すべての項目が入力必須です");
        return;

      }


      let data = {};

      data.profile={};


      data.profile.nick_name = this.nickName;

       data.profile.self_introduction = this.selfIntroduction;


       data.file = this.file;


       //プロフィール未登録なので以下では取得できない
       //usersテーブルのログインユーザのデータをsessionに保存する際に、ドキュメントIDも保存しておく

      //data.userId = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserProfile'].user_id );

      //プロフィールはまだ存在しないので、getLoginUserDataを使う
      //updateとは式が異なるので注意
      data.profile.user_id = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserData'].uid );


      //getUsersCollectionActionを参照
      data.documentId = _cloneDeep( this.$store.getters['sessionStorageParameter/getLoginUserData'].documentId ); 
      


     console.log("data");
     console.log(data);

  

     
     /*
      const data = {
        file:this.file,
        documentId:, 
        profile:{
          user_id: 
          nick_name: this.nickName,              
          image_url: 後で指定する
          self_introduction: this.selfIntroduction,
        }       

      };
      */

     
      await this.$store.dispatch('registerProfileAction', data);




      this.$store.dispatch('allProfilesInitAction');

      //DBから最新の全プロフィールを取得
      //全プロフィールはmemberページに反映されるので、更新後に最新のものをダウンロードする必要がある
      await this.$store.dispatch('allProfilesGetAction');

      console.log("this.$store.getters['getAllProfiles'] after await this.$store.dispatch('allProfilesGetAction')");
      console.log(this.$store.getters['getAllProfiles']);

      //その中からログインユーザーの最新プロフィールをsessionに保存
      this.$store.dispatch('loginUserProfileGetAction');

      console.log("this.$store.getters['sessionStorageParameter/getLoginUserProfile']");
      console.log(this.$store.getters['sessionStorageParameter/getLoginUserProfile']);


      





      






    },
    /*
  	registerProfile(){
  		//プロフィールの初回登録時の処理

  		const firestorage = firebase.storage();
      //最初に画像をストレージに保存する
      //ストレージへの保存に成功したら、DBに登録する
  		const uploadTask = firestorage        
        .ref(this.files[0].name)
        .put(this.files[0])
        .then(snapshot => {
           
           snapshot.ref.getDownloadURL().then(url => {           	            
            this.downloadedImage = url;                        
            db.collection("user_profile").add({
	            nick_name: this.nickName,              
	            image_url: this.downloadedImage,
	            self_introduction: this.selfIntroduction,	            
	            user_id: this.$store.state.persistedParameter.userIdPersisted,
              user_name: this.$store.getters['persistedParameter/getNamePersisted']
	        })
	        .then(() => {
	            alert("プロフィールの登録完了");	            
	           
	            //リロードして、プロフィール編集の画面に切り替える
	            this.$router.go({path: this.$router.currentRoute.path, force: true});	            
	                      
	        })          
	        .catch(function(error) {
	            alert(error.message)
	        });            
           })           
     	})    	    	      
  	},
    */
    /*
    onFileClick(){
      console.log("enter in onFileClick");
      console.log("this.storedImage before");
      console.log(this.storedImage);


      this.storedImage = this.uploadedImage;

      console.log("this.storedImage after");
      console.log(this.storedImage);



    },  
    */
    //onFileChangeの後に呼ばれる
    onFileInput(){

      console.log("this.file onFileInput");
      console.log(this.file);

      

      if(this.file){
        //this.storedFile = this.file;

        console.log("in if");
        //console.log("this.storedFile");
        //console.log(this.storedFile);
        

        this.createImage(this.file);


      } else{

        this.uploadedImage ="";

        //this.file = this.storedFile;

        //console.log("in else");
        //console.log("this.file ");
        //console.log(this.file);
        //this.createImage(this.storedFile);
      }




    },
    /*
    onFileChange(e) { 

      this.storedImage = this.file;

      console.log("this.file onFileChange");
      console.log(this.file);

      if(this.file){
        //this.createImage(this.file);

      } else{

        //this.createImage(this.storedImage);
      }



    },
    */
    createImage(file) {
      let reader = new FileReader();           
      reader.onload = (e) => {              
        this.uploadedImage = e.target.result; 

        //console.log("this.uploadedImage in createImage");  
        //console.log(this.uploadedImage);      
      };
      reader.readAsDataURL(file);
    },   
    /*
  	onFileChange(e) {  
      //this.storedImage = this.files;

      console.log("this.file before");
      console.log(this.file);

      //console.log("this.storedImage onFileChange");
      //console.log(this.storedImage);

      this.files = e.target.files || e.dataTransfer.files;         

      console.log("this.files[0]");
      console.log(this.files[0]);
      //画像をアップロードせずにキャンセルした場合、以下のエラーが出る
      //failed to execute 'readAsDataURL' on 'filereader': parameter 1 is not of type 'blob'
      //さらに、this.files[0]=undefinedとなる
      //そこでthis.files[0]が存在する場合のみ画像表示を実行する
      if(this.files[0]){
        //this.createImage(this.files[0]);
        //this.file = this.files[0];
      } 
      
      else{

        //this.files[0] = this.file;
        //console.log("in else");  
        //this.uploadedImage =this.storedImage;
        //console.log("this.storedImage[0]"); 
        //console.log(this.storedImage[0]);
        //this.file = this.storedImage[0];

        //this.createImage(this.storedImage[0]);

        //console.log("this.uploadedImage in else");  
        //console.log(this.uploadedImage);

        //chromeの場合は、画像をアップロードせずにキャンセルした場合、以下の処理により画像が消える
        //firefoxの場合は、そのまま画像が残る
        //this.uploadedImage ="";
      }    
      //console.log("this.file after");
      //console.log(this.file);  //this.file beforeと同じ値
      
    },
    */
    /*
    createImage(file) {
      let reader = new FileReader();           
      reader.onload = (e) => {            	
        this.uploadedImage = e.target.result; 

        //console.log("this.uploadedImage in createImage");  
        //console.log(this.uploadedImage);      
      };
      reader.readAsDataURL(file);
    },   
    */ 
  },   
}
</script>


<style scoped>
/* prettier-ignore */
#profile-open-close-button{

    width:400px;

}


#profile-registration-button, #profile-update-button{


    display:block;
    margin-left:auto;
}


</style>