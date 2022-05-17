public with sharing class BoardController {
    @AuraEnabled
    public static kanbanWrap getBoards(String objName, String[] objFields, String kanbanField) {
        // List <Board__c> lstPickvals = new List <Board__c> ();    
        String[] lstPickvals = new String[] {'To Do','Pending','In Progress','Reviewing','Done'};
        String query = 'SELECT Task__r.name,Task__r.Status__c,OwnerId, Id, Name, Status__c FROM Board__c';  
        return new kanbanWrap(Database.query(query), lstPickvals);
    }

    @AuraEnabled
    public static String getUpdateStatus(Id recId, String kanbanField, String kanbanNewValue) {
            System.debug(recId);
            SObject o1 = recId.getSObjectType().newSObject(recId);
            o1.put(kanbanField,kanbanNewValue);
            update o1;
            return 'Success';

    }
    
    
    public class kanbanWrap{
        @AuraEnabled
        public List<sObject> records {get;set;}
        @AuraEnabled
        public List<String> pickVals {get;set;}
        public kanbanWrap(List<sObject> recs, List<String> pVals){
            this.records = recs;
            this.pickVals = pVals;
        }
    }

}