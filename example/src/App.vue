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
    "type":"cfe",
    "streetName":"",
    "externalNumber":"",
    "settlementName":"",
    "zip":"",
    "county":"",
    "city":"",
    "stateName":"",
    "country":"",

    "serviceNumber":"",
    "serviceName":"",
    "images":"",
    "validationTime":""
                 },
                schema: {
  "forms":[
    {
      "id":"dataCapture",
      "label":"Validación de Comprobante CFE",
      "helpUrl":"todo.html",
      "helpIcon":"false",
      "fields":[
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
                  "label": "Valida Recibo",
                  "hint": "Selecciona",
                  "required": true,
                  "options":[
                    {
                      "id": "cfe",
                      "name": "CFE"
                    },
                    {
                      "id":"unknown",
                      "name":"Desconocido o Equivocado",
                      "terminal":"true",
                      "remedy":{
                        "type":"uploadDocument",
                        "options":{
                          "multiPage":true
                        },
                        "label":"Favor de proporcionar un comprobante válido",
                        "cause":"Documento desconocido o equivocado"
                      }
                    },
                    {
                      "id":"low-quality",
                      "name":"Borroso, incompleto o de baja calidad",
                      "terminal":true,
                      "remedy":{
                        "type":"uploadDocument",
                        "options":{
                          "multiPage":true
                        },
                        "label": "Favor de proporcionar un comprobante válido",
                        "cause": "Documento incompleto o ilegible"
                      }
                    }
                  ]
                },
                {
                  "resultPath": "streetName",
                  "model": "streetName",
                  "type": "textbox",
                  "label": "Calle",
                  "hint": "Nombre de la Calle",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPath": "externalNumber",
                  "model": "externalNumber",
                  "type": "textbox",
                  "label": "Número Exterior/Interior",
                  "hint": "Número Exterior",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPath": "settlementName",
                  "model": "settlementName",
                  "type": "textbox",
                  "label": "Colonia",
                  "hint": "Colonia, Ejido, Ranchería, etc",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPath": "zip",
                  "model": "zip",
                  "type": "textbox",
                  "label": "Código Postal",
                  "hint": "Código Postal",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true",
                  "mask":"#######"
                },
                {
                  "resultPathNode": "county",
                  "model": "county",
                  "targettext": "county",
                  "type": "textbox",
                  "label": "Municipio",
                  "hint": "Ingresa el municipio del estado",
                  "required": "true",
                  "conditionalShow": ""
                },
                {
                  "resultPathNode": "city",
                  "model": "city",
                  "type": "textbox",
                  "label": "Ciudad",
                  "hint": "Selecciona Ciudad",
                  "required": "true",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPathNode": "stateName",
                  "model": "stateName",
                  "type": "autocompleteObject",
                  "label": "Estado",
                  "hint": "Selecciona un estado",
                  "required": "true",
                  "conditionalShow": "",
                  "options": [
                    {"id":"AS","name":"Aguascalientes"},
                    {"id":"BC","name":"Baja California"},
                    {"id":"BS","name":"Baja California Sur"},
                    {"id":"CC","name":"Campeche"},
                    {"id":"CS","name":"Chiapas"},
                    {"id":"CH","name":"Chihuahua"},
                    {"id":"CL","name":"Coahuila de Zaragoza"},
                    {"id":"CM","name":"Colima"},
                    {"id":"DF","name":"Distrito Federal"},
                    {"id":"DG","name":"Durango"},
                    {"id":"MC","name":"Estado de México"},
                    {"id":"GT","name":"Guanajuato"},
                    {"id":"GR","name":"Guerrero"},
                    {"id":"HG","name":"Hidalgo"},
                    {"id":"JC","name":"Jalisco"},
                    {"id":"MN","name":"Michoacán de Ocampo"},
                    {"id":"MS","name":"Morelos"},
                    {"id":"NT","name":"Nayarit"},
                    {"id":"NL","name":"Nuevo León"},
                    {"id":"OC","name":"Oaxaca"},
                    {"id":"PL","name":"Puebla"},
                    {"id":"QT","name":"Querétaro"},
                    {"id":"QR","name":"Quintana Roo"},
                    {"id":"SP","name":"San Luis Potosí"},
                    {"id":"SL","name":"Sinaloa"},
                    {"id":"SR","name":"Sonora"},
                    {"id":"TC","name":"Tabasco"},
                    {"id":"TS","name":"Tamaulipas"},
                    {"id":"TL","name":"Tlaxcala"},
                    {"id":"VZ","name":"Veracruz de Ignacio de la Llave"},
                    {"id":"YN","name":"Yucatán"},
                    {"id":"ZS","name":"Zacatecas"}
                  ]
                },
                {
                  "resultPathNode": "country",
                  "model": "country",
                  "type": "autocompleteObject",
                  "label": "País",
                  "hint": "Selecciona un País",
                  "required": "true",
                  "conditionalShow": "",
                  "options": [
                    {"id":"MEX","name":"México"}
                  ]
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
                  "label": "Verifica Comprobante CFE",
                  "disabled": "model.terminal == true",
                  "href": "('https://app.cfe.mx/Aplicaciones/CCFE/Recibos/Consulta')",
                  "target": "_blank",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPath": "serviceName",
                  "model": "serviceName",
                  "type": "textbox",
                  "label": "Nombre del Servicio",
                  "hint": "Nombre del Servicio",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true"
                },
                {
                  "resultPath": "serviceNumber",
                  "model": "serviceNumber",
                  "type": "textbox",
                  "label": "Numero de Servicio",
                  "hint": "Numero de Servicio",
                  "required": "true",
                  "disabled": "model.terminal == true",
                  "conditionalShow": "model.terminal != true",
                  "mask":"##################"
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
                context:{}
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
