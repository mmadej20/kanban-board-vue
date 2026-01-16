<script setup lang="ts">
import { onMounted } from 'vue'
import { useBoardsStore } from '@/stores/boards'

const boardsStore = useBoardsStore()

onMounted(() => boardsStore.fetchBoards())

function selectBoard(id: string) {
  boardsStore.selectBoard(id)
}
function removeBoard(id: string) {
  boardsStore.removeBoard(id)
}
</script>

<template>
  <ul class="boards-list">
    <li
      v-for="b in boardsStore.boards"
      :key="b.id"
      :class="{ selected: boardsStore.selectedId === b.id }"
      @click="selectBoard(b.id)"
    >
      <div class="boards-list-item">
        {{ b.name }}
        <p>
          <button @click.stop="removeBoard(b.id)">X</button>
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
