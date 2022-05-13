public with sharing class ProjectController {


@AuraEnabled
public static  void deleteProject(String delid){
    System.debug(delid);
    List<Project__c> prj = new List<Project__c>(); 
    prj = [SELECT Id FROM Project__c WHERE Id = :delid];
    delete prj;

}

    @AuraEnabled    
public static list<Project__c> fetchProjects(Integer pageSize, Integer pageNumber){
    Integer totalRecord = [SELECT count() From Project__c];      
    Integer offset = (pageNumber - 1) * pageSize;
    
    // System.debug('---offset---');
    // System.debug(offset);
    Integer totalPage = (Integer)Math.ceil(totalRecord/pageSize);     
    // System.debug('---totalpage---');
    // System.debug(totalPage);
    // System.debug(offset);
    if(pageNumber > totalPage){
        pageNumber = totalPage;
    }       
    List <Project__c> prjList = new List <Project__c> ();              
    
    prjList = [SELECT OwnerId,Id,Id__c,Country__c,End_Date__c,Leader__r.Name,Start_Date__c,Technology__c, Type__c, Name, Status__c, PM__r.Name, Company__r.Name from Project__c LIMIT :pageSize OFFSET :offset];                                     
    return prjList;
}
@AuraEnabled
public static List<Project__c> searchProjects(String searchTerm, Integer pageSize, Integer pageNumber){
    System.debug(pageSize);
    Integer offset = (pageNumber - 1) * pageSize;
    List<Project__c> result = new List<Project__c>();
    if ( String.isNotBlank( searchTerm ) ) {
        String searchLike= '%'+searchTerm+'%';
            result = [SELECT OwnerId,Id,Id__c,Country__c,End_Date__c,Leader__r.Name,
            Start_Date__c,Technology__c, Type__c, Name, Status__c, PM__r.Name,
             Company__r.Name FROM Project__c WHERE  Name LIKE :searchLike LIMIT: pageSize OFFSET :offset]  ;                   
    }
    if (String.isBlank(searchTerm)) {
        result = [SELECT OwnerId,Id,Id__c,Country__c,End_Date__c,Leader__r.Name,
        Start_Date__c,Technology__c, Type__c, Name, Status__c, PM__r.Name, Company__r.Name FROM Project__c 
        LIMIT: pageSize OFFSET :offset ]  ;  
    }

    return result;
}

@AuraEnabled
public static List<Project__c> filterProjects(Integer option,Integer pageSize, Integer pageNumber){
    System.debug(pageSize);
    Integer offset = (pageNumber - 1) * pageSize;
        List<Project__c> result = new List<Project__c>();
        if (option == 1) {
            return [SELECT OwnerId,Id,Id__c,Country__c,End_Date__c,
            Leader__r.Name,Start_Date__c,Technology__c, Type__c, Name, Status__c, PM__r.Name,
             Company__r.Name FROM Project__c where Start_Date__c = LAST_N_WEEKS:1 LIMIT: pageSize OFFSET :offset]; 
        }
        if (option == 2) {
        return  [SELECT OwnerId,Id,Id__c,Country__c,End_Date__c,
        Leader__r.Name,Start_Date__c,Technology__c, Type__c, Name, Status__c, PM__r.Name, 
        Company__r.Name from Project__c where Start_Date__c = LAST_MONTH LIMIT: pageSize OFFSET :offset]; 
        }
    return result;
}
}