import { defineStore } from 'pinia'
import { mockSnippets } from './mocks'
import type { Snippet } from './types'

export const useSnippetsStore = defineStore('snippets', {
  state: (): { snippets: Snippet[]; } => ({
    snippets: mockSnippets
  }),
  actions: {
    addSnippet(snippet: Snippet) {
      this.snippets.push(snippet)
    }
  }
})
