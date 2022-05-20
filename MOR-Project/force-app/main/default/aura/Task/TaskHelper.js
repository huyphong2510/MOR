({
    handleSearch: function (component, searchTerm, page) {
        var pageSize = component.get("v.pageSize");
        var pageNumber = component.get("v.pageNumber");
        var action = component.get("c.searchTasks");
        action.setParams({
            searchTerm: searchTerm,
            pageSize : pageSize,
            pageNumber :pageNumber
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                component.set("v.tasktList", resultData);   
            }
        });
        $A.enqueueAction(action);
    },

    getTasks: function (component, helper) {
        var action = component.get("c.fetchTask");
        var pageSize = component.get("v.pageSize");
        var totalPage = component.get("v.totalPage");
        var pageNumber = component.get("v.pageNumber");
        action.setParams({
            pageSize: pageSize,
            pageNumber: pageNumber,
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log(resultData);
                if (resultData.totalPage < component.get("v.pageSize")) {
                    component.set("v.isLastPage", true);
                }
                else {
                    component.set("v.isLastPage", false);
                }
                component.set("v.dataSize", resultData.length);
                component.set("v.searchResult", resultData);
                component.set("v.tasktList", resultData);
                component.set("v.taskDetails", resultData);
                component.set("v.totalPage", totalPage);

            }

        });

        $A.enqueueAction(action);
    },




})