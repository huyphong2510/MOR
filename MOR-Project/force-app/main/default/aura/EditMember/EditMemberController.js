({
    handleSubmit : function(component, event, helper) {
        component.find('editform').submit();
    },

    handleSuccess : function(component, event, helper) {    
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Update records successfully!!",
            "type" : "SUCCESS"
        }); 
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:Member",
            componentAttributes: {
                contactId : component.get("v.strRecordId")
            }
        });
        toastEvent.fire();
        evt.fire();
        $A.get('e.force:refreshView').fire();       
    },
    handleDeleteRecord: function(component, event, helper) {
        var idx = component.get("v.strRecordId");
        console.log(idx);
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                // record is deleted
                console.log("Record is deleted.");
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
            
        }));
    },
    handleRecordUpdated: function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:Member",
            componentAttributes: {
                contactId : component.get("v.strRecordId")
            }
        });
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted, show a toast UI message
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Deleted",
                "message": "The record was deleted.",
                "type" : "success"
            });
            resultsToast.fire();
            evt.fire();
            
        } 
    },
})