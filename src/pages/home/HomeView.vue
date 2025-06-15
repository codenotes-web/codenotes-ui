<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import CodeArea from '@components/CodeArea/CodeArea.vue'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'

</script>

<template>
<div class="flex flex-col h-screen">
  <Header />

  <!-- Main content area (will scroll) -->
  <div class="flex flex-1 min-h-0 overflow-auto">
    <!-- Fixed sidebar -->
    <aside class="w-64 border-r flex-none">
      Sidebar content
    </aside>

    <div class="flex-1 flex flex-col min-h-0">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <CodeArea />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel />
      </ResizablePanelGroup>
    </div>
  </div>

  <footer class="h-8 border-t flex-none">
  </footer>
</div>
</template>

<style scoped></style>
