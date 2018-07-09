<template>
    <div>
            <v-dialog
                v-model="dialoghelp"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
                lazy
                >
                <v-card tile>
                    <v-toolbar card dark color="primary">
                    <v-btn icon dark @click.native="toogleDialog" >
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Ayuda</v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                        <v-card-media
                            v-model="localsrc"
                            v-bind:src="'static/documents/help_ife_ife-a.jpg'"
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
        }, 
        data(){
            return {
                localmodelSelected:this.modelSelected,
                localfield:this.field,
                localdialoghelp:this.dialoghelp,
                localsrc:"",
                type:"",
                subtype:""
            }
        },
        computed: {
        },
        watch: {
            localdialoghelp: function (show) {
                this.localValue = show
            }
        },        
        methods:{
            getImageSrc:function(type, field){
                let src="documents/";
                switch(type){
                    case "help":
                        src +="help_";
                    break;
                    case "info": 
                        src +="info_";
                    break;
                }
            },
            toogleDialog:function(){
                this.dialoghelp = false
                this.$emit('input',this.dialoghelp)
            }
        }
    }
</script>