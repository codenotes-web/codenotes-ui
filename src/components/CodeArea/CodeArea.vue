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
  let inputElValue = (inputEvent.target as HTMLTextAreaElement).value

  const inputInitialSelectionEnd = inputCodeRef.value.selectionStart

  // fixes double space dot appearance
  if (inputEvent.data === '. ') {
    const dotLocationIdx = inputInitialSelectionEnd - 2
    inputElValue = `${ inputElValue.substring(0, dotLocationIdx) }  ${ inputElValue.substring(inputInitialSelectionEnd + 1) }`
  }

  inputValue.value = inputElValue
  inputCodeRef.value.value = inputElValue
  displayedCodeRef.value.innerText = inputElValue
}

const handleAction = (action: CodeAction) => {
  // if (displayedCodeRef.value) {
  //   switch (action) {
  //     case 'tabulation':
  //       displayedCodeRef.value.innerText += '  '
  //   }
  // }
}

const syncedClasses = 'p-2 whitespace-pre'

</script>

<template>
  <div class="relative h-full font-['Consolas',_monospace]">
    <textarea
      ref="inputCode"
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
