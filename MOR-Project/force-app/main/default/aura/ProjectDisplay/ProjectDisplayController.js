({
    doInit: function(component) {
        var strPrjId = component.get("v.recordId");
        console.log('Project Id ====>'+strPrjId);
        $A.createComponent("c:ProjectEdit", 
                           {strRecordId : strPrjId},
                           function(result, status) {
                               if (status === "SUCCESS") {
                                   component.find('overlayLibDemo').showCustomModal({
                                       header: "Project Edit Form",
                                       body: result, 
                                       showCloseButton: true,
                                       cssClass: "mymodal", 
                                   })
                               }                               
                           });
    },
    navigateToBoard : function(component, event, helper) {

        var id = component.get("v.projectRecord.Id");
        console.log('id:', id);
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:BoardKanBan",
            componentAttributes: {
                projectID : component.get("v.projectRecord.Id")
            }
        });
        evt.fire();
    },
    
    handleDeleteRecord: function(component, event, helper) {
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
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
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
           // record is changed
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted, show a toast UI message
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Deleted",
                "message": "The record was deleted."
            });
            resultsToast.fire();
            window.location.href = "https://https://mor-project-dev-ed.lightning.force.com/lightning/o/Project__c/list?filterName=Recent";

        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },
     openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
     },
  
     closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
     },
  
     likenClose: function(component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer 
        // and set set the "isOpen" attribute to "False for close the model Box.
        alert('thanks for like Us :)');
        component.set("v.isOpen", false);
     },
})