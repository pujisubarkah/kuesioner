<template>
  <div class="likert-container">
    <div class="likert-grid">
      <button 
        v-for="item in labels" 
        :key="item.value"
        type="button"
        class="likert-btn"
        :class="{ selected: modelValue === item.value }"
        @click="$emit('update:modelValue', item.value)"
      >
        <span class="likert-number">{{ item.value }}</span>
        <span class="likert-text">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LIKERT_5_LABELS, FREQUENCY_5_LABELS } from '~/data/questions-data';

const props = withDefaults(defineProps<{
  modelValue?: number;
  type?: 'agree' | 'frequency';
}>(), {
  type: 'agree'
});

defineEmits<{
  (e: 'update:modelValue', val: number): void;
}>();

const labels = computed(() => {
  if (props.type === 'frequency') {
    return FREQUENCY_5_LABELS;
  }
  return LIKERT_5_LABELS;
});
</script>
