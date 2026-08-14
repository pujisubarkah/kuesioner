<template>
  <div>
    <div v-if="maxSelections" style="font-size: 0.8rem; font-weight: 700; color: var(--accent); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      Terpilih: {{ selectedItems.length }} / Maksimal {{ maxSelections }} pilihan
    </div>

    <div class="options-grid">
      <label 
        v-for="opt in options" 
        :key="opt"
        class="option-card"
        :class="{ 
          selected: isSelected(opt),
          disabled: !isSelected(opt) && isMaxReached
        }"
      >
        <input 
          type="checkbox" 
          :value="opt"
          :checked="isSelected(opt)"
          :disabled="!isSelected(opt) && isMaxReached"
          @change="toggleOption(opt)"
        />
        <span class="option-label">{{ opt }}</span>
      </label>

      <!-- Other option if allowed -->
      <label 
        v-if="hasOther"
        class="option-card"
        :class="{ 
          selected: isOtherSelected,
          disabled: !isOtherSelected && isMaxReached
        }"
      >
        <input 
          type="checkbox"
          :checked="isOtherSelected"
          :disabled="!isOtherSelected && isMaxReached"
          @change="toggleOther"
        />
        <span class="option-label">Lainnya</span>
      </label>
    </div>

    <!-- Custom other input field -->
    <div v-if="hasOther && isOtherSelected" style="margin-top: 0.75rem;">
      <input 
        type="text" 
        class="form-control"
        placeholder="Sebutkan opsi lainnya..."
        :value="otherValue"
        @input="$emit('update:otherValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  options: string[];
  modelValue?: string[];
  maxSelections?: number;
  hasOther?: boolean;
  otherValue?: string;
}>(), {
  modelValue: () => []
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void;
  (e: 'update:otherValue', val: string): void;
}>();

const selectedItems = computed(() => props.modelValue || []);

const isOtherSelected = computed(() => selectedItems.value.includes('Lainnya'));

const isMaxReached = computed(() => {
  if (!props.maxSelections) return false;
  return selectedItems.value.length >= props.maxSelections;
});

const isSelected = (opt: string) => selectedItems.value.includes(opt);

const toggleOption = (opt: string) => {
  const current = [...selectedItems.value];
  const idx = current.indexOf(opt);
  if (idx > -1) {
    current.splice(idx, 1);
  } else {
    if (props.maxSelections && current.length >= props.maxSelections) {
      return; // prevent exceeding max
    }
    current.push(opt);
  }
  emit('update:modelValue', current);
};

const toggleOther = () => {
  toggleOption('Lainnya');
};
</script>
