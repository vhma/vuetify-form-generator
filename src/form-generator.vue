<template>
    <div>
        <v-card flat>Model Parent: {{ model }}</v-card>
        <div v-for="(schemaItem, schemaItemIndex) in schema">
            <div v-if="schemaItemIndex == 'groups'">
              <v-tabs
              color="blue"
              dark
              slider-color="yellow">
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
                  :label="group.key"
                >
                  <v-card flat>
                    <div class="ma-3">
                        <div v-for="field in group.fields">
                          <div v-if="field.type == 'select' || field.type == 'dropdown'">
                              <v-form-generator-field
                              :field="field"
                              :value="model[field.model]"
                              :model="model"
                              v-bind.sync="model"
                              />
                          </div>
                          <div v-else>
                              <v-form-generator-field
                              :field="field"
                              :value="model[field.model]"
                              :model="model"
                              :fieldmodel="field.model"
                              v-bind.sync="model"/>
                          </div>
                        </div>
                     </div>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
            <div v-if="schemaItemIndex == 'fields'">
                <div v-for="field in schemaItem">
                    <div v-if="field.type == 'select' || field.type == 'dropdown'">
                        <v-form-generator-field
                        :field="field"
                        :value="model[field.model]"
                        :model="model"
                        v-bind.sync="model"
                        />
                    </div>
                    <div v-else>
                        <p>value: {{model[field.model]}}</p>
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
        }
    }
</script>
