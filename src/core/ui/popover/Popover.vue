<script setup lang="ts">
import { type ComponentPublicInstance, Teleport, ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

// добавить на будущее prop placement
// реализовать onClickOutside самому

const GAP = 2 // px

const triggerRef = ref<HTMLElement>()
const contentRef = useTemplateRef<HTMLDivElement>('content')

const isContentOpen = ref(false)

const handleTrigger = () => {

  const triggerRect = triggerRef.value!.getBoundingClientRect()

  contentRef.value!.style.top = `${ triggerRect.bottom + GAP }px`
  contentRef.value!.style.left = `${ triggerRect.right + GAP }px`

  isContentOpen.value = true
}

const closeContent = () => {
  isContentOpen.value = false
}

onClickOutside(contentRef, () => {
  closeContent()
})

const initTriggerRef = (el: Element | ComponentPublicInstance<unknown, unknown> | null) => {
  if (!el) {
    throw new Error('Trigger element is required')
  }
  if ('$el' in el) {
    triggerRef.value = el.$el
  }
  else if (el instanceof HTMLElement) {
    triggerRef.value = el
  }
}


</script>

<template>
  <slot
    name="trigger"
    :init-trigger-ref="initTriggerRef"
    :do-close="closeContent"
    :do-trigger="handleTrigger"
  ></slot>
  <Teleport to="#popovers">
    <div @keydown.esc.stop="closeContent" class="absolute z-50 bg-white rounded-md shadow-sx" ref="content">
      <slot
        :do-close="closeContent"
        v-if="isContentOpen"
        name="content"
      ></slot>
    </div>
  </Teleport>
</template>
