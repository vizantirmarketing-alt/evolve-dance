import { StructureBuilder } from 'sanity/structure'

const singletonTypes = new Set(['projectGallery'])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Project Gallery')
        .id('projectGallery')
        .child(
          S.document()
            .schemaType('projectGallery')
            .documentId('projectGallery'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string),
      ),
    ])
