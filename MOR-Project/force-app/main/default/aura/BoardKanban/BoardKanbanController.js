({
    doInit: function (component, event, helper) {
        var action = component.get("c.getBoards");
        action.setParams({
            "objName":component.get("v.objName"),
            "objFields":component.get("v.objFields"),
            "kanbanField":component.get("v.kanbanPicklistField")
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();  
                console.log('data:', resultData);
                component.set("v.kanbanData", resultData);
            }
        });
        $A.enqueueAction(action);
    },
    doView: function(component, event, helper) {
        console.log("doView");
        var editRecordEvent = $A.get("e.force:navigateToSObject");
        editRecordEvent.setParams({
            "recordId": event.target.id
        });
        editRecordEvent.fire();
    },
    allowDrop: function(component, event, helper) {
        console.log("allowDrop");
        event.preventDefault();
    },
    
    drag: function (component, event, helper) {
        var idx = event.target.id;
        //  console.log(idx);
        console.log("drag");
        event.dataTransfer.setData("text", idx);
    },

    
    
    drop: function (component, event, helper) {
        var action = component.get("c.getUpdateStatus");
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
         console.log('Id:', data);
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        tar.appendChild(document.getElementById(data));
        console.log('status   :   ' + tar.getAttribute('data-Pick-Val'));
        document.getElementById(data).style.backgroundColor = "#d7f9fa";
        $A.enqueueAction(action);
        helper.updatePickVal(component,data,component.get("v.kanbanPicklistField"),tar.getAttribute('data-Pick-Val'));
    },

})
