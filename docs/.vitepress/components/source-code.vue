<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  visible: boolean;
  source: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  source: ''
});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});
</script>

<template>
  <div v-show="visible" class="example-source-wrapper">
    <div class="example-source" v-html="decoded" />
  </div>
</template>

<style scoped>
:deep(.language-vue) {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
