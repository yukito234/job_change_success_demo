<template><!-- eslint-disable --><!-- prettier-ignore -->
  
	<div>    
    <p>グラフタイプ:</p>
    <b-form-select v-model="graphSelection" :options="optionsOfgraphSelection" class="select-element"></b-form-select>
    <!--
      
      <span>{{graphSelection}}</span>
      <span>{{graphChange}}</span>
    -->    
    
    
	</div>
</template>


<script>
// prettier-ignore
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

      //グラフ描画に必要なデータをindex.jsに保存しない場合
    	//
      graphSelection: 'age',

    }
  },  
  created(){
    this.$emit('graphChangeNoticeToDoughnutGraphSection', this.graphSelection);
  },
  methods: {
  },
  computed:{
    //グラフ描画に必要なデータをすべてindex.jsに保存する場合
    /*
    graphSelection:{        
        get:function(){
            console.log("this.$store.getters['getGraphType'] in doughnut-graph-select");
            console.log(this.$store.getters['getGraphType']);


            return this.$store.getters['getGraphType'];
        },        
        set:function( graphType ){
          //グラフタイプが切り替わったときの挙動
          console.log("graphType in doughnut-graph-select");
          console.log(graphType);

          //storeのgraphTypeを切り替える
          this.$store.dispatch('graphTypeChangeAction', graphType);

          //選択されたgraphTypeのデータ数を集計
          this.$store.dispatch('itemCountAction', this.graphSelection);
          //円グラフの描画に必要なラベル、データ、配色を用意する
          this.$store.dispatch('createLabelQuantityColorAction');



        },        
    },
    */
    //現在のグラフタイプを返す
    /*
  	graphChange(){ 				
  		return this.graphSelection;

  	},
    */
    
    
  },
  watch:{
    //グラフ描画に必要なデータをindex.jsに保存しない場合
    graphSelection:function(){
      this.$emit('graphChangeNoticeToDoughnutGraphSection', this.graphSelection);


    },

    
  },
}
</script>



<style scoped>
/* prettier-ignore */

.select-element{

  width: 300px;
  display:block;
}

</style>
