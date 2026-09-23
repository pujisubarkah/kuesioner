<template>
  <div v-if="displayMode" class="math-formula-display" :class="{ 'has-rendered': isRendered }">
    <div v-html="renderedHtml" class="katex-container"></div>
    <button 
      v-if="copyable" 
      @click="copyLatex" 
      class="copy-latex-btn" 
      :title="copied ? 'Tersalin!' : 'Salin formula LaTeX'"
    >
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>{{ copied ? 'Tersalin' : 'LaTeX' }}</span>
    </button>
  </div>
  <span v-else class="math-formula-inline" v-html="renderedHtml"></span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    formula: string;
    displayMode?: boolean;
    copyable?: boolean;
  }>(),
  {
    displayMode: true,
    copyable: true
  }
);

const copied = ref(false);
const isRendered = ref(false);

const renderedHtml = computed(() => {
  if (process.client && typeof (window as any).katex !== 'undefined') {
    try {
      return (window as any).katex.renderToString(props.formula, {
        displayMode: props.displayMode,
        throwOnError: false,
        trust: true
      });
    } catch (e) {
      return `<code class="math-fallback">${escapeHtml(props.formula)}</code>`;
    }
  }
  return `<code class="math-fallback">${escapeHtml(props.formula)}</code>`;
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function copyLatex() {
  try {
    await navigator.clipboard.writeText(props.formula);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy LaTeX', err);
  }
}

onMounted(() => {
  // If katex is not yet loaded, wait for script onload
  if (typeof (window as any).katex === 'undefined') {
    const interval = setInterval(() => {
      if (typeof (window as any).katex !== 'undefined') {
        isRendered.value = true;
        clearInterval(interval);
      }
    }, 150);
    setTimeout(() => clearInterval(interval), 4000);
  } else {
    isRendered.value = true;
  }
});
</script>

<style scoped>
.math-formula-display {
  position: relative;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1px solid #CBD5E1;
  border-radius: var(--radius-md, 8px);
  padding: 1.15rem 1.5rem;
  margin: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.math-formula-display:hover {
  border-color: #93C5FD;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(37, 99, 235, 0.06);
}

.katex-container {
  overflow-x: auto;
  padding: 0.25rem 0;
  font-size: 1.1rem;
  color: #0F172A;
  max-width: 100%;
}

.math-formula-inline {
  display: inline-block;
  vertical-align: middle;
  padding: 0 0.2rem;
  font-size: 1.05em;
  color: #0F172A;
}

.copy-latex-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: all 0.15s ease;
  opacity: 0.4;
}

.math-formula-display:hover .copy-latex-btn {
  opacity: 1;
}

.copy-latex-btn:hover {
  background: #FFFFFF;
  color: #2563EB;
  border-color: #93C5FD;
}

.math-fallback {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  color: #1E293B;
  background: transparent;
}
</style>
