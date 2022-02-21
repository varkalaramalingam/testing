<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">New Worksheet</h3>
            <hr>
        </div>
        <div class="panel newassignmentpanel col-lg-6 col-lg-offset-3" >
           <div class="panel-body">
                <form class="form-horizantal" name="newassignmentform">
                    <div class="col-md-12">
                        <div class="leftside-form">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Tags</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="Tags" placeholder="Tags*" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Assignment Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="worksheetname" placeholder="Name Of Worksheet*"   required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Date Of Assignment</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Due Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <router-link :to="{path:'/myclass/'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/worksheets'}" tag="button" class="btn button">Cancel</router-link>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button">Save</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
    </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
export default{
    components: { DatePicker },
     props:['myclass','school','userdetails','acdemicyearandboard'],
}
</script>