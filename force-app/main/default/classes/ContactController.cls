public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact>  getContacts(){ //Map<String,List<Contact>>
        //throw new AuraHandledException('Forced error');
    	
        Integer value = Integer.valueof((Math.random() * 10));
        List<Contact> A = [SELECT Id, FirstName, LastName, Email FROM Contact WITH SECURITY_ENFORCED ORDER BY Name LIMIT 10];
        List<Contact> B = [SELECT FirstName, Phone FROM Contact WITH SECURITY_ENFORCED ORDER BY Name DESC LIMIT 10];   
        List<Contact> C = [SELECT FirstName, Title FROM Contact WITH SECURITY_ENFORCED ORDER BY Name LIMIT 10]; 
        Map<String, List<Contact>> objectFields= new Map<String, List<Contact>>();

        //Sessions (Related objects)
        
        //String word = 'a'; 
        
        if (value < 4) {
            return A;   
        }
         if (value >=4 && value <=7){
            //String word = 'a'; //'[{"label": "First Name", "fieldName": "FirstName",  "type":"text" , "editable": "true" },{"label": "Phone", "fieldName": "Phone",  "type":"phone" , "editable": "true" }]';       
            //objectFields.put(word, B);
            //return objectFields;
            return B;
        }
        else { 
            return C; 
            //return null;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> addContacts(List<Id> recordId){
        List<Contact> newContacts = [SELECT FirstName, LastName, Email FROM Contact WHERE Id =: recordId  WITH SECURITY_ENFORCED ORDER BY Name]; 
        return newContacts; 
     }

}

                //{"label": "Email", "fieldName": "EmailFIELD.fieldApiName",  "type":"email" , "editable": "true" }
