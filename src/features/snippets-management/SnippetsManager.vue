<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { mockSnippets } from './mocks'
import AddSnippet from './add-snippet/AddSnippet.vue'

const links = ref(mockSnippets)

const route = useRoute()
</script>

<template>
  <nav class="h-full bg-slate-50 flex flex-col py-4 px-2 space-y-2">
    <div class="mb-6 text-xs px-2 flex items-center justify-between">
      <span class="font-bold text-gray-400">Your workspace</span>
      <AddSnippet />
    </div>
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="`/snippet/${link.id}`"
      class="block rounded px-2 py-1 text-sm transition-all duration-100 text-gray-600 hover:bg-gray-200 hover:text-teal-600"
      :class="{ 'bg-gray-100 text-teal-700 font-semibold': route.path === `/snippet/${link.id}` }"
    >
      {{ link.name }}
    </router-link>
    <div class="flex-1"></div>
  </nav>
</template>
