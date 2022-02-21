<template>
<highcharts :options="options"  style="height: 800px; width:1500px "></highcharts>
</template>
<script>
import VueHighcharts from 'vue-highcharts';
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
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: 'Total Marks of a Student in each Test'
                        },

                        xAxis: {
                            categories: ['Mohan', 'Gayatri', 'Yamini', 'Rohith', 'Mounika', 'Surya', 'Ravinder', 'Tanmai', 'Nikitha', 'Vinitha']
                        },

                        yAxis: {
                            categories: ['Test-1', 'Test-2', 'Quarterly', 'Test-3', 'Half-Yearly','Test-4','Annual'],
                            title: null
                        },
                        legend: {
                            enabled: true
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> scored <br><b>' +
                                this.point.value + '</b> marks in <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            minColor: '#8C9EFF',
                            maxColor: '#1A237E'
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
                            borderWidth: 0,
                            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],[0,5,99],[0,6,44], 
                                    [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48],[1,5,88],[1,6,150], 
                                    [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],[2,5,33],[2,6,110], 
                                    [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16],[3,5,99],[3,6,44], 
                                    [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115],[4,5,109],[4,6,149], 
                                    [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120],[5,5,119],[5,6,100],
                                    [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96],[6,5,112],[6,6,104], 
                                    [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30],[7,5,99],[7,6,44],
                                    [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84],[8,5,99],[8,6,148],
                                    [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91],[9,5,99],[9,6,144]],
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