import { BaseService } from './base.service'

export interface Section {
  id: string
  title: string
  contentId: string
  tags: string[]
}

export class SectionsService extends BaseService {
  constructor() {
    super('/section')
  }

  async getSectionById(id: string) {
    return this.get<Section>(`/${ id }`)
  }
  async getAll() {
    return this.get<Section[]>('/all')
  }
}

export const sectionsService = new SectionsService()
