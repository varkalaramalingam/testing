<template>
<div>
    <div class="col-lg-2 sidebar">
        <div class="left-navigation">
            <ul class="sidebar-ul">
                <li class="sidebar-li"><router-link  :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/students'}"  active-class="adminsidebar"><span v-html="$t('students')"/></router-link></li>
                <li class="sidebar-li"><router-link  :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/tests'}"  active-class="adminsidebar">Tests</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/assignments'}" active-class="adminsidebar"><span v-html="$t('assignments')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/worksheets'}" active-class="adminsidebar">Worksheets</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/mysubjecttimetable'}" active-class="adminsidebar">Timetable</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/journal'}" active-class="adminsidebar"><span v-html="$t('journals')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/attendance'}" active-class="adminsidebar"><span v-html="$t('attendance')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/messages'}" active-class="adminsidebar"><span v-html="$t('messages')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/projects'}" active-class="adminsidebar"><span v-html="$t('projects')"/></router-link></li>
            </ul>
        </div>
    </div>
    <div class="col-lg-10">
       <router-view v-bind:mysubject="mysubject" v-bind:school="school" v-bind:userdetails="userdetails"  v-on:student="Student($event)"  v-bind:acdemicyearandboard="acdemicyearandboard" v-bind:singlestudent="singlestudent" v-bind:academicsandboards="academicsandboards" v-bind:userid="userid"></router-view>
    </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
export default{
    props:['mysubject','school','userdetails','acdemicyearandboard','academicsandboards','userid'],
      data(){
        return{
            id:this.$cookie.get('id'),
            singlestudent:{}
            }
        },
        // created(){
        //     this.$router.push('/mysubjects/'+mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/students')
        // },
        methods:{
                Student:function(student){
                 UserService.Studentdetails(this.id,student).then((response)=>{
                     console.log(response)
                     this.singlestudent=response.data
            }).catch((error)=>{
                console.log(error.data)
            })
        }
        }
}
</script>

<style scoped>
.sidebar-ul>li>a {
    position: relative;
    display: block;
    padding: 10px 2px;
    color: #1e326d;
    text-align: left;
    text-transform: capitalize;
}
</style>