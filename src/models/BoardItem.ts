import type { StatusType } from './StatusType'

export interface BoardItem {
  id: string
  boardId: string
  assignedMemberId: string
  name: string
  description: string
  status: StatusType
}
