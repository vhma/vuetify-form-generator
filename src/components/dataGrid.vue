<template>
<div>
    <!--  actions buttons  --->
    <v-toolbar flat color="white">
    <v-spacer> </v-spacer>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" fab dark color="green" small>
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Agregar registro</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-lg>
                <v-form ref="formGrid" lazy-validation>
                  <div v-for="header in headers">
                        <formFields
                            :field="header.field"
                            :value="editedItem[header.field.model]"
                            :model="editedItem"
                            :refNode="formGridInput"

                            v-bind.sync="editedItem"
                           />
                     <br/><br/>
                  </div>
                </v-form>

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
    </v-toolbar>

    <!--  datatable  --->
    <v-data-table
      :headers="headers"
      :items="dataItems"
      class="elevation-1"
      rows-per-page-text="Registros"
    >
      <template slot="items" slot-scope="props">
            <td v-for="(item, key) in props.item" :key="key">
                <v-edit-dialog
                    lazy
                    @save="saveItem"
                    @cancel="cancelItem"
                    @open="openItem"
                    @close="closeItem"
                >
                <div>
                    <span v-if="item.id">{{ item.name }}</span>
                    <span v-else>{{ item }}</span>
                </div>
                <div slot="input" class="mt-3 title">Actualizar {{ getDataHeader(key).text }}</div>
                    <formFields
                        slot="input"
                        :field="getDataHeader(key).field"
                        :value="props.item[key]"
                        :model="props.item"
                        :options="{ label:' ',hint:' ' }"
                        v-bind.sync="props.item"
                       />
                </v-edit-dialog>

            </td>
            <td class="justify-center layout px-1">
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
      </template>

      <template slot="no-data">
        <div class="justify-center layout  ">No hay registros</div>
      </template>
    </v-data-table>


  </div>

</template>

<script>
import eventHub from './eventHub';
import formFields from './form-field-component';
import dataGridEditbox from './dataGrid-editbox.vue';

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
            'dataGridEditbox': dataGridEditbox
        },
        data(){
            return {
                localmodelSelected:this.modelSelected,
                localfield:this.field,
                localItems:this.items,
                localTable:this.table,
                localDefaultItem:this.defaultItem,
                dialog: false,
                headers: this.table.headers,
                dataItems: [],
                editedIndex: -1,
                editedItem: {},
                formGridInput:"formGridInput"
            }
        },
        computed:{
            localeditedItem:{
                get(){
                    return this.editedItem
                },
                set (value) {
                    //this.editedItem = Object.assign({}, this.editedItem, value);
                    this.editedItem = JSON.parse(JSON.stringify(value));
                }
            }
        },
        watch: {
            dialog (val) { val || this.close() }
        },
        created () {
            this.initialize()
        },
        beforeMount(){
            this.editedItem = JSON.parse(JSON.stringify(this.localDefaultItem));
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
                confirm('¿Desea eliminar el registro?') && this.dataItems.splice(index, 1)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                  //this.clearForms()
                  this.localeditedItem = this.localDefaultItem;
                  this.editedIndex = -1

                }, 300)
            },
            clearForms(){
                this.$refs.formGrid.reset();
                /**
                this.$refs.formGrid.$children.forEach(function(i,idx){
                debugger;
                    if(i.$refs.formGridInput){
                        debugger;
                        i.$refs.formGridInput.value=''
                    }

                })**/
            },
            save () {
                if (this.editedIndex > -1) {
                  Object.assign(this.dataItems[this.editedIndex], this.editedItem)
                } else {
                  this.dataItems.push(this.editedItem)
                }
                this.updateModel(this.dataItems);
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
            },
            cleanModel(){
                var self = this; //you need this because *this* will refer to Object.keys below`

                //Iterate through each object field, key is name of the object field`
                if(this.editedItem){
                    Object.keys(this.editedItem).forEach(function(key,index) {
                      self.localmodel[key] = '';
                    });
                    eventHub.$emit("cleanmodel", this.localDefaultItem)

                    //self.$emit("update:model", self.localmodel)
                    //this.model = this.localmodel
                }
            },
            updateModel:function(value){
               eventHub.$emit('updatefield', {field:this.field.model, value: JSON.parse(JSON.stringify(value)) })
                //this.$emit('update:'+this.field.model, JSON.parse(JSON.stringify(value)))
            },
            getDataHeader(key) {
                var dataHeader={};

                for(var i=0; i<this.headers.length;i++ ){
                    if(this.headers[i].field.model == key){
                        dataHeader = this.headers[i];
                        break;
                    }
                }
                if(dataHeader){
                    return dataHeader;
                }else{
                    return null;
                }

            }
        }
    }
</script>