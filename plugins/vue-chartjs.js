/* eslint-disable */
// prettier-ignore


//成功 ドーナツ
/*
import Vue from 'vue';
import { Doughnut } from 'vue-chartjs'
Vue.component('doughnut-chart', {    
    extends: Doughnut,
    mounted () {
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
})
*/


//成功　ラインチャート
//https://www.kabanoki.net/4118/
/*
import Vue from 'vue';
import { Line } from 'vue-chartjs'
Vue.component('line-chart', {
    //extends: VueChartJs.Line,
    extends: Line,
    mounted () {
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
})
*/


//失敗
/*
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    })
  }
}
*/




//失敗
//https://qiita.com/kattoon/items/a76caa684261956c900b
/*
import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

Vue.component('doughnut-chart', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});
*/