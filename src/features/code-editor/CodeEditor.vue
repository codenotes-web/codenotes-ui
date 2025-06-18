<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CodeArea from './code-area/CodeArea.vue'
import WelcomeArea from './welcome-area/WelcomeArea.vue'
/**
TODO:
- Нужно смотреть на айди сниппета в роутере и запрашивать соответсвующий сниппет с бека
- Если сниппета нет, айдишка пустая, то показываем create snippet
*/

const route = useRoute()
const snippetId = route.params.id

const isSnippetIdEmpty = computed(() => !snippetId)


</script>

<template>
    <WelcomeArea v-if="isSnippetIdEmpty" />
    <CodeArea v-else />
</template>
