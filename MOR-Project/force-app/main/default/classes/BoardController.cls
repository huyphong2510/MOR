public with sharing class BoardController {
    // get boards
    @AuraEnabled
    public static kanbanWrap getBoards(String objName, String[] objFields, String kanbanField, String projectID) { 
        System.debug(projectID);
        String[] lstPickvals = new String[] {'To Do','Pending','In Progress','Reviewing','Done'};
        String query = 'select Name, Project__r.Name, Project__c, Assigner__r.name,Board__c, Board__r.Name,Board__r.Id, Start_Date__c,Status__c, End_Date__c, Duration__c from Task__c';  
        return new kanbanWrap(Database.query(query), lstPickvals);
    }


    // update taks status
    @AuraEnabled
    public static String getUpdateStatus(Id recId, String kanbanField, String kanbanNewValue) {
            SObject o1 = recId.getSObjectType().newSObject(recId);
            o1.put(kanbanField,kanbanNewValue);
            update o1;
            return 'Success';

    }
    
    // wrapper class Kanban
    public class KanbanWrap{
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