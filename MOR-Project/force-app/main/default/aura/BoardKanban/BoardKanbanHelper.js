({
	updatePickVal : function(component, recId, pField, pVal) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "Update status successfully!!!",
            "type" : "success",
        });
		var action = component.get("c.getUpdateStatus");
        action.setParams({
            recId:recId,
            kanbanField:'Status__c',
            kanbanNewValue:pVal,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                // console.log(response.getReturnValue());
                document.getElementById(recId).style.backgroundColor = "#d6fff3";
                setTimeout(function(){ document.getElementById(recId).style.backgroundColor = ""; }, 3000);
            }
        });
        $A.enqueueAction(action);
        toastEvent.fire();
	}
})