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
    {label: 'Email', fieldName: EmailFIELD.fieldApiName,  type:'email' , editable: true }
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
    //@track columns = COLUMS;
    columns = []; 
    @api auxiliar = '';

    @wire(getContacts)
    contacts;
    error;
    wiredcontacts({error, data}){
        if (data){
            this.contacts = Object.values(data[0]); 
            this.error = undefined;      
            if (Object.keys(data[0])) {
                this.columns = COLUMS;
            }  
            auxiliar = 'Hola'; 
            //this.colums = COLUMS; 
        } else if (error){
            this.contacts = undefined;
            this.error = error;
        }
    }

    get errors(){
    return (this.contacts.error) ?
    reduceErrors(this.contacts.error):[];
    }
}