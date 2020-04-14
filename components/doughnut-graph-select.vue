<template>
	<div>    
    <p>グラフタイプを選択してください。</p>
    <b-form-select v-model="graphSelection" :options="optionsOfgraphSelection"></b-form-select>
    <span>{{graphChange}}</span>
    
	</div>
</template>

<script>
/* eslint-disable */
export default {  
  data () {
    return {
      
      optionsOfgraphSelection:[
        { value: 'age', text: '年齢' },
        { value: 'educational_background', text: '学歴' },
        { value: 'study_term', text: '勉強期間' },
        { value: 'school_presence', text: 'スクール有無' },
        { value: 'company', text: '転職先' },


      ],
    	graphSelection: 'age',

    }
  },  
  methods: {
  },
  computed:{
    //現在のグラフタイプを返す
  	graphChange(){ 				
  		return this.graphSelection;

  	},
    graphChangeOfBootstrap(){
      return this.graphSelectionOfBootstrap;

    },
    
  },
  watch:{
    //グラフタイプが切り替わったときの挙動
  	graphChange:function(){
  		console.log("graphChange called in watch");
  		
  		//storeのgraphTypeを切り替える
  		this.$store.dispatch('graphTypeChangeAction', this.graphSelection);

  		//選択されたgraphTypeのデータ数を集計
  		this.$store.dispatch('itemCountAction', this.graphSelection);

  		//円グラフの描画に必要なラベル、データ、配色を用意する
  		this.$store.dispatch('createLabelQuantityColorAction');

  		//再描画の準備が整ったことを、親のsuccess-graph.vueに知らせる
  		this.$emit('graphChangeNotice');

  	}
  },
}
</script>