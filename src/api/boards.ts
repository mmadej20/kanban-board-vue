import type { Board } from '@/models/Board'
import { http } from './http'
import type { StatusType } from '@/models/StatusType'

export async function getAllBoards(): Promise<Board[]> {
  const res = await http.get<Board[]>('/boards/all')
  return res.data
}

// Add responseDTO type instead returning untyped data
export async function createBoard(board: { name: string }) {
  const res = await http.post('/boards/create', board)
  return res.data
}

export async function getBoardById(id: string): Promise<Board> {
  const res = await http.get<Board>(`/boards/${id}`)
  return res.data
}

export async function deleteBoard(id: string) {
  const res = await http.delete(`/boards/${id}`)
  return res.data
}

export async function addBoardItem(id: string, name: string, description: string) {
  const res = await http.post(`/boards/createItem`, {
    boardId: id,
    name: name,
    description: description,
  })
  return res.data.item
}

export async function removeItemFromBoard(boardItemId: string) {
  const res = await http.delete(`/boardItems/${boardItemId}`)
  return res.data
}

export async function changeBoardItemStatus(boardItemId: string, status: StatusType) {
  const res = await http.put(`/boardItems/${boardItemId}/status`, { status })
  return res.data
}
