<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { StatusType } from '@/models/StatusType'

interface Props {
  isOpen: boolean
  status: StatusType
  boardId: string
}

interface Emits {
  (e: 'close'): void
  (e: 'create', name: string, description: string): void
}

const props = defineProps<Props>()
const name = ref('')
const description = ref('')
const emit = defineEmits<Emits>()
const isNameValid = computed(() => name.value.trim().length > 0)

function handleCreate() {
  if (name.value.trim()) {
    emit('create', name.value, description.value)
    resetForm()
  }
}

function handleClose() {
  resetForm()
  emit('close')
}

function resetForm() {
  name.value = ''
  description.value = ''
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) resetForm()
  },
)
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create New Item</h2>
        <button class="close-button" @click="handleClose">×</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label for="item-name">Item Name</label>
          <input
            id="item-name"
            v-model="name"
            type="text"
            placeholder="Enter item name"
            @keyup.enter="handleCreate"
          />
        </div>

        <div class="form-group">
          <label for="item-description">Description</label>
          <textarea
            id="item-description"
            v-model="description"
            placeholder="Enter item description"
            rows="4"
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" @click="handleClose">Cancel</button>
        <button class="btn-create" :disabled="!isNameValid" @click="handleCreate">Create</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #232428;
  border-radius: 12px;
  border: 1px solid #3a3d41;
  width: 90%;
  max-width: 60vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #3a3d41;
}

.modal-header h2 {
  margin: 0;
  color: #e4e4e4;
  font-size: 1.25rem;
}

.close-button {
  background: transparent;
  border: none;
  color: #e4e4e4;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #e04e4e;
}

.modal-body {
  padding: 16px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #d8d8d8;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  background: #2c2f33;
  border: 1px solid #3a3d41;
  border-radius: 6px;
  color: #e4e4e4;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: fit-content;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1884ba;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #3a3d41;
}

.btn-cancel,
.btn-create {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

.btn-cancel {
  background: #3a3d41;
  color: #e4e4e4;
}

.btn-cancel:hover {
  background: #474a4f;
}

.btn-create {
  background: #1884ba;
  color: white;
}

.btn-create:disabled {
  background: #555c66;
  cursor: not-allowed;
}

.btn-create:hover {
  background: #0d5a8f;
}
</style>
