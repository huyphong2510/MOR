({
    doInit : function(component, event, helper) {   
        var action = component.get("c.getTasks");
        //action.setparm
        action.setCallback(this,function(response){
            if (response.getState() === "SUCCESS"){
                 console.log('success');
                component.set("v.taskDetails",response.getReturnValue());
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Create",
                    "message": "The record was created."
                });            
            }    
            else
            {
                alert('Error');
            }
        });
        $A.get('e.force:refreshView').fire();  
        $A.enqueueAction(action);
        
        resultsToast.fire(); 
        evt.fire();
      
    },
})