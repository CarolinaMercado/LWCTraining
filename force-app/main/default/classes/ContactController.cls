public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static Map<String,List<Contact>> getContacts(){
        //throw new AuraHandledException('Forced error');
    	
        Integer value = Integer.valueof((Math.random() * 10));
        List<Contact> A = [SELECT FirstName, LastName, Email FROM Contact WITH SECURITY_ENFORCED ORDER BY Name LIMIT 5];
        List<Contact> B = [SELECT FirstName, Phone FROM Contact WITH SECURITY_ENFORCED ORDER BY Name DESC LIMIT 5];   
        List<Contact> C = [SELECT FirstName, Title FROM Contact WITH SECURITY_ENFORCED ORDER BY Name LIMIT 10]; 
        Map<String, List<Contact>> objectFields= new Map<String, List<Contact>>();
        //String word = 'a'; 
        
        /*if (value <= 1) {
            //return A;   
        }*/
         if (value >=1 && value <=10){
            String word = 'a'; //'[{"label": "First Name", "fieldName": "FirstName",  "type":"text" , "editable": "true" },{"label": "Phone", "fieldName": "Phone",  "type":"phone" , "editable": "true" }]';       
            objectFields.put(word, B);
            return objectFields;
        }
        else { 
            //return C; 
            return null;
        }
    }
}

                //{"label": "Email", "fieldName": "EmailFIELD.fieldApiName",  "type":"email" , "editable": "true" }
