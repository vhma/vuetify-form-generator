<template>
	<v-app>
	Main model {{ model }}

<v-autocomplete
        v-model="model2"
        :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
        :items="states"
        :readonly="!isEditing"
        :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`"
        persistent-hint
        prepend-icon="mdi-city"
/>
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

        isEditing: false,
        model2: null,
        states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],

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
                    clabe:"",
                    streetType:"",
                    streetName:"",
                    exteriorNumber:"",
                    settlementType:"",
                    zip:"",
                    locationCode:"",
                    locationName:"",
                    countyCode:"",
                    countyName:"",
                    stateName:"",
                    stateCode:""
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
                              "label": "Tipo de Documento",
                              "hint": "Tipo de Documento",
                              "required": "true",
                              "options": [
                                {
                                  "id": "bankStatement",
                                  "name": "Estado de Cuenta"
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
                                    "label": "Favor de proporcionar una Estado de Cuenta válido",
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
                                    "label": "Favor de proporcionar una Estado de Cuenta válido",
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
                          "resultPath": "clabe",
                          "model": "clabe",
                          "type": "textbox",
                          "label": "CLABE",
                          "hint": "Clabe Interbancaria",
                          "required": "true",
                          "disabled": "model.terminal == true",
                          "conditionalShow": "model.type == 'bankStatement' && model.terminal != true",
                          "mask":"##################"
                        },
                        {
                          "resultPath": "streetType",
                          "model": "streetType",
                          "type": "textbox",
                          "label": "Tipo Calle",
                          "hint": "Tipo de calle",
                          "required": "true",
                          "disabled": "model.terminal == true",
                          "conditionalShow": "model.type == 'bankStatement' && model.terminal != true",
                          "mask":"NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN"
                        },
                        {
                            "resultPath": "streetName",
                            "model": "streetName",
                            "type": "textbox",
                            "label": "Calle",
                            "hint": "Nombre de la Calle",
                            "required": "true",
                            "disabled": "model.terminal == true",
                            "conditionalShow": "model.type == 'bankStatement' && model.terminal != true",
                            "mask":"NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN"
                        },
                        {
                            "resultPath": "exteriorNumber",
                            "model": "exteriorNumber",
                            "type": "textbox",
                            "label": "Número Exterior",
                            "hint": "Número Exterior",
                            "required": "true",
                            "disabled": "model.terminal == true",
                            "conditionalShow": "model.type == 'bankStatement' && model.terminal != true"
                        },
                        {
                            "resultPath": "interiorNumber",
                            "model": "interiorNumber",
                            "type": "textbox",
                            "label": "Número Interior",
                            "hint": "Número Interior",
                            "required": "true",
                            "disabled": "model.terminal == true",
                            "conditionalShow": "model.type == 'bankStatement' && model.terminal != true"
                        },
                        {
                            "resultPath": "zip",
                            "model": "zip",
                            "type": "textbox",
                            "label": "Código Postal",
                            "hint": "Código Postal",
                            "required": "true",
                            "disabled": "model.terminal == true",
                            "conditionalShow": "model.type == 'bankStatement' && model.terminal != true",
                            "mask":"#######"
                        },
                        {
                          "resultPath": "settlementType",
                          "model": "settlementType",
                          "type": "textbox",
                          "label": "Tipo Asentamiento",
                          "hint": "Colonia, Ejido, etc",
                          "required": "true",
                          "disabled": "model.terminal == true",
                          "conditionalShow": "model.type == 'bankStatement' && model.terminal != true",
                          "mask":"NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN"
                        },
                        {
                          "resultPathNode": "locationCode",
                          "model": "locationCode",
                          "targettext": "locationName",
                          "type": "autocomplete",
                          "label": "Estado",
                          "hint": "Selecciona un estado",
                          "required": "true",
                          "conditionalShow": "model.type == 'bankStatement'",
                          "options": [
                            {"id":"1","name":"Aguascalientes"},
                            {"id":"2","name":"Baja California"},
                            {"id":"3","name":"Baja California Sur"},
                            {"id":"4","name":"Campeche"},
                            {"id":"7","name":"Chiapas"},
                            {"id":"8","name":"Chihuahua"},
                            {"id":"9","name":"Ciudad de México"},
                            {"id":"5","name":"Coahuila de Zaragoza"},
                            {"id":"6","name":"Colima"},
                            {"id":"10","name":"Durango"},
                            {"id":"11","name":"Guanajuato"},
                            {"id":"12","name":"Guerrero"},
                            {"id":"13","name":"Hidalgo"},
                            {"id":"14","name":"Jalisco"},
                            {"id":"15","name":"México"},
                            {"id":"16","name":"Michoacán de Ocampo"},
                            {"id":"17","name":"Morelos"},
                            {"id":"18","name":"Nayarit"},
                            {"id":"19","name":"Nuevo León"},
                            {"id":"20","name":"Oaxaca"},
                            {"id":"21","name":"Puebla"},
                            {"id":"22","name":"Querétaro"},
                            {"id":"23","name":"Quintana Roo"},
                            {"id":"24","name":"San Luis Potosí"},
                            {"id":"25","name":"Sinaloa"},
                            {"id":"26","name":"Sonora"},
                            {"id":"27","name":"Tabasco"},
                            {"id":"28","name":"Tamaulipas"},
                            {"id":"29","name":"Tlaxcala"},
                            {"id":"30","name":"Veracruz de Ignacio de la Llave"},
                            {"id":"31","name":"Yucatán"},
                            {"id":"32","name":"Zacatecas"}
                          ]
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
