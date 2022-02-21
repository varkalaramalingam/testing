<template>
<div class="page-layout">
<div class="row">
    <div class="col-lg-6">
		<div class="page-heading"><span v-html="$t('test_types')"/></div>
	
	</div>
    <div class="col-lg-6 text-right">
        <!--<router-link to="/admin/newtesttype" tag="button" class="common-button">New Test Type</router-link><-->
        <button class="common-button pull-right" style="width: 180px;" v-on:click="popup('PeriodPopup',open);">New Test Type</button>
    </div>
    </div>
    <hr/>
    <div>
            <test-types></test-types>
        </div>
        
    <div class="syllabustables">
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">S.No</div>
                    <div class="divTableCell">Test Type</div>
                </div>
                <div class="divTableRowdata" v-for="testtype in testypes">
                    <div class="divTableCelldata">{{testtype.id}}</div>
                    <div class="divTableCelldata">{{testtype.testtype}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js'
import TestTypes from './newtesttype_template.vue';
export default{
    components:{
        TestTypes
    },
    props:['school','userdetails'],
    data(){
        return{
            testypes:[],
            id:this.$cookie.get('id')
        }
    },
    methods:{
        popup:function (PeriodPopup,action) {
            $('#' + PeriodPopup).modal(action);
        },
    },
    created(){
        UserService.TestTypes(this.id).then((response)=>{
        this.testypes=response.data
       }).catch((error)=>{
           console.log(error.response.data);
       })
    }
}
</script>
<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}
.syllabustables{
width:100%;
}

.newtesttypebutton{
background-color: #039be5;
background-image: none;
border-color: #039be5;
color:white;
padding: 5px 30px;
margin-top: 10px;
font-size: 14px;
font-weight: bold;
text-transform: uppercase;
text-decoration:none;
border-radius:0px
}
.newtesttypebutton:hover{
color:white;
}

</style>

