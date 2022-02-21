<template>
    <div>
    <br>
    <div class="row">
        <div class="col-lg-12">
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
            <div class="col-lg-3 studentslabelone">
                <label class="classlabel">Students:</label>
            </div>
            <div class="col-lg-3 studentlabel">
                <select class="forminput">
                    <option>Mohan</option>
                    <option>Gayatri</option>
                </select>
            </div>
        </div>
    </div>
    <br>
    <br>
        <highcharts :options="options"  style="height: 600px; width:1200px "></highcharts>
    </div>
</template>
<script>
import UserService from '../../../services/userService.js';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import loadHighchartsMore from 'highcharts/highcharts-more';
loadMap(Highcharts);
loadStock(Highcharts);
loadHighchartsMore(Highcharts);
export default{
    data(){
        return{
            options:{
            chart: {
            type: 'boxplot'
    },

    title: {
        text: 'Marks Of A Student'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: ['Telugu', 'Hindi', 'English', 'Maths', 'Science','Social'],
        title: {
            text: 'Subjects'
        }
    },

    yAxis: {
        title: {
            text: 'Marks'
        },
        plotLines: [{
            value: 95,
            color: 'red',
            width: 1,
            label: {
                text: 'Theoretical mean:95',
                align: 'center',
                style: {
                    color: 'gray'
                }
            }
        }]
    },

    series: [{
        name: 'Observations',
        data: [
            [80, 82, 84, 89, 96],
            [70, 85, 93, 98, 10],
            [60, 76, 81, 87, 91],
            [90, 82, 83, 87, 95],
            [92, 83, 86, 88, 91],
            [93, 84, 86, 90, 91]
        ],
        tooltip: {
            headerFormat: '<em> {point.key}</em><br/>'
        }
    },]
            }

        }
    },
  
}
</script>
<style>
.forminput{
      width:150px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.classlabel{
    margin-right: -21px;
    margin-top: 4px;
}
.studentlabel{
    margin-left:-318px;
}
.studentslabelone{
    margin-left: -212px;
}
</style>