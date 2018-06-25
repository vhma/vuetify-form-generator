<template>
	<v-app>
        <v-form-generator :model="model" :schema="schema" :options="options"/>
	</v-app>
</template>

<script>
	export default {
		components: {
			'v-form-generator': require('vuetify-form-generator').default
		},
		data(){
			return {
                model: {
                    type:"",
                    subtype:"",
                    valid:"",
                    electorCode:"",
                    names:"",
                    lastNamePaternal:"",
                    lastNameMaternal:"",
                    ifeEmissionNumber:"",
                    ifeVerticalNumber:"",
                    ifeIdCode:"",
                    dateOfBirth:"",
                    birthState:"",
                    remedy:"",
                    terminal:""
                },
                schema: {
                    "forms": [
                        {
                          "id": "idType",
                          "label": "Tipo de Identificación",
                          "helpUrl": "todo.html",
                          "imageUrlVariable": "static/modeloA.jpg",
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
                                  "id": "ife-d",
                                  "name": "IFE Tipo E"
                                }
                              ],
                              "conditionalShow": "model.type == 'ife'"
                            },
                            {
                              "resultPathNode": "subtype",
                              "model": "subtype",
                              "type": "dropdown",
                              "label": "Modelo de Pasaporte",
                              "hint": "Tipo de documento",
                              "required": "true",
                              "options": [
                                {
                                  "id": "ordinary",
                                  "name": "Ordinario (Verde)"
                                },
                                {
                                  "id": "official",
                                  "name": "Oficial (Gris)"
                                },
                                {
                                  "id": "diplomatic",
                                  "name": "Diplomático (Vino)"
                                }
                              ],
                              "conditionalShow": "model.type == 'passport'"
                            }
                          ]
                        },
                        {
                      "id": "dataCapture",
                      "label": "Captura de Datos",
                      "helpUrl": "todo.html",
                      "imageUrlVariable": "static/modeloB.jpg",
                      "fields": [
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
                          "hint": "Vigencia de credencial",
                          "required": "true",
                          "conditionalShow": "model.type == 'ife'"
                        },
                        {
                          "resultPath": "names",
                          "model": "names",
                          "type": "textbox",
                          "label": "Nombres",
                          "hint": "Nombre",
                          "required": "true"
                        },
                        {
                          "resultPath": "lastNamePaternal",
                          "model": "lastNamePaternal",
                          "type": "textbox",
                          "label": "Apellido Paterno",
                          "hint": "Apellido Paterno",
                          "required": "true",
                          "conditionalShow": "model.type != 'ife' || model.electorCode.substring(0, 2) != 'XX'"
                        },
                        {
                          "resultPath": "lastNameMaternal",
                          "model": "lastNameMaternal",
                          "model": "lastNameMaternal",
                          "type": "textbox",
                          "label": "Apellido Materno",
                          "hint": "Apellido Materno",
                          "required": "true",
                          "conditionalShow": "model.type.substring(0, 3) != 'ife' || model.electorCode.substring(2, 4) != 'XX'"
                        },
                        {
                          "resultPath": "ifeEmissionNumber",
                          "type": "textbox",
                          "label": "Número de Emisión",
                          "hint": "Número de Emisión de la credencial",
                          "required": "true",
                          "conditionalShow": "model.subtype == 'ife-a' || model.subtype == 'ife-b' || model.subtype == 'ife-c'"
                        },
                        {
                          "resultPath": "ifeVerticalNumber",
                          "type": "textbox",
                          "label": "Número Vertical (OCR)",
                          "hint": "Número Vertical (OCR)",
                          "required": "true",
                          "conditionalShow": "model.subtype == 'ife-a' || model.subtype == 'ife-b' || model.subtype == 'ife-c'"
                        },
                        {
                          "resultPath": "ifeIdCode",
                          "type": "textbox",
                          "label": "Código de Identificación de la Credencial (CIC)",
                          "hint": "Código de Identificación de la Credencial (CIC)",
                          "required": "true",
                          "conditionalShow": "model.subtype == 'ife-d' || model.subtype == 'ife-e'"
                        },
                        {
                          "resultPath": "dateOfBirth",
                          "type": "calculatedField",
                          "label": "Fecha de Nacimiento",
                          "hint": "Fecha de Nacimiento",
                          "readonly": "true",
                          "formula": [
                            "var YOB = parseInt(@electorCode.substring(6, 8)); ",
                            "return ((YOB + 2000) > (new Date()).getFullYear() ? YOB + 1900 : YOB + 2000).toString() + '-' + ",
                            "@electorCode.substring(8, 10) + '-' + ",
                            "@electorCode.substring(10, 12)"
                          ],
                          "conditionalShow": "model.type == 'ife'"
                        },
                        {
                          "resultPath": "dateOfBirth",
                          "type": "date",
                          "label": "Fecha de Nacimiento",
                          "hint": "Fecha de Nacimiento",
                          "required": "true",
                          "conditionalShow": "model.type == 'passport'"
                        },
                        {
                          "resultPath": "birthState",
                          "type": "calculatedField",
                          "label": "Entidad Federativa de Nacimiento IFE",
                          "hint": "Entidad Federativa de Nacimiento IFE",
                          "readonly": "true",
                          "conditionalShow": "model.type == 'ife'",
                          "formula": [
                            "var EDN = @electorCode.substring(12, 14); ",
                            "return EDN == '01' ? 'AS' : ",
                            "EDN == '02' ? 'BC' : ",
                            "EDN == '03' ? 'BS' : ",
                            "EDN == '04' ? 'CC' : ",
                            "EDN == '05' ? 'CL' : ",
                            "EDN == '06' ? 'CM' : ",
                            "EDN == '07' ? 'CS' : ",
                            "EDN == '08' ? 'CH' : ",
                            "EDN == '09' ? 'DF' : ",
                            "EDN == '10' ? 'DG' : ",
                            "EDN == '11' ? 'GT' : ",
                            "EDN == '12' ? 'GR' : ",
                            "EDN == '13' ? 'HG' : ",
                            "EDN == '14' ? 'JC' : ",
                            "EDN == '15' ? 'MC' : ",
                            "EDN == '16' ? 'MN' : ",
                            "EDN == '17' ? 'MS' : ",
                            "EDN == '18' ? 'NT' : ",
                            "EDN == '19' ? 'NL' : ",
                            "EDN == '20' ? 'OC' : ",
                            "EDN == '21' ? 'PL' : ",
                            "EDN == '22' ? 'QT' : ",
                            "EDN == '23' ? 'QR' : ",
                            "EDN == '24' ? 'SP' : ",
                            "EDN == '25' ? 'SL' : ",
                            "EDN == '26' ? 'SR' : ",
                            "EDN == '27' ? 'TC' : ",
                            "EDN == '28' ? 'TS' : ",
                            "EDN == '29' ? 'TL' : ",
                            "EDN == '30' ? 'VZ' : ",
                            "EDN == '31' ? 'YN' : ",
                            "EDN == '32' ? 'ZS' : ",
                            "'NE'"
                          ]
                        },
                        {
                          "resultPath": "birthState",
                          "type": "dropdown",
                          "label": "Entidad Federativa de Nacimiento",
                          "hint": "Entidad Federativa de Nacimiento",
                          "conditionalShow": "model.type != 'ife'",
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
                    }
                    ]
                },
                options: {

                }
			}
		},
	}
</script>
