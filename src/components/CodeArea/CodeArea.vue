<script setup lang="ts">
import { AssertionError } from '@/core/errors/assertion-error'
import { ref, useTemplateRef } from 'vue'
/**
 * TODO
 * 1. Нужно продумать данные
 *  1.1 То что видит пользователь - элементы внутри корневого div - будут подсвечиваться конкретными цветами (классами)
 *  1.2 Чтоб понимать, какие элементы надо подсветить - нужен парсер
 * 2. Нужно разобраться с вводом элементов из ClipBoard - возможно проводить санитайзинг
 *  1.1 Нужно понимать, что является действительно тегами, а что нет (например let a = '<div>Я просто строка</div>')
 * 3. Продумать TAB чтобы был отступ
 * 4.
 */

type CodeAction = 'tabulation'

const inputValue = ref('')
const displayedCodeRef = useTemplateRef<HTMLDivElement>('displayedCode')

function assertRefDivElement(element: unknown): asserts element is HTMLDivElement {
  if (!(element instanceof HTMLDivElement)) {
    throw new AssertionError('The element is not div')
  }
}

const handleInput = (event: Event) => {
  assertRefDivElement(displayedCodeRef.value)
  const inputEvent = event as InputEvent
  inputValue.value = (inputEvent.target as HTMLTextAreaElement).value
  displayedCodeRef.value.innerText = inputValue.value
}

const handleAction = (action: CodeAction) => {
  if (displayedCodeRef.value) {
    switch (action) {
      case 'tabulation':
        displayedCodeRef.value.innerText += '  '
    }
  }
}

const syncedClasses = 'p-2'

</script>

<template>
  <div class="relative h-full font-['Consolas',_monospace]">
    <textarea
      class="editor-textarea absolute left-0 right-0 text-transparent caret-slate-700 z-10 resize-none w-full h-full"
      :class="syncedClasses"
      @input="handleInput"
      :value="inputValue"
      @keydown.tab.prevent="handleAction('tabulation')"
    >
    </textarea>
    <div ref="displayedCode" :class="syncedClasses"></div>
  </div>
</template>

<style scoped>
</style>
