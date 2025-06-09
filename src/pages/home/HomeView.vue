<script setup lang="ts">
import CodeArea from '@components/CodeArea/CodeArea.vue'


</script>

<template>
<div class="flex flex-col h-screen">
  <!-- Fixed header -->
  <header class="h-16 border-b flex-none">
    Header content
  </header>

  <!-- Main content area (will scroll) -->
  <div class="flex flex-1 min-h-0 overflow-auto">
    <!-- Fixed sidebar -->
    <aside class="w-64 border-r flex-none">
      Sidebar content
    </aside>

    <!-- Editor and results area -->
    <div class="flex-1 flex flex-col min-h-0">
      <!-- Code editor (scrollable if needed) -->
      <div class="flex-1 border-b overflow-auto">
        <CodeArea />
      </div>

      <!-- Results (scrollable if needed) -->
      <div class="flex-1 overflow-auto">
      </div>
    </div>
  </div>

  <!-- Fixed footer -->
  <footer class="h-8 border-t flex-none">
    Footer content
  </footer>
</div>
</template>

<style scoped></style>
