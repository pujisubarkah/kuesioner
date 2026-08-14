<template>
  <div>
    <!-- Desktop Table View (Hidden on mobile) -->
    <div class="matrix-table-wrapper desktop-matrix">
      <table class="matrix-table">
        <thead>
          <tr>
            <th>Aktivitas Sesi Zoom / Google Meet</th>
            <th v-for="(scale, idx) in scales" :key="scale">
              {{ scale }}
              <div style="font-size: 0.7rem; color: var(--text-light); font-weight: 500;">(Skala {{ idx + 1 }})</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item">
            <td>{{ item }}</td>
            <td v-for="(scale, idx) in scales" :key="idx">
              <input 
                type="radio" 
                class="matrix-radio"
                :name="`matrix_desk_${item}`"
                :value="idx + 1"
                :checked="getItemValue(item) === (idx + 1)"
                @change="setItemValue(item, idx + 1)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View (Shown on mobile screens) -->
    <div class="mobile-matrix">
      <div 
        v-for="item in items" 
        :key="item"
        class="mobile-matrix-card"
      >
        <div class="mobile-matrix-title">{{ item }}</div>
        <div class="mobile-matrix-pills">
          <button 
            v-for="(scale, idx) in scales" 
            :key="scale"
            type="button"
            class="mobile-matrix-pill"
            :class="{ active: getItemValue(item) === (idx + 1) }"
            @click="setItemValue(item, idx + 1)"
          >
            <span class="pill-num">{{ idx + 1 }}</span>
            <span class="pill-label">{{ scale }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  items: string[];
  scales: string[];
  modelValue?: Record<string, number>;
}>(), {
  modelValue: () => ({})
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, number>): void;
}>();

const getItemValue = (item: string) => {
  return props.modelValue?.[item] || 0;
};

const setItemValue = (item: string, val: number) => {
  const current = { ...(props.modelValue || {}) };
  current[item] = val;
  emit('update:modelValue', current);
};
</script>
