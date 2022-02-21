<template>
<div>
    <div class="col-lg-12 text-left">
      <h3 class="student-head">New Subject</h3>
      <hr>
    </div>
    <div class="panel subjectpanel col-lg-6 col-lg-offset-3" >
	    <div class="panel-body">
        	<form name="addsubjectform" >
        		<div class="row">
	        		<div class="col-lg-12">
	        			<div class="row">
	        				<div class="col-md-4">
	        					<label>Subject</label>
	        				</div>
	        				<div class="col-md-8">
	        					<input type="text" class="form-control form-input" name="subjectname" v-model="subject.subjectname" placeholder="Subject Name*" required>
	        				</div>
	        			</div>
	        		</div>
        		</div>
                <br>
        		<div class="row">
					<div class="col-md-4">
						<label for="class">Testable</label>
					</div>
					<div clas="col-md-8">
						<label class="col-md-2">
						    <input type="radio" name="syllabustype" value="true" v-model="subject.istestable">true
						</label>
						<label class="col-md-2">
						    <input type="radio" name="syllabustype" value="false" v-model="subject.istestable" >false
						</label>
					</div>
				</div>
                <br> 
        		<div class="row">
					<div class="col-lg-6 col-lg-offset-3 text-center">
						<button id="btn-reset" type="reset" class="btn button"> Reset</button>
                        <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="addsubject()" class="btn button" ng-disabled="addsubjectform.$invalid">Submit</button>
                    </div>
				</div>
        	</form>
        </div>
	</div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
export default
{
    props:['school','userdetails'],
    data(){
        return{
            subject:{},
            id:this.$cookie.get('id')
        }
    },
    methods:{
        addsubject:function(){
            var subject={
                "istestable":this.subject.istestable,
                "subjectname":this.subject.subjectname
            }
            console.log(subject)
            UserService.NewSubject(subject,this.id).then((response)=>{
                if(response.status==202){
                    this.$router.push('/admin/subjects');
                }
            }).catch((error)=>{
                console.log(error.response.data);
            })

        }
    }
}
</script>
<style>
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