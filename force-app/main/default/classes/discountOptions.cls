public with sharing class discountOptions {
    @AuraEnabled(cacheable=true)
    public static String recordOptions() {
        return '[ { label: "New", value: "new" }, { label: "In Progress", value: "inProgress" }, { label: "Finished", value: "finished"},]';
    }
}
