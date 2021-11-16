import { LightningElement, wire , track, api} from 'lwc';
import getContacts from '@salesforce/apex/ContactControllerTable.getContacts';
import addContacts from '@salesforce/apex/ContactControllerTable.addContacts';
import FirstNameFIELD from '@salesforce/schema/Contact.FirstName';
import LastNameFIELD from '@salesforce/schema/Contact.LastName';
import EmailFIELD from '@salesforce/schema/Contact.Email';
import PhoneFIELD from '@salesforce/schema/Contact.Phone';

import NameFIELD from '@salesforce/schema/Account.Name';
import IndustryFIELD from '@salesforce/schema/Account.Industry';
import IdFIELD from '@salesforce/schema/Account.Id';

import { subscribe, MessageContext } from 'lightning/messageService';
import ADD_ROW_LOOKUP_CHANNEL from '@salesforce/messageChannel/AddRowLookup__c';

import { reduceErrors } from 'c/ldsUtils';

const COLUMS = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Last Name', fieldName: LastNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Email', fieldName: EmailFIELD.fieldApiName,  type:'email' , editable: true },
    {type: 'button-icon',initialWidth: 34,typeAttributes:{iconName: 'action:description',name: 'More', variant:'brand'}},
    {type: 'button-icon',initialWidth: 34,typeAttributes:{iconName: 'action:delete',name: 'Delete', variant:'brand'}}
];

const COLUMS2 = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Phone', fieldName: PhoneFIELD.fieldApiName,  type:'phone' , editable: true },
];

const COLUMS3 = [
    {label: 'First Name', fieldName: FirstNameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Last Name', fieldName: LastNameFIELD.fieldApiName,  type:'text' , editable: true },
];

const COLUMSA = [
    {label: 'Id', fieldName: IdFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Name', fieldName: NameFIELD.fieldApiName,  type:'text' , editable: true },
    {label: 'Industry', fieldName: IndustryFIELD.fieldApiName,  type:'text' , editable: true },
    {type: 'button-icon',initialWidth: 34,typeAttributes:{iconName: 'action:description',name: 'More', variant:'brand'}},
    {type: 'button-icon',initialWidth: 34,typeAttributes:{iconName: 'action:delete',name: 'Delete', variant:'brand'}}

];

export default class ContactList extends LightningElement {
    @track columns = COLUMS;
    //@track columnsA = COLUMSA; 
    //columns = []; 
    @track contacts = [];
    @track contactsToShow = [];
    @api auxiliar = "Ingresando";
    @api popup = "Desclickeado!";
    @api contactRow={};
    @track rowOffset = 0;  
    @track modalContainer = false;
    @track contactsIdAdded; 
    @track newContacts = [];

    @wire(getContacts)
    contacts;
    error;
    wiredcontacts({error, data}){
        if (data){
            this.contacts = data;//Object.values(data[0]); 
            this.error = undefined;    
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

    get contactsToShow(){
        return this.contacts.data.records.records;
    }
    
    //Add rows
    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
        this.subscription = subscribe(
        this.messageContext,
        ADD_ROW_LOOKUP_CHANNEL,
        (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        if(message.results) {
            this.contactsIdAdded = message.results; 
        } 
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    @wire(addContacts, {recordId:'$contactsIdAdded'})
    newContacts;
    error;
    wiredcontacts({error, data}){
        if (data){
            this.newContacts = data; 
            this.error = undefined;  
            //const event = new CustomEvent('newContactAdded');
            //this.dispatchEvent(event);
            //this.contactsToShow.push(this.newContacts);
        } else if (error){
            this.newContacts = undefined; 
            this.error = error;
        }
    }

    //Click to see Tiers
    handleRowAction(event) {
        if (event.detail.action.name === 'More') {
            this.popup ==="Clickeado!" ? this.popup="Desclickeado!" : this.popup="Clickeado!";
            //this.popup = "Clickeado!";
            const dataRow = event.detail.row;
            this.contactRow = dataRow;
            this.modalContainer = true;

        } else if(event.detail.action.name === 'Delete') {
            const dataRow = event.detail.row;
            this.contactRow = dataRow;
            this.popup="Eliminado! "+ dataRow.FirstName;

            //No elimina de tabla!
            //const index = this.contacts.indexOf(dataRow.FirstName); 
            //this.contacts.splice(index,1); 
        } /*else if(event.detail.action.name === 'newContactAdded'){
            this.contactsToShow = this.contacts; 
            this.popup="RowAdded ";
        }*/
    }

    //To close the pop-up
    closeModalAction(){
        this.modalContainer=false;
    }


    //Table information in Tiers and Contracts
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