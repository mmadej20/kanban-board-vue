export enum StatusType {
  Canceled = 0,
  New = 1,
  ToDo = 2,
  InProgress = 3,
  OnHold = 4,
  Completed = 5,
}
export const StatusTypes: StatusType[] = [
  StatusType.Canceled,
  StatusType.New,
  StatusType.ToDo,
  StatusType.InProgress,
  StatusType.OnHold,
  StatusType.Completed,
]
export const StatusTypeLabel: Record<StatusType, string> = {
  [StatusType.Canceled]: 'Canceled',
  [StatusType.New]: 'New',
  [StatusType.ToDo]: 'To Do',
  [StatusType.InProgress]: 'In Progress',
  [StatusType.OnHold]: 'On Hold',
  [StatusType.Completed]: 'Completed',
}
