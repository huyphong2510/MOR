({
    doInit: function (component, event, helper) {
        helper.getProjects(component, helper, event);
    },
    handleSerialNumberKeyUp: function (component, evt, helper) {
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = component.find('asset-search').get('v.value');
            component.set('v.searchTerm', queryTerm);
            helper.handleSearch(component, queryTerm);
        }
    },
    handleShowModal: function (component) {
        var strPrjId = component.get("v.recordId");
        $A.createComponent("c:CreateProject",
            { strRecordId: strPrjId },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Create New Project",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },
    editProject: function (component, event) {
        var idx = event.target.id;
        $A.createComponent("c:ProjectEdit",
            { strRecordId: idx },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Edit Project",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },
    handleDeleteRecord: function (component, event, helper) {
        var idx = event.target.id;
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Delete records successfully!!",
            "type": "SUCCESS"
        });
        var action = component.get('c.deleteProject');
        action.setParams({
            delid: idx,
        })
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message")
                    }
                } else {
                    console.log('Unknow Error');
                }
            }
        });
        toastEvent.fire();
        $A.enqueueAction(action);
    },
    popUp: function (component) {
        var strPrjId = component.get("v.recordId");
        $A.createComponent("c:CreateProject",
            { strRecordId: strPrjId },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLib').showCustomModal({
                        header: "Create A Project",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },


    handleError: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Something has gone wrong!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },

    filterDate: function (component, event, helper) {
        var choose = component.find("choose").get("v.value");
        var action = component.get("c.filterProjects");
        var pageSize = component.get("v.pageSize");
        var pageNumber = component.get("v.pageNumber");
        action.setParams({
            option: choose,
            pageSize: pageSize,
            pageNumber: pageNumber
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                component.set("v.data", resultData);
            }
        });

        $A.enqueueAction(action);
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
    handleConfirmDialog: function (component, event, helper) {
        component.set('v.showConfirmDialog', true);
    },

    handleConfirmDialogNo: function (component, event, helper) {
        component.set('v.showConfirmDialog', false);
    },
    handleNext: function (component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        var totalPage = component.get("v.totalPage");
        component.set("v.pageNumber", pageNumber + 1);
        component.set("v.totalPage", totalPage);
        helper.getProjects(component, helper);
    },
    handlePrev: function (component, event, helper) {
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber - 1);
        helper.getProjects(component, helper);
    },

    viewChange20: function (component, event, helper) {
        component.set("v.viewQuantity", "Now showing 20 records");
        component.set("v.pageSize", 20);
        helper.getProjects(component, helper, event);
        helper.handleSearch(component, helper, event);
    },

    viewChange50: function (component, event, helper) {
        component.set("v.viewQuantity", "Now showing 50 records");
        component.set("v.pageSize", 50);
        helper.getProjects(component, helper, event);
        helper.handleSearch(component, helper, event);
    },
    viewChange100: function (component, event, helper) {
        component.set("v.viewQuantity", "Now showing 100 records");
        component.set("v.pageSize", 100);
        helper.getProjects(component, helper, event);
        helper.handleSearch(component, helper, event);
    },

});