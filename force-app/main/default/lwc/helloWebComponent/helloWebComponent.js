import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HelloWebComponent extends NavigationMixin(LightningElement) {
    greeting = 'Traiblazer';

    handleGreetingChange(event){
        this.greeting = event.target.value; 
    }
    currentDate = new Date().toDateString();
    get capitalizedGreeting() {
	    return `Hello ${this.greeting.toUpperCase()}!`;
    }

    navitageToLWCWithoutAura(event) {
        event.preventDefault();
        let componentDef = {
            componentDef: "c:targetLwcComponent",
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