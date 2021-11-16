import { LightningElement, api, wire, track } from 'lwc';
import getCustomLookupAccount from '@salesforce/apex/ContactSearchBar.getCustomLookupAccount';

import { publish, MessageContext } from 'lightning/messageService';
import ADD_ROW_LOOKUP_CHANNEL from '@salesforce/messageChannel/AddRowLookup__c';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getRecordsByName from '@salesforce/apex/ContactSearchBar.getRecordsByName'


/** Apex methods from ContactSearchBar */
//import search from '@salesforce/apex/ContactSearchBar.search';
//import getRecentlyViewed from '@salesforce/apex/ContactSearchBar.getRecentlyViewed';

export default class ContactSearchBar extends LightningElement {

 @track accountName='';
 @track accountList=[];
 @track objectApiName='Account';
 @track accountId;
 @track isShow=false;
 @track messageResult=false;
 @track isShowResult = true;
 @track showSearchedValues = false;
 @wire(getCustomLookupAccount,{actName:'$accountName'})
 retrieveAccounts ({error,data}){
     this.messageResult=false;
     if(data){
         console.log('data## ' + data.length);
         if(data.length>0 && this.isShowResult){
            this.accountList =data;
            this.showSearchedValues=true;
            this.messageResult=false;
            //const payload = { results: accountList.data.id };
            //publish(this.messageContext, ADD_ROW_LOOKUP_CHANNEL, payload);
         }
         else if(data.length == 0){
            this.accountList=[];
            this.showSearchedValues=false;
            if(this.accountName != ''){
               this.messageResult=true;
            }
         }
         else if(error){
             this.accountId='';
             this.accountName='';
             this.accountList=[];
             this.showSearchedValues=false;
             this.messageResult=true;
         }
 
     }
 }
 
 
 
 searchHandleClick(event){
  this.isShowResult = true;
  this.messageResult = false;
}
 
 
searchHandleKeyChange(event){
  this.messageResult=false;
  this.accountName = event.target.value;
}
 
parentHandleAction(event){        
    this.showSearchedValues = false;
    this.isShowResult = false;
    this.messageResult=false;
    //Set the parent calendar id
    this.accountId =  event.target.dataset.value;
    //Set the parent calendar label
    this.accountName =  event.target.dataset.label;      
    console.log('accountId::'+this.accountId);    
    const selectedEvent = new CustomEvent('selected', { detail: this.accountId });
        // Dispatches the event.
    this.dispatchEvent(selectedEvent);    
}
    // Use alerts instead of toasts (LEX only) to notify user
    @api notifyViaAlerts = false;

    isMultiEntry = true;
    maxSelectionSize = 2;
    initialSelection = [
        {
            id: 'na',
            sObjectType: 'na',
            icon: 'standard:lightning_component',
            title: 'Inital selection',
            subtitle: 'Not a valid record'
        }
    ];
    errors = [];
    recentlyViewed = [];
    newRecordOptions = [
        { value: 'Account', label: 'New Account' },
        { value: 'Opportunity', label: 'New Opportunity' }
    ];

    /**
     * Loads recently viewed records and set them as default lookpup search results (optional)
     *
    @wire(getRecentlyViewed)
    getRecentlyViewed({ data }) {
        if (data) {
            this.recentlyViewed = data;
            this.initLookupDefaultResults();
        }
    }

    connectedCallback() {
        this.initLookupDefaultResults();
    }

    /**
     * Initializes the lookup default results with a list of recently viewed records (optional)
     *
    initLookupDefaultResults() {
        // Make sure that the lookup is present and if so, set its default results
        const lookup = this.template.querySelector('c-lookup');
        if (lookup) {
            lookup.setDefaultResults(this.recentlyViewed);
        }
    }

    /**
     * Handles the lookup search event.
     * Calls the server to perform the search and returns the resuls to the lookup.
     * @param {event} event `search` event emmitted by the lookup
     *
    handleLookupSearch(event) {
        const lookupElement = event.target;
        // Call Apex endpoint to search for records and pass results to the lookup
        search(event.detail)
            .then((results) => {
                lookupElement.setSearchResults(results);
            })
            .catch((error) => {
                this.notifyUser('Lookup Error', 'An error occured while searching with the lookup field.', 'error');
                // eslint-disable-next-line no-console
                console.error('Lookup error', JSON.stringify(error));
                this.errors = [error];
            });
    }

    /**
     * Handles the lookup selection change
     * @param {event} event `selectionchange` event emmitted by the lookup.
     * The event contains the list of selected ids.
     *
    // eslint-disable-next-line no-unused-vars
    handleLookupSelectionChange(event) {
        this.checkForErrors();
    }

    // All functions below are part of the sample app form (not required by the lookup).

    handleLookupTypeChange(event) {
        this.initialSelection = [];
        this.errors = [];
        this.isMultiEntry = event.target.checked;
    }

    handleMaxSelectionSizeChange(event) {
        this.maxSelectionSize = event.target.value;
    }

    handleSubmit() {
        this.checkForErrors();
        if (this.errors.length === 0) {
            this.notifyUser('Success', 'The form was submitted.', 'success');
        }
    }

    handleClear() {
        this.initialSelection = [];
        this.errors = [];
    }

    checkForErrors() {
        this.errors = [];
        const selection = this.template.querySelector('c-lookup').getSelection();
        // Custom validation rule
        if (this.isMultiEntry && selection.length > this.maxSelectionSize) {
            this.errors.push({ message: `You may only select up to ${this.maxSelectionSize} items.` });
        }
        // Enforcing required field
        if (selection.length === 0) {
            this.errors.push({ message: 'Please make a selection.' });
        }
    }

    notifyUser(title, message, variant) {
        if (this.notifyViaAlerts) {
            // Notify via alert
            // eslint-disable-next-line no-alert
            alert(`${title}\n${message}`);
        } else {
            // Notify via toast (only works in LEX)
            const toastEvent = new ShowToastEvent({ title, message, variant });
            this.dispatchEvent(toastEvent);
        }
    }
    */
}
