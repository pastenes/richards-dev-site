import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {AiFillCode} from 'react-icons/ai'
import {GrDocumentUser} from 'react-icons/gr'
import {FaCertificate, FaCog, FaTools} from 'react-icons/fa'

import hero from './schemas/documents/hero'
import about from './schemas/documents/about'
import project from './schemas/documents/project'
import resume from './schemas/documents/resume'
import skills from './schemas/documents/skills'
import certification from './schemas/documents/certification'
import siteSettings from './schemas/documents/siteSettings'
import blockContent from './schemas/objects/blockContent'
import imageFile from './schemas/objects/image'
import links from './schemas/objects/links'
import education from './schemas/objects/education'
import experience from './schemas/objects/experience'
import achievment from './schemas/objects/achievment'
import {ShowOnSiteAction, SiteResumeBadge} from './actions/siteResume'
import {GenerateResumePdfAction} from './actions/generateResumePdf'
import {alsoInHeaderMenu} from './actions/alsoInHeaderMenu'

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
              .title('Site settings')
              .icon(FaCog)
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
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
            S.listItem()
              .title('Skills')
              .icon(FaTools)
              .child(S.document().schemaType('skills').documentId('skills')),
            orderableDocumentListDeskItem({
              type: 'certification',
              title: 'Certifications',
              icon: FaCertificate,
              S,
              context,
            }),
            S.divider(),
            // One resume per version (duplicate one to tailor it); Site settings picks the site's.
            S.documentTypeListItem('resume').title('Resumes').icon(GrDocumentUser),
          ]),
    }),
    visionTool(),
  ],

  // Always list every array item (skills, experience, achievements, tags...) instead of collapsing
  // long arrays behind a "Show all X items" button.
  form: {
    arrays: {collapseItems: {enabled: false}},
  },

  document: {
    // `siteSettings` is a singleton: only reachable from the structure, never created or copied.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== 'siteSettings'),
    actions: (prev, {schemaType}) => {
      // Generate comes first so it's the main button whenever there's nothing to publish (it hides
      // itself while there are unpublished changes, letting Publish take that spot). Generate,
      // Duplicate and Show on site are also listed in the header's "⋯" menu, where they're easier to find.
      if (schemaType === 'resume')
        return [
          alsoInHeaderMenu(GenerateResumePdfAction),
          ...prev.map((action) => (action.action === 'duplicate' ? alsoInHeaderMenu(action) : action)),
          alsoInHeaderMenu(ShowOnSiteAction),
        ]
      if (schemaType === 'siteSettings')
        return prev.filter(({action}) => action === 'publish' || action === 'discardChanges')
      return prev
    },
    badges: (prev, {schemaType}) => (schemaType === 'resume' ? [...prev, SiteResumeBadge] : prev),
  },

  schema: {
    types: [
      hero,
      about,
      project,
      resume,
      skills,
      certification,
      siteSettings,
      blockContent,
      imageFile,
      links,
      education,
      experience,
      achievment,
    ],
  },
})
