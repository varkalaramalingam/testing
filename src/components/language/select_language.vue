<template>
	<div class="locale-changer" id="locale-changer">
    	<select id="select_language" class="form-control form-input" paceholder="Select" v-model="$i18n.locale" @change="langChanged($i18n.locale)">
      		<option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ fullLang[i] }}</option>
    	</select>
  	</div>
</template>
<script>
export default{
		name: 'locale-changer',
 	 	data () {
   	 		return { langs: ['en', 'hi', 'te', 'ka', 'or', 'gu'], fullLang: ['English', 'Hindi', "Telugu", "Kannada", "Oriya", "Gujarati"] }
  		},
  		
  		methods: {
			langChanged(lang){
      			localStorage.Lang=lang;
			}
  		},
		mounted () {
     		if(localStorage.Lang!=null) {
     			this.$i18n.locale=localStorage.Lang;
     		}
		}
  		
  		
}
</script>
<style>
	#locale-changer{
		padding: 7px;
		width: 150px;
	}
	.font20{
		font-size: 20px;
		color:#415568;
	}
	.font15{
		font-size: 15px;
		color:#415568;
	}
</style>