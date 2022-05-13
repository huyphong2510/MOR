({
    
    doInit : function(component, event, helper) {
        console.log('inside');
        var action = component.get("c.getMembers");
        //action.setparm
        action.setCallback(this,function(response){
            if (response.getState() === "SUCCESS"){
                 console.log('success');
                component.set("v.memberDetails",response.getReturnValue());
            }
            else
            {
                alert('Error');
            }
        });
        $A.enqueueAction(action);
    },
    handleSuccess: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    }
})