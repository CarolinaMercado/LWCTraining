import { LightningElement , wire, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
//Opportunity record 0065f0000063BmfAAE


export default class QleAddProductSection extends NavigationMixin(LightningElement) {
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
    //Use this to navigate to Product Selection Page
    navitageToLWCWithoutAura(event) {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:uiProductSelection",
            attributes: {
                label: 'Navigated From Another LWC Without Using Aura'
            }
        };
        // Encode the componentDefinition JS object to Base64 format to make it url addressable
        let encodedComponentDef = btoa(JSON.stringify(componentDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedComponentDef
            }
        });
    }
}