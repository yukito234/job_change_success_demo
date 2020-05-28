<script>// prettier-ignore
/* eslint-disable */
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import Vue from 'vue';



export default {
  extends: Doughnut,
  mixins: [reactiveProp],  
  props: ['chartData','graphType'], 

  watch:{
  	//グラフデータの更新を検知して、再描画
    //グラフデータはsuccess-graph.vueから送られてくる
  	chartData:function(){ 	
      console.log("enter chartData of watch in doughnut.vue");  	  		  		
  		this.updateGraph();
  	},
  },
  data(){
  	return {
  		//グラフのオプション設定
  		options : {
	        responsive: true,
	        title: {
	            display: true,	            
	            //グラフ描画に必要なデータをすべてindex.jsに保存する場合
              //text: this.$store.getters['getGraphType'],

              text: this.graphType,


	        },
	        legend: {
	          position: 'right' 
	        }
	    }
  	}
  },
  methods:{  	
	  updateGraph(){  	
      console.log("enter updateGraph in doughnut.vue"); 	
      //グラフタイプの切り替えをoptionに反映
      //Vue.set(this.options.title, 'text', this.$store.state.graphType);

      //textプロパティは初めから設定されているので、Vue.setを使わずとも以下の記述で更新できる

      //グラフ描画に必要なデータをすべてindex.jsに保存する場合
      //this.options.title.text = this.$store.getters['getGraphType'];

      this.options.title.text = this.graphType;

      //再描画の実行
    	this.renderChart(this.chartData ,this.options);
  	},

  },  
  mounted() {   
    console.log("enter mounted  in doughnut.vue");           
    this.renderChart(this.chartData ,this.options);
  },  
 

}

</script>