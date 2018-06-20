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
                    electorCodeMail:"",
                    electorCodePass:"",
                    electorCodeCheck:"",
                    electorCodeRadio:"",
                    electorCodeSwitch:"true"
                },
                schema: {
                    fields:[
                        {
                            "resultPathNode": "type",
                            "model": "type",
                            "type": "dropdown",
                            "label": "Tipo de Identificación",
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
                            "conditionalShow": "model.type == 'ife'",
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
                            "conditionalShow": "model.type == 'passport'"
                        },

                    ]
                },
                options: {
                }
			}
		},
	}
</script>
