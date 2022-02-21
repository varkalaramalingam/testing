<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('students_in_bus')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12" v-if="userRole == 'ADMIN' || userRole == 'TEACHER'">
            <router-link to="/transport/addStudentsToBus" tag="button" class="btn addstafftobuses pull-right ">Add Student To Bus</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Route Name</div>
                        <div class="divTableCell">Distance</div>
                        <div class="divTableCell">NumberOfStops</div>
                         <div class="divTableCell">Bus Name</div>
                        <div class="divTableCell">Bus Number</div>
                        <div class="divTableCell">Color</div>
                        <div class="divTableCell">NoOfSeats</div>
                        <div class="divTableCell">Pick Point</div>
                        <div class="divTableCell">Drop Point</div>
                        <div class="divTableCell">Availability Seats</div>
                        <div class="divTableCell">Students Names</div>
                        <div class="divTableCell">Teacher Names</div>
                    </div>
                    <div class="divTableRowdata" v-for="student in paginatedData">
                        <div class="divTableCelldata">{{student.routename}}</div>
                        <div class="divTableCelldata">{{student.distance}}</div>
                        <div class="divTableCelldata">{{student.numberofstops}}</div>
                        <!-- <div class="divTableCelldata">{{student.mailid}}</div> -->
                        <div class="divTableCelldata">{{student.busname}}</div>
                        <div class="divTableCelldata">{{student.busnumber}}</div>
                        <div class="divTableCelldata">{{student.color}}</div>
                        <div class="divTableCelldata">{{student.noofseats}}</div>
                        <div class="divTableCelldata">{{student.pickpoint}}</div>
                        <div class="divTableCelldata">{{student.droppoint}}</div>
                        <div class="divTableCelldata">{{student.availability_seats}}</div>
                        <div class="divTableCelldata">{{getStudentsName(student.studentsNames)}}</div>
                        <div class="divTableCelldata">{{getStudentsName(student.teacherNames)}}</div>
                  </div>
                </div>
            </div>
            <br><div>
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
             listOfStudentsInBus:[],
             id:this.$cookie.get('id'),
             pageNumber: 0,
             size: 10,
             userRole: this.$cookie.get('userrole')
        }
    },
    created(){
        UserService.studentsDetailsInBus(this.id).then((response)=>{
            this.listOfStudentsInBus=response.data
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
            if(names!=null){
                for(let i=0;i<names.length;i++){
                if(i==0){
                    listOfNames=names[i];  
                }else{
                    listOfNames=listOfNames+", "+names[i];
                }  
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
            return this.listOfStudentsInBus.filter(function(staff) {
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