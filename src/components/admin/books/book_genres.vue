<template>
   <div>
      <div class="col-lg-12 reset-padding reset-margin">
         <div class="text-left">
            <div class="page-heading"><span v-html="$t('books_genres')"/></div>
         </div>
         <hr>
      </div>
      
      <div  class="row reset-padding reset-margin"  style="float:left;width:90%;margin-left:10%">
          <div id="custom-search-input" class="col-md4-10 reset-padding reset-margin" style="width:44%">
            <div class="input-group searchbar">
                <input v-model='newGenre' type="text" class="search-query form-control" placeholder="Add New Genre">
                <span class="input-group-btn">
                <button id="submit" @click="addGenres()" type="button" >ADD</button>
                        <!--  <button class="btn search-btn" type="button">
                      <span class=" glyphicon glyphicon-search"></span></button> -->
                </span>
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
                                <button type="button" class="btn btn-primary" data-dismiss="modal" v-if="this.resultButton == 'OK'">OK</button>
                              <div  v-if="this.resultButton == 'Remove'">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" >Cancel</button>
                                <button type="button" class="btn btn-primary" v-on:click="removeGenre(deleteData)" data-dismiss="modal">REMOVE</button> 
                             </div>
                            </div>
                        </div>
                    </div>
                </div>
             <!-- confirmation pop up end  -->
        <!-- confirmation  pop up for removing genre start -->
            <div class="modal fade" id="removeAlertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
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
        <!-- confirmation pop up for removing genre end  -->
      <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
        <br>
         <div class="divTable">
            <div class="divTableBody">
               <div class="divTableRow">
                   <div class="divTableCell">S.No</div>
                   <div class="divTableCell">Genere Name</div>
                   <div class="divTableCell">Remove</div>
               </div>
              <!-- <div class="divTableRowdata"  v-for="genre in paginatedData" v-if="genre.available==true"> -->
               <div class="divTableRowdata"  v-for="(genre,index) in paginatedData">
                <div class="divTableCelldata">{{pageNumber*size+index+1}}</div>
                  <div class="divTableCelldata">{{genre.genrename}}</div>
                  <div class="divTableCelldata">
                    <button id="removeButton" v-on:click="removePopUp(genre)">X</button>
                  </div>
               </div>
            </div>
         </div>
         <br>
         <div style="float:left">
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
         </div>
      </div>
   </div>
</template>
<style>
.subjectteachertable{
width:100%;
}
button{
background-color:#039be5;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
}
#submit{
    height:34px;
    width:55px;
    font-size:17px;
    border:0px;
    font-weight:bold;
}
#removeButton{
    color:black;
    padding:0px;
    border:0px;
    background: none;
}
#removeButton:hover{    
    color:red;
}
.previousbutton,
.nextbutton,
.previousbutton:hover,
.nextbutton:hover {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black
}
</style>
<script>
import UserService from '../../../services/userService.js';
import { mapGetters } from 'vuex';
export default ({
 data() {
        return {
            alertMessage: "",
            alertType:"",
            grade: 0,
            section: 0,
            open: 'show',
            close: 'hide',
            showAlert: false,
            tenantId: this.$cookie.get('id'),
            listOfGenres:[],
            pageNumber: 0,
            size: 10,
            newGenre:'',
            popUpAlertMessage:'',
            popUpAlertType:'',
            resultButton:"",
            deleteData:[]
        }
    },
    created() {
        this.getBookGenreList();
    },
    methods: {
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },  
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        addGenres : function (){ 
           let obj = {
              genreName: this.newGenre.toLowerCase().trim(),
           };
           if (this.validate()) {
              this.alertMessage = "Please enter a Genre";
              this.alertType = 'Failed';
              this.resultButton='OK'
              this.popUp('alertPopUp',this.open);
            } else {
            UserService.addGenres(this.tenantId,obj).then((response)=>{
            console.log(JSON.stringify(response.data));
            let resultMessage = response.data.resultsMap.message;
            if(resultMessage.toLowerCase().includes('successfully')){
                this.alertType = 'Success';
                this.alertMessage = resultMessage;
                this.resultButton='OK'
            }else{
                this.alertType = 'Failed';
                this.alertMessage = resultMessage;
                this.resultButton='OK'
            }
            this.popUp('alertPopUp',this.open);
            this.getBookGenreList();
            }).catch((error) =>{
            console.log(JSON.stringify(response.data))
            })
            this.newGenre='';
         }
       },
        getBookGenreList: function() {
        UserService.getListOfGenres(this.tenantId).then((response) => {
        this.listOfGenres = response.data && response.data.results;
        console.log(JSON.stringify(response.data.results));
        })
        },
        removeGenre:function(obj){
            UserService.removeGenre(this.tenantId,obj).then((response) => {
            console.log(JSON.stringify(response.data.resultsMap.message));
             if(response.status==200){
                this.getBookGenreList(); 
            }
            let resultMessage = response.data.resultsMap.message;
            if(resultMessage.toLowerCase().includes('successfully')){
                this.alertType = 'Successfully Removed';
                this.alertMessage = resultMessage;
            }else{
                this.alertType = 'Not Removed';
                this.alertMessage = resultMessage;
            }
            })   
              this.popUp('removeAlertPopUp',this.open);      
        },
        validate:function(){
            if (this.checkEmptyVal(this.newGenre)) {
                return true;
            }
           return false;
        },
        checkEmptyVal: function(val) {
            if (!val) {
                return true;
            }
            return false;
        },
        removePopUp: function(obj){
            this.deleteData = obj;
            this.alertType = 'Remove';
            this.alertMessage = 'Are you want to delete '+obj.genrename.toUpperCase()+' this record ';
            this.resultButton='Remove';
            this.popUp('alertPopUp',this.open);  
            
        }
    }, 
    computed: {
        pageCount() {
            let l = this.listOfGenres.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.listOfGenres.slice(start, end);
        },
    }
})
</script>

