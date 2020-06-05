<template>  
	<div>
    <!-- eslint-disable --><!-- prettier-ignore -->
    <div>
		  <h2 class="h2title">お気に入り記事</h2>
      <b-icon icon="question-circle" v-b-modal.modal-like-article-title></b-icon>
      <b-modal id="modal-like-article-title" ok-only>
        <p class="my-4">
          こちらの会員さんのお気に入りの記事をチェックできます。
          <br>お気に入り記事はダッシュボードで登録できますよ！
        </p>
      </b-modal>
    </div>

    <!--
      <p>あなたのお気に入り記事を他のメンバーに紹介できます。<br>
        ダッシュボードページでお気に入り記事を登録しましょう！！
      </p>
    -->


      
      <b-table    
        v-if="getIsTableDisplay"        
        :items="likeArticles" 
        :fields="fieldsOfLikeArticle"
        responsive="sm"                       
        >
        <template v-slot:cell(titleLink)="data">
            <a v-bind:href="data.item.url">{{data.item.title}}</a>
            
        </template>
        
        <!--
          '開く<b-icon icon="question-circle" ></b-icon>'
          <span v-if="row.detailsShowing">aa</span>

        -->
        <template v-slot:cell(detailButton)="row" >
            <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="primary">
            
              {{ row.detailsShowing ? '閉じる' : '開く'}}<b-icon v-if="!row.detailsShowing" icon="chevron-down" ></b-icon>
              <b-icon v-if="row.detailsShowing" icon="chevron-up" ></b-icon>
              
            </b-button>               
            
        </template>

        <template v-slot:row-details="row">
            <b-card>
              <!--<b-col sm="3" class="text-sm-right"><b>おすすめする人:</b></b-col>
              <b-col sm="3" class="text-sm-right"><b>この記事を読んだ方がいい人:</b></b-col>
              -->
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>おすすめする人:</b></b-col>
                
                <b-col>{{ row.item.recommendation }}</b-col>                
                
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>コメント:</b></b-col>
                
                <b-col>{{ row.item.free_text_area }}</b-col>                                  
          
              </b-row>  
                         
              
            </b-card>
        </template>
      </b-table> 
	</div>
</template>

<script>
// prettier-ignore
/* eslint-disable */
import _cloneDeep from 'lodash/cloneDeep';

import {  BIcon, BIconX, BIconQuestionCircle, BIconChevronDown, BIconChevronUp  } from 'bootstrap-vue';

export default { 
  components: {
      BIcon,
      BIconX,
      BIconQuestionCircle,
      BIconChevronDown,
      BIconChevronUp,
      

  },
data () {
	return { 
		likeArticles:[],
		fieldsOfLikeArticle:[            
	        {
	          key:'titleLink',
	          label:'記事タイトル',
	        },
	        {
	          key:'detailButton',
	          //label:'詳細',
            label:'コメント',
	        },               

	      ],  
	}

},
created(){
	this.getLikeArticles();
},
computed:{
	getIsTableDisplay(){

        if(this.likeArticles.length >= 1){
          return true;
        }
        return false;
    },

},
methods:{  
	getLikeArticles(){

      //このページユーザのお気に入り記事を格納する配列を初期化
      this.likeArticles.splice(-this.likeArticles.length);

      //全お気に入り記事のデータ
      //this.likeArticlesにpushするため、ディープコピーをとっておく      
      const allLikeArticles = _cloneDeep(this.$store.getters['getAllLikeArticles']);

      //このページユーザのプロフィール情報（ユーザーIDが必要）
      const clickedProfileData = this.$store.getters['sessionStorageParameter/getClickedProfileData'];

      //storeの全お気に入り記事のデータより、このページのお気に入り記事データを抽出する
      for(let i=0; i<allLikeArticles.length; i++){

        if(allLikeArticles[i].user_id !== undefined && 
          allLikeArticles[i].user_id === clickedProfileData.user_id){  


          this.likeArticles.push(allLikeArticles[i]);

        }


      }

      console.log("this.likeArticles");
      console.log(this.likeArticles);

      return this.likeArticles;



    }, 


},

}

</script>

<style scoped>
/* prettier-ignore */

.h2title{

  display: inline-block;
}

</style>