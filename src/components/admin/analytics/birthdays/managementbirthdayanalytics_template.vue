<template>
<div>
    <h2>Birthdays</h2>
    <hr>
    <select class="form-control gradeFilter"  style="width:21%;margin-right:7px"  v-model="academicDetails" v-on:change="getNumberOfBirthdaysByMonth()">
        <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >
            {{academic.passingyear}} - {{academic.syllabustype}} <div v-if="academic.active === 1">( Active )</div></option>
     </select>
    <br><br><br>
    <div v-if="dataAvailability==true">
         <highcharts :options="options" :key="componentKey" style="height: 600px; width:950px "></highcharts>
    </div>
    <div v-else>
        <h4>No data avaliable</h4>
    </div>
</div>
</template>
<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import UserService from '../../../../services/userService.js';
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        data(){
            return{
                tenantId:this.$cookie.get('id'),
                studentsData:[],
                academicYearsData:'',
                academicDetails:'',
                studentBirthdaysList:[],
                listOfMonths:[],
                listOfDays:[],
                componentKey:0,
                dataAvailability:false,
                options:{
                    chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 80,
                    plotBorderWidth: 0
                    },
                    title: {
                        text: 'Birthdays'
                    },
                    legend: {
                        enabled: false
                        },
                    xAxis: {
                        categories: [],
                        title:{
                            text:"Days of a Month"
                        }
                    },
                    yAxis: {
                        categories: [],
                        title:{
                            text:"Months"
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' +  this.point.value+ '</b> Birthdays on <br><b>' +
                            this.series.xAxis.categories[this.point.x]+ '</b> , <b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                        }
                    },
                    colorAxis: {
                        min: 0,
                        minColor: '#FCFCFC',
                        maxColor: '#1FA906'
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
                        data: [],
                        dataLabels: {
                            enabled: false,
                        }
                    }]
                    }
                }
            },
        created(){
            this.selectAcadamicYear();
        }, methods:{
     selectAcadamicYear:function(){  
        UserService.AcademicYears(this.tenantId).then((response)=>{
        this.academicYearsData = response.data;
        this.academicDetails={
                    passingyear: this.academicYearsData.academics[0].passingyear,
                    academicyearid: this.academicYearsData.academics[0].id,
                    syllabustype:this.academicYearsData.academics[0].syllabustype,
                    syllabusid:this.academicYearsData.academics[0].syllabusid
                }  
            this.getNumberOfBirthdaysByMonth();
        }).catch(error =>{
            console.log(JSON.stringify(error.data))
        }) 
        },
        getNumberOfBirthdaysByMonth:function(){
            this.options.xAxis.categories=[];
            this.options.yAxis.categories=[];
            this.options.series[0].data=[];
            this.dataAvailability=false;
            UserService.getNumberOfBirthdaysByMonth(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                this.studentBirthdaysList = response.data.resultsMap.analytics;
                if(Object.keys(this.studentBirthdaysList).length>0){
                    this.dataAvailability=true;
                    this.listOfMonths=Object.keys(this.studentBirthdaysList);
                    this.listOfDays=Object.values(response.data.resultsMap.AllDays);
                    
                    for(let i=0;i<this.listOfMonths.length;i++){
                        this.options.yAxis.categories[i]=this.listOfMonths[i];
                    }
                    for(let j=0;j<this.listOfDays.length;j++){
                        this.options.xAxis.categories[j]=this.listOfDays[j];
                    }
                    let datasize=0;
                     for(let i=0;i<this.listOfMonths.length;i++){
                         let singleMonth = Object.values(this.studentBirthdaysList)[i];
                        for(let j=0;j<this.listOfDays.length;j++){
                            this.options.series[0].data[datasize]=[j,i,Object.values(singleMonth)[j]];
                            datasize++;
                        } 
                    }
                }
                this.forceRerender();
            })
        },
        forceRerender() {
          this.componentKey += 1;
        },
      }
   }
</script>
<style>
    .highcharts-credits{
        display:none
    }
</style>