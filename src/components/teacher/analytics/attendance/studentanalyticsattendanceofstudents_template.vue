<template>
<highcharts :options="options"  style="height: 700px; width:1000px "></highcharts>
</template>
<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        data(){
            return{
                options:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0
                        },
                        title: {
                         text: 'Attendance'
                        },
                        legend: {
                            enabled: true
                            },
                        xAxis: {
                            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                        },

                        yAxis: {
                            categories:  ['Mohan', 'Gayatri', 'Yamini', 'Rohith', 'Mounika', 'Surya', 'Ravinder', 'Tanmai', 'Nikitha', 'Vinitha'],
                            title: null
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.yAxis.categories[this.point.y]+ '</b> Present for <br><b>' +
                                this.point.value+' days '+ '</b> in <b>' +this.series.xAxis.categories[this.point.x] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:30,
                            minColor: '#D1C4E9',
                            maxColor: '#673AB7'
                        },

    
                        // legend: {
                        //     align: 'right',
                        //     layout: 'vertical',
                        //     margin: 0,
                        //     verticalAlign: 'top',
                        //     y: 25,
                        //     symbolHeight: 300
                        // },

                        series: [{
                            name: 'Marks per Student',
                            
                            borderWidth: 0.5,
                            data: [[0, 0, 25], [0, 1, 18], [0, 2, 8], [0, 3, 20], [0, 4, 22],[0,5,25],[0,6,30],[0, 7, 10], [0, 8, 17], [0, 9, 31], 
                                    [1, 0, 30], [1, 1, 20], [1, 2, 25], [1, 3,30], [1, 4, 25],[1,5,17],[1,6,18],[1, 7, 20], [1, 8, 25], [1, 9, 28], 
                                    [2, 0, 31], [2, 1, 26], [2, 2, 21], [2, 3, 30], [2, 4, 30],[2,5,30],[2,6,27],[2, 7, 26], [2, 8, 25], [2, 9, 18],
                                    [3, 0, 30], [3, 1, 20], [3, 2, 28], [3, 3, 30], [3, 4, 25],[3,5,27],[3,6,30],[3, 7, 31], [3, 8, 22], [3, 9, 30], 
                                    [4, 0, 30], [4, 1, 25], [4, 2, 28], [4, 3, 19], [4, 4, 28],[4,5,30],[4,6,14],[4, 7, 11], [4, 8, 29], [4, 9, 28],
                                    [5, 0, 27], [5, 1, 28], [5, 2, 12], [5, 3, 20], [5, 4, 29],[5,5,31],[5,6,18],[5, 7, 20], [5, 8, 29], [5, 9, 30],
                                    [6, 0, 28], [6, 1, 26], [6, 2, 14], [6, 3, 19], [6, 4, 22],[6,5,26],[6,6,30],[6, 7, 26], [6, 8, 25], [6, 9, 30],
                                    [7, 0, 31], [7, 1, 21], [7, 2, 22], [7, 3, 15], [7, 4, 30],[7,5,28],[7,6,24],[7, 7, 10], [7, 8, 29], [7, 9, 31],
                                    [8, 0, 25], [8, 1, 27], [8, 2, 12], [8, 3, 19], [8, 4, 28],[8,5,29],[8,6,14],[8, 7, 10], [8, 8, 19], [8, 9, 23],
                                    [9, 0, 27], [9, 1, 11], [9, 2, 31], [9, 3, 30], [9, 4, 29],[9,5,29],[9,6,14],[9, 7, 11], [9, 8, 29], [9, 9, 24],
                                    [10, 0, 10], [10, 1, 29], [10, 2, 28], [10, 3, 17], [10, 4, 26],[10,5,26],[10,6,24],[10, 7, 13], [10, 8, 19], [10, 9, 15],
                                    [11, 0, 22], [11, 1, 18], [11, 2, 28], [11, 3, 28], [11, 4, 28],[11,5,18],[11,6,15],[11, 7, 15], [11, 8, 13], [11, 9, 12],
                                  ],
                            dataLabels: {
                                enabled: false,
                            }
                        }]
                    }
                }
            }
        }
</script>
<style>
    .highcharts-credits{
        display:none
    }
</style>