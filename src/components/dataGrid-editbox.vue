<template>
    <div>
        <v-edit-dialog
            :return-value.sync="props.item.iron"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
        >
        <div>{{ props.item.iron }}</div>
        <div slot="input" class="mt-3 title">Update Iron</div>
        <v-text-field
          slot="input"
          v-model="props.item.iron"
          :rules="[max25chars]"
          label="Edit"
          single-line
          counter
          autofocus
        ></v-text-field>
        </v-edit-dialog>
    </div>
</template>

<script>
import eventHub from './eventHub'
    export default{
        name: 'dataGrid-editbox',
        props: {
            'modelSelected': Object,
            'field':Object,
            'context':Object,
            'item':Object
        }, 
        data(){
            return {
                localfield:this.field,
                localValue: this.value,
                localItem: this.item,
                dialog: false,
                headers: [
                    {
                      text: 'Dessert (100g serving)',
                      align: 'left',
                      sortable: false,
                      value: 'name'
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                desserts: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0
                }
            }
        },
        computed:{
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created () {
          this.initialize()
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
                this.desserts = [
                  {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0
                  },
                  {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3
                  },
                  {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0
                  },
                  {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3
                  },
                  {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9
                  },
                  {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0
                  },
                  {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0
                  },
                  {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5
                  },
                  {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9
                  },
                  {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7
                  }
                ]
            },
            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = -1
                }, 300)
            },
            save () {
                if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                  this.desserts.push(this.editedItem)
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