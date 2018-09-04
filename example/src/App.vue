<template>
	<v-app>
<div>
	Main model {{ model }}

        <v-form-generator :model="model" :schema="schema" :options="options" :imageUrls="imageUrls" :context="context" />

</div>
	</v-app>
</template>

<script>
import {eventHub} from './main'
import ProductZoomer from 'vue-product-zoomer'

	export default {
		components: {
			'v-form-generator': require('vuetify-form-generator').default,
			eventHub,
			ProductZoomer
		},
		created(){
		    eventHub.$on("updateparentmodel", dataMainModel=>{
		        if(this.$store){
		            console.log('Update by commit')
		        }else{
		            console.log('Update by emit')
		            console.log('parentmodel',this.model)
		        }
		    })
		    this.$root.$on("updateparentmodel", dataMainModel=>{
		        if(this.$store){
		            console.log('Update by commit2')
		        }else{
		            console.log('Update by emit2')
		            console.log('parentmodel2',this.model)
		            console.log('dataMainModel',dataMainModel)
		        }
		    })
		},
		data(){
			return {
                "imageUrls":[
                    "public/documents/modeloA.jpg",
                    "public/documents/modeloB.jpg",
                    "public/documents/test.pdf",
                    "public/documents/unknown.jpg"
                  ],
                model: {
"type":"curp",
"subtype":"curp",
"valid":"",
"remedy":"",
"terminal":"",
"curp":"",
"images":[],
"proofImages":[],
"validationTime": ""
                 },
                schema: {
  "forms": [
    {
      "id": "dataCapture",
      "label": "Verifica Datos",
      "helpUrl": "todo.html",
      "helpIcon": "true",
      "fields": [
        {
          "groups":[
            {
              "legend":"Datos Capturados",
              "key":"idType1",
              "fields":[
                {
                  "resultPathNode": "type",
                  "model": "type",
                  "type": "dropdown",
                  "label": "Tipo de Identificación",
                  "hint": "Tipo de Identificación",
                  "required": "true",
                  "options": [
                    {
                      "id": "curp",
                      "name": "CURP"
                    },
                    {
                      "id": "unknown",
                      "name": "Desconocido o Equivocado",
                      "terminal": true,
                      "document": "curp",
                      "remedy": {
                        "type": "uploadDocument",
                        "options": {
                          "multiPage": true
                        },
                        "label": "Favor de proporcionar una CURP válida",
                        "cause": "Documento desconocido o equivocado"
                      }
                    },
                    {
                      "id": "low-quality",
                      "name": "Borroso, incompleto o de baja calidad",
                      "terminal": true,
                      "document": "curp",
                      "remedy": {
                        "type": "uploadDocument",
                        "options": {
                          "multiPage": true
                        },
                        "label": "Favor de proporcionar una CURP válida",
                        "cause": "Documento incompleto o ilegible"
                      }
                    }
                  ]
                },
                {
                  "resultPathNode": "valid",
                  "model": "valid",
                  "type": "dropdown",
                  "label": "Vigencia",
                  "hint": "Vigencia de CURP",
                  "required": "true",
                  "options": [
                    {
                      "id": "true",
                      "name": "Vigente"
                    },
                    {
                      "id": "false",
                      "name": "Expirada",
                      "terminal": true,
                      "remedy": {
                        "type": "uploadDocument",
                        "options": {
                          "multiPage": true
                        },
                        "label": "Favor de proporcionar una CURP válida",
                        "cause": "CURP vencida"
                      }
                    }
                  ]
                },
                {
                  "resultPath": "curp",
                  "model": "curp",
                  "type": "textbox",
                  "label": "CURP",
                  "hint": "Clave CURP",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.type == 'curp' && model.terminal != true",
                  "mask":"AAAA######AAAAAA##"
                }
              ]
            },
            {
              "legend":"Captura de pantalla",
              "key":"idType2",
              "fields":[
                {
                  "model": "linkVerificación",
                  "type": "button",
                  "label": "Verifica documento",
                  "disabled": "model.terminal == true",
                  "href": "((model.type == 'curp')?'https://consultas.curp.gob.mx':'')",
                  "target": "_blank"
                },
                {
                  "resultPath": "validateProof",
                  "model": "validateProof",
                  "type": "radio",
                  "label": "Documento",
                  "hint": "El documento concuerda con la verificacón externa",
                  "required": "true",
                  "mandatory": "false",
                  "conditionalShow": "model.terminal != true && (model.type != 'unknown' && model.type != 'low-quality' )",
                  "options": [
                    { "id": "true", "name": "Válido"},
                    { "id": "false", "name": "Inválido"}
                  ]
                },
                {
                  "resultPath": "proofImages",
                  "model": "proofImages",
                  "type": "textareaImage",
                  "label": "Pegar evidencia de captura de pantalla aquí",
                  "hint": "Copia la imagen de la liga de verificación",
                  "required": "true",
                  "readonly": "true",
                  "disabled": "model.terminal == true"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
                },
                options: {},
                context:{
input:{
        "folio" : "6",
        "id" : "b019698e-dfeb-4a37-a189-8237bfc2f0b2",
        "origin" : "AlphaMobile",
        "pdfFormName" : "test-contract",
        "scriptId" : "test-domain",
        "uid" : "12345"
      }


                }
			}
		},
		methods: {
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
