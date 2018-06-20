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
                    type:"ife",
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
                    birthState:""
                },
                schema: {
                    fields:[
                        {
                            "resultPathNode": "type",
                            "model": "type",
                            "type": "dropdown",
                            "label": "Tipo de Identificación",
                            "conditionalShow":true,
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
                            "conditionalShow": "@type/id == 'passport'"
                        },
                        {
                            "resultPathNode": "valid",
                            "model": "valid",
                            "type": "dropdown",
                            "label": "Vigencia",
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
                            "conditionalShow": "@type/id.substring(0, 3) == 'ife'"
                        },
                        {
                            "resultPath": "names",
                            "model": "names",
                            "type": "textbox",
                            "label": "Nombres"
                        },
                        {
                            "resultPath": "lastNamePaternal",
                            "model": "lastNamePaternal",
                            "type": "textbox",
                            "label": "Apellido Paterno",
                            "conditionalShow": "@type/id.substring(0, 3) != 'ife' || @electorCode.substring(0, 2) != 'XX'"
                        },
                        {
                            "resultPath": "lastNameMaternal",
                            "model": "lastNameMaternal",
                            "type": "textbox",
                            "label": "Apellido Materno",
                            "conditionalShow": "@type/id.substring(0, 3) != 'ife' || @electorCode.substring(2, 4) != 'XX'"
                        },
                        {
                            "resultPath": "ifeEmissionNumber",
                            "model": "ifeEmissionNumber",
                            "type": "textbox",
                            "label": "Número de Emisión",
                            "conditionalShow": "@subtype/id == 'ife-a' || @subtype/id == 'ife-b' || @subtype/id == 'ife-c'"
                        },
                        {
                            "resultPath": "ifeVerticalNumber",
                            "model": "ifeVerticalNumber",
                            "type": "textbox",
                            "label": "Número Vertical (OCR)",
                            "conditionalShow": "@subtype/id == 'ife-a' || @subtype/id == 'ife-b' || @subtype/id == 'ife-c'"
                        },
                        {
                            "resultPath": "ifeIdCode",
                            "model": "ifeIdCode",
                            "type": "textbox",
                            "label": "Código de Identificación de la Credencial (CIC)",
                            "conditionalShow": "@subtype/id == 'ife-d' || @subtype/id == 'ife-e'"
                        },
                        {
                            "resultPath": "dateOfBirth",
                            "model": "dateOfBirth",
                            "type": "date",
                            "label": "Fecha de Nacimiento",
                            "conditionalShow": "@type/id == 'passport'"
                        },
                        {
                            "resultPath": "birthState",
                            "model": "birthState",
                            "type": "dropdown",
                            "label": "Entidad Federativa de Nacimiento",
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
                            ],
                            "conditionalShow": "@type/id.substring(0, 3) != 'ife'"
                        }
                    ]
                },
                options: {
                }
			}
		},
	}
</script>
