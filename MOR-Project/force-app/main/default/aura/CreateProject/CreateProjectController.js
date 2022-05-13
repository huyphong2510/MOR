({
    
    doInit : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
        "url": "lightning/n/TaskCustom"
        });
        console.log('inside');
        var action = component.get("c.getProjects");
        //action.setparm
        action.setCallback(this,function(response){
            if (response.getState() === "SUCCESS"){
                 console.log('success');
                component.set("v.projectDetails",response.getReturnValue());
            }
            else
            {
                alert('Error');
            }
        });
        $A.enqueueAction(action);
        urlEvent.fire();
    },
    handleSuccess : function(component, event, helper) {    
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Create records successfully!!",
            "type" : "SUCCESS"
        }); 
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:Project",
            componentAttributes: {
                contactId : component.get("v.strRecordId")
            }
        });
        toastEvent.fire();
        evt.fire();
        $A.get('e.force:refreshView').fire();       
    },
})