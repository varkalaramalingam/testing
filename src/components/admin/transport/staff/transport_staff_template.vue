<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('transport_staff')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12 " v-if="userRole == 'ADMIN'">
            <router-link to="/transport/staff/newstaff" tag="button" class="btn newstaffbutton pull-right ">New Staff</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Name</div>
                        <div class="divTableCell">Phone Number</div>
                        <div class="divTableCell">Address</div>
                        <div class="divTableCell">Date Of Birth</div>
                        <div class="divTableCell">Date Of Joining</div>
                        <div class="divTableCell">Driving Licence</div>
                        <div class="divTableCell">Job Type</div>
                        <div class="divTableCell">Experience</div>
                        <div class="divTableCell">Active</div>
                        <div class="divTableCell" v-if="userRole == 'ADMIN'">Edit</div>
                        <div class="divTableCell" v-if="userRole == 'ADMIN'">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="driver in paginatedData">
                        <div class="divTableCelldata">{{driver.firstname}}</div>
                        <div class="divTableCelldata">{{driver.contactnumber}}</div>
                        <div class="divTableCelldata">{{driver.city}}</div>
                        <div class="divTableCelldata">{{Dateformate(driver.dateofbirth)}}</div>
                        <div class="divTableCelldata">{{Dateformate(driver.dateofjoining)}}</div>
                        <div class="divTableCelldata">{{driver.licensenumber}}</div>
                        <div class="divTableCelldata">{{driver.role}}</div>
                        <div class="divTableCelldata">{{driver.experience}}</div>
                        <div class="divTableCelldata">{{driver.active}}</div>
                        <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" href="#editdriver" v-on:click.prevent="editstaff(driver)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" v-on:click.prevent="deletestaff(driver)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>    
                    </div>
                </div>
            </div>
            <br>
            <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
        </div> 
              <div class="modal fade" id="editdriver" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Buses</h4>
                    </div>
                    <div class="modal-body">
                        <form name="editdrivermodal">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="left-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>First Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="firstname" placeholder="Firstname*" v-model="staff.firstname"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Middle Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="middlename" placeholder="Middlename*" v-model="staff.middlename">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Last Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="lastname" placeholder="Lastname*" v-model="staff.lastname" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Contact Number</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="contactnumber" placeholder="Contact Number*" v-model="staff.contactnumber" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                 <label for="class">Qualification</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" name="qualification" placeholder="Ex:Ph.d,MBA,M.Tech*" v-model="staff.qualification"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Experience</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" name="experience" placeholder="Experience*" v-model="staff.experience" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                 <label for="class">Blood Group</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="bloodgroup" placeholder="O+,O-,B+,B-,A+,A- *" v-model="staff.bloodgroup"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>e-mail</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="email" class="form-control form-input" id="" name="e-mail" placeholder="xxxxxxxxx@yyyy.com*" v-model="staff.mailid" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Job</label>
                                            </div>
                                            <div clas="col-md-8">
                                                <label class="col-md-4">
                                                    <input type="radio" name="role" value="DRIVER" v-model="staff.role" >DRIVER
                                                </label>
                                                <label class="col-md-4">
                                                    <input type="radio" name="role" value="ATTENDER" v-model="staff.role" >ATTENDER
                                                </label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">License Number</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="licensenumber" placeholder="Licence Number"  v-model="staff.licensenumber" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="right-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Date Of Birth</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setdateofbirth" ></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Date of Joining</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setjoiningdate" ></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>License Expire Date</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setlicenseexpiredate" ></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                             <div class="col-md-4">
                                                <label>Door Number</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="doornumber" placeholder="Door Number" v-model="staff.doornumber"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Line 1</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="line1" placeholder="Line1" v-model="staff.line1" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Line 2</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="line2" placeholder="Line2" v-model="staff.line2"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Village</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="vilage" placeholder="Village" v-model="staff.village"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>City/District</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control form-input" name="city" placeholder="City" v-model="staff.city"  required>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control form-input" name="district" placeholder="District" v-model="staff.district"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>State/Pincode</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control form-input" name="state" placeholder="State" v-model="staff.state"  required>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control form-input" name="pincode" placeholder="Pincode" v-model="staff.pin"  required>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Status</label>
                                            </div>
                                            <div clas="col-md-8">
                                                <label class="col-md-4">
                                                    <input type="radio" name="role" value=1 v-model="staff.status" >Active
                                                </label>
                                                <label class="col-md-4">
                                                    <input type="radio" name="role" value=0 v-model="staff.status" >InActive
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="updatestaff" class="btn submitbutton">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
         <!-- confirmation pop up start  -->
        <div class="modal fade" id="alertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
                <div class="modal-dialog" style="width:472px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>{{alertType}}</h4>
                        </div> 
                        <div class="modal-body" style="height:75px;">
                        {{alertMessage}}
                        </div>     
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" >OK</button>
                        </div>                     
                    </div>
                </div>
            </div>
        <!-- confirmation pop up end  -->
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
export default{
    components: { DatePicker },
    data(){
        return{
         id:this.$cookie.get('id'),
         staffs:[],
         staff:{},
         setdateofbirth:'',
         setjoiningdate:'',
         setlicenseexpiredate:'',
         userRole: this.$cookie.get('userrole'),
         pageNumber: 0,
         size: 10,
         alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        UserService.TransportStaff(this.id).then((response)=>{
            console.log(response.data);
            this.staffs=response.data
        }).
        catch((error)=>{
            console.log(error.response.data)
        })
    },
    methods:{
         nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        deletestaff:function(driver){
            UserService.TransportDeleteStaff(this.id,driver).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                UserService.TransportStaff(this.id).then((response)=>{
                    console.log(response.data);
                    this.staffs=response.data
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })
            })

        },
        Dateformate:function(date){
            return moment(date).format('DD/MM/YYYY')
        },
        editstaff:function(driver){
            console.log(driver)
            this.staff=driver
            this.setdateofbirth=new Date();
            this.setdateofbirth.setTime(driver.dateofbirth);
            this.setjoiningdate=new Date();
            this.setjoiningdate.setTime(driver.dateofjoining);
            this.setlicenseexpiredate=new Date();
            this.setlicenseexpiredate.setTime(driver.licenseexpiredate);

        },
        updatestaff:function(){
            var updatestaff={
                "id":this.staff.id,
                "bloodgroup":this.staff.bloodgroup,
                "city":this.staff.city,
                "contactnumber":this.staff.contactnumber,
                "dateofbirth":this.setdateofbirth.getTime(),
                "dateofjoining":this.setjoiningdate.getTime(),
                "doornumber":this.staff.doornumber,
                "district":this.staff.district,
                "experience":this.staff.experience,
                "firstname":this.staff.firstname,
                "lastname":this.staff.lastname,
                "middlename":this.staff.middlename,
                "licenseexpiredate":this.setlicenseexpiredate.getTime(),
                "licensenumber":this.staff.licensenumber,
                "line1":this.staff.line1,
                "line2":this.staff.line2,
                "mailid":this.staff.mailid,
                "pincode":this.staff.pincode,
                "qualification":this.staff.qualification,
                "role":this.staff.role,
                "state":this.staff.state,
                "village":this.staff.village,
                "staffid":this.staff.staffid,
                "status":this.staff.status
            }
            UserService.TransportNewStaff(this.id,updatestaff).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                console.log(response.data);
                $('#editdriver').modal('hide');
                UserService.TransportStaff(this.id).then((response)=>{
                    console.log(response.data);
                    this.staffs=response.data
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })

            })
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
            return this.staffs.filter(function(staff) {
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
    .reset-padding{
        padding:0;
    }
    .reset-margin{
        padding:0;
    }
    .divTable{
        display: table;
        width: 100%;
        text-align: center;
    }
    .divTableRow {
        display: table-row;
        background-color: dimgray;
        color: white;
        height: 30px;
    }
    .divTableRowdata {
        display: table-row;
        background-color: #fff;
        color: #000;
        height: 30px;
    }
    .divTableHeading {
        background-color: #ffffff;
        display: table-header-group;
    }
    .divTableCell, .divTableHead {
        border: 1px solid #eee;
        display: table-cell;
        padding: 3px 10px;
    }
    .divTableCelldata{
        border: 1px solid #eee;
        display: table-cell;
        padding: 3px 10px;
    }
    .divTableHeading {
        background-color: #ffffff;
        display: table-header-group;
        font-weight: bold;
    }
    .divTableFoot {
        background-color: #ffffff;
        display: table-footer-group;
        font-weight: bold;
    }
    .divTableBody {
        display: table-row-group;
    }
    .newstaffbutton{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        color:white;
        padding: 5px 30px;
        margin-top:10px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration:none;
        border-radius:0px
    }
    .newstaffbutton:hover{
        color:white;
    }
    .resetbutton,.resetbutton:hover{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        border-radius:0px;
        color:white;
    }
    .submitbutton,.submitbutton:hover{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        border-radius:0px;
        color:white;
    }
</style>
    