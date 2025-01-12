import { LightningElement,api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api label
    @api options=[]
    @api uniqueId=''

    changeHandler(event){
        console.log(this.label)
        console.log(event.target.value)
        this.callParent(event.target.value)
    }

    //creating Custom Event
   callParent(value){
    this.dispatchEvent(new CustomEvent('optionhandler', {
        detail: {
            label:this.label,
            value:value
        }
    }))
   }

   @api
   reset(value){
    //Fetch All value from 'select' tag from HTML
    this.template.querySelector('select').value=value
    //Then callParent(Value)
    this.callParent(value);
   }
}