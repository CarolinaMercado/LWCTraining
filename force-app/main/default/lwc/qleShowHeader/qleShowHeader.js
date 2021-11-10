import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Opportunity.Name',
    'Opportunity.AccountId',
    'Opportunity.Amount',
    'Opportunity.CloseDate',
];

export default class QleShowHeader extends LightningElement {

    @api recordId ;//= '0065f0000063Bn2AAE'; //Opportunity
    //'0035f0000083APYAA2'; //Contact


    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    opportunity;

    get name() {
        return this.opportunity.data.fields.Name.value;
    }

    get accountId() {
        return this.opportunity.data.fields.AccountId.value;
    }

    get amount() {
        return this.opportunity.data.fields.Amount.value;
    }

    get closeDate() {
        return this.opportunity.data.fields.CloseDate.value;
    }
}