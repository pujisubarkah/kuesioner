<template>
  <div style="margin-bottom: 2rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">
        Kemajuan Pengisian Kuesioner
      </span>
      <span style="font-size: 0.85rem; font-weight: 800; color: var(--primary);">
        Bagian {{ currentIndex + 1 }} dari {{ totalSections }} ({{ progressPercent }}%)
      </span>
    </div>

    <!-- Stepper Lines -->
    <div class="stepper-bar">
      <div 
        v-for="(sec, idx) in sections" 
        :key="sec.id" 
        class="stepper-item"
        :class="{
          active: idx === currentIndex,
          completed: idx < currentIndex
        }"
        @click="$emit('jump', idx)"
        :title="`Bagian ${sec.code}: ${sec.title}`"
      >
        <div class="stepper-line"></div>
        <div class="stepper-title">Bagian {{ sec.code }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuestionSection } from '~/data/questions-data';

defineProps<{
  sections: QuestionSection[];
  currentIndex: number;
  totalSections: number;
  progressPercent: number;
}>();

defineEmits<{
  (e: 'jump', index: number): void;
}>();
</script>
