<template>
	<div>
		<div v-if="field.type == 'email'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="field.disabled"
		      :placeholder="field.placeholder"
		      :rules="validationRules.email"
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
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="field.disabled"
		      :placeholder="field.placeholder"
		      :append-icon="field.passwordVisible ? 'visibility_off' : 'visibility'"
              :append-icon-cb="appendPasswordIconCheckbox()"
              :type="field.passwordVisible ? 'text' : 'password'"
                v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
		</div>

		<div v-else-if="field.type == 'select' || field.type == 'dropdown'">
		    <v-select
              v-model="localValue"
              item-text="name"
              item-value="id"
              :items="field.options"
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="field.disabled"
		      v-if="evalInContext( field.conditionalShow||true )"
              single-line
              bottom
              @change="onChangeSelect"
            ></v-select>
		</div>


		<div v-else-if="field.type == 'checkbox'">
		    <v-checkbox
              v-model="localValue"
              :label="field.label"
		      :required="field.required"
		      :disabled="field.disabled"
		      v-if="evalInContext( field.conditionalShow||true )"
		      @change="onChangeSelect"
            ></v-checkbox>
		</div>

		<div v-else-if="field.type == 'radio'">
		    <v-container fluid>
                <v-radio-group
                    v-model="localValue"
                    :required="field.required"
                    :disabled="field.disabled"
                    :mandatory="field.required"
                    v-if="evalInContext( field.conditionalShow||true )"
                    @change="onChangeSelect"
                >
                        <div v-for="option in field.options">
                          <v-radio :label="option.name" :value="option.id" ></v-radio>
                        </div>
                </v-radio-group>
            </v-container fluid>
		</div>

		<div v-else-if="field.type == 'switch'">
            <v-container fluid>
                <v-switch
                    v-model="localValue"
                    :label="field.label"
                    :disabled="field.disabled"
                    :required="field.required"
                    v-if="evalInContext( field.conditionalShow||true )"
                    @change="onChangeSelect"
                 />
            </v-container>
		</div>

		<div v-else-if="field.type == 'textarea'">
			 <v-text-field
		      v-model="localValue"
		      :label="field.label"
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="field.disabled"
		      :placeholder="field.placeholder"
		      multi-line
		      v-bind:textarea="field.featured"
		      v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
		</div>

		<div v-else-if="field.type == 'number'">
			 <v-text-field
                v-model="localValue"
                :label="field.label"
                :required="field.required"
                :readonly="field.readonly"
                :disabled="field.disabled"
                :placeholder="field.placeholder"
                :counter="field.counter"
                :hint="field.hint"
                mask="##############################"
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
		      :required="field.required"
		      :readonly="field.readonly"
		      :disabled="field.disabled"
		      :placeholder="field.placeholder"
			  :counter="field.counter"
			  :hint="field.hint"
			  v-if="evalInContext( field.conditionalShow||true )"
		      @blur="onBlur"
		      @change="onChange"
		      @focus="onFocus"
		      @input="onInput"
		    ></v-text-field>
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
		      :disabled="field.disabled"
		      :placeholder="field.placeholder"
			  :counter="field.counter"
			  :hint="field.hint"
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
	export default{
		name: 'v-form-generator-field',
		props: {
			field: Object,
			value: null,
			menu: false,
			model: Object,
			select: null,
			show: null,
		},
		data(){
			return {
			    localValue: this.value,
			    localModel: this.model,
			    localConditionalShow: this.field,
				validationRules: {
					email: [
						(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.validationErrorMessages.emailInvalid
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
			    //this.$emit('update:'+this.field.model, this.localValue)
			},
            onChangeSelect: function(selected){
				this.$emit('update:'+this.field.model, selected)
			},
			onFocus: function(){
				this.$emit('focus')
			},
			onInput: function(){
				this.$emit('update:'+this.field.model, this.localValue)
			},
			appendPasswordIconCheckbox(){
				return () => this.field.passwordVisible = !this.field.passwordVisible
			},
			save(date) {
              this.$refs.menu.save(date)
              this.$emit('update:'+this.field.model, date)
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
                    this.$emit('update:'+this.field.model, "");
                }

                return isRender;
              }
		},
        watch: {
            menu (val) {val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))},
        },
	}
</script>
