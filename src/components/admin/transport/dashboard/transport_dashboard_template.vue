<template>
    <div>
        <div class="col-lg-12 text-left">
            <div class="page-heading"><span v-html="$t('dashboard')"/></div>
            <hr>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">   
                        <div class="divTableCell">Bus No.</div>
                        <div class="divTableCell">Driver Name</div>
                        <div class="divTableCell">Driver ContactNumber</div>
                        <div class="divTableCell">Driver Licence</div>
                        <div class="divTableCell">Attender Name</div>
                        <div class="divTableCell">Attender Phone Number</div>
                        <div class="divTableCell">Teacher Name</div>
                        <div class="divTableCell">Teacher ContactNumber</div>
                        <div class="divTableCell">No.of Seats</div>
                        <div class="divTableCell">No.of Students</div>
                        <div class="divTableCell">Route</div>
                        <div class="divTableCell">Stops</div>
                    </div>
                    <div class="divTableRowdata" v-for="dashboard in transportdashboard">
                        <div class="divTableCelldata">{{dashboard.busnumber}}</div>
                        <div class="divTableCelldata">{{dashboard.drivername}}</div>
                        <div class="divTableCelldata">{{dashboard.drivercontactnumber}}</div>
                        <div class="divTableCelldata">{{dashboard.licensenumber}}</div>
                        <div class="divTableCelldata">{{dashboard.attendername}}</div>
                        <div class="divTableCelldata">{{dashboard.attendercontactnumber}}</div>
                        <div class="divTableCelldata">{{dashboard.teachername}}</div>
                        <div class="divTableCelldata">{{dashboard.teachercontactnumber}}</div>
                        <div class="divTableCelldata">{{dashboard.noofseats}}</div>
                        <div class="divTableCelldata">{{dashboard.noofstudents}}</div>
                        <div class="divTableCelldata">{{dashboard.routename}}</div>
                        <div class="divTableCelldata">{{dashboard.stops}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
    export default{
        data(){
            return{
                id:this.$cookie.get('id'),
                transportdashboard:[]
            }
        },
        created(){
            UserService.TransportDashboard(this.id).then((response)=>{
                console.log(response.data);
                this.transportdashboard=response.data
            }).
            catch((response)=>{
                console.log(response.data)
            })
        }
    }
</script>
<style scoped>
    .reset-padding{
        padding:0;
    }
    .reset-margin{
        padding:0;
    }
    
</style>

