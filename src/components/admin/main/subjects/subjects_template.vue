<template>

<div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('subjects')"/></div>
            </div>
            <div class="col-lg-6 text-right">
                <router-link to="/admin/newsubject" tag="button" class="common-button">New Subject</router-link>
            </div>
        </div>
		<hr/>


    

        <div class="subjectstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Id</div>
                        <div class="divTableCell">Subject Name</div>
                        <div class="divTableCell">Testable</div>
                    </div>
                    <div class="divTableRowdata" v-for="subject in subjects" >
                        <div class="divTableCelldata">{{subject.id}}</div>
                        <div class="divTableCelldata">{{subject.subjectname}}</div>
                        <div class="divTableCelldata">{{subject.istestable}}</div>
                    </div>
                </div>
            </div>
        </div>
   
    </div>                                                                                     
</template>
<script>
import UserService from '../../../../services/userService.js';
export default{
    props:['school','userdetails'],
    data(){
        return{
            subjects:[],
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.Subjects(this.id).then((response)=>{
        this.subjects=response.data
    }).catch((error)=>{
        console.log(error.response.data)
    })
}
  
}
</script>
<style>
.subjectstable{
width:100%;
}

.newsubjectbutton{
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
.newsubjectbutton:hover{
color:white;
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

</style>
