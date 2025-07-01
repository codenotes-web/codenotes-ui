import { defineStore } from 'pinia'
import type { Snippet } from '@/core/types/snippets'
import { localRepository } from '@/core/api/indexedDB/repository'

/*
* Список сортируется после обновления - разобраться
**/

export const useSnippetsStore = defineStore('snippets', {
  state: (): { snippets: Snippet[]; } => ({
    snippets: []
  }),
  actions: {
    async initAllSnippets() {
      this.snippets = await localRepository.getAllSnippets()
    },
    addSnippet(snippet: Snippet) {
      this.snippets.push(snippet)
      localRepository.addSnippet(snippet)
    }
  }
})
