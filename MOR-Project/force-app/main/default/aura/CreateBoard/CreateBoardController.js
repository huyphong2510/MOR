({
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Create records successfully!!",
            "type" : "SUCCESS"
        }); 
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:BoardKanban",
            componentAttributes: {
                contactId : component.get("v.strRecordId")
            }
        });
        toastEvent.fire();
        evt.fire();
        $A.get('e.force:refreshView').fire();       
    },
    
})
