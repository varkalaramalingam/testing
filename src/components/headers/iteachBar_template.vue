<template>
    <div >
        <nav class="iteachbar" role="navigation">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#links">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>      
        <div class="collapse navbar-collapse" id="links">
            <ul class="iteachnavbar nav navbar-nav navbar-left">
            <li><router-link to="/iTeach/myclass" active-class="active"><span v-html="$t('my_class')"/></router-link></li>
            <li><router-link to="/iTeach/mysubjects" active-class="active"><span v-html="$t('my_subject')"/>s</router-link></li>
            </ul>
        </div>
        </nav>
            <router-view v-bind:school="school" v-bind:userdetails="userdetails"></router-view>
    </div>
</template>
<script>
export default{
        props:['school','userdetails']
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
</style>