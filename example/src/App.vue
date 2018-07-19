<template>
	<v-app>
	Main model {{ model }}
        <v-form-generator :model="model" :schema="schema" :options="options" :imageUrls="imageUrls"/>
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
		        }
		    })
		    this.$root.$on("updateparentmodel", dataMainModel=>{
		        if(this.$store){
		            console.log('Update by commit')
		        }else{
		            console.log('Update by emit')
		        }
		    })
		},
		computed:{
            imageArr (){
                //Objeto con un elemento raiz, y en cada uno de ellos crea una instancia de un objeto interno
                let arrimg = this.imageUrls;
                let arrFinal = []
                let i = 0;
                for( i=0;i<arrimg.length; i++){
                  console.log("element" +arrimg[i]);
                  arrFinal.push(
                    {
                      images: {
                        normal_size: [
                          {
                            id:i,
                            url:arrimg[i]
                          }
                        ]
                      },
                      'containerSquareOptions': {
                        'zoomFactor': 4,
                        'pane': 'container-square',
                        // 'namespace': 'inline-zoomer'+i,
                        'hoverDelay': 300,
                      }
                    }
                  )
                }
                return arrFinal;
          }
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
                    type:"",
                    valid:"",
                    remedy:"",
                    terminal:"",
                    curp:""
                },
                schema: {
                    "forms": [
                        {
                          "id": "idType",
                          "label": "Tipo de Identificación",
                          "helpUrl": "todo.html",
                          "imagesUrl":[
                            "public/documents/modeloA.jpg",
                            "public/documents/modeloB.jpg",
                            "public/documents/test.pdf",
                            "public/documents/unknown.jpg",
                          ],
                          "fields": [
                            {
                              "resultPathNode": "type",
                              "model": "type",
                              "type": "dropdown",
                              "label": "Tipo de Identificación",
                              "hint": "Tipo de Identificación",
                              "required": "true",
                              "options": [
                                {
                                  "id": "CURP",
                                  "name": "CURP"
                                },
                                {
                                  "id": "unknown",
                                  "name": "Desconocido o Equivocado",
                                  "terminal": true,
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
                            }
                          ]
                        },
                        {
                      "id": "dataCapture",
                      "label": "Captura de Datos",
                      "helpUrl": "todo.html",
                      "helpIcon": "true",
                      "imagesUrl":[
                            "public/documents/modeloA.jpg",
                            "public/documents/modeloB.jpg",
                            "public/documents/test.pdf",
                            "public/documents/unknown.jpg",
                      ],
                      "fields": [
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
                          "resultPath": "CURP",
                          "model": "CURP",
                          "type": "textbox",
                          "label": "CURP",
                          "hint": "Clave CURP",
                          "required": "true",
                          "disabled": "model.terminal == true",
                          "conditionalShow": "model.type == 'CURP' && model.terminal != true",
                          "mask":"AAAA######AAAAAA##"
                        }
                      ]
                    }
                    ]
                },
                options: {

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
