<template>
    <div class="container-fluid">
        <div class="row">
            <div class="page-layout">
                <div class="row">
                    <div class="col-md-3">
                        <div class="page-heading">Clients</div>
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
                <div class="subjectteachertable ">
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell" style="width:5%">School Id</div>
                                <div class="divTableCell">First Name</div>
                                <div class="divTableCell">Last Name</div>
                                <div class="divTableCell">Email</div>
                                <div class="divTableCell">Contact Number</div>
                            </div>
                            <div class="divTableRowdata" v-for="client in paginatedData">
                                <div class="divTableCelldata">{{ client.schoolid }}</div>
                                <div class="divTableCelldata">{{ client.fname}}</div>
                                <div class="divTableCelldata">{{ client.lname }}</div>
                                <div class="divTableCelldata">{{ client.emailid }}</div>
                                <div class="divTableCelldata">{{ client.contactnumber}}</div>
                            </div>
                            
                        </div>
                    </div>
                    <br>
                    <div>
                        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../../../services/userService.js';
export default {
    data(){
        return{
            tenantId: this.$cookie.get('id'),
            clientdetails: [],
            search: "",
            pageNumber: 0,
            size: 10,
        }
    },
    created(){
        this.tenantId = this.$cookie.get('id');
        this.clientsList();
    },
    methods:{
        clientsList:function(){
            console.log("tenantsList")
            UserService.listOfClients().then((response) =>{
                console.log(response)
                this.clientdetails = response.data;
        })
        },
        prevPage(){
            this.pageNumber--;
        },
        nextPage(){
            this.pageNumber++;
        },
    },
    computed:{
        pageCount(){
            let l = this.clientdetails.length,
                s = this.size;
                return Math.ceil(l/s);
            },
        filterclients:function()
        {
            var self=this;
            return this.clientdetails.filter(function(client){
                return (client.fname + " " + client.lname).toLowerCase().indexOf(self.search.toLowerCase())>=0 ||
                    client.emailid.toLowerCase().indexOf(self.search.toLowerCase())>=0 ;
            });
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.filterclients.slice(start, end);
        },
    },
}
</script>