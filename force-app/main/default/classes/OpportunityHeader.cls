public with sharing class OpportunityHeader {
    @AuraEnabled(cacheable=true)
    public static Opportunity oppData() {
        Opportunity OppData = new Opportunity();
        OppData =  [SELECT Name, AccountId, CloseDate, Amount FROM Opportunity LIMIT 1];
        return OppData; 
    }
}