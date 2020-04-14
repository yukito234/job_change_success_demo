<template>
  <div>	   	     
    <p>{{$store.state.persistedParameter.isEmpty}}</p>
  	<div v-if="$store.state.persistedParameter.isEmpty">
      <b-button v-b-toggle.collapse-11 variant="primary">プロフィールを登録する</b-button>
      <b-collapse id="collapse-11" class="mt-2">
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
              <b-form-input  v-model="nickName"></b-form-input>
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
                @change="onFileChange"
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
                v-model="selfIntroduction"
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
              <b-button v-on:click="registerProfile">プロフィールを新規登録する</b-button>
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-collapse>
          	    
  	</div>
  	<div v-else>    
      <!--
        以下ボタンを押してもドロップダウンのコンテンツが表示されないことがある
        いったんユーザ一覧のボタンをクリックして、再度このページに戻ると表示される
        firefoxでは、上のif内のb-buttonとb-collapseのidをid="collapse-11"で統一させることで解決した
        ただし、chromeでは解決せず
      -->
      <b-button v-b-toggle.collapse-11 variant="primary">プロフィールを編集する</b-button>
      <b-collapse id="collapse-11" class="mt-2">
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
              <b-form-input  v-model="nickName"></b-form-input>
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
                @change="onFileChange"
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
                v-model="selfIntroduction"
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
              <b-button v-on:click="registerEditedProfile">プロフィールを更新する</b-button>
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-collapse>
        		    		    
  		
  	</div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

export default {  
  data () {
    return {
      file:null,
    	uploadedImage:"",
    	files:"",    	
    	downloadedImage:"",
    	nickName:"",
    	selfIntroduction:"",
    	isEmptyChange:true,
    	editFlag:false,
    	documentId:"", 

    }
  },
  mounted () {      	
    //プロフィールの編集を効率よく行うために、
    //すでにプロフィール情報がDBに登録されているなら取得して表示する
    db.collection("user_profile").get()
      .then((querySnapshot)=>{        
        querySnapshot.forEach((doc)=>{
          const data = doc.data();                              
          //ログインユーザのユーザIDがDBのuser_profileに保存されている場合          
          if(this.$store.state.persistedParameter.userIdPersisted === data.user_id){
          	console.log("data.user_id");
          	console.log(data.user_id);
          	this.$store.commit('persistedParameter/changeIsEmpty',false);
          	this.nickName=data.nick_name;
          	this.downloadedImage=data.image_url;
          	this.selfIntroduction=data.self_introduction;
          	this.documentId =doc.id;          	

          }                 

        });                          
         
      })
      .catch(function(error) {
          alert(error.message)
      });
  },  
  watch:{        
    
  },
  computed:{
     
  },
  methods: {     	
  	editProfile(){
  		this.editFlag = true;

  	},
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
  	onFileChange(e) {            
      this.files = e.target.files || e.dataTransfer.files;            
      console.log("this.files[0]");
      console.log(this.files[0]);
      //画像をアップロードせずにキャンセルした場合、以下のエラーが出る
      //failed to execute 'readAsDataURL' on 'filereader': parameter 1 is not of type 'blob'
      //さらに、this.files[0]=undefinedとなる
      //そこでthis.files[0]が存在する場合のみ画像表示を実行する
      if(this.files[0]){
        this.createImage(this.files[0]);
      } 
      /**/
      else{
        //chromeの場合は、画像をアップロードせずにキャンセルした場合、以下の処理により画像が消える
        //firefoxの場合は、そのまま画像が残る
        this.uploadedImage ="";
      }      
      
    },

    createImage(file) {
      let reader = new FileReader();           
      reader.onload = (e) => {            	
        this.uploadedImage = e.target.result;       
      };
      reader.readAsDataURL(file);
    },    
  },   
}
</script>