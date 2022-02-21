<template>
	<div>
		<div>
    </div>
    <div  >
        <h3 class="student-head alignCenter"><strong>{{book.title}}</strong></h3>
        <hr>
    </div>  
		<div> 

      <div class="row studentstable reset-padding reset-margin ">
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">Book Id</div>
                    <div class="divTableCell">Status</div>
                </div>

                <div class="divTableRowdata" >
                    <div class="divTableCelldata" >11245</div>
                    <div class="divTableCelldata" style="text-align:center;">
                      <select class="form-control" style="margin-left:35%;width:190px;">
                          <option value=""> -- select status -- </option>
                          <option v-for="bookStatus in bookStatusList" value="bookStatus.statusId"> {{bookStatus.status}}</option>
                          
                      </select>
                      </div>
                </div>
                <div class="divTableRowdata" >
                    <div class="divTableCelldata" >1130</div>
                    <div class="divTableCelldata" style="text-align:center;">
                      <select class="form-control" style="margin-left:35%;width:190px;">
                          <option value=""> -- select status -- </option>
                          <option v-for="bookStatus in bookStatusList" value="bookStatus.statusId"> {{bookStatus.status}}</option>
                      </select>
                      </div>
                </div>


            </div>
        </div>
        <br>
        <div style="margin-left:40%;">
    <button class="btn btn-danger"> Cancel</button>
    <button class="btn newstudent" style="margin-left: 57px;"> Save</button>
</div>
    </div> 
            
        </div>
	</div>

</template>
<style scoped>
    .reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.studentstable {
  width: 100%;
  padding-top: 1%;
}

.divTable {
  display: table;
  width: 60%;
  text-align: center;
  margin-left: 249px
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

.divTableCell,
.divTableHead {
  border: 1px solid #eee;
  display: table-cell;
  padding: 3px 10px;
}

.divTableCelldata {
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
.alignCenter{
        text-align: center;
    }
    .newstudent {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px
}

</style>
<script>
import BooksNavBar from './booksnavbar_template.vue';
export default{
components: {
        BooksNavBar
    },
  data(){
    return {
      bookStatusList :[
      {statusId:1,status:"Available"},
      {statusId:2,status:"Damaged"}
      ],
      tenantId:this.$cookie.get('id'),
      book: this.$store.state.book,
    }
  }
}


</script>