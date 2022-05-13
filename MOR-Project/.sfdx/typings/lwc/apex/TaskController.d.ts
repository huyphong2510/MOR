declare module "@salesforce/apex/TaskController.deleteTask" {
  export default function deleteTask(param: {delid: any}): Promise<any>;
}
declare module "@salesforce/apex/TaskController.fetchTask" {
  export default function fetchTask(param: {searchKeyWord: any, pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/TaskController.searchTasks" {
  export default function searchTasks(param: {searchTerm: any, pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/TaskController.filterTasks" {
  export default function filterTasks(param: {option: any, pageSize: any, pageNumber: any}): Promise<any>;
}
