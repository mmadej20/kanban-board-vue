<script setup lang="ts">
import BoardsList from '@/components/BoardsList.vue'
import AddBoard from './components/AddBoard.vue'
import BoardContent from './components/BoardContent.vue'
</script>

<template>
  <div class="layout">
    <aside class="left-panel">
      <div class="boards-wrapper">
        <BoardsList />
      </div>

      <div class="bottom-section">
        <AddBoard />
      </div>
    </aside>

    <main class="content">
      <BoardContent />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #232428;
  border-right: 1px solid #2e2f33;
}

.content {
  flex: 1;
  min-width: 0;
  overflow: auto;
  padding: 16px;
}

.boards-wrapper {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
}

.bottom-section {
  margin-top: 16px;
}
</style>
