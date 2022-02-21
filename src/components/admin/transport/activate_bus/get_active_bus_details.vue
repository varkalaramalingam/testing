<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Activate Bus</h3>
            <hr>
        </div>
        <div class="col-lg-12">
            <router-link to="/transport/activateBus" tag="button" class="btn addstafftobuses pull-right ">Activate Bus</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Bus Name</div>
                        <div class="divTableCell">Driver Name</div>
                        <div class="divTableCell">Attender Name</div>
                        <div class="divTableCell">Route Name</div>
                        <div class="divTableCell">Distance</div>
                        <div class="divTableCell">Stops Names</div>
                    </div>
                    <div class="divTableRowdata" v-for="student in paginatedData">
                        <div class="divTableCelldata">{{student.busname}}</div>
                        <div class="divTableCelldata">{{student.drivername}}</div>
                        <div class="divTableCelldata">{{student.attendername}}</div>
                        <div class="divTableCelldata">{{student.routename}}</div>
                        <div class="divTableCelldata">{{student.distance}}</div>
                        <div class="divTableCelldata">{{getStudentsName(student.stopsList)}}</div>
                  </div>
                </div>
            </div>
            <br> <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService';
export default{
    data(){
        return{
            activeBusDeatils:[],
            id:this.$cookie.get('id'),
            pageNumber: 0,
            size: 10
        }
    },
    created(){
        UserService.getActiveBusDetails(this.id).then((response)=>{
            this.activeBusDeatils=response.data
        })
    },
    methods:{
         nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
         getStudentsName:function(names){
            let listOfNames;
            for(let i=0;i<names.length;i++){
                if(i==0){
                    listOfNames=names[i];  
                }else{
                    listOfNames=listOfNames+", "+names[i];
                }  
            }
            return listOfNames;
        }
    },
    computed: {
        pageCount() {
            let l = this.filterBooks.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        filterBooks: function() {
            // var self = this;
            return this.activeBusDeatils.filter(function(staff) {
                return true;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterBooks.slice(start, end);
        },
    }
}
</script>
<style scoped>
    .addstafftobuses{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        color:white;
        padding: 5px 30px;
        margin-top:10px;
        margin-bottom:5px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration:none;
        border-radius:0px
    }
    .addstafftobuses:hover{
        color:white;
    }
</style>