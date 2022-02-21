<template>
    <div class="container-fluid">
        <div class="row">
            <div class="page-layout">
                <div class="row">
                    <div class="col-md-3">
                        <div class="page-heading">Tenants</div>
                    </div>

                    <div id="custom-search-input"  class="input-group searchbar pull-right">
                        <input type="text" class="search-query form-control" placeholder="Search" v-model="search">
                        <span class="input-group-btn">
                            <button class="btn search-btn" type="button">
                                <span class=" glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div> 

                </div>
                <hr>
                <div class="tenantstable ">
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell" style="width:5%">Tenant Id</div>
                                <div class="divTableCell" style="width:5%">Status</div>
                                <div class="divTableCell" style="width:5%">ClientType Id</div>
                                <div class="divTableCell">Tenant Name</div>
                                <div class="divTableCell">Email Id</div>
                                <div class="divTableCell">Code</div>
                                <div class="divTableCell">DB Name</div>
                                <div class="divTableCell">Time Zone</div>
                                <div class="divTableCell">Date Of Establishment</div>
                                <div class="divTableCell" style="width:25%">URL</div>
                                <div class="divTableCell">Spin</div>
                                <div class="divTableCell">Edit</div>
                            </div>
                            <div class="divTableRowdata" v-for="tenant in paginatedData">
                                <div class="divTableCelldata">{{ tenant.id }}</div>
                                <div class="divTableCelldata">{{ tenant.statusid}}</div>
                                <div class="divTableCelldata">{{ tenant.clienttypeid}}</div>
                                <div class="divTableCelldata">{{ tenant.sname }}</div>
                                <div class="divTableCelldata">{{ tenant.emailid }}</div>
                                <div class="divTableCelldata">{{ tenant.code }}</div>
                                <div class="divTableCelldata">{{ tenant.dbname }}</div>
                                <div class="divTableCelldata">{{ tenant.timezone }}</div>
                                <div class="divTableCelldata">{{ tenant.dateofestablishment }}</div>
                                <div class="divTableCelldata">{{ tenant.url }}</div>
                                <div class="divTableCelldata">
                                    <button type="button" class='common-button' v-on:click="spin(tenant)">SPIN</button>
                                </div>
                                <div class="divTableCelldata">
                                    <a data-toggle="modal" href="#edittenant" v-on:click="setTenant(tenant);">
                                        <i class="fa fa-pencil-square-o fa-1x" aria-hidden="true">
                                        </i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div>
                        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
                    </div>
                </div>

                <div class="modal fade" id="edittenant" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit Tenant</h4>
                            </div>
                            <div class="modal-body">
                                <form name="edittenantmodal">
                                <h4><u><b>Tenant Details</b></u></h4>
                                <div class="row">
                                    <div class=col-lg-6>
                                        <div class="row">
                                            <div class="col-md-4">
                                            <label>Tenant Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                            <input type="text" class="form-control form-input" name="middlename" placeholder="Tenant Name" v-model="tenant.sname" >
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Status</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <!-- <input type="text" class="form-control form-input" name="admissionno" placeholder="status id*" v-model=""> -->
                                                <label><input type="radio"  value=0 v-model="tenant.statusid">Inactive</label>
                                                <label><input type="radio" value=1 v-model="tenant.statusid">Active</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Time Zone</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" name="admissionno" placeholder="status id*" v-model="tenant.timezone">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row" v-if="this.$cookie.get('userrole')=='SUPERADMIN'">
                                            <div class="col-md-4">
                                                <label>School Logo</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input ref="schoollogo" name="schoollogo" type="file" placeholder="select school" @change='onFileUpload($event)' single>
                                            </div>
                                        </div>
                                        <div class="row" v-if="this.$cookie.get('userrole')=='SUPERADMIN'">
                                            <div class="col-md-8">
                                                 <button class='common-button pull-right' v-on:click.prevent="uploadShoolLogo()">Upload</button>
                                            </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <br v-if="this.$cookie.get('userrole')=='SUPERADMIN'">
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="row">
                                            <div class="col-md-4">
                                            <label>Client Type Id</label>
                                            </div>
                                            <div class="col-md-8">
                                            <!-- <input type="text" class="form-control form-input" name="studentname" v-model="tenant.clienttypeid"  placeholder="clienttypeid*"> -->
                                                <label><input type="radio"  value=1 v-model="tenant.clienttypeid">SCHOOL</label>
                                                <label><input type="radio" value=2 v-model="tenant.clienttypeid">INTERVIEWEE COMPANY</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                            <label>URL</label>
                                            </div>
                                            <div class="col-md-8">
                                            <input type="text" class="form-control form-input" name="studentname" v-model="tenant.url"  placeholder="clienttypeid*">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                            <label>Date of Establishment</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setdateofesta"></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row" v-if="this.$cookie.get('userrole')=='SUPERADMIN'">
                                            <div class="col-md-8">
                                                <img v-if="tenant.schoollogo != null" :src="tenant.schoollogo" style="height: 60px; width: 300px;" alt="image" class="img-rounded img-responsive image" />
                                                <img v-else src="http://placehold.it/300x60" alt="image" class="img-rounded img-responsive image" />
                                            </div>
                                            <div class="col-md-4">
                                            </div>
                                        </div>
                                        <br>

                                    </div>
                                </div>
               <br>
               <div class="row">
                  <div class="col-lg-6 col-lg-offset-3 text-center">
                     <button id="btn-reset"  data-dismiss="modal" class="btn btn-info button"> Cancel</button>
                     <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="edittenant()" class="btn btn-info button">Update</button>
                  </div>
               </div>
            </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import EventBus from '../../../event-bus.js';
import UserService from '../../../services/userService.js';
export default {
    components: { DatePicker },
    data(){
        return{
            tenantId: this.$cookie.get('id'),
            tenantdetails: [],
            search: "",
            pageNumber: 0,
            size: 10,
            tenant:{},
            student:{},
            setdateofesta:"",
            open: 'show',
            close:'hide',
        }
    },
    created(){
        this.tenantId = this.$cookie.get('id');
        this.tenantsList();
    },
    methods:{
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        tenantsList:function(){
            console.log("tenantsList")
            UserService.listOfTenants().then((response) =>{
                console.log(response)
                this.tenantdetails = response.data;
            })
        },
        setTenant: function(tenant){
            this.tenant = tenant;
            this.setdateofesta = new Date(tenant.dateofestablishment);
            // this.setdateofesta.setTime(tenant.dateofestablishment);
            console.log(this.setdateofesta);
        },
        edittenant: function(){
            console.log(this.tenant);
            this.tenant.dateofestablishment = this.setdateofesta.getTime();
            console.log(this.tenant);
            if(this.isValidTenant()){
                UserService.UpdateUser(this.tenant).then((response) =>{
                    console.log(response);
                    this.tenantsList();
                    this.popUp("edittenant",this.close)
                    this.$alert("Tenant Updated Successfully","Success","success");
                }).catch((error) => {
                    console.log("Error Response" + JSON.stringify(error.response));
                    if(error.response.data.message = "URL already Exist"){
                        this.$alert("URL already Exist","Warning","warning");
                    }
                })
            }
            else {
                this.$alert("The data cannot be empty","Warning","warning");
            }
        },
        isValidTenant: function(){
            return this.isNotEmpty(this.tenant.sname, "Tenant Name") && 
            this.isNotEmpty(this.tenant.url, "URL") && 
            this.isNotEmpty(this.tenant.timezone, "Time Zone");
        },
        isNotEmpty: function(val, str){
            return (val === undefined || val == null || val.trim().length <= 0) ? false : true;
            // if(val === undefined || val == null || val.length <= 0){
            //     console.log("false");
            //     return false  
            // } else {
            //     console.log("true");
            //     return true
            // }
        },
        spin:function(tenant){
            var tenantdata = {
                "id":tenant.id,
                "code":tenant.code,
                "sname":tenant.sname,
                "emailid":tenant.emailid
            }
            UserService.spinTenant(tenantdata).then((response) =>{
                console.log(response);
                this.$alert(response.data.message,'Success','success');
            }).catch((error) => {
                console.log(error.response)
                this.$alert(error.response.data.message,'Spin not required','warning');
            })
        },
        prevPage(){
            this.pageNumber--;
        },
        nextPage(){
            this.pageNumber++;
        },
        onFileUpload: function(e) {
                const files = e.target.files;
                this.file = files[0];
            },
            uploadShoolLogo: function(){
                if (this.file) {
                let fileObj = {
                    file: this.file
                }
                UserService.uploadSchoolLogo(this.tenant.id, fileObj).then((response)=>{
                    console.log(response);
                    if(response.status==200){
                        this.popUp('UploadScoolLogo',this.close);
                        this.$alert('Uploaded Image successfully','Success','success');
                        this.tenant.schoollogo = response.data.description;
                        this.$refs.schoollogo.value = null;
                    }
                })
                }else{

                }
            },
    },
    computed:{
        pageCount(){
            let l = this.tenantdetails.length,
                s = this.size;
                return Math.ceil(l/s);
            },
        filtertenants:function()
        {
            var self=this;
            return this.tenantdetails.filter(function(tenant){
                return tenant.sname.toLowerCase().indexOf(self.search.toLowerCase())>=0 ||
                    tenant.url.toLowerCase().indexOf(self.search.toLowerCase())>=0 ;
            });
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.filtertenants.slice(start, end);
        },
    },
}
</script>