import { StructureBuilder } from 'sanity/structure'

const singletonTypes = new Set(['projectGallery', 'studioVideos'])

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
      S.listItem()
        .title('Studio Videos')
        .id('studioVideos')
        .child(
          S.document()
            .schemaType('studioVideos')
            .documentId('studioVideos'),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string),
      ),
    ])
