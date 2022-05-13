public with sharing class MemberController {
@AuraEnabled    
public static list<Member__c> fetchMembers(Integer pageSize, Integer pageNumber){
    System.debug(pageNumber);
    Integer totalRecord = [SELECT count() From Member__c];      
    Integer offset = (pageNumber - 1) * pageSize;
    Integer totalPage = (Integer)Math.ceil(totalRecord/pageSize);     
     System.debug('---totalpage---');
     System.debug(totalPage);
    if(pageNumber > totalPage){
        pageNumber = totalPage;
    }    
    else if (pageNumber < 1){
        pageNumber = 1;
    }
    List <Member__c> memList = new List <Member__c> ();              

    memList = [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, Onboard__c, 
    Review_Date__c, Skill__c, Status__c, Note__c, Phone__c from Member__c LIMIT :pageSize OFFSET :offset];                                     
    return memList;
}

@AuraEnabled
public static  void deleteMember(String delid){
System.debug(delid);
List<Member__c> mem = new List<Member__c>(); 
mem = [SELECT Id FROM Member__c WHERE Id = :delid];
delete mem;
}

@AuraEnabled
public static List<Member__c> searchMembers(String searchTerm, Integer pageSize, Integer pageNumber){
    Integer offset = (pageNumber - 1) * pageSize;
    List<Member__c> result = new List<Member__c>();
    if ( String.isNotBlank( searchTerm ) ) {
        String searchLike= '%'+searchTerm+'%';
         result = [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, 
         Onboard__c, Review_Date__c, Skill__c, Status__c, Note__c, Phone__c  FROM Member__c 
         WHERE  Name LIKE :searchLike LIMIT: pageSize OFFSET :offset]  ;                   
    }
    if (String.isBlank(searchTerm)) {
        result = [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, 
        Onboard__c, Review_Date__c, Skill__c, Status__c, Note__c, Phone__c  
        FROM Member__c LIMIT: pageSize OFFSET :offset]  ;  
    }

    return result;
}
@AuraEnabled
public static List<Member__c> filterMembers(Integer option, Integer pageSize, Integer pageNumber){
    Integer offset = (pageNumber - 1) * pageSize;
        List<Member__c> result = new List<Member__c>();
        if (option == 1) {
            return [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, Onboard__c, 
            Review_Date__c, Skill__c, Status__c, Note__c, Phone__c FROM Member__c where Onboard__c = THIS_MONTH
            LIMIT: pageSize OFFSET :offset]; 
        }
        if (option == 2) {
        return  [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, Onboard__c, 
        Review_Date__c, Skill__c, Status__c, Note__c, Phone__c from Member__c where Onboard__c = LAST_MONTH
        LIMIT: pageSize OFFSET :offset]; 
        }
        if (option == 3) {
            return  [SELECT Email__c, Id__c, Contract__c, Department__c, Grade__c, Name, Onboard__c, 
            Review_Date__c, Skill__c, Status__c, Note__c, Phone__c from Member__c where Onboard__c = LAST_YEAR
            LIMIT: pageSize OFFSET :offset]; 
            }
    return result;
}

}