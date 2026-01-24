<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardsStore } from '@/stores/boards'

const boardsStore = useBoardsStore()
const { boards, selectedId } = storeToRefs(boardsStore)

onMounted(() => boardsStore.fetchBoards())
</script>

<template>
  <ul class="boards-list">
    <li
      v-for="board in boards"
      :key="board.id"
      :class="{ selected: selectedId === board.id }"
      @click="boardsStore.selectBoard(board.id)"
    >
      <div class="boards-list-item">
        {{ board.name }}
        <p>
          <button @click.stop="boardsStore.removeBoard(board.id)">X</button>
        </p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.boards-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 400px;
}

.boards-list li {
  background: #2c2f33;
  color: #e4e4e4;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.15s ease;
}

.boards-list li:hover {
  background: #3b4a6a;
  transform: translateY(-2px);
}

.boards-list li.selected {
  background: #4a65a3;
  color: white;
}

.boards-list button {
  background: transparent;
  border: none;
  color: #e4e4e4;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
}
.boards-list button:hover {
  color: #ff4d4d;
}

.boards-list-item {
  grid-auto-flow: column;
  display: grid;
  justify-content: space-between;
  align-items: center;
}
</style>
