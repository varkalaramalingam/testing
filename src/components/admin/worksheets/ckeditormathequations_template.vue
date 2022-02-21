<template>
	<div class="ckeditor"><textarea :id="id" :value="value"></textarea></div>
</template>

<script>
export default{
	data() {
        return {
            content: '<p><strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit. Asperiores facere rem nostrum molestiae. Minus, amet recusandae nam vel explicabo nisi error quaerat magnam excepturi veniam.</p>'
        }
    },
    props: {
        value: {
            type: String
        },
        id: {
            type: String,
            default: 'editor'
        },
        height: {
            type: String,
            default: '30px',
        },
        toolbar: {
            type: Array,
            default: () => [
                ['EqnEditor']

            ]
        },
        language: {
            type: String,
            default: 'en'
        },
        extraplugins: {
            type: String,
            default: ''
        }
    },
    beforeUpdate() {
        const ckeditorId = this.id
        if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
            CKEDITOR.instances[ckeditorId].setData(this.value)
        }
    },
    mounted() {
        const ckeditorId = this.id
        CKEDITOR.config.height = 200;
        CKEDITOR.config.width = 600;
        console.log(this.value)
        const ckeditorConfig = {
            toolbar: this.toolbar,
            language: this.language,
            //height: this.height,
            extraPlugins: this.extraplugins
        }
        //CKEDITOR.replace(ckeditorId, ckeditorConfig)
        console.log(CKEDITOR)
        CKEDITOR.replace(ckeditorId, {
    toolbar: [
    ["EqnEditor"],
    {
    name: "document",
    items: ["Source", "-", "NewPage", "Preview", "-", "Templates"]
    },
    [
    "Cut",
    "Copy",
    "Paste",
    "PasteText",
    "PasteFromWord",
    "-",
    "Undo",
    "Redo"
    ],
    "/",
    { name: "basicstyles", items: ["Bold", "Italic"] }
    ]
    });
        /*CKEDITOR.replace(ckeditorId, {
            toolbar: [
                ['EqnEditor',]
            ]
        });*/
        //CKEDITOR.instances[ckeditorId].setData('')
        console.log("before set text area ckeditor value is  :  "+this.value)
        CKEDITOR.instances[ckeditorId].setData(this.value)
        CKEDITOR.instances[ckeditorId].on('change', () => {
            let ckeditorData = CKEDITOR.instances[ckeditorId].getData()
            if (ckeditorData !== this.value) {
                this.$emit('input', ckeditorData)
            }
        })
    },
    destroyed() {
        const ckeditorId = this.id
        if (CKEDITOR.instances[ckeditorId]) {
            CKEDITOR.instances[ckeditorId].destroy()
        }
    }
}

</script>