({
    handleSearch: function (component, searchTerm, page) {
        var action = component.get("c.searchMembers");
        var pageSize = component.get("v.pageSize");
        var pageNumber = component.get("v.pageNumber");
        console.log(pageSize);
        action.setParams({
            searchTerm: searchTerm,
            pageSize : pageSize,
            pageNumber :pageNumber
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
    getMembers: function (component, helper) {
        var action = component.get("c.fetchMembers");
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
                if (resultData.totalPage < component.get("v.pageSize")) {
                    component.set("v.isLastPage", true);
                }
                else {
                    component.set("v.isLastPage", false);
                }
                component.set("v.dataSize", resultData.length);
                component.set("v.searchResult", resultData);
                component.set("v.paginationList", resultData);
                component.set("v.totalPage", totalPage);

            }

        });

        $A.enqueueAction(action);
    },
})