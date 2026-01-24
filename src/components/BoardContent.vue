<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { computed, ref } from 'vue'
import { useBoardsStore } from '@/stores/boards'
import { StatusType, StatusTypes, StatusTypeLabel } from '@/models/StatusType'
import BoardItemCreator from './BoardItemCreator.vue'
import type { BoardItem } from '@/models/BoardItem'

const boardsStore = useBoardsStore()
const board = computed(() => boardsStore.selectedBoard)
const isCreatorOpen = ref(false)
const creatorStatus = ref<StatusType>(StatusType.New)
const creatorBoardId = ref('')

const columns = computed<Record<StatusType, BoardItem[]>>(() => {
  const result = {} as Record<StatusType, BoardItem[]>
  for (const st of StatusTypes) {
    result[st] = []
  }

  for (const item of board.value?.boardItems ?? []) {
    result[item.status].push(item)
  }

  return result
})

async function handleCreateItem(name: string, description: string) {
  await boardsStore.addItemToBoard({
    boardId: creatorBoardId.value,
    status: creatorStatus.value,
    name,
    description,
  })

  isCreatorOpen.value = false
}

async function removeBoardItem(itemId: string) {
  await boardsStore.removeItem(itemId)
}

function onDragChange(event: { added?: { element: BoardItem } }, status: StatusType) {
  if (!event.added) {
    return
  }
  boardsStore.changeItemStatus(event.added.element.id, status)
}

function openCreator(status: StatusType, boardId: string) {
  creatorStatus.value = status
  creatorBoardId.value = boardId
  isCreatorOpen.value = true
}
</script>

<template>
  <h3>{{ board?.name }}</h3>
  <div class="kanban-columns" v-if="board">
    <div v-for="status in StatusTypes" :key="status" class="kanban-column">
      <h3 :class="'status-' + status">
        {{ StatusTypeLabel[status] }}
      </h3>
      <button class="add-button" @click="openCreator(status, board?.id)">Add new item</button>
      <div class="kanban-items">
        <draggable
          v-model="columns[status]"
          :group="{ name: 'kanban', pull: true, put: true }"
          item-key="id"
          :animation="150"
          class="kanban-draggable"
          @change="onDragChange($event, status)"
        >
          <div v-for="item in columns[status]" :key="item.id" class="kanban-item">
            {{ item.name }}
            <button class="remove-button" @click="removeBoardItem(item.id)">×</button>
          </div>
        </draggable>
      </div>
    </div>
  </div>

  <div v-else>
    <h2>No board selected</h2>
  </div>

  <BoardItemCreator
    :is-open="isCreatorOpen"
    :status="creatorStatus"
    :board-id="creatorBoardId"
    @close="isCreatorOpen = false"
    @create="handleCreateItem"
  />
</template>

<style scoped>
.kanban-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 16px;
  padding: 16px 8px;
  height: calc(100vh - 80px);
  overflow-x: auto;
}

.kanban-column {
  background: #232428;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  border: 1px solid #2e2f33;
  min-height: 400px;
  height: 100%;
}

.kanban-column h3 {
  margin: 0 0 12px 0;
  padding: 10px;
  background: #2c2f33;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  color: #d8d8d8;
  text-align: center;
  letter-spacing: 0.4px;
  border: 1px solid #3a3d41;
}

.kanban-items {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.kanban-items .vue-draggable-next,
.kanban-draggable {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
  height: 100%;
  padding: 8px;
  align-items: stretch;
  background: transparent;
}

.kanban-item {
  background: #2c2f33;
  border: 1px solid #3a3d41;
  padding: 10px 12px;
  border-radius: 8px;
  color: #e4e4e4;
  font-size: 0.95rem;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
  cursor: pointer;
  align-self: stretch;
}

.kanban-item:hover {
  background: #3a3d41;
  transform: translateY(-2px);
}

.status-0 {
  background: #5b2727 !important;
}
.status-1 {
  background: #84a88e !important;
}
.status-2 {
  background: #94a533 !important;
}
.status-3 {
  background: #f08a04 !important;
}
.status-4 {
  background: #ff2600 !important;
}
.status-5 {
  background: #32b432 !important;
}

.add-button {
  margin-top: -8px;
  padding: 1px 8px;
  background: #1884ba;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 0.8rem;
  transition:
    background 0.2s ease,
    transform 0.1s ease;
}

.remove-button {
  float: right;
  background: transparent;
  border: none;
  color: #e04e4e;
  font-size: 1.2rem;
  line-height: 1rem;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  margin-top: 4px;
  transition: color 0.2s ease;
}
</style>
