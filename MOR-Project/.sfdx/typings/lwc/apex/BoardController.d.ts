declare module "@salesforce/apex/BoardController.getBoards" {
  export default function getBoards(param: {objName: any, objFields: any, kanbanField: any, projectID: any}): Promise<any>;
}
declare module "@salesforce/apex/BoardController.getUpdateStatus" {
  export default function getUpdateStatus(param: {recId: any, kanbanField: any, kanbanNewValue: any}): Promise<any>;
}
