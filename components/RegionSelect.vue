<template>
  <div style="display: flex; flex-direction: column; gap: 1.25rem; background: #fafcff; padding: 1.25rem; border-radius: var(--radius-md); border: 1.5px solid var(--border-color);">
    <div>
      <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
        1. Provinsi Tempat Bertugas <span class="required-star">*</span>
      </label>
      <select 
        class="form-control"
        :value="selectedProv"
        @change="onProvinceChange($event)"
      >
        <option value="">-- Pilih Provinsi --</option>
        <option v-for="prov in INDONESIA_PROVINCES" :key="prov.id" :value="prov.name">
          {{ prov.name }}
        </option>
      </select>
    </div>

    <div>
      <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.4rem;">
        2. Kabupaten / Kota Tempat Bertugas <span class="required-star">*</span>
      </label>
      <select 
        class="form-control"
        :value="selectedKab"
        @change="onKabupatenChange($event)"
        :disabled="!selectedProv"
      >
        <option value="">{{ selectedProv ? '-- Pilih Kabupaten / Kota --' : '-- Pilih Provinsi Terlebih Dahulu --' }}</option>
        <option v-for="reg in availableRegencies" :key="reg" :value="reg">
          {{ reg }}
        </option>
        <option value="Lainnya">Lainnya / Wilayah Baru</option>
      </select>
    </div>

    <div v-if="selectedKab === 'Lainnya'" style="margin-top: 0.25rem;">
      <label style="display: block; font-size: 0.825rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.3rem;">
        Tuliskan nama Kabupaten / Kota / Satuan Kerja:
      </label>
      <input 
        type="text" 
        class="form-control"
        placeholder="Contoh: Kabupaten Merauke / Satker Laut"
        :value="customKab"
        @input="onCustomKabInput($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { INDONESIA_PROVINCES } from '~/data/indonesia-regions';

const props = defineProps<{
  selectedProv: string;
  selectedKab: string;
  customKab?: string;
}>();

const emit = defineEmits<{
  (e: 'update:prov', val: string): void;
  (e: 'update:kab', val: string): void;
  (e: 'update:customKab', val: string): void;
}>();

const availableRegencies = computed(() => {
  if (!props.selectedProv) return [];
  const found = INDONESIA_PROVINCES.find(p => p.name === props.selectedProv);
  return found ? found.regencies : [];
});

const onProvinceChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:prov', target.value);
  emit('update:kab', '');
};

const onKabupatenChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:kab', target.value);
};

const onCustomKabInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:customKab', target.value);
};
</script>
