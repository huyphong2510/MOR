({
    handleShowModal: function (component) {
        var strPrjId = component.get("v.recordId");
        $A.createComponent("c:CreateTechnology",
            { strRecordId: strPrjId },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Create New Technology",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },

    handleSerialNumberKeyUp: function (component, evt, helper) {
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = component.find('asset-search').get('v.value');
            component.set('v.searchTerm', queryTerm);
            helper.handleSearch(component, queryTerm);
        }
    },

    handleSuccess: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Record updated!",
            "message": "The record " + event.getParam("id") + " has been updated successfully.",
            "variant": "success"
        });
    },

    handleError: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Something has gone wrong!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },
    handleDeleteRecord: function (component, event, helper) {
        component.find("recordHandler").deleteRecord($A.getCallback(function (deleteResult) {
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
    handleRecordUpdated: function (component, event, helper) {
        var eventParams = event.getParams();
        if (eventParams.changeType === "CHANGED") {
            // record is changed
        } else if (eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if (eventParams.changeType === "REMOVED") {
            // record is deleted, show a toast UI message
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Deleted",
                "message": "The record was deleted."
            });
            resultsToast.fire();
            window.location.href = "https://mor-project-dev-ed.lightning.force.com/lightning/o/Memject__c/list?filterName=Recent";

        } else if (eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },

    handleSuccess: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Record updated!",
            "message": "The record " + event.getParam("id") + " has been updated successfully.",
            "variant": "success"
        });
    },

    handleError: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Something has gone wrong!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },

    // Bổ sung

    doInit: function (component, event, helper) {
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.getTechnologies");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.technologyList", response.getReturnValue());
                component.set("v.totalSize", component.get("v.technologyList").length);
                component.set("v.start", 0);
                component.set("v.end", pageSize - 1);
                var paginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    paginationList.push(response.getReturnValue()[i]);
                }
                component.set("v.paginationList", paginationList);
            }
        });
        $A.enqueueAction(action);
    },
    handleNext: function (component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        var totalPage = component.get("v.totalPage");
        component.set("v.pageNumber", pageNumber + 1);
        component.set("v.totalPage", totalPage);
        helper.getMembers(component, helper);
    },
    handlePrev: function (component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber - 1);
        helper.getMembers(component, helper);
    },
    viewChange20: function (component, event, helper) {
        component.set("v.viewQuantity","Now showing 20 records");
        component.set("v.pageSize", 20);
        helper.getMembers(component, helper, event);
        helper.handleSearch(component, helper, event);
    },

    viewChange50: function (component, event, helper) {
        component.set("v.viewQuantity","Now showing 50 records");
        component.set("v.pageSize", 50);
        helper.getMembers(component, helper, event);
        helper.handleSearch(component, helper, event);
    },
    viewChange100: function (component, event, helper) {
        component.set("v.viewQuantity","Now showing 100 records");
        component.set("v.pageSize", 100);
        helper.getMembers(component, helper, event);
        helper.handleSearch(component, helper, event);
    },
    
});