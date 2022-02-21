<template>
    <div>
         <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head">New Grade</h3>
                 <hr>
            </div>
        </div>
        <div class="panel   createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
                <form class="form-horizantal" name="creategradeform">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-4">
                                <label>Grade Number</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="gradenumber" placeholder="Grade Number*" v-model="grade.gradenumber" ng-pattern="/[0-9\s]$/" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Grade Name</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control form-input" name="subjectname" v-model="grade.gradename" placeholder="Grade Name*" required>
                            </div>
                        </div>
                        <br>
                        <!-- <div class="row">
                            <div class="col-md-4">
                                <label>Subjects</label>
                            </div>
                            <div class="col-md-8 ">
                                <multiselect v-model="grade.subjects" :options="options" :multiple="true" ></multiselect>
                            </div>
                        </div> -->
                        <br>
                    <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newgrade" class="btn button" >Submit</button>
                         </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import UserService from '../../../../services/userService.js';
export default{
    components: { Multiselect },
    props:['school','userdetails'],
    data(){
        return{
        grade:{},
        selected: null,
        options: [],
        boards:[],
        id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.BoardOfEducation(this.id).then((response)=>{
            this.boards=response.data;
        }),
        UserService.Subjects(this.id).then((response)=>{
            this.options=response.data;
            for(var i=0;i<response.data.length;i++){
                this.options[i]=response.data[i].subjectname
            }   
        })
    },
    methods:{
        customLabel (option) {
            return `${option.subjectname}`
        },
        newgrade:function(){
       
            var grade={
                "gradenumber":this.grade.gradenumber,
                "gradename":this.grade.gradename,
                "subjects":this.grade.subjects
            }
        
            UserService.NewGrade(grade,this.id).then((response)=>{
                if(response.status==200){
                    this.$router.push('/admin/grades');
                }
            })
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>