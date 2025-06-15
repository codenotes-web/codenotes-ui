<script setup lang="ts">
import { AssertionError } from '@/core/errors/assertion-error'
import { nextTick, ref, useTemplateRef } from 'vue'
/**
 * TODO
 * 1. Fix scrolling - overflow-y-scroll у дисплея можно убрать
 * 2. Вынести в отдельный css layer
 * 3. Посмотреть как можно оптимизировать синк при скролле
 */

type CodeAction = 'tabulation'

const syncedClasses = 'p-2 whitespace-pre'

const inputValue = ref('')
const displayedCodeRef = useTemplateRef<HTMLDivElement>('displayedCode')
const inputCodeRef = useTemplateRef<HTMLDivElement>('inputCode')

function assertRefElement<T extends HTMLElement>(
  element: unknown, ctor: new(...args: any[]) => T
): asserts element is T {
  if (!(element instanceof ctor)) {
    throw new AssertionError(`The element is not ${ ctor.name }`)
  }
}

const handleInput = (event: Event) => {
  assertRefElement(displayedCodeRef.value, HTMLDivElement)
  assertRefElement(inputCodeRef.value, HTMLTextAreaElement)

  const inputEvent = event as InputEvent
  let currentValue = inputCodeRef.value.value

  const cursorPosition = inputCodeRef.value.selectionEnd

  // fixes double space dot appearance
  if (inputEvent.data === '. ') {
    const dotLocationIdx = cursorPosition - 2
    currentValue = `${ currentValue.substring(0, dotLocationIdx) }  ${ currentValue.substring(cursorPosition + 1) }`
  }

  inputValue.value = currentValue
  displayedCodeRef.value.innerText = currentValue

  if (currentValue.endsWith('\n') && !inputEvent.data) {
    displayedCodeRef.value.appendChild(document.createElement('br'))
  }
}

const handleAction = (action: CodeAction) => {
  assertRefElement(displayedCodeRef.value, HTMLDivElement)
  assertRefElement(inputCodeRef.value, HTMLTextAreaElement)

  switch (action) {
    case 'tabulation': {
      let currentValue = inputCodeRef.value.value
      const cursorPosition = inputCodeRef.value.selectionEnd
      currentValue = `${ currentValue.substring(0, cursorPosition) }  ${ currentValue.substring(cursorPosition) }`

      inputValue.value = currentValue
      displayedCodeRef.value.innerText = currentValue
      nextTick(() => {
        assertRefElement(inputCodeRef.value, HTMLTextAreaElement)
        const TAB_INDENT = 2
        inputCodeRef.value.setSelectionRange(cursorPosition + TAB_INDENT, cursorPosition + TAB_INDENT)
      })
    }
  }
}

const handleScroll = () => {
  assertRefElement(displayedCodeRef.value, HTMLDivElement)
  assertRefElement(inputCodeRef.value, HTMLTextAreaElement)

  displayedCodeRef.value.scrollTop = inputCodeRef.value.scrollTop
}
</script>

<template>
  <div class="relative h-full font-['Consolas',_monospace]">
    <textarea
      ref="inputCode"
      :value="inputValue"
      :class="syncedClasses"
      @input="handleInput"
      @keydown.tab.prevent="handleAction('tabulation')"
      @scroll="handleScroll"
      class="editor-textarea absolute left-0 right-0 caret-slate-700 z-10 resize-none w-full h-full"
    >
    </textarea>
    <div ref="displayedCode" :class="syncedClasses" class="overflow-y-scroll h-full"></div>
  </div>
</template>

<style scoped>
</style>
