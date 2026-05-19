import type { SchemaTypeDefinition } from 'sanity'

import { blogPost } from './blogPost'
import { category } from './category'
import { event } from './event'
import { faq } from './faq'
import { faculty } from './faculty'
import { studioHours } from './studioHours'
import { theProject } from './theProject'

export const schemaTypes: SchemaTypeDefinition[] = [
  faq,
  faculty,
  event,
  theProject,
  studioHours,
  blogPost,
  category,
]
