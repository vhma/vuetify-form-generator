<template>

<div>

    <v-text-field
      v-model="localValue"
      :label="field.label"
      :required="evalInContextValue(field.required)"
      :readonly="evalInContextValue(field.readonly)"
      :disabled="evalInContextDisabled( field.disabled || false )"
      :placeholder="field.placeholder"
      :mask="field.mask"
      multi-line
      v-bind:textarea="field.featured"
      v-if="evalInContext( field.conditionalShow||true )"
      @paste="onPaste"
    ></v-text-field>

    <img id="pastedImage" width="60%" heigth="50%">

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
                localContext:this.context,
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
            loadImage(){

            },
            onPaste(event) {
                var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
                console.log(JSON.stringify(items)); // le dará los tipos de mimo
                // buscar imagen pegada entre los elementos pegados
                var blob = null;
                for (var i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf("image") === 0) {
                    blob = items[i].getAsFile();
                  }
                }
                // cargar imagen si hay una imagen pegada
                if (blob !== null) {
                  var reader = new FileReader();
                  reader.onload = function(event) {
                    console.log(event.target.result); // data url!
                    document.getElementById("pastedImage").src = event.target.result;
                  };
                  reader.readAsDataURL(blob);
                  var imagen = new File([blob], "proof_image_"+Date.now()+".jpg", { type: "image/jpeg", lastModified: Date.now()})

                  this.localImages.push(imagen)
debugger;
                }
            },
            evalInContextValue(string){
                let evalString = null;
                try{
                    evalString = eval(string);
                } catch(error) {
                  try {
                    evalString = eval(string)
                  } catch(errorWithoutThis) {
                    evalString = null;
                  }
                }
                return evalString;
            },
            evalInContextLink(string){
                debugger;
                let evalString = null;
                let model = this.model;
                try{
                    evalString = eval(string);
                } catch(error) {
                  try {
                    evalString = eval(string)
                  } catch(errorWithoutThis) {
                    evalString = null;
                  }
                }
                return evalString;
            },
            evalInContext(string){
                let model = this.model;
                let isRender = true;
                try{
                	isRender = eval(string);
                } catch(error) {
                  try {
                  	isRender = eval(string)
                  } catch(errorWithoutThis) {
                  	isRender = true;
                  }
                }
                if( !isRender ){
                    eventHub.$emit('updatefield', {field:this.field.model, value:""})
                }

                return isRender;
           },
            evalInContextDisabled(string){
                let model = this.model;
                let isDisabled = false;
                try{
                	isDisabled = eval(string);
                } catch(error) {
                  try {
                  	isDisabled = eval(string)
                  } catch(errorWithoutThis) {
                  	isDisabled = false;
                  }
                }

                if( isDisabled ){
                    eventHub.$emit('updatefield', {field:this.field.model, value:""})

                }

                return isDisabled;
           },

        }
    }
</script>