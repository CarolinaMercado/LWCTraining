import { LightningElement, wire , track, api} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FirstNameFIELD from '@salesforce/schema/Contact.FirstName';
import LastNameFIELD from '@salesforce/schema/Contact.LastName';
import EmailFIELD from '@salesforce/schema/Contact.Email';
import PhoneFIELD from '@salesforce/schema/Contact.Phone';

import { reduceErrors } from 'c/ldsUtils';

const COLUMS = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Last Name', fieldName: LastNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Email', fieldName: EmailFIELD.fieldApiName,  type:'email' , editable: true },
    {type: 'button-icon',typeAttributes:{iconName: 'utility:description',name: 'More', variant:'brand'}}
];

const COLUMS2 = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Phone', fieldName: PhoneFIELD.fieldApiName,  type:'phone' , editable: true },
];

const COLUMS3 = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Last Name', fieldName: LastNameFIELD.fieldApiName,  type:'text' , editable: true },
];


export default class ContactList extends LightningElement {
    @track columns = COLUMS;
    //columns = []; 
    @api auxiliar = "Ingresando";
    @api popup = "Desclickeado!";
    @api contactRow={};
    @track rowOffset = 0;  
    @track modalContainer = false;
    
    @wire(getContacts)
    contacts;
    error;
    wiredcontacts({error, data}){
        if (data){
            this.contacts = data;//Object.values(data[0]); 
            this.error = undefined;      
            //aux(); //NO está haciendo esto - siempre muestra ingresando! 
            //if (Object.keys(data[0])) {
            //    this.columns = COLUMS;}  
            //this.colums = COLUMS; 
        } else if (error){
            this.contacts = undefined;
            this.error = error;
        }
    }
    get aux () {
        if (this.contacts !== undefined){return "Exito";}
        return "Fracaso";
    }

    get errors(){
    return (this.contacts.error) ?
    reduceErrors(this.contacts.error):[];
    }

    //Click to see Tiers
    handleRowAction(event) {
        if (event.detail.action.name === 'More') {
            this.popup ==="Clickeado!" ? this.popup="Desclickeado!" : this.popup="Clickeado!";
            //this.popup = "Clickeado!";
            const dataRow = event.detail.row;
            window.console.log('dataRow@@ ' + dataRow);
            this.contactRow=dataRow;
            window.console.log('contactRow## ' + dataRow);
            this.modalContainer=true;
        } 
    }

    closeModalAction(){
        this.modalContainer=false;
    }

    //Table information
    clickedButtonLabel = true;
    @api columnsTiers; 
    //@track dataParent; 

    handleClick1(event) {
        this.clickedButtonLabel = true;
        this.columnsTiers = [
            { label: 'Tier Name', fieldName: 'name' },
            { label: 'Number', fieldName: 'number', type: 'number' },
            { label: 'Discount', fieldName: 'discount', type: 'number' },
        ];
        //this.dataParent = contactRow;
    }
    handleClick2(event) {
        this.clickedButtonLabel = false;
        this.columnsTiers = [
            { label: 'Contract', fieldName: 'contract' },
            { label: 'Effective Date', fieldName: 'effectiveDate', type: 'date' },
            { label: 'Price', fieldName: 'price', type: 'currency' },
        ];
        //this.dataParent = contactRow;
    }

    
}