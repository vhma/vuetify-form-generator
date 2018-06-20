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
              single-line
              bottom
              @change="onChangeSelect"
              ref="select"
            ></v-select>
		</div>


		<div v-else-if="field.type == 'checkbox'">
		    <v-checkbox
              v-model="localValue"
              :label="field.label"
		      :required="field.required"
		      :disabled="field.disabled"
            ></v-checkbox>
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
			modelname:"",
			menu: false,
			model: Object,
			select: null,
		},
		data(){
			return {
			    localValue: this.value,
			    localModel: this.model,
			    localFieldModel: this.fieldmodel,
				validationRules: {
					email: [
						(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.validationErrorMessages.emailInvalid
					]
				},
				validationErrorMessages:{
					'emailInvalid': 'E-mail must be valid'
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
			    //this.$emit('change')
				//this.$emit('update:'+this.field.model, this.localValue)
				//this.$emit('update:'+this.field.model, { id: $event.target.value })
			},
            onChangeSelect: function(selected){
				this.$emit('update:'+this.field.model, selected)
				//this.$emit('input', { id: $event.target.value })
				//this.$emit('update:'+this.field.model, { id: $event.target.value })
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
            }
		},
        watch: {
            menu (val) {val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))}
        },
	}
</script>
