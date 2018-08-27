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

    <v-btn @click="uploadImage()">subir imagen</v-btn>

</div>
</template>

<script>
import eventHub from './eventHub'
/**
import firebase from 'firebase'
var config =({
    apiKey: "AIzaSyAHYUFnVgSpAJI6RbmgD_ofUyF6uLsWNW0",
    authDomain: "alphax-m2-integration.firebaseapp.com",
    databaseURL: "https://alphax-m2-integration.firebaseio.com",
    storageBucket:"gs://alphax-m2-integration.appspot.com",
    projectId: "alphax-m2-integration"
  })
firebase.initializeApp(config)
**/
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
                localImages:[],
                localValue: this.value
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
            uploadImage(){
            var uploadTask,
            self = this;
                if (this.localImages ===null || this.localImages.length == 0) {
                  console.log('No hay imagenes para subir')
                }
                else{
                  console.log('mensaje dos entro a la funcion')
                  //var storageRef = firebase.storage().ref('users/amzn1.account.AF66SPCV5BICRUDXBMSBOTVL7V3Q/images/mx-projecta-credit-application/269/');
                  //console.log('firebasePath', storageRef)
                  //for( var i=0; i<this.localImages.length; i++){
                    //console.log('image', this.localImages[i])
                    //uploadTask = storageRef.child(this.localImages[i].name).put(this.localImages[i])
                  //}
                  console.log('uploadImages updatefield',  {field:this.field.model, value:self.localImages})
                  eventHub.$emit('updatefield', {field:this.field.model, value:{data:this.localImages} })
                  eventHub.$emit('updatefield', {field:'validationTime', value:new Date(Date.now()).toJSON().slice(0,19).replace("T","-").replace(/:/g,"-")})
                }


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
                  var imagen = new File([blob], "proof_image_"+new Date(Date.now()).toJSON().slice(0,19).replace("T","-").replace(/:/g,"-")+".jpg", { type: "image/jpeg", lastModified: Date.now()})

                  this.localImages.push(imagen);
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