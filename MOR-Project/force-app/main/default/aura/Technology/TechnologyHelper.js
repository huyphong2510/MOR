({
    handleSearch: function (component, searchTerm, page) {
        var action = component.get("c.searchTechs");
        action.setParams({
            searchTerm: searchTerm,
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

})