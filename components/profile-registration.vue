<template>
  <div>	   	 
  	<div v-if="$store.state.persistedParameter.isEmpty">           
	    <h2>プロフィール作成</h2>
	    <br>
	    <h3>ニックネームを入力してください</h3>    
	    <input type="text" v-model="nickName">  
	    <br>
	    <h3>画像をアップロードしてください</h3>
	    <img :src="uploadedImage">
	    <!--<img :src="downloadedImage">-->
	    <br>
	    <input type="file" accept="image/*" @change="onFileChange" >
	    <br>
	    <h3>自己紹介文を入力してください</h3>    
	    <textarea v-model="selfIntroduction"></textarea>
	    <br>
	    <button v-on:click="registerProfile">プロフィールを登録する</button>   	    	    
	</div>
	<div v-else>
		<h2>プロフィールの編集</h2>
		<button v-on:click="editProfile">プロフィールを編集する</button>

	    <div v-if="editFlag">
		    <h3>ニックネームを編集してください</h3>    
		    <input type="text" v-model="nickName">  
		    <br>
		    <h3>新たに画像をアップロードしてください</h3>
		    <img :src="uploadedImage">		    
		    <!--<img :src="downloadedImage">-->
		    <br>
		    <input type="file" accept="image/*" @change="onFileChange" >
		    <br>
		    <h3>自己紹介文を編集してください</h3>    
		    <textarea v-model="selfIntroduction"></textarea>
		    <br>
		    <button v-on:click="registerEditedProfile">編集したプロフィールを登録する</button>   		    		    
		</div>
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
  		
  		db.collection("user_profile").doc(this.documentId)
        .update({                   
        	nick_name: this.nickName,              
        	image_url: this.downloadedImage,
        	self_introduction: this.selfIntroduction,        	

        }).then(function() {
           alert("プロフィールの編集が完了しました");            

        })
        .catch(function(error) {            
            console.error("Error updating document: ", error);
        });                

  		this.editFlag = false;

  	},
  	registerProfile(){
  		
  		const firestorage = firebase.storage();
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
	            user_id: this.$store.state.persistedParameter.userIdPersisted
	        })
	        .then(() => {
	            alert("プロフィールの登録完了");	            
	            //登録用の入力ボックスの内容を空にする
	            /*
	            this.uploadedImage="";		    	
		    	this.nickName="";
		    	this.selfIntroduction="";
		    	*/
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
      this.createImage(this.files[0]);
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