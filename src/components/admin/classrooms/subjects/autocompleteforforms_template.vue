<template>
    <div style="position:relative" v-bind:class="{'open':openSuggestion}">
        <div class="input-group searchbar">
            <input class="search-query form-control" type="text" v-model="selectvalue"
                @keydown.enter = 'enter'
                @keydown.down = 'down'
                @keydown.up = 'up'
                @input = 'change'
                @click = 'click'
                v-bind:placeholder="placeholder"
            >
            <!-- <span class="input-group-btn" >
                <button class="btn search-btn" type="button" v-on:click="noSuggestionClick">
                    <span class=" glyphicon glyphicon-search"></span>
                    ADD
                </button>
            </span> -->
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
            type: Object,
            required: true,
            twoWay: true
        },
        placeholder: {
            type: String,
            required: false,
        },
    },

    /**
     * More to come here
     */

    data() {
        return {
            open: false,
            current: 0,
            selectvalue:""
        }
    },

    created(){
        this.selectvalue = this.selection.tagname;
        console.log(this.selectvalue);
    },

    methods: {
        // deleteSuggestion: function(suggestion) {
        //     this.suggestions.splice(suggestion);
        //     console.log(this.suggestions)
        // },
        //When enter pressed on the input
        enter() {
            if(this.matches.length>0){
                let update = this.matches[this.current];
                this.selectvalue = this.matches[this.current].tagname;
                console.log(this.selectvalue)
                this.$emit("update",update)
            } else{
                this.$emit("update",{id:0,tagname:this.selectvalue})
            }
            this.open = false;
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
            this.$emit("update",{id:0,tagname:this.selectvalue});
        },

        //When the user clicks input element
        click() {
            console.log(this.open);
            this.open = false;
        },

        //When one of the suggestion is clicked
        suggestionClick(index) {
            let update = this.matches[index];
            console.log(this.matches[index]);
            this.selectvalue = this.matches[index].tagname;
            this.open = false;
            console.log(this.selectvalue);
            this.$emit("update",update);
        },

        //When outside of suggestions is clicked
        noSuggestionClick(){
            this.open = false;
            this.$emit("update",this.selectvalue)
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