declare module "@salesforce/apex/MemberController.fetchMembers" {
  export default function fetchMembers(param: {pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/MemberController.deleteMember" {
  export default function deleteMember(param: {delid: any}): Promise<any>;
}
declare module "@salesforce/apex/MemberController.searchMembers" {
  export default function searchMembers(param: {searchTerm: any, pageSize: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/MemberController.filterMembers" {
  export default function filterMembers(param: {option: any, pageSize: any, pageNumber: any}): Promise<any>;
}
