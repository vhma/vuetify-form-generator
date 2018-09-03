<template>
	<div>
		<div v-if="field.type == 'email'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.placeholder"
		      :rules="validationRules.email"
		      :mask="field.mask"
		      v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
		</div>

		<div v-else-if="field.type == 'password'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.placeholder"
		      :append-icon="field.passwordVisible ? 'visibility_off' : 'visibility'"
              :append-icon-cb="appendPasswordIconCheckbox()"
              :type="field.passwordVisible ? 'text' : 'password'"
              :mask="field.mask"
              v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
		</div>
        <div v-else-if="field.type == 'button'">
            <v-btn
                :flat="evalInContextValue(field.flat)"
                :disabled="evalInContextDisabled( field.disabled || false )"
                :href="evalInContextLink(field.href)"
                :to="field.to"
                :target="field.target"
                :nuxt="field.nuxt"
                :icon="field.icon"
                :fab="evalInContextValue(field.fab)"
                :exact="evalInContextValue(field.exact)"

            >

                {{ field.label }}
            </v-btn>
        </div>

		<div v-else-if="field.type == 'select' || field.type == 'dropdown'">
		    <v-select
              v-model="localValue"
              item-text="name"
              item-value="id"
              :items="field.options"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.label"
		      :hint="field.hint"
		      :rules=" field.required ? validationRules.required : [] "
		      v-if="evalInContext( field.conditionalShow||true )"
		      validate-on-blur
              single-line
              bottom
			  v-bind:append-icon="appendiconHelp"			  
			  v-bind:append-icon-cb="appendiconHelpCB"
              @change="onChangeSelect"
              @blur="onBlur"
              return-object
            ></v-select>
			<v-form-generator-field-dialogBox
				ref="dialoghelp"
				v-model="dialoghelp"
				:modelSelected="localModel"
				:field="field"
				:dialoghelp="dialoghelp"
				:typeData="'help'"
				lazy
			>
			</v-form-generator-field-dialogBox>
		</div>

        <div v-else-if="field.type == 'selectObject' || field.type == 'dropdownObject'">
		    <v-select
              v-model="localValue"
              item-text="name"
              item-value="id"
              :items="field.options"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.label"
		      :hint="field.hint"
		      :rules=" field.required ? validationRules.required : [] "
		      v-if="evalInContext( field.conditionalShow||true )"
		      validate-on-blur
              single-line
              bottom
              @change="onChangeSelectObject"
              @blur="onBlur"
              return-object
            ></v-select>
			</v-form-generator-field-dialogBox>
		</div>

		<div v-else-if="field.type == 'checkbox'">
		    <v-checkbox
              v-model="localValue"
              :label="field.label"
              :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      v-if="evalInContext( field.conditionalShow||true )"
		      @change="onChangeSelect"
            ></v-checkbox>
		</div>

		<div v-else-if="field.type == 'radio'">
            <v-radio-group
                v-model="localValue"
                :required="evalInContextValue(field.required)"
                :readonly="evalInContextValue(field.readonly)"
                :disabled="evalInContextDisabled( field.disabled || false )"
                :mandatory="evalInContextValue(field.mandatory)"
                v-if="evalInContext( field.conditionalShow||true )"
                row
                @change="onInput"
                @input="onInput"
            >
            <div class="divLabelRadio subheading"><span class="spanLabelRadio ">{{ field.label }}:  </span></div>
            <div v-for="option in field.options">
                <v-radio :label="option.name" :value="option.id" ></v-radio>
            </div>
            </v-radio-group>
		</div>

		<div v-else-if="field.type == 'switch'">
            <v-container fluid>
                <v-switch
                    v-model="localValue"
                    :label="field.label"
                    :disabled="evalInContextValue( field.disabled || false )"
                    :required="evalInContextValue(field.required)"
                    :readonly="evalInContextDisabled(field.readonly)"
                    v-if="evalInContext( field.conditionalShow||true )"
                    @change="onChangeSelect"
                 />
            </v-container>
		</div>

		<div v-else-if="field.type == 'textarea'">
			 <v-textarea
		      v-model="localValue"
		      :label="field.label"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.placeholder"
		      :mask="field.mask"
		      v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-textarea>
		</div>

		<div v-else-if="field.type == 'textareaImage'">
            <v-form-generator-imageCapture
                            ref="imageCapture"
                            v-model="localValue"
                            :modelSelected="localModel"
                            :field="field"
                        >
            </v-form-generator-imageCapture>
		</div>

		<div v-else-if="field.type == 'dataGrid'">
            <v-form-generator-dataGrid
                            ref="dataGrid"
                            :modelSelected="localModel"
                            :field="field"
                            :table="field.table"
                            :items="field.items"
                            :defaultItem="field.defaultItem"
            ></v-form-generator-dataGrid>
		</div>

		<div v-else-if="field.type == 'number'">
			 <v-text-field
                v-model="localValue"
                :label="field.label"
                :required="evalInContextValue(field.required)"
                :readonly="evalInContextValue(field.readonly)"
                :disabled="evalInContextDisabled( field.disabled || false )"
                :placeholder="field.placeholder"
                :counter="field.counter"
                :hint="field.hint"
                :mask="field.mask"
                v-if="evalInContext( field.conditionalShow||true )"
                @blur="onBlur"
                @change="onChange"
                @focus="onFocus"
                @input="onInput"
		    ></v-text-field>
		</div>

		<div v-else-if="field.type == 'textbox'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="evalInContextValue(field.required)"
		      :readonly="evalInContextValue(field.readonly)"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.placeholder"
			  :counter="field.counter"
			  :hint="field.hint"
			  :mask="field.mask"
			  v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
        </div>

		<div v-else-if="field.type == 'calculatedField'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :readonly="evalInContext( true )"
		      :disabled="evalInContextDisabled( field.disabled || false )"
			  :counter="field.counter"
			  :mask="field.mask"
			  v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
              @change="onChange"
              @focus="onFocus"
              @input="onInput"
		    ></v-text-field>
        </div>

		<div v-else-if="field.type == 'button'">
		    <v-btn
		        flat
		        small
		        color="primary"
		        :to="field.to"
		        :target="field.target"
		        :round="field.round"
		        :replace="field.replace"
		        :nuxt="field.nuxt"
		        :href="field.href"
		        :value="field.label"
		   >
		   field.label
		    </v-btn>
        </div>

        <div v-else-if="field.type == 'autocomplete'">
			 <v-autocomplete
			    v-model="localValue"
                item-text="name"
                item-value="id"
                :items="field.options"
                :required="evalInContextValue(field.required)"
                :readonly="evalInContextValue(field.readonly)"
                :disabled="evalInContextDisabled( field.disabled || false )"
                :placeholder="field.label"
                :hint="field.hint"
                :rules=" field.required ? validationRules.required : [] "
                :prepend-icon="field.prependIcon"
                v-if="evalInContext( field.conditionalShow||true )"
                return-object
                @change="onChangeAutocomplete"
                @blur="onBlur"
             ></v-autocomplete>
        </div>

        <div v-else-if="field.type == 'autocompleteObject'">
			 <v-autocomplete
			    v-model="localValue"
                item-text="name"
                item-value="id"
                :items="field.options"
                :required="evalInContextValue(field.required)"
                :readonly="evalInContextValue(field.readonly)"
                :disabled="evalInContextDisabled( field.disabled || false )"
                :placeholder="field.label"
                :hint="field.hint"
                :rules=" field.required ? validationRules.required : [] "
                :prepend-icon="field.prependIcon"
                v-if="evalInContext( field.conditionalShow||true )"
                return-object
                @change="onChangeAutocompleteObject"
                @blur="onBlur"
             ></v-autocomplete>
        </div>

        <div v-else-if="field.type == 'date'">
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

		<div v-else>
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="evalInContextDisabled( field.disabled || false )"
		      :placeholder="field.placeholder"
			  :counter="field.counter"
			  :hint="field.hint"
			  :mask="field.mask"
			  v-if="field.conditionalShow === true"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>

		    <v-alert v-if="field.type != 'text'" color="error" icon="warning" value="true">
		    	<strong>The {{field.type}} type is not yet implemented.</strong> <br>
		   		{{field}}
		    </v-alert>

		</div>
	</div>
</template>

<script>
import eventHub from './components/eventHub'
	export default{
		name: 'v-form-generator-field',
		props: {
			field: Object,
			value: null,
			menu: false,
			model: Object,
			select: null,
			show: null
		},
        components: {
            'v-form-generator-field-dialogBox': require('./components/dialogBox.vue').default,
            'v-form-generator-imageCapture': require('./components/ImageCapture.vue').default,
            'v-form-generator-dataGrid': require('./components/dataGrid.vue').default
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
			},
			srcImageHelp(){
				let src = "";
				switch(this.localField.model){
					case "type":
						if(this.localModel[this.localField.model] != ""){
							src ="help_"+this.localModel[this.localField.model]+".jpg";
						}
					break;
					case "subtype":
						if(this.localModel[this.localField.model] != ""){
							src =this.localModel.type+"_"+this.localValue+".jpg";
						}
					break;
				}
				
				//src = "help_ife.jpg";
				
				if(src!= ""){
					//return require('documents/'+src+'')
				}
				
				//:src="require('./static/help_ife.jpg')"
				//return src
				//return src;
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
            onChangeAutocompleteObject: function(selected){
                eventHub.$emit('updatefield', {field:this.field.model, value:selected})
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
