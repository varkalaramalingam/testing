<template>
    <div>
    <br>
    <br>
        <div class="row">
        <div class="col-lg-2 col-lg-offset-2">
            <div class="col-lg-3">
                <label class="pull-right classlabel">Test:</label>
            </div>
            <div class="col-lg-3">
                <select class="forminput pull-left" >
                    <option>Test-1</option>
                    <option>Test-2</option>
                    <option>Quarterly</option>
                    <option>Test-3</option>
                    <option>Half-Yearly</option>
                    <option>Test-4</option>
                    <option>Annual</option>
                </select>
            </div>
         
        </div>
    </div>
    <br>
    <br>
        <highcharts :options="options"  style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts>

    </div>
</template>
<script>
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import loadHistogramBellCurve from 'highcharts/modules/histogram-bellcurve'
loadMap(Highcharts);
loadStock(Highcharts);
loadHistogramBellCurve(Highcharts);
export default{
    data(){
        return{
            options:{
                title: {
        text: 'Marks Of All Students'
    },
    xAxis: [{
        title: { text: 'No of Students' },
        alignTicks: false
    }, {
        title: { text: 'Marks' },
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: { text: 'Marks' }
    }, {
        title: { text: 'No of Students' },
        opposite: true
    }],

    series: [{
        name: 'No of Students',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1
    }, {
        name: 'Data',
        data:  [10,15,20,25,30,35,40,40,45,50,55,50,55,65,60,65,65,70,70,70,75,70,80,85,85,85,95,90,100,100,],
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
            }
        }
    }
}
</script>
