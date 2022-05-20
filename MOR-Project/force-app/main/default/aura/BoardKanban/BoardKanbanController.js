({
    // Get all boards
    doInit: function (component, event, helper) {
        var action = component.get("c.getBoards");
        action.setParams({
            "objName": component.get("v.objName"),
            "objFields": component.get("v.objFields"),
            "kanbanField": component.get("v.kanbanPicklistField"),
            "projectID": component.get("v.projectID"),
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                component.set("v.kanbanData", resultData);
            }
        });
        $A.enqueueAction(action);
    },

    // Double click to show detail
    editTask: function (component, event) {
        var idx = event.target.id;
        console.log(idx);
        $A.createComponent("c:TaskEdit",
            { strRecordId: idx },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Edit Task",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },

    // create a new board
    createBoard: function (component, event, helper) {
        var strTskId = component.get("v.recordId");
        $A.createComponent("c:CreateBoard",
            { strRecordId: strTskId },
            function (result, status) {
                if (status === "SUCCESS") {
                    component.find('overlayLibDemo').showCustomModal({
                        header: "Create Board",
                        body: result,
                        showCloseButton: true,
                        cssClass: "mymodal",
                    })
                }
            });
    },


    // when you start drop
    allowDrop: function (component, event, helper) {
        event.preventDefault();
    },

    // when you drag
    drag: function (component, event, helper) {
        var idx = event.target.id;
        event.dataTransfer.setData("text", idx);
    },


    // when you stop dragging
    drop: function (component, event, helper) {
        var action = component.get("c.getUpdateStatus");
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var tar = event.target;
        while (tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        tar.appendChild(document.getElementById(data));
        console.log('status   :   ' + tar.getAttribute('data-Pick-Val'));
        document.getElementById(data).style.backgroundColor = "#d7f9fa";
        $A.enqueueAction(action);
        helper.updatePickVal(component, data, component.get("v.kanbanPicklistField"), tar.getAttribute('data-Pick-Val'));
    },

})