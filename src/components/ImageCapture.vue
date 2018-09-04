<template>

<div>
    <v-textarea
      v-model="localValue"
      :label="field.label"
      :required="evalInContextValue(field.required)"
      :readonly="evalInContextValue(field.readonly)"
      :disabled="evalInContextDisabled( field.disabled || false )"
      :placeholder="field.placeholder"
      :mask="field.mask"
      v-bind:textarea="field.featured"
      v-if="evalInContext( field.conditionalShow||true )"
      @paste="onPaste"
    ></v-textarea>

<div v-if="proofImages.length > 0">
    <v-carousel  :cycle="false" hide-delimiters light height="50%"  width="50%">
        <v-carousel-item v-for="(image, index) in proofImages"
        cycle
        :key="`${index}-carousel-proof`"
        >
            <div >
                <img :id="image.id" width="100%" />
          </div>
        </v-carousel-item>
    </v-carousel>
</div>


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

import { firebase_main, firebase_mobile} from '../../firebase/firebase'

    export default{
        name: 'imageCapture',
        props: {
            'modelSelected': Object,
            'field':Object,
            context:Object,
            options:Object
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
            proofImages:{
                get(){
                    return this.localImages;
                },
                set(image){
                    this.localImages.push(image)
                }
            },
            pathProofImages:{
                get(){
                    var arr=[], i=0;
                    for(i=0; i<this.localImages.length; i++){
                        arr.push( this.localImages[i].fullpath );
                    }

                    return arr;
                },
                set(image){
                    this.localImages.push(image)
                }
            }
        },
        watch: {

        },        
        methods:{
            renderImages(){
            // cargar imagen si hay una imagen pegada
                var reader = new FileReader();
                var dataURL, output,i,dataURL, targetImage;
                var self = this;
                if (this.localImages !== null && this.localImages.length > 0) {
                    for(i=0; i<this.localImages.length; i++){
                        targetImage = self.localImages[i];
                        reader = new FileReader();
                        reader.onload = function(event){
                          dataURL = reader.result;
                          output = document.getElementById(targetImage.id);
                          output.src = dataURL;
                        };

                        //TODO: function to destroy FileReader after put URLS (reader.onload finish)

                        reader.readAsDataURL(targetImage.data);
                    }
                }
            },
            uploadImage(image){
                if (this.localImages ===null || this.localImages.length == 0) {

                }
                else{
                  //var storageRef = firebase.storage().ref('users/amzn1.account.AF66SPCV5BICRUDXBMSBOTVL7V3Q/images/mx-projecta-credit-application/269/');
                  //console.log('firebasePath', storageRef)
                  //for( var i=0; i<this.localImages.length; i++){
                    //console.log('image', this.localImages[i])
                    //uploadTask = storageRef.child(this.localImages[i].name).put(this.localImages[i])
                    //}
                    debugger;

                  var storageRef, item, uploadTask, path, currentDate;
                  switch(this.context.input.origin){
                    case "AlphaMobile":
                        path = "users/"+this.context.input.uid+"/images/"+this.context.input.scriptId+"/"+this.context.input.id+"/images/";
                        storageRef = firebase_mobile.storage().ref(path);
                    break;
                    case "AlphaX":
                        path = "users/"+this.context.input.uid+"/images/"+this.context.input.scriptId+"/"+this.context.input.id+"/images/";
                        storageRef = firebase_main.storage().ref(path);
                    break;
                    default:
                        storageRef = null;
                        path = "";
                    break;
                  }

                  if(storageRef && storageRef != null){
                      //var storageRef = firebase.firebase_mobile.storage().ref('test/upload/'),
                      item = this.localImages.filter(itemArr => itemArr === image )[0];
                      console.log('localImages', this.localImages)
                      console.log('localImages', item)
                      uploadTask = storageRef.child(item.id).put(item.data)
                  }
                  currentDate = new Date(Date.now()).toJSON();
                  console.log( "pathProofImages", this.pathProofImages )
                  eventHub.$emit('updatefield', {field:'images', value: this.pathProofImages })
                  eventHub.$emit('updatefield', {field:'validationTime', value: currentDate })
                }
            },
            onPaste(event) {
                var items = (event.clipboardData  || event.originalEvent.clipboardData).items, path, pathId, imagen, objImage, fullpath;

                // buscar imagen pegada entre los elementos pegados
                var blob = null;
                for (var i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf("image") === 0) {
                    blob = items[i].getAsFile();
                  }
                }
                // cargar imagen si hay una imagen pegada
                if (blob !== null) {
                debugger;
                  var path = "validate_proof_"+new Date(Date.now()).toJSON().slice(0,19).replace("T","-").replace(/:/g,"-")+".jpg",
                      pathId = "validate_proof_"+new Date(Date.now()).toJSON().slice(0,19).replace("T","-").replace(/:/g,"-");

                    if(this.context.input.folio){
                        pathId = pathId +"_"+this.context.input.folio;
                    }
                    if(pathId){
                        path = pathId +".jpg";
                    }

                    switch(this.context.input.origin){
                        case "AlphaMobile":
                            fullpath = "users/"+this.context.input.uid+"/images/"+this.context.input.scriptId+"/"+this.context.input.id+"/images/";
                        break;
                        case "AlphaX":
                            fullpath = "users/"+this.context.input.uid+"/images/"+this.context.input.scriptId+"/"+this.context.input.id+"/images/";
                        break;
                        default:
                            fullpath = "users/12345/test/images/";
                        break;
                    }
                    fullpath = fullpath + path;

                  var imagen = new File([blob], path, { type: "image/jpeg", lastModified: Date.now(), id:pathId} )
                      ,objImage ={ id:pathId, data:imagen, fullpath:fullpath }

                  this.localImages.push(objImage);
                  this.uploadImage(objImage);

                  this.renderImages();

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