import type { Snippet } from '@/core/types/snippets'
import { SNIPPETS_OBJECT_STORE, localDB } from '../client'

const addSnippet = (snippet: Snippet) => {
  return localDB.addToObjectStore(SNIPPETS_OBJECT_STORE, snippet)
}

const addSnippets = (snippets: Snippet[]) => {
  return localDB.addToObjectStore(SNIPPETS_OBJECT_STORE, snippets)
}

const getSnippetById = (id: Snippet['id']) => {
  return localDB.getFromObjectStore<Snippet>(SNIPPETS_OBJECT_STORE, id)
}

const getAllSnippets = () => {
  return localDB.getAllGromObjectStore<Snippet>(SNIPPETS_OBJECT_STORE)
}

export const localRepository = {
  addSnippets,
  addSnippet,
  getSnippetById,
  getAllSnippets
}
