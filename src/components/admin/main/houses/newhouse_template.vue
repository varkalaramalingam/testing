<template>
    <div>
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head">New House</h3>
                <hr>
            </div>
        </div>
        <div>
        <div class="panel newhousepanel col-lg-6 col-lg-offset-3">
            <div class="panel-body">
                <form class="form-horizantal" name="addhouseform">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">House Name</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="housename" placeholder="House name*" v-model="house.housename" ng-pattern="/[aA-zZ\s]$/" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Description</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="description" placeholder="Description*" v-model="house.description" ng-pattern="/[aA-zZ\s]$/" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset" type="reset" class="btn button">Reset</button>
                                <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newhouse()" class="btn button">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
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
            house:{},
            id:this.$cookie.get('id')
        }
    },
    methods:{
        newhouse:function(){
        var house={
            "housename":this.house.housename,
            "description":this.house.description
        }
        UserService.NewHouse(house,this.id).then((response)=>{
            if(response.status==200){
            this.$router.push('/admin/houses');
            }
        }).catch((error)=>{
            console.log(error.response.data)
        })

    }

}
}
</script>