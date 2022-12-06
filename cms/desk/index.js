import S from '@sanity/desk-tool/structure-builder'
import { AiFillCode } from 'react-icons/ai'
import { GrDocumentUser } from 'react-icons/gr'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
      .title('Hero Section')
      .schemaType('hero')
      .child(
        S.documentList()
        .title('Hero Section')
        .filter('_type == "hero"')
      ),
      S.listItem()
      .title('About Section')
      .schemaType('about')
      .child(
        S.documentList()
        .title('About Section')
        .filter('_type == "about"')
      ),
      // Minimum required configuration
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        icon: AiFillCode,
      }),
      S.divider(),
      S.listItem()
        .title('Resume')
        .icon(GrDocumentUser)
        .child(
          S.document()
            .schemaType('resume')
            .documentId('resume')
        ),
    ])