<template>
<v-form ref="form" v-model="validForm" lazy-validation>
localmodelClone {{ localmodelClone }}
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
                             {{ steps.label }}
                            </v-stepper-step>
                            <v-divider v-if="index+1 !== schemaItem.length" :key="`${index+1}-div`"></v-divider>
                        </template>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content
                          v-for="(steps, index) in schemaItem"
                          :step="index+1"
                          :key="`${index+1}-content`"
                          row wrap
                        >
                            <v-layout row wrap >
                                <v-flex xs12 lg12 xl12 >
                                    <v-card   ref="`${index+1}-vcontent`" >
                                        <v-container  fluid grid-list-lg fill-height >
                                            <v-layout row align-center justify-center>
                                                <v-flex xs12 lg5 xl5>
                                                    <v-carousel  :cycle="false" hide-delimiters light>
                                                        <v-carousel-item v-for="(item,index) in imageUrls"
                                                            cycle
                                                            :key="`${index}-carousel`">
                                                            <object
                                                              :data="item"
                                                              v-if="typeMimeType(item)==='PDF'"
                                                              style="width:100%; height:100%"
                                                              >
                                                            </object>
                                                            <v-card-media
                                                              :src="item"
                                                              height="100%"
                                                              width="100%"
                                                              style="min-height:10em"
                                                              v-if="typeMimeType(item)==='IMAGE'"
                                                              contain>
                                                            </v-card-media>
                                                        </v-carousel-item>
                                                    </v-carousel>
                                                </v-flex>
                                                <v-flex xs10 lg7 xl7 >
                                                    <div v-for="field in steps.fields" >
                                                        <v-form-generator-field
                                                        :field="field"
                                                        :value="localmodel[field.model]"
                                                        :model="localmodel"
                                                        :fieldmodel="field.model"
                                                        v-bind.sync="localmodel"
                                                       />
                                                     </div>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                   </v-card>
                                   <div class="right">
                                        <v-btn flat
                                            v-if="index+1 !== 1"
                                            @click="nextStep(index-1,schemaItem.length)">
                                                Cancel
                                        </v-btn>
                                        <v-btn color="primary"
                                            @click="nextStep(index+1,schemaItem.length)">
                                            {{ (index+1 === schemaItem.length)?"Terminar":"Continuar"}}
                                        </v-btn>
                                   </div>
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
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
                            :value="localmodel[field.model]"
                            :model="localmodel"
                            :fieldmodel="field.model"
                            v-bind.sync="localmodel"
                            @input="onInput"
                            />
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
                    :value="localmodel[field.model]"
                    :model="localmodel"
                    :fieldmodel="field.model"
                    v-bind.sync="localmodel"/>
                </div>
            </div>
        </div>
    </div>
</v-form>
</template>

<script>
import eventHub from './components/eventHub'
    export default{
        name: 'v-form-generator',
        props: {
            'model': Object,
            'schema': Object,
            'options': Object,
            'imageUrls': Array
        },
        components: {
            'v-form-generator-field': require('./form-field.vue').default,
            eventHub
        },
        computed:{
            localmodel:{
                get(){
                    return this.localmodelClone
                    //return this.cloneObject(this.model);
                },
                set (value) {
                    this.localmodelClone = JSON.parse(JSON.stringify(value));
                    //return JSON.parse(JSON.stringify(value));
                    console.log('computed - set- formgenerator-localModel', this.localmodelClone);
                }
            }

        },
        data(){
            return {
                stepper:1,
                validForm:true,
                localmodelClone:{}
            }
        },
        created: function () {
            // On load



            eventHub.$on('updatefield', dataField=>{
                this.localmodelClone[dataField.field] = this.localmodelClone[dataField.field] = dataField.value
                console.log("listen-updateField:",dataField)
            })
            eventHub.$on('updatemodel', dataModel=>{
                console.log("listen-updatemodel:",dataModel)
                this.updateModel(dataModel);
                this.localmodelClone = dataModel
            })
            eventHub.$on('cleanmodel', dataModel=>{
                console.log("listen-cleanmodel:",dataModel)
                this.localmodelClone = dataModel
            })
        },
        beforeMount(){
            console.log("prop:",this.model)
            if(this.model){
                this.localmodelClone = JSON.parse(JSON.stringify(this.model));
            }

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
                console.log('onInput')
                //this.$set(this.model, fieldName, value)
                //this.$emit("updatemodel", this.model)
                //this.resetForm()
            },
            resetForm: function() {

                var self = this; //you need this because *this* will refer to Object.keys below`

                //Iterate through each object field, key is name of the object field`
                if(this.localmodel){
                    //this.$emit("updatemodel", this.localmodel)
                    eventHub.$emit("updatemodel", this.localmodel)
                    this.localmodel = this.localmodelClone;
                    Object.keys(this.localmodel).forEach(function(key,index) {
                      //self.model[key] = '';
                      //self.$set(self.localmodel, key, '')
                      self.localmodel[key] = '';
                    });
                    eventHub.$emit("cleanmodel", this.localmodel)

                    //self.$emit("update:model", self.localmodel)
                    //this.model = this.localmodel
                }

            },
            nextStep (n, steps) {
                if (n == steps) {
                    this.resetForm()

                  this.stepper = 1
                } else {
                  this.stepper = n + 1
                }
            },
            typeMimeType:function(item){
                let itemUpper = item.toUpperCase();
                let type="";

                if(itemUpper.indexOf('PDF') > -1){
                  type = "PDF";
                }
                else if(itemUpper.indexOf('HTML') > -1){
                  type = "";
                }else if((itemUpper.indexOf('GIF') > -1)|| (itemUpper.indexOf('JPG') > -1) || (itemUpper.indexOf('PNG') > -1)
                  || (itemUpper.indexOf('SVG') > -1) ){
                  type = "IMAGE";
                }

                return type
            },
            cloneObject(o) {
                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                    v = o[key];
                    output[key] = (typeof v === "object") ? this.cloneObject(v) : v;
                }
                return output;
            },
            updateModel:function(value){
                this.$root.$emit('updateparentmodel', value)

            }
        }
    }
</script>
