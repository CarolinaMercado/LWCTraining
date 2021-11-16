import { LightningElement , wire, api, track} from 'lwc';
//Opportunity record 0065f0000063BmfAAE


export default class QleAddProductSection extends LightningElement {
    @api totalQuote = 1345692;

    /*
    https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.apex_call_imperative
    To call apex methods once, in button (DO NOT USE @AuraEnabled(cacheable=true) in apex)
    Put in button  onclick={handleLoad} with function name. 
    
    handleLoad() {
        getContactList() //the apex method name
            .then(result => {
                this.contacts = result; //To display results
            })
            .catch(error => {
                this.error = error; //if there is an error, show with template if. 
            });
    }
    
    */
}