<template>
<div class="row">
    <div class="col-lg-2 sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/students'}" active-class="adminsidebar"><span v-html="$t('students')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/subjects'}" active-class="adminsidebar">Subjects</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/tests'}"  active-class="adminsidebar"><span v-html="$t('tests')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/assignments'}"  active-class="adminsidebar"><span v-html="$t('assignments')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/worksheets'}"  active-class="adminsidebar">Worksheets</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/myclasstimetable'}"  active-class="adminsidebar">Timetable</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/journal'}"  active-class="adminsidebar"><span v-html="$t('journals')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/attendance'}" active-class="adminsidebar">Attendance</router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/messages'}" active-class="adminsidebar"><span v-html="$t('messages')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/classroominventory'}" active-class="adminsidebar"><span v-html="$t('classroominventory')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/assignedbooks'}" active-class="adminsidebar"><span v-html="$t('assignedbooks')"/></router-link></li>
                <li class="sidebar-li"><router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/projects'}" active-class="adminsidebar"><span v-html="$t('projects')"/></router-link></li>

          </ul>
        </div>
      </div>
      <div class="col-lg-10">
        <router-view v-bind:myclass="myclass" v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard"  v-on:student="Student($event)" v-bind:singlestudent="singlestudent" v-bind:academicsandboards="academicsandboards" v-bind:userid="userid"></router-view>
    </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
    export default{
        props:['school','myclass', 'userdetails','acdemicyearandboard','academicsandboards','userid'],
        data(){
        return{
            id:this.$cookie.get('id'),
            singlestudent:{},
            // myclass:{}
            }
        },
        created(){
        //   this.myclass = this.$store.state.myClass;
        // this.$router.push('/myclass/'+this.myclass1.gradenumber+this.myclass1.sectionname+'-'+this.myclass1.syllabustype+'/students')
        },
        methods:{
            Student:function(student){
                 UserService.Studentdetails(this.id,student).then((response)=>{
                     console.log(response)
                     this.singlestudent=response.data
            }).catch((error)=>{
                console.log(error.data)
            })
        },
    
        }
    }
</script>

