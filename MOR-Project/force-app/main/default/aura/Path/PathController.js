({
    onselect : function (component, event, helper) {
        var stepName = event.getParam("detail").value;        
        component.set('v.hiringStep', stepName);
        helper.setPathButtonVisibility(component, stepName);
	},
    recordUpdated : function(component, event, helper) {
        var changeType = event.getParams().changeType;
        if (changeType === 'CHANGED') {
            component.find("recordLoader").reloadRecord();
            $A.get('e.force:refreshView').fire();   
        }
    },
    handleValueChange : function(component, event, helper) {
        var fields = component.get('v.simpleRecord');
        if (fields) {
            component.set("v.hiringStep", fields['Hiring_Stage__c']);
	        helper.setPathButtonVisibility(component, fields['Hiring_Stage__c']);                    
        }

	},
    handleSubmit : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
        "title": "UPDATE",
        "type" : "success",
        "message": "The record has been updated successfully."
    });
        component.find('editform').submit();
        $A.get('e.force:refreshView').fire();  
        toastEvent.fire();     
    },

    handleSuccess : function(component, event, helper) {     
     
       
        // $A.get('e.force:refreshView').fire();       
    },
})