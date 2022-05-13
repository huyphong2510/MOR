declare module "@salesforce/apex/BoardController.getKanbanWrap" {
  export default function getKanbanWrap(param: {objName: any, objFields: any, kanbanField: any}): Promise<any>;
}
declare module "@salesforce/apex/BoardController.getUpdateStage" {
  export default function getUpdateStage(param: {recId: any, kanbanField: any, kanbanNewValue: any}): Promise<any>;
}
