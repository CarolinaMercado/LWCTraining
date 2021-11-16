import { LightningElement, api} from 'lwc';

export default class uI extends LightningElement {
    @api recordId;
    @api objectApiName; 
 // from lookupMonday
    handleAccountSelection(event){
        console.log("the selected record id is"+event.detail);
    }
}

//Call like a UI /one/one.app#eyJjb21wb25lbnREZWYiOiJjOnVJIiwiYXR0cmlidXRlcyI6e319