public with sharing class TechnologyController {
    @AuraEnabled    
    public static list<technology__c> getTechnologies(){
        return [SELECT Name, Code__c FROM Technology__c];
    }

    @AuraEnabled
public static List<Technology__c> searchTechs(String searchTerm){
    System.debug(searchTerm);
    List<Technology__c> result = new List<Technology__c>();
    if ( String.isNotBlank( searchTerm ) ) {
        String searchLike= '%'+searchTerm+'%';
         result = [SELECT Name, Code__c  FROM Technology__c WHERE  Name LIKE :searchLike]  ;                   
    }
    if (String.isBlank(searchTerm)) {
        result = [SELECT Name, Code__c FROM Technology__c ]  ;  
    }

    return result;
}
}