public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        //throw new AuraHandledException('Forced error');
        return [SELECT Name, AnnualRevenue, Industry FROM Account  WITH SECURITY_ENFORCED ORDER BY Name];
    }

     
//( cacheable = true ) doesn't support DML operations
    @AuraEnabled
    public static void saveAccounts(List<Account> accList){
        Insert accList;
        /*if(accList.size()>0 && accList != null){
            insert accList;
        }*/
    } 
}