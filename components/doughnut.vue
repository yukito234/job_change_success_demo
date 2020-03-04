<script>
import firebase from 'firebase'
import db from '../plugins/firebase_config'
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import Vue from 'vue';

export default {
  extends: Doughnut,
  mixins: [reactiveProp],  
  props: ['chartData'], 

  watch:{
  	//グラフデータの更新を検知して、再描画
  	chartData:function(){ 		  		  		
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
	            text: this.$store.state.graphType,
	        },
	        legend: {
	          position: 'right' 
	        }
	    }
  	}
  },
  methods:{  	
	updateGraph(){  		
    //グラフタイプの切り替えをoptionに反映
    //Vue.set(this.options.title, 'text', this.$store.state.graphType);

    //textプロパティは初めから設定されているので、Vue.setを使わずとも以下の記述で更新できる
    this.options.title.text = this.$store.state.graphType;

    //再描画の実行
  	this.renderChart(this.chartData ,this.options);
  	},

  },  
  mounted() {             
    this.renderChart(this.chartData ,this.options);
  },  
 

}

</script>