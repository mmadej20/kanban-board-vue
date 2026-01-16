import type { Board } from '@/models/Board'
import { http } from './http'

export async function getAllBoards() {
  return http.get<Board[]>('/boards/all').then((r) => r.data)
}

export async function createBoard(board: { name: string }) {
  const res = await http.post('/boards/create', board)
  return res.data
}

export async function getBoardById(id: string) {
  const res = await http.get(`/boards/${id}`)
  return res.data as Board
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

export async function changeBoardItemStatus(boardItemId: string, status: number) {
  const res = await http.put(`/boardItems/${boardItemId}/status`, { status })
  return res.data
}
