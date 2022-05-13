declare module "@salesforce/apex/ProjectController.deleteProject" {
  export default function deleteProject(param: {delid: any}): Promise<any>;
}
declare module "@salesforce/apex/ProjectController.fetchProjects" {
  export default function fetchProjects(param: {pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/ProjectController.searchProjects" {
  export default function searchProjects(param: {searchTerm: any, pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/ProjectController.filterProjects" {
  export default function filterProjects(param: {option: any, pageSize: any, pageNumber: any}): Promise<any>;
}
