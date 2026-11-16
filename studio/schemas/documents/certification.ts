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
      name: 'inProgress',
      title: 'In progress',
      description:
        'Still working toward it. The site shows "In progress" instead of the year and credential ID. Turn it off and set Issued once you earn it.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'issued',
      title: 'Issued',
      description: 'Only the year is shown on the site.',
      hidden: ({document}) => Boolean(document?.inProgress),
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
    select: {title: 'title', issuer: 'issuer', inProgress: 'inProgress'},
    prepare: ({title, issuer, inProgress}) => ({
      title,
      subtitle: [issuer, inProgress && 'In progress'].filter(Boolean).join(' · '),
    }),
  },
})
