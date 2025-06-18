<script setup lang="ts">
import Header from '@/layouts/header/Header.vue'
import CodeArea from '@/features/code-editor/code-area/CodeArea.vue'
import ResizableSections from '@/layouts/resizable-sections/ResizableSections.vue'

</script>

<template>
  <ResizableSections>
    <template #header>
      <Header />
    </template>
    <template #sidebar>

    </template>
    <template #upper-area>
      <CodeArea />
    </template>

    <template #bottom-area>

    </template>
  </ResizableSections>
</template>

<style scoped></style>
