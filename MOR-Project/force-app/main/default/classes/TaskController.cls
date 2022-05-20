public with sharing class TaskController{
@AuraEnabled
public static  void deleteTask(String delid){
System.debug(delid);
List<Task__c> taskList = new List<Task__c>(); 
taskList = [SELECT Id FROM Task__c WHERE Id = :delid];
delete taskList;

}
//  get all tasks
@AuraEnabled
public static List<Task__c> fetchTask(String searchKeyWord,Integer pageSize, Integer pageNumber){
Integer totalRecord = [SELECT count() From Task__c];  
Integer offset = (pageNumber - 1) * pageSize;
Integer totalPage = (Integer)Math.ceil(totalRecord/pageSize);     
String searchKey = '%'+ searchKeyWord + '%';
if(pageNumber < totalPage){
    pageNumber = totalPage;
}       
List <Task__c> taskList = new List <Task__c> ();              
        taskList = [SELECT Id,Name, Project__r.Name, Duration__c,Status__c,
                                Assigner__r.name, Start_Date__c, End_Date__c  ,Board__r.Name
                                FROM Task__c ORDER BY Start_Date__c asc LIMIT :pageSize OFFSET :offset];                                     
        return taskList;              
}


// wrapper class fetchTask
public class SimpleResponse {      
@AuraEnabled public List<Task__c>  returnList { get; set; }
@AuraEnabled public Integer totalPage { get; set; }        
// @AuraEnabled public Integer pageSize {get; set;}
// @AuraEnabled public Integer pageNumber {get; set;}
}    



    // search by keywords
@AuraEnabled
public static List<Task__c> searchTasks(String searchTerm, Integer pageSize, Integer pageNumber){
Integer offset = (pageNumber - 1) * pageSize;
List<Task__c> result = new List<Task__c>();
if ( String.isNotBlank( searchTerm ) ) {
    String searchLike= '%'+searchTerm+'%';
        result = [SELECT Name, Project__r.Name,Project__c,Assigner__r.name,Status__c,Board__r.Name
        , Start_Date__c, End_Date__c, Duration__c  FROM Task__c WHERE  Name LIKE :searchLike ORDER BY Start_Date__c asc LIMIT: pageSize OFFSET :offset]  ;                   
}
if (String.isBlank(searchTerm)) {
    result = [SELECT Name, Project__r.Name,Project__c,Assigner__r.name,Status__c,Board__r.Name
, Start_Date__c, End_Date__c, Duration__c  FROM Task__c ORDER BY Start_Date__c asc LIMIT: pageSize OFFSET :offset]  ;  
}

return result;
}


    // filter task by date 
@AuraEnabled
public static List<Task__c> filterTasks(Integer option, Integer pageSize, Integer pageNumber){
System.debug(pageSize);
Integer offset = (pageNumber - 1) * pageSize;
    List<Task__c> result = new List<Task__c>();
    if (option == 1) {
        return [select Name, Project__r.Name,Project__c,Assigner__r.name,Status__c,Board__r.Name
        , Start_Date__c, End_Date__c, Duration__c from Task__c  where  Start_Date__c = LAST_N_WEEKS:1 ORDER BY Start_Date__c asc
        LIMIT: pageSize OFFSET :offset ]; 
    }
    if (option == 2) {
    return  [select Name, Project__r.Name,Project__c,Assigner__r.name,Status__c,Board__r.Name
    , Start_Date__c, End_Date__c, Duration__c from Task__c where Start_Date__c = LAST_MONTH ORDER BY Start_Date__c asc
    LIMIT: pageSize OFFSET :offset ]; 
    }
return result;
}
}