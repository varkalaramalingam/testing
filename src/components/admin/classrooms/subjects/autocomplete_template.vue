<template>
    <div style="position:relative" v-bind:class="{'open':openSuggestion}">
        <div class="input-group searchbar">
            <input class="search-query form-control" type="text" v-model="selectvalue"
                @keydown.enter = 'enter'
                @keydown.down = 'down'
                @keydown.up = 'up'
                @input = 'change'
                v-bind:placeholder="placeholder"
            >
            <span class="input-group-btn" v-if="typevalue==0">
                <button class="btn search-btn" type="button" v-on:click="noSuggestionClick">
                    <span class=" glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>
        <!-- "@keyup="$emit('update:selection', selection); -->
        <ul class="dropdown-menu" >
            <!-- style="width:100%" -->
            <li v-for="(suggestion,index) in matches"
                v-bind:class="{'active': isActive(index)}"
                @click="suggestionClick(index)"
                v-bind:key="suggestion.id"
            >
                <a>{{ suggestion.tagname }}</a>
            </li>
        </ul>
        <!-- {{matches}} -->
        <!-- {{suggestions}} -->
        <!-- <p>Child data is: {{ selectvalue }}</p>
        {{current}} -->
    </div>
</template>
<script>
import Vue from 'vue';
import UserService from '../../../../services/userService.js';

export default {

    props: {
        suggestions: {
            type: Array,
            required: true
        },

        selection: {
            type: String,
            required: true,
            twoWay: true
        },

        emitvalue: {
            type: String,
            required: true,
        },
        
        emitvaluedynamic: {
            type: String,
            required: false,
        },

        typevalue: {
            type: Number,
            required: true
        },
        // typevalue - 0 for when You want to pass a value which is not tag name
        // typevalue - 1 for dynamic seacrch for tag name

        placeholder: {
            type: String,
            required: true,
        },
    },

    /**
     * More to come here
     */

    data() {
        return {
            open: false,
            current: 0,
            tenantId: this.$cookie.get('id'),
            selectvalue:""
            // selectvalue:{
            //     tagname:""
            // }
        }
    },

    created(){
        this.selectvalue = this.selection;
    },

    methods: {
        //When enter pressed on the input
        enter() {
            if(this.matches.length>0 && this.selectvalue != ""){
                this.selectvalue = this.matches[this.current].tagname;
                console.log(this.selectvalue)
                this.$emit(this.emitvalue,this.matches[this.current])
            }
            this.open = false;
            if(this.typevalue==0){
                this.$emit(this.emitvalue,this.selectvalue)
            }
        },

        //When up pressed while suggestions are open
        up() {
            if(this.current > 0)
                this.current--;
        },

        //When up pressed while suggestions are open
        down() {
            if(this.current < this.suggestions.length - 1)
                this.current++;
        },

        //For highlighting element
        isActive(index) {
            return index === this.current;
        },

        //When the user changes input
        change() {
            if (this.open == false) {
                this.open = true;
                this.current = 0;
            }
            if(this.typevalue==1){
                this.$emit(this.emitvaluedynamic,this.selectvalue)
            }
        },

        //When one of the suggestion is clicked
        suggestionClick(index) {
            // this.selectvalue = this.matches[index];
            this.selectvalue = this.matches[index].tagname;
            this.open = false;
            // this.$emit(this.emitvalue,this.selectvalue)
            this.$emit(this.emitvalue,this.matches[index])
        },

        //When outside of suggestions is clicked
        noSuggestionClick(){
            this.open = false;
            this.$emit(this.emitvalue,this.selectvalue)
        }
    },

    computed: {

        //Filtering the suggestion based on the input
        matches() {
            return this.suggestions.filter((str) => {
                return str.tagname.toLowerCase().indexOf(this.selectvalue.toLowerCase()) >= 0;
            });
        },

        //The flag
        openSuggestion() {
            return this.selectvalue !== "" &&
                this.matches.length != 0 &&
                this.open === true;
        }
    }
}

</script>