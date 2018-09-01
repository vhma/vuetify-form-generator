<template>
    <div>
        <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Agregar registro</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-lg>
                      <div v-for="header in headers">
                            <formFields
                                :field="header.field"
                                :value="localeditedItem[header.field.model]"
                                :model="localeditedItem"
                                :fieldmodel="header.field.model"
                                v-bind.sync="localeditedItem"
                               />
                         <br/><br/>
                      </div>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
    </div>
</template>

<script>
import eventHub from './eventHub'
import formFields from './form-field-component';

    export default{
            name: 'dataGrid',
            props: {
                'modelSelected': Object,
                'field':Object,
                'table':Object,
                'items':Array,
                'defaultItem':Object,
                'context':Object
            },
            components:{
                'formFields': formFields,
                eventHub
            },
            data(){
                return {
                    localmodelSelected:this.modelSelected,
                    localfield:this.field,
                    localItems:this.items,
                    localTable:this.table,
                    localDefaultItem:this.defaultItem,
                    localValue: this.value,
                    dialog: false,
                    headers: this.table.headers,
                    dataItems: [],
                    editedIndex: -1,
                    editedItem: {}
                }
            },
            computed:{
                localeditedItem:{
                    get(){
                        return this.editedItem
                    },
                    set (value) {
                        this.editedItem = JSON.parse(JSON.stringify(value));
                    }
                }
            },
            watch: {
                dialog (val) {
                    val || this.close()
                }
            },
            created () {
                eventHub.$on('updatefield', dataField=>{
                    this.editedItem[dataField.field] = this.editedItem[dataField.field] = dataField.value
                })
                this.initialize()
            },
            beforeMount(){
                if(this.localDefaultItem){
                    this.editedItem = JSON.parse(JSON.stringify(this.localDefaultItem));
                }
            },
            methods:{
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
                initialize () {
                    this.dataItems = []
                },
                editItem (item) {
                    this.editedIndex = this.dataItems.indexOf(item)
                    this.editedItem = Object.assign({}, item)
                    this.dialog = true
                },
                deleteItem (item) {
                    const index = this.dataItems.indexOf(item)
                    confirm('Are you sure you want to delete this item?') && this.dataItems.splice(index, 1)
                },
                close () {
                    this.dialog = false
                    setTimeout(() => {
                      this.editedItem = Object.assign({}, this.localDefaultItem)
                      this.editedIndex = -1
                    }, 300)
                },
                save () {debugger;
                    if (this.editedIndex > -1) {
                      Object.assign(this.dataItems[this.editedIndex], this.editedItem)
                    } else {
                      this.dataItems.push(this.editedItem)
                    }
                    this.close()
                },
                saveItem () {
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Data saved'
                },
                cancelItem () {
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Canceled'
                },
                openItem () {
                    this.snack = true
                    this.snackColor = 'info'
                    this.snackText = 'Dialog opened'
                },
                closeItem () {
                    console.log('Dialog closed')
                }
            }
        }
</script>