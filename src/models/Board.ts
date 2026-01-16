import type { BoardItem } from './BoardItem'
import type { Member } from './Member'

export interface Board {
  id: string
  name: string
  boardItems: BoardItem[]
  members: Member[]
}
