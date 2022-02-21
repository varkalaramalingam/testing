<template>
    <div>
        <nav class="navbar iteachbar" v-if="mysubjects.length != 0">
            <div class="container-fluid">
                <ul class="nav navbar-nav  navbar-left testnavbar" v-if="mysubjects.length < 6" >
                    <li v-for="grade in mysubjects" >
                        <router-link :to="{path:'/mysubjects/'+grade.gradenumber+grade.sectionname+'-'+grade.subjectname+'-'+grade.syllabustype}" active-class="active" v-on:click.native="setMySubject(grade)">{{grade.gradename}}/{{grade.sectionname}}/{{grade.subjectname}}/{{grade.syllabustype}}</router-link>
                    </li>
                </ul>
                <select class="form-control gradeFilter" @change="setMySubjectForDropdown()" v-model="gradedetails" style="width:20%" v-else-if="mysubjects.length >= 6">
                    <option v-for="grade in mysubjects" v-bind:value="grade.id+grade.subjectname+grade.syllabustype">
                        <!-- <router-link :to="{path:'/mysubjects/'+grade.gradenumber+grade.sectionname+'-'+grade.subjectname+'-'+grade.syllabustype}" active-class="active" v-on:click.native="setMySubject(grade)"> -->
                        {{grade.gradename}}/{{grade.sectionname}}/{{grade.subjectname}}/{{grade.syllabustype}}
                        <!-- </router-link> -->
                    </option>
                </select>
            </div>
        </nav>
        <div class="sectionreset-padding sectionreset-margin">
            <router-view v-bind:school="school" v-bind:userdetails="userdetails" v-bind:mysubject="mysubject" v-bind:acdemicyearandboard="acdemicyearandboard" v-bind:academicsandboards="academicsandboards" v-bind:userid="userid"></router-view>
        </div>
    </div>
</template>
</template>
<script>
import UserService from '../../../../services/userService.js'
import store from "../../../../store.js";

    export default{
        props:['school','userdetails','acdemicyearandboard','userid','academicsandboards','userid'],
        data(){
            return{
                mysubjects:[],
                mysubject:"",
                userId:{
                        id:this.$cookie.get('userid')
                },
                id:this.$cookie.get('id'),
                gradedetails:"",
                mysubjectfordropdown:{}
            }
        },
        created(){
            UserService.MySubjects(this.userId,this.id).then((response)=>{
                console.log(response.data);
                this.mysubjects=response.data
                if(this.mysubjects.length >= 6){
                    if (this.mysubject) {
                        console.log(this.mysubject)
                        this.gradedetails = this.mysubject.id + this.mysubject.subjectname + this.mysubject.syllabustype
                        this.setMySubjectForDropdown();
                    }
                    else{
                        this.mysubject = this.$store.state.mySubject;
                        console.log(this.mysubject)
                        if(this.mysubject.gradename){
                            console.log(this.mysubject)
                            this.gradedetails = this.mysubject.id + this.mysubject.subjectname + this.mysubject.syllabustype
                            this.setMySubjectForDropdown();
                            // this.$router.go()
                        }
                        else{
                        this.gradedetails = this.mysubjects[0].id + this.mysubjects[0].subjectname + this.mysubjects[0].syllabustype
                        this.setMySubjectForDropdown()
                        // this.mysubject = this.mysubjects[0];
                        // console.log(this.mysubject)
                        // store.commit("MY_SUBJECT", this.mysubject);
                        // this.$router.push('/myclass/'+this.myclass.gradenumber+this.myclass.sectionname+'-'+this.myclass.syllabustype)
                        }
                    }
                    // this.gradedetails = this.mysubjects[0].id
                    // this.setMySubjectForDropdown()
                }
                else{
                    if (this.mysubject) {
                        console.log(this.mysubject)
                        this.setMySubject(this.mysubject);
                    }
                    else{
                        this.mysubject = this.$store.state.mySubject;
                        console.log(this.mysubject)
                        if(this.mysubject.gradename){
                            // console.log(this.mysubject)
                            this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype)
                        }
                        else{
                            this.mysubject = this.mysubjects[0];
                            store.commit("MY_SUBJECT", this.mysubject);
                            this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype)
                        // this.gradedetails = this.mysubjects[0].id
                        // this.setMySubjectForDropdown()
                        }
                    }
                    // this.mysubject = this.mysubjects[0];
                    // this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype)
                }
            })
        },
        methods:{
            setMySubject:function(grade){
                console.log(grade);
                this.mysubject=grade
                store.commit("MY_SUBJECT", this.mysubject);
                // this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype)
            },
            setMySubjectForDropdown:function(){
                // console.log(grade);
                // this.mysubject=grade
                console.log(this.gradedetails)
                length = this.mysubjects.length;
                for(let i = 0; i < length; i++){
                    // console.log(this.mysubjects[i].id + this.mysubjects[i].subjectname + this.mysubjects[i].syllabustype)
                    if(this.gradedetails == this.mysubjects[i].id + this.mysubjects[i].subjectname + this.mysubjects[i].syllabustype){
                        this.mysubjectfordropdown = this.mysubjects[i];
                        break;
                    }
                }
                this.mysubject = this.mysubjectfordropdown;
                store.commit("MY_SUBJECT", this.mysubject);
                this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype)
            }
        }

    }
</script>
<style>
.iteachbar{
    background:#eee;
    border-radius:0px;
    height:50px
}
.active{
border-bottom:3px solid #fb6750;
}
.iteachnavbar>li>a:focus{
    background-color:transparent;
}
.navbar{
    position: relative;
    min-height: 50px;
    margin-bottom:0px;
    border: 1px solid transparent;
}
.navbar-nav>li>a {
    padding-top:10px;
     padding-bottom:15px;
}
</style>