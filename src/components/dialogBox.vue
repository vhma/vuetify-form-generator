<template>
    <div>
            <v-dialog
                v-model="dialoghelp"
                width="50%"
                hide-overlay
                transition="dialog-center-transition"
                lazy
                content-class="dialogCustom"
                >
                <v-card height="40em">
                    <v-toolbar card dark color="primary">
                    <v-btn icon dark @click.native="toogleDialog" >
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Ayuda</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                        <v-card-media
                            v-model="localsrc"
                            v-bind:src="getImageSrc()"
                            height="100%"
                            width="100%"
                            contain>
                        </v-card-media>
                    <div style="flex: 1 1 auto;"></div>
                </v-card>
           </v-dialog>
    </div>
</template>

<script>
    export default{
        name: 'dialoghelp',
        props: {
            'modelSelected': Object,
            'field':Object,
            'dialoghelp':Boolean,
            'typeData':String,
        }, 
        data(){
            return {
                localmodelSelected:this.modelSelected,
                localfield:this.field,
                localdialoghelp:this.dialoghelp,
                type:"",
                subtype:"",
                localtypeData:this.typeData,
            }
        },
        computed:{
            localsrc:{
                get(){
                    this.getImageSrc();
                },
                set(){

                }
            }
        },
        watch: {
            localdialoghelp: function (show) {
                this.localValue = show
            }
        },        
        methods:{
            getImageSrc:function(){
                let src="static/documents/";
                switch(this.localtypeData){
                    case "help":
                        src +="help_";
//                        src +=this.localmodelSelected.type;
                        if(this.localfield.model == "type"){
                            src +=this.localmodelSelected.type;
                        }
                        if(this.localfield.model == "subtype"){
                            src +=this.localmodelSelected.type+"_"+this.localmodelSelected.subtype;
                        }
//                        if(this.localmodelSelected.subtype && this.localmodelSelected.subtype != ""){
//                            src +="_"+this.localmodelSelected.subtype;
//                        }
                        src +=".jpg";

                    break;
                    case "info": 
                        src +="info_";
                        src +=this.localmodelSelected.type;
                        if(this.localmodelSelected.subtype && this.localmodelSelected.subtype != ""){
                            src +="_"+this.localmodelSelected.subtype;
                        }
                        src +=".jpg";
                    break;
                    default:
                        src +=this.localmodelSelected.type;
                        if(this.localmodelSelected.subtype && this.localmodelSelected.subtype != ""){
                            src +="_"+this.localmodelSelected.subtype;
                        }
                        src +=".jpg";
                    break;
                }
                return src;
            },
            toogleDialog:function(){
                this.dialoghelp = false
                this.$emit('input',this.dialoghelp)
            }
        }
    }
</script>
<style>
.dialogCustom{
    margin-left:45%
}
</style>