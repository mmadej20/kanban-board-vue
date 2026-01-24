import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getAllBoards,
  createBoard,
  deleteBoard,
  getBoardById,
  addBoardItem,
  removeItemFromBoard,
  changeBoardItemStatus,
} from '@/api/boards'
import type { Board } from '@/models/Board'
import type { StatusType } from '@/models/StatusType'
export const useBoardsStore = defineStore('boards', () => {
  const boards = ref<Board[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedId = ref<string | null>(null)
  const selectedBoard = computed(() => boards.value.find((b) => b.id === selectedId.value) ?? null)

  async function fetchBoards() {
    loading.value = true
    error.value = null
    try {
      boards.value = await getAllBoards()
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  function selectBoard(id: string) {
    selectedId.value = id
  }

  async function addBoard(name: string) {
    await createBoard({ name })
    await fetchBoards()
  }

  async function removeBoard(id: string) {
    await deleteBoard(id)
    boards.value = boards.value.filter((b) => b.id !== id)

    if (selectedId.value === id) {
      selectedId.value = null
    }
  }

  async function fetchBoardById(id: string) {
    loading.value = true
    error.value = null
    try {
      const board = await getBoardById(id)
      return board
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function addItemToBoard(payload: {
    boardId: string
    name: string
    description: string
    status: StatusType
  }) {
    const itemId = await addBoardItem(payload.boardId, payload.name, payload.description)

    await changeItemStatus(itemId, payload.status)

    const board = selectedBoard.value
    if (!board) return

    const newItem = {
      id: itemId,
      boardId: payload.boardId,
      assignedMemberId: '',
      name: payload.name,
      description: payload.description,
      status: payload.status,
    }
    board.boardItems = [...board.boardItems, newItem]
  }

  async function removeItem(itemId: string) {
    try {
      await removeItemFromBoard(itemId)
      const board = selectedBoard.value
      if (!board) return

      board.boardItems = board.boardItems.filter((item) => item.id !== itemId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      throw e
    }
  }

  async function changeItemStatus(itemId: string, status: StatusType) {
    try {
      await changeBoardItemStatus(itemId, status)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    }
  }

  return {
    boards,
    loading,
    error,
    selectedId,
    selectedBoard,
    fetchBoards,
    selectBoard,
    addBoard,
    removeBoard,
    fetchBoardById,
    addItemToBoard,
    removeItem,
    changeItemStatus,
  }
})
