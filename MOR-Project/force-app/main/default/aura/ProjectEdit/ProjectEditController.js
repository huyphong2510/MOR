({
    handleSubmit: function (component, event, helper) {
        component.find('editform').submit();
    },

    handleSuccess: function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Notification",
            "message": "Update records successfully!!",
            "type": "SUCCESS"
        });
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:Project",
            componentAttributes: {
                contactId: component.get("v.strRecordId")
            }
        });
        toastEvent.fire();
        evt.fire();
        $A.get('e.force:refreshView').fire();
    },

    openModel: function (component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },

    closeModel: function (component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },

    likenClose: function (component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer 
        // and set set the "isOpen" attribute to "False for close the model Box.
        alert('thanks for like Us :)');
        component.set("v.isOpen", false);
    },
 

})