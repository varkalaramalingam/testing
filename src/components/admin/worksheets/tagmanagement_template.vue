<template>
    <div class="container">
        <div class="row reset-padding reset-margin">
            <div class="row">
                <div class="col-lg-6">
                    <div class="page-heading"><span v-html="$t('tag_management')"/></div>
                </div>
                <div class="input-group searchbar text-right" style="width:20%;padding:12px">
                    <!-- <input v-model='tags[0].tagname' type="text" class="search-query form-control" placeholder="Add New Tag"> -->
                    <autocompleteformulvalues
                        :suggestions="dataforautocomplete1" 
                        :selection="tags[0]" 
                        v-on:update="datafromautocommul($event,0)"
                        :placeholder="placeholder"
                        >
                    </autocompleteformulvalues>
                    <span class="input-group-btn">
                        <button class="btn btn-primary" id="submit" @click="popUp('confirmationPopUpforaddtag', open)" type="button" >ADD</button>
                    </span>
                </div>
            </div>
            <hr/>

            <div class="tag list">
                <div class="divTable">
                    <div class="divTableBody">
                        <div class="divTableRow">
                            <div class="divTableCell">Tag ID</div>
                            <div class="divTableCell">Tagname</div>
                        </div>
                        <div class="divTableRowdata" v-for="tag in paginatedData">
                            <div class="divTableCelldata">{{tag.id}}</div>
                            <div class="divTableCelldata">{{tag.tagname}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div style="float:left">
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>

            <!-- confirmation pop up for add tag start  -->
            <div class="modal fade" id="confirmationPopUpforaddtag" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" style="width:472px">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4>Add Tag</h4>
                        </div>
                        <div class="modal-body" style="height:75px;">
                            <p>Do you want to add tag <i style="color:red">{{tags[0].tagname}}</i> really ?</p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                        <button type="submit" v-on:click.prevent="addtag()" id="submit" class="btn btn-primary">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- confirmation pop up for add tag end  -->
        </div>
    </div> 
</template>

<script>
import UserService from '../../../services/userService.js';
import _ from 'lodash';
import autocompleteformulvalues from '../classrooms/subjects/autocompleteforforms_template'
export default {
    components: {
        'autocompleteformulvalues': autocompleteformulvalues
    },
    data(){
        return{
            tags:[
                {
                    id:0,
                    tagname : ""
                }
            ],
            tenantid: this.$cookie.get("id"),
            open: "show",
            close: "hide",
            listOftags:[],
            pageNumber: 0,
            size: 10,
            dataforautocomplete:[],
            dataforautocomplete1:[],
            placeholder:"Add New Tag",
        }
    },
    created(){
        this.gettaglist();
    },
    methods:{
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        gettaglist: function(){
            UserService.getTagsListWithId(this.tenantid).then((response) => {
                console.log(response.data);
                this.listOftags = response.data;
                this.dataforautocomplete=_.map(this.listOftags,function(tag){return tag.tagname;}) ;
                this.dataforautocomplete1 = response.data;
                console.log(this.dataforautocomplete);
                console.log(this.dataforautocomplete1);
            })
        },
        datafromautocommul: function(event, k) {
            console.log(event);
            this.tags[k].id = event.id;
            this.tags[k].tagname = event.tagname;
        },
        isvalidtag: function(name) {
            console.log(name);
            if(name.trim()=="") {
                this.$alert("Tag name cannot be empty","Warning","warning");
                return false;
            } else {
                for(let i=0;i<this.dataforautocomplete1.length;i++){
                    console.log(i, name.trim().toLowerCase(), this.dataforautocomplete1[i].tagname.trim().toLowerCase())
                    if(name.trim().toLowerCase() == this.dataforautocomplete1[i].tagname.trim().toLowerCase()){
                        this.$alert("Tag name already exists","Warning","warning");
                        return false;
                    }
                }
                return true;
            }
        },
        addtag: function(){
            if(this.isvalidtag(this.tags[0].tagname)){
                console.log(this.tags[0].tagname);
                console.log(this.tags);
                let obj = {
                    tags: this.tags
                }
                console.log(obj);
                UserService.addTag(this.tenantid, obj).then((response) => {
                    console.log(response.data);
                    this.gettaglist();
                    this.popUp('confirmationPopUpforaddtag', this.close);
                    if(response.data.message == "Created New Tags Successfully"){
                        this.$alert("Tag added successfully","Success","success");
                    }
                    else if(response.data.message == "Already Created Same Tags, Enter New Tags"){
                        this.$alert("Tag is already created","Info","info");
                    }
                }).catch(error =>{
                    console.log(JSON.stringify(error.response))
                })
            } 
            // else {
            //     this.$alert("Tag name cannot be empty","Warning","warning");
            // }
        }
    },
    computed: {
        pageCount() {
            let l = this.listOftags.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.listOftags.slice(start, end);
        },
    }
}
</script>