<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AddSnippet from './add-snippet/AddSnippet.vue'
import { useSnippetsStore } from '@/store/snippets'
import { computed, onBeforeMount } from 'vue'

const route = useRoute()
const router = useRouter()

const snippetsStore = useSnippetsStore()

const snippets = computed(() => snippetsStore.snippets)

onBeforeMount(async () => {
  await snippetsStore.initAllSnippets()
})

const handleNewSnippet = (name: string) => {
  const id = Date.now().toString()
  snippetsStore.addSnippet({
    id,
    name,
    code: ''
  })
  router.push(`/snippet/${ id }`)
}

</script>

<template>
  <nav class="h-full bg-slate-50 flex flex-col py-4 px-2 space-y-2">
    <div class="mb-6 text-xs px-2 flex items-center justify-between">
      <span class="font-bold text-gray-400">Your workspace</span>
      <AddSnippet @new-snippet="handleNewSnippet" />
    </div>
    <router-link
      v-for="snippet in snippets"
      :key="snippet.id"
      :to="`/snippet/${snippet.id}`"
      class="block rounded px-2 py-1 text-sm transition-all duration-100 text-gray-600 hover:bg-gray-200 hover:text-teal-600"
      :class="{ 'bg-gray-100 text-teal-700 font-semibold': route.path === `/snippet/${snippet.id}` }"
    >
      {{ snippet.name }}
    </router-link>
    <div class="flex-1"></div>
  </nav>
</template>
