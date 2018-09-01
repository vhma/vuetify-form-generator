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
                    "debtAcquisitionLetters": []
                 },
                schema: {
"forms":[
    {
      "id": "dataCapture",
      "label": "Captura de Datos",
      "helpUrl": "todo.html",
      "helpIcon": "true",
      "fields": [
        {
          "resultPathNode": "debtAcquisitionLetters",
          "model": "debtAcquisitionLetters",
          "type": "dataGrid",
          "table": {
            "headers":[
              {
                "text": "Acreedor/Titular del Crédito",
                "value": "creditorName",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "creditorName",
                  "type": "textbox",
                  "hint": "Nombre Acreedor/Titular del Crédito",
                  "label": "Acreedor/Titular del Crédito",
                  "conditionalShow": "true",
                  "required": "true"
                }
              },
              {
                "text": "Folio del crédito",
                "value": "creditFolio",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "creditFolio",
                  "type": "textbox",
                  "label": "Folio del crédito",
                  "hint": "Número de Folio del Crédito",
                  "conditionalShow": "true",
                  "required": "true"
                }
              },
              {
                "text": "Fecha de otorgamiento",
                "value": "grantDate",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "grantDate",
                  "type": "date",
                  "label": "Fecha de otorgamiento",
                  "hint": "Fecha en que se otrogo el crédito",
                  "conditionalShow": "true",
                  "required": "true"
                }
              },
              {
                "text": "Monto principal (Pesos M.N)",
                "value": "principalAmount",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "principalAmount",
                  "type": "textbox",
                  "label": "Monto principal (Pesos M.N)",
                  "hint": "Monto total del crédito",
                  "conditionalShow": "true",
                  "required": "true"
                }
              },
              {
                "text": "Saldo Insoluto (Pesos M.N)",
                "value": "outstandingBalance",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "outstandingBalance",
                  "type": "textbox",
                  "label": "Saldo Insoluto (Pesos M.N)",
                  "hint": "Saldo Insoluto del crédito",
                  "conditionalShow": "true",
                  "required": "true"
                }
              },
              {
                "text": "Plazo",
                "value": "terms",
                "align": "center",
                "sortable": true,
                "class": "",
                "visible":false,
                "field":{
                  "model": "terms",
                  "type": "number",
                  "label": "Plazo",
                  "hint": "Plazo",
                  "conditionalShow": "true",
                  "required": "true",
                  "mask": "###"
                }
              },
              {
                "text": "Periodo",
                "value": "periodicity",
                "align": "center",
                "sortable": true,
                "class": "",
                "field":{
                  "model": "periodicity",
                  "type": "dropdownObject",
                  "label": "Periodo",
                  "hint": "Tipo de periodo",
                  "required": "true",
                  "options": [
                    {
                      "id": "biMonthly",
                      "name": "Quincenal"
                    },
                    {
                      "id": "monthly",
                      "name": "Mensual"
                    },
                    {
                      "id": "twoWeeks",
                      "name": "Catorcenal"
                    },
                    {
                      "id": "weekly",
                      "name": "Semanal"
                    }
                  ]
                }
              }
            ],
            "filter":"",
            "sort":"",
            "expand":false,
            "hide-actions":false,
            "hide-headers":false,
            "loading":false,
            "no-data-text":"No hay registros"
          },
          "items":[],
          "defaultItem":{
            "creditorName": "",
            "creditFolio": "",
            "grantDate": "2018-01-01",
            "principalAmount": 0,
            "outstandingBalance": 0,
            "terms": 0,
            "periodicity": { "id": "months","name": "Meses"}
          }
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
