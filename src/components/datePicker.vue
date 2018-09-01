<template>
    <div>
        <div v-if="field.type == 'date'">
			 <v-menu
                 ref="menu"
                 :close-on-content-click="false"
                 v-model="menu"
                 :nudge-right="40"
                 lazy
                 transition="scale-transition"
                 offset-y
                 full-width
                 min-width="290px"
                 v-if="evalInContext( field.conditionalShow||true )"
               >
                 <v-text-field
                   slot="activator"
                   v-model="localValue"
                   :label="field.label"
                   :disabled="evalInContextDisabled( field.disabled || false )"
                   append-icon="event"
                   readonly
                 ></v-text-field>
                 <v-date-picker
                   ref="picker"
                   v-model="localValue"
                   :max="new Date().toISOString().substr(0, 10)"
                   min="1950-01-01"
                   @change="save"
                 ></v-date-picker>
               </v-menu>
        </div>
    </div>
</template>

<script>
import eventHub from './eventHub'

	export default{
		name: 'v-form-generator-field-component',
		props: {
			field: Object,
			value: null,
			menu: false,
			model: Object,
			select: null,
			show: null
		},
        components: {
            'v-form-generator-field-dialogBox': require('./dialogBox.vue').default,
            'v-form-generator-imageCapture': require('./ImageCapture.vue').default,
            'v-form-generator-dataGrid': require('./dataGrid.vue').default
        },
		computed:{
			appendiconHelp(){
				if(this.field.model == 'type' || this.field.model== 'subtype'){
					return "help"
				}
			},
			appendiconHelpCB(){
				if(this.localField.model == 'type' || this.localField.model== 'subtype'){
					return () => (this.dialoghelp = !this.dialoghelp)
				}
			}
		},
		data(){
			return {
			    localValue: this.value,
			    localModel: this.model,
			    localField: this.field,
				dialoghelp: false,
				localdialoghelp: false,
				validationRules: {
					email: [
						(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.validationErrorMessages.emailInvalid
					],
					required:[
                        (v) => !!v || 'El campo es requerido.'
					]
				},
				validationErrorMessages:{
					'emailInvalid': 'E-mail debe ser válido'
				}
			}
		},
		created: function () {
			// On load
		},
		methods: {
			onBlur: function(){
				this.$emit('blur')
			},
			onChange: function(){
			    //this.$emit('update:'+this.field.model, this.localModel)
			},
            onChangeSelect: function(selected){
                eventHub.$emit('updatefield', {field:this.field.model, value:selected.id})

                if((selected.id == 'unknown' || selected.id == 'low-quality') && this.field.document){
                    eventHub.$emit('updatefield', {field:'subtype', value:this.field.document})
                }

                if(selected.remedy){
                    eventHub.$emit('updatefield', {field:'terminal', value:selected.terminal})
                    eventHub.$emit('updatefield', {field:'remedy', value:selected.remedy})
                }else{
                    eventHub.$emit('updatefield', {field:'terminal', value:''})
                    eventHub.$emit('updatefield', {field:'remedy', value:''})
                }
			},
            onChangeSelectObject: function(selected){
                eventHub.$emit('updatefield', {field:this.field.model, value:selected})

                if((selected.id == 'unknown' || selected.id == 'low-quality') && this.field.document){
                    eventHub.$emit('updatefield', {field:'subtype', value:this.field.document})
                }

                if(selected.remedy){
                    eventHub.$emit('updatefield', {field:'terminal', value:selected.terminal})
                    eventHub.$emit('updatefield', {field:'remedy', value:selected.remedy})
                }
			},
            onChangeAutocomplete: function(selected){
                eventHub.$emit('updatefield', {field:this.field.model, value:selected.id})
                if(this.field.targetid){
                    eventHub.$emit('updatefield', {field:this.field.targetid, value:selected.id})
                }
                if(this.field.targettext){
                    eventHub.$emit('updatefield', {field:this.field.targettext, value:selected.name})
                }

                if(selected.remedy){
                    eventHub.$emit('updatefield', {field:'terminal', value:selected.terminal})
                    eventHub.$emit('updatefield', {field:'remedy', value:selected.remedy})
                }else{
                    eventHub.$emit('updatefield', {field:'terminal', value:''})
                    eventHub.$emit('updatefield', {field:'remedy', value:''})
                }
			},
			onFocus: function(){
				this.$emit('focus')
			},
			onInput: function(){
				eventHub.$emit('updatefield', {field:this.field.model, value:this.localValue})
			},
			onInputCalculated: function(){
			    this.localValue = 123;
			},
			appendPasswordIconCheckbox(){
				return () => this.field.passwordVisible = !this.field.passwordVisible
			},
			save(date) {
              this.$refs.menu.save(date)
              this.$emit('update:'+this.field.model, date)
            },
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
            evalInContextLink(string){
                let evalString = null;
                let model = this.model;
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

		},
        watch: {
            menu (val) {val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))},
        },
	}
</script>
