<script setup lang="ts">
import Header from '@/layouts/header/Header.vue'
import CodeEditor from '@/features/code-editor/CodeEditor.vue'
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
      <CodeEditor />
    </template>

    <template #bottom-area>

    </template>
  </ResizableSections>
</template>

<style scoped></style>
