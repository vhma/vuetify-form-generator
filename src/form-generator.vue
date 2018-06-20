<template>
    <div>
        <div v-for="(schemaItem, schemaItemIndex) in schema">
            <div v-if="schemaItemIndex == 'forms'">
                <v-stepper v-model="stepper">
                    <v-stepper-header>
                        <template v-for="(steps, index) in schemaItem">
                            <v-stepper-step
                                        :key="`${index+1}-step`"
                                        :step="index+1"
                                        :complete="stepper > index"
                                      >
                             Paso {{ index+1 }}
                            </v-stepper-step>
                            <v-divider v-if="index+1 !== schemaItem.length" :key="`${index+1}-div`"></v-divider>
                        </template>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content
                          v-for="(steps, index) in schemaItem"
                          :step="index+1"
                          :key="`${index+1}-content`"
                        >
                            <v-card class="mb-5">
                                <div v-for="field in steps">
                                    <v-form-generator-field
                                    :field="field"
                                    :value="model[field.model]"
                                    :model="model"
                                    :fieldmodel="field.model"
                                    v-bind.sync="model"/>
                                 </div>
                            </v-card>

                            <v-btn flat v-if="index+1 !== 1" @click="nextStep(index-1,schemaItem.length)">Cancel</v-btn>
                            <v-btn color="primary"
                                @click="nextStep(index+1,schemaItem.length)">
                                {{ (index+1 === schemaItem.length)?"Terminar":"Continuar"}}
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
                <!--
                    <div v-for="fields in schemaItem">
                    <div v-for="field in fields">
                        <v-form-generator-field
                        :field="field"
                        :value="model[field.model]"
                        :model="model"
                        :fieldmodel="field.model"
                        v-bind.sync="model"/>
                     </div>
                </div> -->
            </div>
            <div v-if="schemaItemIndex == 'groups'">
              <v-tabs color="blue" dark slider-color="yellow">
                <v-tab
                    v-for="group in schemaItem"
                    :key="group.key"
                    :href="'#' + group.key"
                    ripple>
                    {{group.legend}}
                </v-tab>
                <v-tab-item
                  v-for="group in schemaItem"
                  :key="group.key"
                  :id="group.key"
                >
                  <v-card flat>
                    <div class="ma-3">
                        <div v-for="field in group.fields">
                            <v-form-generator-field
                            :field="field"
                            :value="model[field.model]"
                            :model="model"
                            :fieldmodel="field.model"
                            v-bind.sync="model"/>
                        </div>
                     </div>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
            <div v-if="schemaItemIndex == 'fields'">
                <div v-for="field in schemaItem">
                    <v-form-generator-field
                    :field="field"
                    :value="model[field.model]"
                    :model="model"
                    :fieldmodel="field.model"
                    v-bind.sync="model"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'v-form-generator',
        props: {
            'model': Object,
            'schema': Object,
            'options': Object
        },
        components: {
            'v-form-generator-field': require('./form-field.vue').default
        },
        data(){
            return {
                stepper:1,
            }
        },
        created: function () {
            // On load
        },
        methods: {
            onBlur: function(){
                console.info('blur')
            },
            onChange: function(){
                console.info('change')
            },
            onFocus: function(){
                console.info('focus')
            },
            onInput: function(value, fieldName) {
                this.$set(this.model, fieldName, value)
                this.$emit("update:model", this.model)
            },
            nextStep (n, steps) {
                console.log("valor n: "+n)
                console.log("valor this.stepper: "+this.stepper)
                console.log("valor steps: "+steps)
                if (n == steps) {
                  this.stepper = 1
                  console.log("valor this.stepper final: "+this.stepper)
                } else {
                  this.stepper = n + 1
                }
            }
        }
    }
</script>
