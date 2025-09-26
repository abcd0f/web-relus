<script setup lang="ts">
import { ref, computed } from 'vue';
import SourceCode from './source-code.vue';

interface Props {
  source: string;
  path: string;
  rawSource: string;
  description: string;
}
const props = withDefaults(defineProps<Props>(), { source: '', path: '', rawSource: '', description: '' });

const isVisible = ref(false);

const decodedDescription = computed(() => decodeURIComponent(props.description));

const handleOpen = () => {
  isVisible.value = !isVisible.value;
};

const handleCopy = () => {
  navigator.clipboard.writeText(decodeURIComponent(props.rawSource));
};

const handleClose = () => {
  isVisible.value = false;
};
</script>

<template>
  <div v-html="decodedDescription" />

  <div class="example">
    <div class="example-showcase">
      <slot name="source" />
    </div>

    <div class="divider"></div>

    <div class="btns">
      <div class="btns-item" title="复制代码" @click="handleCopy">
        <svg
          t="1757396721744"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1525"
          width="20"
          height="20"
        >
          <path
            d="M624.5 786.3c92.9 0 168.2-75.3 168.2-168.2V309c0-92.4-75.3-168.2-168.2-168.2H303.6c-92.4 0-168.2 75.3-168.2 168.2v309.1c0 92.4 75.3 168.2 168.2 168.2h320.9zM178.2 618.1V309c0-69.4 56.1-125.5 125.5-125.5h320.9c69.4 0 125.5 56.1 125.5 125.5v309.1c0 69.4-56.1 125.5-125.5 125.5h-321c-69.4 0-125.4-56.1-125.4-125.5z"
            p-id="1526"
          ></path>
          <path
            d="M849.8 295.1v361.5c0 102.7-83.6 186.3-186.3 186.3H279.1v42.7h384.4c126.3 0 229.1-102.8 229.1-229.1V295.1h-42.8zM307.9 361.8h312.3c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.9 9.6 21.4 21.4 21.4zM307.9 484.6h312.3c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.9 9.6 21.4 21.4 21.4z"
            p-id="1527"
          ></path>
          <path
            d="M620.2 607.4c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-21.4-21.4-21.4H307.9c-11.8 0-21.4 9.6-21.4 21.4 0 11.8 9.6 21.4 21.4 21.4h312.3z"
            p-id="1528"
          ></path>
        </svg>
      </div>

      <div class="btns-item" title="显示代码" @click="handleOpen">
        <svg
          t="1757396966102"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1309"
          width="20"
          height="20"
        >
          <path
            d="M513.7 659.6c-32.3 0-62.6-12.6-85.4-35.4L201.7 397l30.2-30.2L458.6 594c14.7 14.8 34.3 22.9 55.1 22.9h0.1c20.8 0 40.4-8.1 55.1-22.8l227.3-227.3 30.2 30.2L599 624.3c-22.8 22.7-53.1 35.3-85.3 35.3z"
            p-id="1310"
          ></path>
        </svg>
      </div>
    </div>

    <SourceCode :visible="isVisible" :source="source" />

    <div class="close" v-show="isVisible">
      <div class="close-text" @click="handleClose">
        <svg
          t="1757397347449"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="12669"
          width="26"
          height="26"
        >
          <path
            d="M698.624 582.496c10.624 14.08 5.056 25.504-12.736 25.504H337.984c-17.664 0-23.328-11.296-12.448-25.504l168.512-220.032c10.784-14.08 28.288-13.856 38.72 0l165.856 220.032z"
            p-id="12670"
          ></path>
        </svg>

        隐藏代码
      </div>
    </div>
  </div>
</template>

<style scoped>
.example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.example .example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  overflow: auto;
}

.example .btns {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
}

.example .btns .btns-item {
  margin-left: 0.5rem;
  cursor: pointer;
}

.icon {
  fill: var(--vp-c-text-3);
}

.icon:hover {
  fill: var(--vp-c-text-2);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.close {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.close-text {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close-text:hover {
  color: var(--vp-c-text-2);
}

.close-text:hover .icon {
  fill: var(--vp-c-text-2);
}
</style>
