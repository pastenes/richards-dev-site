import {defineType, defineField} from 'sanity'
import {FaCertificate} from 'react-icons/fa'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  icon: FaCertificate,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'certification'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
    }),
    defineField({
      name: 'issued',
      title: 'Issued',
      description: 'Only the year is shown on the site.',
      type: 'date',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      description: 'Verification page. The title links here.',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'issuer'},
  },
})
