<template>
<div>
    <br><br>
     <div>
        <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getGradesAndSections()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                <div v-if="academic.active === 1"> - Active </div></option>
        </select>
        <select class="form-control groupFilter"  v-model="classroomid"  v-on:change="getBooksAnalyticsByTeacherId()">
            <option v-for="grades in gradesAndSubjects" v-bind:value="grades.id">{{grades.gradename}} - {{grades.sectionname}}</option>
        </select>
        </div>
    <br><br><br>
       <div v-if="dataAvailability==true">
          <div class="col-lg-4">
          <button type="button" class="btn btn-info" v-on:click.prevent="Heatmap">Heatmap</button>
          <button type="button" class="btn btn-info" v-on:click.prevent="BooksIntable">Table</button>     
       </div><br><br><br>
        <div class="col-lg-7 col-md-6" v-if="booksinheatmap==true">
            <highcharts :options="options" :key="componentKey" style="width:850px"></highcharts>
        </div>
        <div class="col-lg-7 col-md-6" v-if="booksintable==true">
            <div class="divTable" style="width:800px">
               <div class="divTableBody">
                    <div class="divTableRow"  v-for="(testTypeKey,testTypeResult, index) in studentBooksAnalytics" v-if="index<1">
                        <div class="divTableCell">Genres </div>
                        <div class="divTableCell" v-for="(books,subject) in testTypeKey" > {{subject}}</div>
                        <div class="divTableCell" > Total Books </div>
                    </div>
                    <div class="divTableRowdata"  v-for="(testTypeKey,value) in studentBooksAnalytics" >
                        <div class="divTableCelldata" >{{value}}</div>
                        <div class="divTableCelldata" v-for="(books,subject) in testTypeKey" v-if="books != -1"> {{books}}</div>
                        <div class="divTableCelldata" v-else > -- </div> 
                        <div class="divTableCelldata"> {{getTotalBooks(testTypeKey)}}</div>
                    </div>
                 </div>
             </div>
        </div>
      </div>
      <div v-else>
         <h4> No data Avaliable</h4>
     </div>   
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        props:['classes'],
        data(){
            return{
                tenantId:this.$cookie.get('id'),
                componentKey:0,
                booksinheatmap:false,
                booksintable:false,
                studentBooksAnalytics:[],
                academicDetails:'',
                classroomid:0,
                academicYearsData:[],
                gradesAndSubjects:[],
                dataAvailability:false,
                options:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: 'Books of a student '
                        },

                        xAxis: {
                            categories: []
                        },

                        yAxis: {
                            categories: [],
                            title: null
                        },
                        legend: {
                            enabled: true
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +
                                this.point.value + '</b> Books in <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:40,
                            minColor: '#FFFFFF',
                            maxColor: '#0000FF'
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
                            name: 'Books per Student',
                            borderWidth: 0,
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
            },
            methods:{
                Heatmap:function(){
                this.booksinheatmap=true;
                this.booksintable=false;
                },
               BooksIntable:function(){
                this.booksintable=true;
                this.booksinheatmap=false;
               },
               selectAcadamicYear:function(){
                 UserService.AcademicYears(this.tenantId).then((response)=>{
                    this.academicYearsData = response.data;
                    if(this.academicYearsData.academics.length>0){
                      this.academicDetails={
                        passingyear: this.academicYearsData.academics[0].passingyear,
                        academicyearid: this.academicYearsData.academics[0].id,
                        syllabustype:this.academicYearsData.academics[0].syllabustype,
                        syllabusid:this.academicYearsData.academics[0].syllabusid
                      }
                       this.getGradesAndSections();
                   }
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                })
            },
            getGradesAndSections:function(){
                this.makeBoxplotIsEmpty();
                UserService.getGradesAndSections(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                    this.gradesAndSubjects=response.data.gradesAndSectionsList;
                    if(this.gradesAndSubjects.length>0){
                      this.classroomid = this.gradesAndSubjects[0].id;
                      this.Heatmap();
                      this.getBooksAnalyticsByTeacherId();
                    }
                     this.forceRerender();
                 })
            }, 
             makeBoxplotIsEmpty:function(){
                this.options.yAxis.categories=[]
                this.options.xAxis.categories=[];
                this.options.series[0].data=[];
                this.dataAvailability=false;
           },
                getBooksAnalyticsByTeacherId:function(){
                    this.makeBoxplotIsEmpty();
                UserService.getBooksAnalyticsByTeacherId(this.tenantId,this.classroomid).then((response) =>{  
                    if(Object.keys(response.data.resultsMap.analytics).length>0){
                        this.dataAvailability=true;
                        this.studentBooksAnalytics=response.data.resultsMap.analytics;
                        let genresLength = Object.keys(this.studentBooksAnalytics).length;
                    
                        let studentsLength = Object.keys(Object.values(this.studentBooksAnalytics)[0]).length;
                        let dataSize=0;
                        for(let i=0;i<genresLength;i++){
                            this.options.yAxis.categories[i] = Object.keys(this.studentBooksAnalytics)[i];
                        }
                        for(let j=0;j<=studentsLength;j++){
                            if(j==studentsLength){
                                this.options.xAxis.categories[j] = 'Total';
                            }
                            else{
                                this.options.xAxis.categories[j]= Object.keys(Object.values(this.studentBooksAnalytics)[0])[j];
                            }       
                        }
                        for(let k=0;k<genresLength;k++){
                            for(let l=0;l<=studentsLength;l++){
                                if(Object.values(Object.values(this.studentBooksAnalytics)[k])[l] == -1){
                                    this.options.series[0].data[dataSize]=[l,k,0];
                                }else if(l==studentsLength){
                                    let totalBooks = this.getTotalBooks(Object.values(Object.values(this.studentBooksAnalytics)[k]));
                                    this.options.series[0].data[dataSize]=[l,k,totalBooks];
                                }else{
                                    this.options.series[0].data[dataSize]=[l,k,(Object.values(Object.values(this.studentBooksAnalytics)[k])[l])];
                                }
                            dataSize++;
                            }
                        }
                          this.forceRerender();
                   }
                 // this.forceRerender();
                })
             
            },
             getTotalBooks: function(Books){
                let length = Object.keys(Books).length;
                let totalBooks = 0;
                for(let i = 0;i< length;i++){
                    if(Object.values(Books)[i] != -1){
                        totalBooks = totalBooks + Object.values(Books)[i];
                    }
                }
                return totalBooks;
            },
            forceRerender() {
                this.componentKey += 1;
                }
            },
        }
</script>
<style>
    .highcharts-credits{
        display:none
    }
    .groupFilter{
        float:left;
        width:25%;
    }
</style>