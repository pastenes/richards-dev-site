import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {tags} from 'sanity-plugin-tags-v4'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {AiFillCode} from 'react-icons/ai'
import {GrDocumentUser} from 'react-icons/gr'

import hero from './schemas/documents/hero'
import about from './schemas/documents/about'
import project from './schemas/documents/project'
import resume from './schemas/documents/resume'
import blockContent from './schemas/objects/blockContent'
import imageFile from './schemas/objects/image'
import links from './schemas/objects/links'
import education from './schemas/objects/education'
import experience from './schemas/objects/experience'
import achievment from './schemas/objects/achievment'

export default defineConfig({
  name: 'default',
  title: 'Dev Landing',

  projectId: 'lpvkp4xx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .schemaType('hero')
              .child(S.documentList().title('Hero Section').filter('_type == "hero"')),
            S.listItem()
              .title('About Section')
              .schemaType('about')
              .child(S.documentList().title('About Section').filter('_type == "about"')),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              icon: AiFillCode,
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title('Resume')
              .icon(GrDocumentUser)
              .child(S.document().schemaType('resume').documentId('resume')),
          ]),
    }),
    visionTool(),
    tags({}),
  ],

  schema: {
    types: [
      hero,
      about,
      project,
      resume,
      blockContent,
      imageFile,
      links,
      education,
      experience,
      achievment,
    ],
  },
})
