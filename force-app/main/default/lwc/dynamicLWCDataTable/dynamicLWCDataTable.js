import { LightningElement, track, wire } from 'lwc';
//import getDynamicTableDataList from '@salesforce/apex/DynamicLWCDataTableController.GetWrapperOfSObjectFieldColumnActionValues';
import getDynamicTableDataList from '@salesforce/apex/DynamicLWCDataTableController.GetWrapperOfSObjectFieldColumnActionValues'

export default class Dynamic_LWC_Data_Table extends LightningElement {
    @track DataTableResponseWrappper;
    @track finalSObjectDataList;


    @wire(getDynamicTableDataList, {TableName: 'Accounts_List'})
    wiredContacts({ error, data }) 
    {
        if(data) 
        {
           let sObjectRelatedFieldListValues = [];
            
           for (let row of data.lstDataTableData) 
           {
                const finalSobjectRow = {}
                let rowIndexes = Object.keys(row); 
                rowIndexes.forEach((rowIndex) => 
                {
                    const relatedFieldValue = row[rowIndex];
                    if(relatedFieldValue.constructor === Object)
                    {
                        this._flattenTransformation(relatedFieldValue, finalSobjectRow, rowIndex)        
                    }
                    else
                    {
                        finalSobjectRow[rowIndex] = relatedFieldValue;
                    }
                    
                });
                sObjectRelatedFieldListValues.push(finalSobjectRow);
            }
            this.DataTableResponseWrappper = data;
            this.finalSObjectDataList = sObjectRelatedFieldListValues;
        } 
        else if (error) 
        {
            this.error = error;
        }
    }
    
    _flattenTransformation = (fieldValue, finalSobjectRow, fieldName) => 
    {        
        let rowIndexes = Object.keys(fieldValue);
        rowIndexes.forEach((key) => 
        {
            let finalKey = fieldName + '.'+ key;
            finalSobjectRow[finalKey] = fieldValue[key];
        })
    }
}
    