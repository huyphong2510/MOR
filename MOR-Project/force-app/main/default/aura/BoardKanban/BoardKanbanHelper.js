({
	updatePickVal : function(component, recId, pField, pVal) {
        // console.log("helper");
        // console.log(recId);
        // console.log(pField);
        // console.log(pVal);
		var action = component.get("c.getUpdateStage");
        action.setParams({
            recId:recId,
            kanbanField:'Status__c',
            kanbanNewValue:pVal
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                document.getElementById(recId).style.backgroundColor = "#04844b";
                setTimeout(function(){ document.getElementById(recId).style.backgroundColor = ""; }, 300);
            }
        });
        $A.enqueueAction(action);
	}
})