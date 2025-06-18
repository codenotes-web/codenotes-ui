<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/core/ui/resizable'

</script>

<template>
<div class="flex flex-col h-screen">
  <slot name="header"></slot>
  <div class="flex flex-1 min-h-0 overflow-auto">
    <aside class="w-64 border-r flex-none">
      <slot name="sidebar"></slot>
    </aside>

    <div class="flex-1 flex flex-col min-h-0">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <slot name="upper-area"></slot>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <slot name="bottom-area"></slot>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </div>

  <footer class="h-8 border-t flex-none">
    <slot name="footer"></slot>
  </footer>
</div>
</template>

<style scoped></style>
