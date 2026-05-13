import type { SchemaTypeDefinition } from 'sanity'

import { event } from './event'
import { faq } from './faq'
import { faculty } from './faculty'

export const schemaTypes: SchemaTypeDefinition[] = [faq, faculty, event]
