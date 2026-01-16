<script setup lang="ts">
import { ref } from 'vue'
import { useBoardsStore } from '@/stores/boards'

const boardsStore = useBoardsStore()
const newName = ref('')

async function addBoard() {
  if (!newName.value.trim()) return
  await boardsStore.addBoard(newName.value)
  newName.value = ''
}
</script>

<template>
  <div class="add-board">
    <input v-model="newName" placeholder="New board name..." />
    <button @click="addBoard">Add</button>
  </div>
</template>

<style scoped>
.add-board {
  position: relative;
  width: 100%;
  margin-bottom: 16px;
}

.add-board input {
  width: 100%;
  padding: 10px 12px;
  padding-right: 80px;
  background: #2c2f33;
  border: 1px solid #3a3d41;
  border-radius: 10px;
  color: #e4e4e4;
  outline: none;
  transition:
    border 0.2s ease,
    background 0.2s ease;
}

.add-board input::placeholder {
  color: #9a9a9a;
}

.add-board input:focus {
  border-color: #4a65a3;
  background: #303338;
}

.add-board button {
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);

  padding: 8px 14px;
  background: #3b4a6a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.1s ease;
  overflow: hidden;
}

.add-board button:hover {
  background: #4a65a3;
}

.add-board button:active {
  transform: translateY(-50%) scale(0.97);
}

.add-board button:active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 120%;
  height: 120%;
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-50%) scale(0);
  border-radius: 50%;
  animation: flash 0.4s ease-out;
}

@keyframes flash {
  from {
    transform: translateX(-50%) scale(0);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) scale(1.5);
    opacity: 0;
  }
}
</style>
