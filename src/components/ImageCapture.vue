<template>
    <div>
        <img id="pastedImage" width="20%" heigth="50%">
    </div>
</template>

<script>
    export default{
        name: 'imageCapture',
        props: {
            'modelSelected': Object,
            'field':Object,
            'context':Object,
        }, 
        data(){
            return {
                localmodelSelected:this.modelSelected,
                localfield:this.field,
                localtypeData:this.typeData,
                localtypeData:this.context,
                localImages:[]
            }
        },
        computed:{
            uploadPath:{
                get(){
                },
                set(){

                }
            }
        },
        watch: {

        },        
        methods:{

        }
    }
</script>