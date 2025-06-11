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
  let currentValue = inputCodeRef.value.value

  const cursorPosition = inputCodeRef.value.selectionEnd

  // fixes double space dot appearance
  if (inputEvent.data === '. ') {
    const dotLocationIdx = cursorPosition - 2
    currentValue = `${ currentValue.substring(0, dotLocationIdx) }  ${ currentValue.substring(cursorPosition + 1) }`
  }

  inputValue.value = currentValue
  displayedCodeRef.value.innerText = currentValue
}

const handleAction = (action: CodeAction) => {
  assertRefElement(displayedCodeRef.value, HTMLDivElement)
  assertRefElement(inputCodeRef.value, HTMLTextAreaElement)

  switch (action) {
    case 'tabulation': {
      let currentValue = inputCodeRef.value.value
      const cursorPosition = inputCodeRef.value.selectionEnd
      currentValue = `${ currentValue.substring(0, cursorPosition) }  ${ currentValue.substring(cursorPosition + 1) }`

      inputValue.value = currentValue
      displayedCodeRef.value.innerText = currentValue
    }
  }
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
