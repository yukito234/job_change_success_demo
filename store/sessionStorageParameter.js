/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

export const state = () => ({	

	isExperienceArticles: false,
	allArticlesForGraph: [],
	graphItemData:{},
	graphLabels:[],
	graphQuantity:[],
	graphColor:[],
	graphType: "age",	



})

export const getters = {
	getAllArticlesForGraph(state){
		return state.allArticlesForGraph;


	},
	getGraphType(state){
		return state.graphType;


	},
	getIsExperienceArticles(state){		
		return state.isExperienceArticles;
	},
	getGraphLabels(state){
		return state.graphLabels;


	},
	getGraphQuantity(state){
		return state.graphQuantity;


	},
	getGraphColor(state){
		return state.graphColor;


	},




}

export const mutations ={
	changeIsExperienceArticles(state,flag){

		state.isExperienceArticles = flag;

	},
	allArticlesForGraphGet(state, data){				
		state.allArticlesForGraph.push(data);
	},
	createLabelQuantityColor(state){
		console.log("enter createLabelQuantityColor mutations of sessionStorage");		
		//ラベル配列とデータ配列を初期化		
		state.graphLabels.splice(-state.graphLabels.length);
		state.graphQuantity.splice(-state.graphQuantity.length);

		//ラベル配列とデータ配列を生成
		for(let graphLabel in state.graphItemData){			
			state.graphLabels.push(graphLabel);			
			state.graphQuantity.push(state.graphItemData[graphLabel]);
		}
		
		//カラーパレット(20色)を用意		
		let colorPalette = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6'];
		
		//カラー配列を初期化
		state.graphColor.splice(-state.graphColor.length);

		//ラベルの個数分だけカラーパレットから色を取得
		for(let i=0; i < state.graphLabels.length; i++){
			state.graphColor.push(colorPalette[i]);
		}
	},
	itemCount(state, graphType){
		console.log("enter itemCount mutations of sessionStorage");
		//グラフデータを格納するオブジェクトを初期化
		state.graphItemData = {};						

		//全グラフデータから選択されたグラフタイプにおいて、各項目のデータ数をカウントする
		let key= "";	
		for(let i=0; i < state.allArticlesForGraph.length; i++){
			key = eval(`state.allArticlesForGraph[${i}].` + graphType + ";");			
			if( key !== "" ){
				if( graphType === "study_term"){					
					key = key + "ヶ月";
					let keyCheckFlag = key in state.graphItemData;
				}
				//各項目の個数をカウントする
				let keyCheckFlag = key in state.graphItemData;				
				if(keyCheckFlag){
					state.graphItemData[key] += 1;
				} else {
					state.graphItemData[key] = 1;
				}
			}
		}		
	},
	graphTypeChange(state, graphType){
		state.graphType = graphType;
	},

}

export const actions = {	
	allArticlesForGraphGetAction(context, data){			
		context.commit('allArticlesForGraphGet', data);
	},
	createLabelQuantityColorAction(context){		
		context.commit('createLabelQuantityColor');
	},
	itemCountAction(context, graphType){				
		context.commit('itemCount', graphType);
	},
	graphTypeChangeAction(context, graphType){
		context.commit('graphTypeChange', graphType);

	},
	changeIsExperienceArticlesAction(context, flag){
		context.commit('changeIsExperienceArticles', flag);

	},

}