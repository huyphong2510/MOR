({
    handleShowModal: function (component) {
        var strPrjId = component.get("v.recordId");
        $A.createComponent("c:CreateMember",
            { strRecordId: strPrjId },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Create New Member",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });

    },
    showSpinner: function(component, event, helper) {
        // remove slds-hide class from mySpinner
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
     
    // function automatic called by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // add slds-hide class from mySpinner    
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
    },
    // when type keywords then Enter
    // handleSerialNumberKeyUp: function (component, evt, helper) {
    //     var isEnterKey = evt.keyCode === 13;
    //     if (isEnterKey) {
    //         component.set('v.hasMoreAsset', true)
    //         component.set('v.hasMore', true)
    //         component.set('v.assets', [])
    //         component.set('v.serialNumbers', [])
    //         component.set('v.totalRecordAsset', 0)
    //         var queryTerm = component.find('asset-search').get('v.value');
    //         let page = 0;
    //         component.set("v.page", page);
    //         component.set('v.chooseAssets', [])
    //         component.set('v.isRendered', false)
    //         component.set('v.isRenderedChild', false)
    //         component.set('v.searchTerm', queryTerm);
    //         helper.handleSearch(component, queryTerm, page);
    //     }
    // },
    handleSuccess: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Record updated!",
            "message": "The record " + event.getParam("id") + " has been updated successfully.",
            "variant": "success"
        });
        $A.get('e.force:refreshView').fire();
    },
    handleError: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Something has gone wrong!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },
    // when type keywords then Enter
    handleSerialNumberKeyUp: function (component, evt, helper) {
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = component.find('asset-search').get('v.value');
            component.set('v.searchTerm', queryTerm);
            helper.handleSearch(component, queryTerm);
        }
    },


    filterDate: function (component, event, helper) {
        var choose = component.find("choose").get("v.value");
        var action = component.get("c.filterMembers");
        var pageSize = component.get("v.pageSize");
        var pageNumber = component.get("v.pageNumber");
        console.log(pageSize);
        console.log(pageNumber);
        action.setParams({
            option: choose,
            pageSize : pageSize,
            pageNumber: pageNumber
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                component.set("v.paginationList", resultData);
            }
        });

        $A.enqueueAction(action);
    },
    handleConfirmDialog : function(component, event, helper) {  
        component.set('v.showConfirmDialog', true);
        var idx = event.target.id;
        // console.log('confirm:'+ idx);
        idx.setCallback(this, this.handleDeleteRecord);
        $A.enqueueAction(idx);
    
    },
    handleDeleteRecord: function (component, event, helper, idx) {
        //var idx = event.target.id;
        console.log(idx);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Delete records successfully!!",
            "type": "SUCCESS"
        });
        var action = component.get('c.deleteMember');
        action.setParams({
            delid: idx,
        })
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
                toastEvent.fire();
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
            $A.get('e.force:refreshView').fire();

        } else if (eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },
    handleError: function (component, event, helper) {
        component.find('notifLib').showToast({
            "title": "Something has gone wrong!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },
    // Bổ sung


    // get all members
    doInit: function (component, event, helper) {
        var action = component.get("c.fetchMembers");
        var pageSize = component.get("v.pageSize");
        var pageNumber = component.get("v.pageNumber");
        action.setParams({
            'pageSize': pageSize,
            'pageNumber': pageNumber
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();  
                var totalPage = response.getReturnValue(totalPage);        
                console.log(totalPage);
                if (resultData.length < component.get("v.pageSize")) {
                    component.set("v.isLastPage", true);
                } else {
                    component.set("v.isLastPage", false);
                }
                component.set("v.dataSize", resultData.length);
                component.set("v.paginationList", resultData);
                component.set("v.totalPage", totalPage);
            }
        });
        $A.enqueueAction(action);
    },
    editMember: function (component, event) {
        var idx = event.target.id;
        $A.createComponent("c:EditMember",
            { strRecordId: idx },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Edit Member",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
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

   
    handleConfirmDialogNo : function(component, event, helper) {
        component.set('v.showConfirmDialog', false);
    },
});