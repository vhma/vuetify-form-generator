<template>
	<v-app>
<div>
	Main model {{ model }}

        <v-form-generator :model="model" :schema="schema" :options="options" :imageUrls="imageUrls"/>

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
		data(){
			return {
                "imageUrls":[
                    "public/documents/modeloA.jpg",
                    "public/documents/modeloB.jpg",
                    "public/documents/test.pdf",
                    "public/documents/unknown.jpg"
                  ],
                model: {
                    "type":"ife",
                    "subtype":"ife-c",
                    "valid":"true",
                    "electorCode":"",
                    "names":"Victor",
                    "lastNamePaternal":"MARTINEZ",
                    "lastNameMaternal":"",
                    "ifeEmissionNumber":"",
                    "ifeVerticalNumber":"",
                    "ifeIdCode":"",
                    "gender":"M",
                    "dateOfBirth":"",
                    "birthState":"",
                    "remedy":"",
                    "terminal":"",
                    "images":[],
                    "validationTime": "2018-05-25T12:45:34.354Z"

                 },
                schema: {
 "forms": [
  {
    "id": "dataCapture",
    "label": "Captura de Datos",
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
        "readonly": "true",
        "options": [
          {
            "id": "passport",
            "name": "Pasaporte"
          },
          {
            "id": "ife",
            "name": "Credencial de Elector"
          },
          {
            "id": "unknown",
            "name": "Desconocido o Equivocado",
            "terminal": true,
            "document": "ife",
            "remedy": {
              "type": "uploadDocument",
              "options": {
                "multiPage": true
              },
              "label": "Favor de proporcionar una identificación oficial válida, IFE por ambos lados o pasaporte",
              "cause": "Documento desconocido o equivocado"
            }
          },
          {
            "id": "low-quality",
            "name": "Borroso, incompleto o de baja calidad",
            "terminal": true,
            "document": "ife",
            "remedy": {
              "type": "uploadDocument",
              "options": {
                "multiPage": true
              },
              "label": "Favor de proporcionar una identificación oficial válida, IFE por ambos lados o pasaporte",
              "cause": "Documento incompleto o ilegible"
            }
          }
        ]
      },
      {
        "resultPathNode": "subtype",
        "model": "subtype",
        "type": "dropdown",
        "label": "Modelo de IFE",
        "hint": "Tipo de documento",
        "required": "true",
        "readonly": "true",
        "options": [
          {
            "id": "ife-a",
            "name": "IFE Tipo A",
            "terminal": true,
            "remedy": {
              "type": "uploadDocument",
              "options": {
                "multiPage": true
              },
              "label": "Favor de proporcionar una identificación oficial válida, IFE por ambos lados o pasaporte",
              "cause": "IFE vencido"
            }
          },
          {
            "id": "ife-b",
            "name": "IFE Tipo B"
          },
          {
            "id": "ife-c",
            "name": "IFE Tipo C"
          },
          {
            "id": "ife-d",
            "name": "IFE Tipo D"
          },
          {
            "id": "ife-e",
            "name": "IFE Tipo E"
          }
        ],
        "conditionalShow": "model.type == 'ife'"
      },
      {
        "resultPathNode": "valid",
        "model": "valid",
        "type": "dropdown",
        "label": "Vigencia",
        "hint": "Vigencia de credencial",
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
              "label": "Favor de proporcionar una identificación oficial válida, IFE por ambos lados o pasaporte",
              "cause": "Identificación vencida"
            }
          }
        ]
      },
      {
        "resultPath": "electorCode",
        "model": "electorCode",
        "type": "textbox",
        "label": "Clave de Elector",
        "hint": "Clave electoral de identificación",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.type == 'ife' && model.terminal != true"
      },
      {
        "resultPath": "names",
        "model": "names",
        "type": "textbox",
        "label": "Nombres",
        "hint": "Nombre",
        "conditionalShow": "model.terminal != true",
        "disabled": "model.terminal == true",
        "required": "true"
      },
      {
        "resultPath": "lastNamePaternal",
        "model": "lastNamePaternal",
        "type": "textbox",
        "label": "Apellido Paterno",
        "hint": "Apellido Paterno",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "(model.type != 'ife' || model.electorCode.substring(0, 2) != 'XX') && model.terminal != true"
      },
      {
        "resultPath": "lastNameMaternal",
        "model": "lastNameMaternal",
        "type": "textbox",
        "label": "Apellido Materno",
        "hint": "Apellido Materno",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.terminal != true && (model.type.substring(0, 3) != 'ife' || model.electorCode.substring(2, 4) != 'XX')"
      },
      {
        "resultPath": "ifeEmissionNumber",
        "model": "ifeEmissionNumber",
        "type": "textbox",
        "label": "Número de Emisión",
        "hint": "Número de Emisión de la credencial",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.terminal != true && (model.subtype == 'ife-a' || model.subtype == 'ife-b' || model.subtype == 'ife-c')",
        "mask":"NNNNNNN"
      },
      {
        "resultPath": "ifeVerticalNumber",
        "model": "ifeVerticalNumber",
        "type": "textbox",
        "label": "Número Vertical (OCR)",
        "hint": "Número Vertical (OCR)",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.terminal != true && (model.subtype == 'ife-a' || model.subtype == 'ife-b' || model.subtype == 'ife-c')",
        "mask":"###############"
      },
      {
        "resultPath": "ifeIdCode",
        "model": "ifeIdCode",
        "type": "textbox",
        "label": "Código de Identificación de la Credencial (CIC)",
        "hint": "Código de Identificación de la Credencial (CIC)",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.terminal != true && (model.subtype == 'ife-d' || model.subtype == 'ife-e')",
        "mask":"###############"
      },
      {
        "resultPath": "dateOfBirth",
        "model": "dateOfBirth",
        "type": "date",
        "label": "Fecha de Nacimiento",
        "hint": "Fecha de Nacimiento",
        "required": "true",
        "disabled": "model.terminal == true",
        "conditionalShow": "model.terminal != true && (model.type == 'passport')"
      },
      {
        "resultPath": "gender",
        "model": "gender",
        "type": "radio",
        "label": "Género",
        "hint": "Género",
        "required": "true",
        "mandatory": "false",
        "conditionalShow": "model.terminal != true && (model.type != 'unknown' && model.type != 'low-quality' )",
        "options": [
          { "id": "M", "name": "Masculino"},
          { "id": "F", "name": "Femenino"}
        ]
      },
      {
        "resultPath": "birthState",
        "model": "birthState",
        "type": "dropdown",
        "label": "Entidad Federativa de Nacimiento",
        "hint": "Entidad Federativa de Nacimiento",
        "conditionalShow": "model.terminal != true && (model.type != 'ife')",
        "disabled": "model.terminal == true",
        "required": "true",
        "options": [
          { "id": "AS", "name": "Aguascalientes"},
          { "id": "BC", "name": "Baja California"},
          { "id": "BS", "name": "Baja California Sur"},
          { "id": "CC", "name": "Campeche"},
          { "id": "CS", "name": "Chiapas"},
          { "id": "CH", "name": "Chihuahua"},
          { "id": "CL", "name": "Coahuila"},
          { "id": "CM", "name": "Colima"},
          { "id": "DF", "name": "Distrito Federal"},
          { "id": "DG", "name": "Durango"},
          { "id": "GT", "name": "Guanajuato"},
          { "id": "GR", "name": "Guerrero"},
          { "id": "HG", "name": "Hidalgo"},
          { "id": "JC", "name": "Jalisco"},
          { "id": "MC", "name": "México"},
          { "id": "MN", "name": "Michoacan"},
          { "id": "MS", "name": "Morelos"},
          { "id": "NT", "name": "Nayarit"},
          { "id": "NL", "name": "Nuevo León"},
          { "id": "OC", "name": "Oaxaca"},
          { "id": "PL", "name": "Puebla"},
          { "id": "QT", "name": "Querétaro"},
          { "id": "QR", "name": "Quintana Roo"},
          { "id": "SP", "name": "San Luis Potosí"},
          { "id": "SL", "name": "Sinaloa"},
          { "id": "SR", "name": "Sonora"},
          { "id": "TC", "name": "Tabasco"},
          { "id": "TL", "name": "Tlaxcala"},
          { "id": "TS", "name": "Tamaulipas"},
          { "id": "VZ", "name": "Veracruz"},
          { "id": "YN", "name": "Yucatán"},
          { "id": "ZS", "name": "Zacatecas"},
          { "id": "NE", "name": "Nacido en el Extranjero"}
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
                      "label": "Verifica documento",
                      "disabled": "model.terminal == true",
                      "href": "((model.type == 'ife')?((model.subtype == 'ife-a' || model.subtype == 'ife-b' || model.subtype == 'ife-c')?'https://listanominal.ine.mx/scpln/src/consultaModeloA.html':((model.subtype == 'ife-d')?'https://listanominal.ine.mx/scpln/src/consultaModeloD.html':((model.subtype == 'ife-e')?'https://listanominal.ine.mx/scpln/src/consultaModeloE.html':''))):'')"
                      ,"target": "_blank"
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
                      "resultPath": "images",
                      "model": "images",
                      "type": "textareaImage",
                      "label": "Pegar evidencia de captura de pantalla aquí",
                      "hint": "Copia la imagen de la liga de verificación",
                      "required": "true",
                      "disabled": "model.terminal == true"
                    }
                ]
            }
        ]
    },
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
