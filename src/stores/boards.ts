/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import {
  getAllBoards,
  createBoard,
  deleteBoard,
  getBoardById,
  addBoardItem,
  changeBoardItemStatus,
} from '@/api/boards'
import type { Board } from '@/models/Board'
import type { StatusType } from '@/models/StatusType'
export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [] as Board[],
    loading: false as boolean,
    error: null as string | null,
    selectedId: null as string | null,
  }),
  actions: {
    async fetchBoards() {
      this.loading = true
      this.error = null
      try {
        this.boards = await getAllBoards()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    selectBoard(id: string) {
      this.selectedId = id
    },
    async addBoard(name: string) {
      await createBoard({ name })
      await this.fetchBoards()
    },
    async removeBoard(id: string) {
      await deleteBoard(id)
      this.boards = this.boards.filter((b) => b.id !== id)

      if (this.selectedId === id) {
        this.selectedId = null
      }
    },
    async getBoard(id: string) {
      this.loading = true
      this.error = null
      try {
        const board = await getBoardById(id)
        return board
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
    async addItemToBoard(boardId: string, name: string, description: string) {
      try {
        return await addBoardItem(boardId, name, description)
      } catch (error) {
        console.error('Failed to add item to board:', error)
      }
    },
    async changeItemStatus(itemId: string, status: StatusType) {
      try {
        await changeBoardItemStatus(itemId, status)
      } catch (error) {
        console.error('Failed to update item status:', error)
      }
    },
  },
})
