<template>
	<v-app>
	    <div>
            <v-tabs slider-color="yellow" color="cyan" dark>
                <v-tab :href="'#form'">Form</v-tab>
                <v-tab :href="'#model'">Model</v-tab>
                <v-tab :href="'#schema'">Schema</v-tab>
                <v-tab :href="'#options'">Options</v-tab>

            <v-tabs-items>
                <v-tab-item :id="'form'" >
                    <v-form-generator :model="model" :schema="schema" :options="options"/>
                </v-tab-item>
                <v-tab-item :id="'model'" >
                    <pre>{{model}}</pre>
                </v-tab-item>
                <v-tab-item :id="'schema'" >
                    <pre>{{schema}}</pre>
                </v-tab-item>
                <v-tab-item :id="'options'" >
                    <pre>{{options}}</pre>
                </v-tab-item>
            </v-tabs-items>
            </v-tabs>
        </div>
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
					id: 1,
					name: "John Doe",
					password: "J0hnD03!x4",
					skills: ["Javascript", "VueJS"],
					email: "john.doe@gmail.com",
					status: true,
					usePassword: true
				},
				schema: {
					fields: [{
						type: "number",
						label: "ID (disabled text field)",
						model: "id",
						readonly: true, 
						disabled: true
					},{
						type: "text",
						label: "Name",
						model: "name",
						placeholder: "Your name",
						featured: true,
						required: true
					},
					{
						type: "checkbox",
						label: "Use password?",
						model: "usePassword"
					}, {
						type: "password",
						label: "Password",
						model: "password",
						disabled: false,
						min: 6,
						required: true,
						hint: "Minimum 6 characters",
						passwordVisible: false
					},{
						type: "select",
						label: "Skills",
						model: "skills",
						values: ["Javascript", "VueJS", "CSS3", "HTML5"]
					},{
						type: "email",
						label: "E-mail",
						model: "email",
						placeholder: "User's e-mail address"
					},{
						type: "checkbox",
						label: "Status",
						model: "status",
						default: true
					}],
					groups: [
						{
							key: "userDetails",
							legend: "User Details",
							fields: [
								{
									type: "textarea",
									label: "My story",
									model: "story"
								},
								{
									type: "email",
									id: "email",
									label: "Email Address",
									model: "email"
								}
							]
						},
						{
							key: "preferences",
							legend: "Preferences",
							fields: [
								{
									type: "select",
									label: "Color",
									model: "color",
									values: [
										"Red",
										"Green",
										"Blue"
									]
								},
								{
									type: "number",
									id: "timeout",
									label: "Timeout in Seconds",
									model: "timeout"
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
