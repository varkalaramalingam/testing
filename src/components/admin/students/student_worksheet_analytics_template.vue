<template>
    <div>
        <!-- {{worksheetid}} -->
        <div class="modal-body" style="width: 100%; align-self: center">
        <table class="divTable">
            <tbody class="divTableBody" v-for="data in analysisdata" :key="data.w_id">
            <tr class="divTableRowdata">
                <td class="divTableCelldata">ID</td>
                <td class="divTableCelldata">{{ data.w_id }}</td>
            </tr>
            <tr class="divTableRowdata">
                <td class="divTableCelldata">Worksheet Name</td>
                <td class="divTableCelldata">{{ data.worksheet_name }}</td>
            </tr>
            <tr class="divTableRowdata" v-for="(dod,index) in data.degreeLevelQuestions" :key="dod.degreeofdifficulty">
                <td class="divTableCelldata">{{ dod.degreeofdifficulty }}</td>
                <td class="divTableCelldata">
                  <div style="display:inline"  v-if="dodanalysisdatacorrect.length>0">
                    {{dodanalysisdatacorrect[index].correct}}
                  </div>
                  /
                  <div style="display:inline">
                    {{ dod.total }}
                  </div>
                </td>
            </tr>
            <tr class="divTableRowdata" v-for="(tag,index) in data.questionsTags" :key="tag.id">
                <td class="divTableCelldata" v-if="tag.tagname != null">
                {{ tag.tagname }}
                </td>
                <td class="divTableCelldata" v-if="tag.tagname == null">General</td>
                <td class="divTableCelldata">
                  <div style="display:inline" v-if="tagsanalysisdatacorrect.length>0">
                    {{tagsanalysisdatacorrect[index].correct}}
                  </div>
                  /
                  <div style="display:inline">
                    {{ tag.total }}
                  </div>
                </td>
            </tr>
            <tr class="divTableRowdata">
                <td class="divTableCelldata"><mark>Total Questions</mark></td>
                <td class="divTableCelldata"><mark>{{correctquestions}}/{{ totalquestions }}</mark></td>
            </tr>
            <tr class="divTableRowdata">
                <td class="divTableCelldata"><mark>Total Marks</mark></td>
                <td class="divTableCelldata"><mark>{{analysisdatacorrect.securedmarks}}/{{ analysisdatacorrect.max_marks }}</mark></td>
            </tr>
            </tbody>
        </table>
        <br />
        <div
            class="col-sm-12"
            style="text-align: center"
            v-if="totalquestions == 0"
        >
            <h4 style="color: red">No Data to Analyse</h4>
        </div>
        <br />
        </div>
        <div class="col-lg-4"></div>
        <div class="col-lg-4" style="padding-left: 60px" v-if="totalquestions != 0">
        <button
            type="button"
            class="btn btn-info"
            v-on:click.prevent="
            (showtree = false), (showpiedonut = true), forceRerender1()
            "
        >
            Pie Donut
        </button>
        <button
            type="button"
            class="btn btn-info"
            v-on:click.prevent="
            showpiedonut = false;
            (showtree = true), changealgo();
            "
        >
            Treemap
        </button>
        </div>
        <vue-highcharts
        v-if="pietaganalysisdata.series[0].data.length != 0"
        :options="pietaganalysisdata"
        ref="pieChart"
        v-show="showpiedonut"
        :key="componentKey1"
        ></vue-highcharts>
        <highcharts
        :options="treetaganalysisdata"
        v-show="showtree"
        v-if="treetaganalysisdata.series[0].data.length != 0"
        :key="componentKey3"
        ></highcharts>
        <vue-highcharts
        v-if="pieanalysisdata.series[0].data.length != 0"
        :options="pieanalysisdata"
        ref="pieChart"
        :key="componentKey2"
        ></vue-highcharts>
    </div>
</template>

<script>
import UserService from "../../../services/userService.js";
import store from "../../../store.js";
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";

export default {
    components: {
        VueHighcharts,
        // Highcharts,
    },
  props: ["worksheetid","worksheettestid"],
  data() {
    return {
        tenantId: this.$cookie.get('id'),
        componentKey1:0,
        componentKey2:1,
        componentKey3:2,
        analysisdata: {},
        analysisdatacorrect: {},
        dodanalysisdata: [],
        tagsanalysisdata: [],
        dodanalysisdatacorrect: [],
        tagsanalysisdatacorrect: [],
        pieanalysisdata: {
          chart: {
            type: "pie",
            options3d: {
              enabled: true,
              alpha: 45,
            },
          },
          title: {
            text: "Degree of difficulty Analysis",
          },
          subtitle: {
            text: "3D Pie in Highcharts",
          },
          plotOptions: {
            // pie: {
            //     innerSize: 100,
            //     depth: 45
            //     }
          },
          series: [
            {
              name: "No of Questions",
              data: [],
            },
          ],
        },
        pietaganalysisdata: {
          chart: {
            type: "pie",
            options3d: {
              enabled: true,
              alpha: 45,
            },
          },
          title: {
            text: "Tag Analysis",
          },
          subtitle: {
            text: "3D donut in Highcharts",
          },
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 45,
            },
          },
          series: [
            {
              name: "No of Questions",
              data: [],
            },
          ],
        },
        treetaganalysisdata: {
          // colorAxis: {
          //     minColor: '#FFFFFF',
          //     maxColor: Highcharts.getOptions().colors[0]
          // },
          series: [
            {
              type: "treemap",
              // layoutAlgorithm: 'squarified',
              layoutAlgorithm: "stripes",
              // dataLabels: {
              //     enabled: true,
              //     color: '#000000'
              // },
              data: [
                // {
                // name: 'A',
                // value: 6,
                // colorValue: 1
                // },
              ],
            },
          ],
          title: {
            text: "Treemap Tag Analysis",
          },
        },
        showpiedonut: true,
        showtree: false,
        totalquestions: 0,
        correctquestions: 0,
    };
  },
    created() {
        console.log(this.worksheetid);
        console.log(this.worksheettestid);
        this.analyseWorksheet(this.worksheetid);
        this.analyseStudentForATest(this.worksheettestid);
    },
    methods: {
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        forceRerender1() {
          this.componentKey1 += 1;
          this.componentKey2 += 1;
          this.componentKey3 += 1;
        },
        getRandomColor: function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        changealgo: function(){
            if(this.treetaganalysisdata.series[0].layoutAlgorithm == "squarified"){
                this.treetaganalysisdata.series[0].layoutAlgorithm = "stripes";
            } else {
                this.treetaganalysisdata.series[0].layoutAlgorithm = "squarified";
                // this.treetaganalysisdata.series[0].layoutAlgorithm = "sliceAndDice";
            }
            console.log(this.treetaganalysisdata.series[0].layoutAlgorithm);
            this.forceRerender1();
        },
        analyseWorksheet: function(worksheetid){
            console.log(worksheetid);
            this.showpiedonut = true;
            this.showtree = false;
            this.popUp('analysePOpUp', this.open);
            UserService.getWorksheetDesignAnalyse(worksheetid, this.tenantId).then((response)=>{
                console.log(response.data);
                this.analysisdata = response.data.resultsMap.WorksheetAnalyse; 
                this.dodanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].degreeLevelQuestions; 
                this.tagsanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].questionsTags; 
                this.totalquestions = 0;
                this.pieanalysisdata.series[0].data = [];
                this.pietaganalysisdata.series[0].data = [];
                this.treetaganalysisdata.series[0].data = [];
                for(let i=0;i<this.dodanalysisdata.length;i++){
                    this.totalquestions += this.dodanalysisdata[i].total;
                    this.pieanalysisdata.series[0].data[i] = [];
                    this.pieanalysisdata.series[0].data[i][0] = this.dodanalysisdata[i].degreeofdifficulty;
                    this.pieanalysisdata.series[0].data[i][1] = this.dodanalysisdata[i].total;
                }
                for(let j=0;j<this.tagsanalysisdata.length;j++){
                    if(this.tagsanalysisdata[j].tagname!=null && this.tagsanalysisdata[j].tagname!=""){
                        this.pietaganalysisdata.series[0].data[j] = [];
                        this.pietaganalysisdata.series[0].data[j][0] = this.tagsanalysisdata[j].tagname;
                        this.pietaganalysisdata.series[0].data[j][1] = this.tagsanalysisdata[j].total;
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.treetaganalysisdata.series[0].data[j].name = this.tagsanalysisdata[j].tagname;
                        this.treetaganalysisdata.series[0].data[j].value = this.tagsanalysisdata[j].total;
                        this.treetaganalysisdata.series[0].data[j].color = this.getRandomColor();
                        // k += 1;
                    } else {
                        this.pietaganalysisdata.series[0].data[j] = [];
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.pietaganalysisdata.series[0].data[j][0] = "General";
                        this.pietaganalysisdata.series[0].data[j][1] = this.tagsanalysisdata[j].total;
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.treetaganalysisdata.series[0].data[j].name = "General";
                        this.treetaganalysisdata.series[0].data[j].value = this.tagsanalysisdata[j].total;
                        this.treetaganalysisdata.series[0].data[j].color = this.getRandomColor();
                    }
                }
                console.log(this.analysisdata);
                console.log(this.pieanalysisdata);
                console.log(this.pietaganalysisdata);
                this.forceRerender1();
            })
        },
        analyseStudentForATest: function(worksheettestid){
            UserService.getAnalyseStudentForATest(worksheettestid, this.tenantId).then((response)=>{
                console.log(response.data);
                this.analysisdatacorrect = response.data[0]; 
                this.dodanalysisdatacorrect = response.data[0].degreeLevelQuestions; 
                this.tagsanalysisdatacorrect = response.data[0].questionsTags;
                this.correctquestions = 0;
                for(let i=0;i<this.dodanalysisdatacorrect.length;i++){
                    this.correctquestions += this.dodanalysisdatacorrect[i].correct;
                }
            })
        }
  },
};
</script>

<style>
  mark {
    background-color:gold;
    color:black;
  }
</style>