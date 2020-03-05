<template>
	<div>
    <h2>Qiitaにて体験記を探す</h2>
    <p>検索キーワードのヒント</p>
		<label>
      <input type="checkbox" v-model="suggestKeywords" value="未経験">未経験  
    </label> 
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="転職">転職  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="web">web  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="エンジニア">エンジニア  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="成功">成功  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="体験">体験  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="自社開発">自社開発  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="フロントエンド">フロントエンド  
    </label>
    <label>
      <input type="checkbox" v-model="suggestKeywords" value="バックエンド">バックエンド  
    </label>

		<p>チェックを入れたキーワード:{{ suggestKeywords }}</p>
    <input type="text" v-model="searchBox" >  
    <!--<input type="text" v-model="searchBox2" >-->

    <button type="button" v-on:click="doSearch">検索する</button>
    <p>検索ボックスの内容:{{ searchBoxContent }}</p>
    <div>
      <select v-model="sortType">     
        <option value="relationSort">関連順</option>
        <option value="newSort">新着順</option>
        <option value="likeSort">いいね順</option>
        
      </select>   
      <span>{{ sortChange }}</span>
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>更新日</th>
          <th>記事タイトル</th>
          <th>いいね数</th>                    
        </tr>        
      </thead>
      <tbody>                
        <tr v-for="element in allArticleDataForDisplay" v-bind:key="element.url">
          <td>
            {{ element.updated_at.slice(0,10) }}</a>
          </td>
          <td>
            <a v-bind:href="element.url">{{ element.title }}</a>
          </td>
          <td>
            {{ element.likes_count }}</a>
          </td>                    
        </tr>
      </tbody>
    </table>
    <div>
      <el-pagination background layout="prev, pager, next" v-bind:total="allArticleData.length" v-bind:page-size="10" @current-change="onchange">
      </el-pagination>
    </div>
	</div>
</template>

<script>
/* eslint-disable */

export default {  
  data () {
    return {
    	suggestKeywords: [], //キーワード候補の格納用
      allArticleData:[], //Qiitaから取得する全データの格納用
      searchBoxContent: "", 
      searchBox:"",
      searchBoxContentArray:[],
      allArticleDataForDisplay:[], //表示する記事データ格納用
      sortType: "relationSort",
      allArticleDataSorted: [],//並べ替え後のデータ格納用
      pageNum: 1,//ページネーションの現在ページ

    }
  },  
  watch:{    
    suggestKeywords:function(){      
      this.searchBox = this.suggestKeywords.join(" ");
      //console.log("this.searchBox:");
      //console.log(this.searchBox);
    },
    searchBox( val ){
      //console.log("val:");
      //console.log(val);
      this.searchBoxContent = val;
      //console.log("this.searchBoxContent:");
      //console.log(this.searchBoxContent);
      
      this.searchBoxContentArray = this.searchBoxContent.split(/\s+/);        
      //console.log("this.searchBoxContentArray:");
      //console.log(this.searchBoxContentArray);
    },
    sortChange:function(){
      console.log("sortChange called in watch");    
      //Qiitaのデータをソート用配列に格納する
      let dataStoredArray = this.allArticleDataSorted.slice(0, this.allArticleDataSorted.length);
      //ソートを実行
      if(this.sortType === "likeSort"){
        dataStoredArray.sort(likesSortFunc);

      } else if(this.sortType === "newSort"){
        dataStoredArray.sort(dateSortFunc);

      } else {
        dataStoredArray = this.allArticleData.slice(0, this.allArticleData.length);

      }      
      //ソート用の関数を定義
      function likesSortFunc(a,b){
        return b.likes_count - a.likes_count;
      }

      function dateSortFunc(a,b){
        return (a.updated_at < b.updated_at ? 1 : -1);
      }      

      //ソートしたデータをリアクティブな配列に格納
      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
      for(let j=0; j<dataStoredArray.length; j++){
        this.allArticleDataSorted.push(dataStoredArray[j]);
      }       
      this.onchange(this.pageNum);
      //this.onchange(1);
    }
    
  },
  computed:{
    sortChange(){        
      return this.sortType;

    },          
  },
  methods: {   
    onchange( page ){
      //console.log("page in onchange");
      //console.log(page);
      this.pageNum = page;
      let data = this.getRangeByPage(page);

      //表示用配列の初期化
      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);
      for(let j=0; j<data.length; j++){
        this.allArticleDataForDisplay.push(data[j]);
      } 
    },
    getRangeByPage( page ){
       //1ページの表示数
       const SIZE = 10;
       //return this.allArticleData.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
       return this.allArticleDataSorted.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
    },
    async doSearch(){
      //配列の初期化
      this.allArticleData.splice(-this.allArticleData.length);
      this.allArticleDataSorted.splice(-this.allArticleDataSorted.length);
      this.allArticleDataForDisplay.splice(-this.allArticleDataForDisplay.length);

      let urlParameter ='';
      let url ='';      
      const pageMax = 5;
      //pageMaxの決め方
      /*
      Qiitaから取得する記事数の最大値(予想)は、現状で約500件
      title:未経験 478
      title:転職 269

      QiitaAPIマニュアルよりper_page=100(MAX)なので、pageMax=5としておけば必要な記事をすべて取得できる
      pageMax=5
      per_page=100 
      */
      
      for(let i=0; i<this.searchBoxContentArray.length; i++){
        if(i === this.searchBoxContentArray.length-1 ){
          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i];
        } else{
          urlParameter = urlParameter + "title:" + this.searchBoxContentArray[i] + "+";
        }        
      }      
      //console.log("urlParameter=");
      //console.log(urlParameter);

      url = "https://qiita.com/api/v2/items?query=" + urlParameter;      
      //console.log("url=");
      //console.log(url);      
     
      for(let i=0; i<pageMax; i++){
        url = "https://qiita.com/api/v2/items?query=" + urlParameter + `&page=${i+1}&per_page=100`;
        let result = await this.$axios.$get(url);
        //console.log("result=");
        //console.log(result);

        if(result===[]){
          break;
        }
        for(let j=0; j<result.length; j++){
          this.allArticleData.push(result[j]);
          this.allArticleDataSorted.push(result[j]);
        }        
      }                

      //console.log("this.allArticleData[0]=");
      //console.log(this.allArticleData[0]);
      //{…}

      let dataPage1 = this.getRangeByPage(1);
      //console.log("dataPage1=");
      //console.log(dataPage1);
      for(let j=0; j<dataPage1.length; j++){
        this.allArticleDataForDisplay.push(dataPage1[j]);      
      }  
      //console.log("this.allArticleDataForDisplay=");
      //console.log(this.allArticleDataForDisplay);      
    },
  },   
}
</script>