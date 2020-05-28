<template><!-- eslint-disable --><!-- prettier-ignore -->
	

	// prettier-ignore
	/* prettier-ignore */
	<div>
		<div>  
			<h2 class="h2title">未経験から転職に成功した人のデータ</h2>
			<b-icon icon="question-circle" v-b-modal.modal-success-graph-title></b-icon>
	        <b-modal id="modal-success-graph-title" ok-only>
	          <p class="my-4">転職成功者のデータ（年齢・学歴・勉強期間・スクール有無・転職先）をまとめたので、
	          <br>あなたが気になる項目をチェックしてみてください。</p>
	        </b-modal>
	        
	    </div>
	    
        
      	<!--
      		<p>転職成功者のデータ（年齢・学歴・勉強期間・スクール有無・転職先）をまとめたので、
	          <br>あなたが気になる項目をチェックしてみてください。
	        </p>
      	<doughnut-graph class="small" v-bind:chart-data="datacollection"></doughnut-graph>  
		{{datacollection}}
		<span>datacollectionChange:{{datacollectionChange}}	</span>

		<doughnut-graph class="small" v-bind:chart-data="datacollection"></doughnut-graph>
      	 -->
      	
      	<doughnut-graph id="doughnut-graph" v-bind:chart-data="datacollectionChange" v-bind:graph-type="graphType" ></doughnut-graph>


        <!--
        	<doughnut-graph-select v-on:graphChangeNotice="redrawGraph"></doughnut-graph-select>
        	

        	<doughnut-graph-select ></doughnut-graph-select>

        -->
        <doughnut-graph-select v-on:graphChangeNoticeToDoughnutGraphSection="changeGraphData"></doughnut-graph-select>
        


	</div>


</template>

<script>
// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'

import DoughnutGraph from '~/components/doughnut.vue'
import DoughnutGraphSelect from '~/components/doughnut-graph-select.vue'

import {  BIcon, BIconX, BIconQuestionCircle  } from 'bootstrap-vue';

export default {
	//props: ['chartData'], 
	components: {        
    
		BIcon,
	    BIconX,
	    BIconQuestionCircle,
	    'doughnut-graph': DoughnutGraph,
	    'doughnut-graph-select': DoughnutGraphSelect,    
	    

	},
	data () {
	    return {
	      //datacollection: this.chartData,
	      datacollection: null,

	      //グラフ描画に必要なデータをindex.jsに保存しない場合
	      graphLabels:[],
		  graphQuantity:[],
		  graphColor:[],
		  graphItemData:{},
		  graphType: null,
	      
	      
	      
	    }
	}, 
	computed:{
		//グラフ描画に必要なデータをindex.jsに保存しない場合
		datacollectionChange(){ 
	  		this.datacollection = {                           
		        labels: this.graphLabels,          
		        datasets: [
		          {                          
		            data: this.graphQuantity,                          
		            backgroundColor: this.graphColor,              
		          }
		        ]                    
		    }	
	  		console.log("this.datacollection of datacollectionChange in doughnut-graph-section");	
	  		console.log(this.datacollection);	





	  		return this.datacollection;

	  	},

		//グラフ描画に必要なデータをすべてindex.jsに保存する場合
	    
	    /*
	  	datacollectionChange(){ 
	  		this.datacollection = {                           
		        labels: this.$store.getters['getGraphLabels'],          
		        datasets: [
		          {                          
		            data: this.$store.getters['getGraphQuantity'],                          
		            backgroundColor: this.$store.getters['getGraphColor'],              
		          }
		        ]                    
		    }	
	  		console.log("this.datacollection of datacollectionChange in doughnut-graph-section");	
	  		console.log(this.datacollection);	





	  		return this.datacollection;

	  	},
	  	*/
	    
	    
	},
	created(){
		
	    


	},
	/*
	mounted () { 

	    
	},
	*/
	methods: {
		
		changeGraphData(graphType){
			console.log("changeGraphData is called");	
			//再描画に必要な処理を行う
			this.graphType = graphType;
			this.itemCount(graphType);
			this.createLabelQuantityColor();






		},
		createLabelQuantityColor(){		
			//ラベル配列とデータ配列を初期化		
			this.graphLabels.splice(-this.graphLabels.length);
			this.graphQuantity.splice(-this.graphQuantity.length);

			//ラベル配列とデータ配列を生成
			for(let graphLabel in this.graphItemData){			
				this.graphLabels.push(graphLabel);			
				this.graphQuantity.push(this.graphItemData[graphLabel]);
			}
			
			//カラーパレット(20色)を用意		
			const colorPalette = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6'];
			
			//カラー配列を初期化
			this.graphColor.splice(-this.graphColor.length);

			//ラベルの個数分だけカラーパレットから色を取得
			for(let i=0; i < this.graphLabels.length; i++){
				this.graphColor.push(colorPalette[i]);
			}
		},
		itemCount(graphType){

			console.log("enter itemCount");	
			//グラフデータを格納するオブジェクトを初期化
			this.graphItemData = {};						

			//全グラフデータから選択されたグラフタイプにおいて、各項目のデータ数をカウントする
			let key= "";	

			const allArticlesForGraph = this.$store.getters['getAllArticlesForGraph'];

			console.log("allArticlesForGraph");	
			console.log(allArticlesForGraph);

			for(let i=0; i < allArticlesForGraph.length; i++){


				key = allArticlesForGraph[i][graphType];

				



				console.log("key");
				console.log(key);

				
				

				if( key !== "" ){
					if( graphType === "study_term"){					
						key = key + "ヶ月";
						let keyCheckFlag = key in this.graphItemData;
					}
					//各項目の個数をカウントする
					let keyCheckFlag = key in this.graphItemData;				
					if(keyCheckFlag){
						this.graphItemData[key] += 1;
					} else {
						this.graphItemData[key] = 1;
					}
				}
			}		
		},

	} 




}


</script>

<style scoped>
/* prettier-ignore */

#doughnut-graph{

	width:60%;

}

.h2title{

  display: inline-block;
}

</style>