import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-barchart-label-inside';

  labels: String[] = ['A', 'B', 'C', 'D', 'E', 'G'];
  dataSet1: Number[] = [86, 220, 50, 106, 107, 230];
  dataSet2: Number[] = [40, 114, 15, 16, 24, 60];


  constructor() {
    Chart.register(ChartDataLabels);
  }


  createChart() {
    var chartInstance = new Chart('chartJSContainer', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.dataSet2,
            label: 'Asia',
            backgroundColor: '#7b8dfd',
            base:0, //start value
            // barPercentage:0,
            // datalabels:{
            //   color:'blue',
            //   anchor:'end'
            // },
          },
          {
            data: this.dataSet1,
            label: 'Africa',
            backgroundColor: '#fa9cb0',
            base:0,//start value
            // barPercentage:0,
            // datalabels:{
            //   color:'blue',
            //   anchor:'end'
            // },
            datalabels: {
              labels: {
                value: {
                  color: 'green'
                }
              }
            }
          },
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: false // Make it true to make the overlapping bars visible
          },
          y: {
            stacked: true
          },
        },
        //yAxes: [{ticks: {mirror: true}}]
      },
      plugins: [ChartDataLabels, {
        id:'topLebels',
        afterDatasetDraw(chart, args, pluginOptions) {
          const {ctx, scales :{x, y} } = chart;
          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = 'rgba(255, 26, 104,1)';
          ctx.fillText('19%', x.getPixelForValue(86), chart.getDatasetMeta(1).data[0].y);
          ctx.fillText('30%', x.getPixelForValue(220), chart.getDatasetMeta(1).data[1].y);
          ctx.fillText('30%', x.getPixelForValue(50), chart.getDatasetMeta(1).data[2].y);
          ctx.fillText('20%', x.getPixelForValue(106), chart.getDatasetMeta(1).data[3].y);
          ctx.fillText('40%', x.getPixelForValue(107), chart.getDatasetMeta(1).data[4].y);
          ctx.fillText('32%', x.getPixelForValue(230), chart.getDatasetMeta(1).data[5].y);
        }
      }],
    });


  }

  ngOnInit(): void {
    this.createChart();
  }
}
