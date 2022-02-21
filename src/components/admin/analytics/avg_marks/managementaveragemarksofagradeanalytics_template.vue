<template>
<highcharts :options="options"  style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts>
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
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    title: {
        text: 'Average Marks Of A Grade'
    },

    xAxis: {
        gridLineWidth: 1,
        categories: ['Kinder-Garten', 'Grade-1', 'Grade-2', 'Grade-3', 'Garde-4', 'Grade-5', 'Grade-6', 'Grade-7', 'Grade-8', 'Grade-9','Grade-10']
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
    },
       tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Average Marks is <br><b>' +
                                this.point.y + '</b> percentage  is <br><b>' + this.point.z+ '</b>';
                            }
                        },

    series: [{
        data: [
        
            { x:0, y: 95, z: 13.8, color:'#F44336',name:'maths' },
            { x:1, y: 102.9, z: 14.7,color:'#4A148C'  },
            { x: 2, y: 91.5, z: 15.8,color:'#4CAF50' },
            { x: 3, y: 102.5, z: 12,color:'#795548' },
            { x: 4, y: 86.1, z: 11.8,color:'#607D8B'  },
            { x: 5, y: 70.1, z: 16.6,color:'steelblue' },
            { x: 6, y: 68.5, z: 14.5,color:'#000000'  },
            { x: 7, y: 83.1, z: 10,color:'#FF5722'  },
            { x: 8, y: 93.2, z: 24.7,color:'#8BC34A' },
            { x: 9, y: 57.6, z: 10.4,color:'red' },
            { x: 10, y: 20, z: 16, color:'green' },
           
         
        ]
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