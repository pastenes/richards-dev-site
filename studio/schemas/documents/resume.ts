import {defineType, defineField} from 'sanity'
import {GrDocumentUser} from 'react-icons/gr'

// One document per resume version (duplicate one to tailor it to a job posting). The site shows the
// one picked as the site resume (Site settings), and "Generate Resume PDF" prints a resume to `pdf`.

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  icon: GrDocumentUser,
  groups: [
    {
      name: 'header',
      title: 'Header',
      default: true,
    },
    {
      name: 'summary',
      title: 'Summary',
    },
    {
      name: 'experience',
      title: 'Experience',
    },
    {
      name: 'skills',
      title: 'Skills',
    },
    {
      name: 'pdf',
      title: 'PDF',
    },
  ],
  fieldsets: [{name: 'contact', title: 'Contact Info'}],
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description:
        'Internal name for this version, shown in the Resumes list (e.g. "Base" or "Acme, Staff Front-End"). Not shown on the resume.',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'header',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'contact',
      group: 'header',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      group: 'header',
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: 'email',
            invert: false,
          }
        ),
    }),
    defineField({
      name: 'portfolioUrl',
      title: 'Portfolio URL',
      type: 'url',
      fieldset: 'contact',
      group: 'header',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'summary',
    }),
    defineField({
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{type: 'string'}],
      group: 'summary',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{type: 'education'}],
      group: 'summary',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      description:
        'Pick from the Certifications list (the same documents the home page shows). Drag to reorder.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'certification'}]}],
      validation: (Rule) => Rule.unique(),
      group: 'summary',
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{type: 'experience'}],
      group: 'experience',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      description: 'Type a skill and press Enter. Shown alphabetically on the resume.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'skills',
    }),
    defineField({
      name: 'pdfFileName',
      title: 'PDF file name',
      description:
        'Optional, without ".pdf". Leave empty for Resume-Richard-Pastenes, or use a role-specific name for tailored versions (e.g. Resume-Richard-Pastenes-Acme).',
      type: 'string',
      placeholder: 'Resume-Richard-Pastenes',
      validation: (Rule) => Rule.regex(/^[A-Za-z0-9_-]+$/, {name: 'letters, numbers, - and _ only'}),
      group: 'pdf',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      description:
        'Set by the "Generate Resume PDF" button at the bottom of the editor. It replaces Publish once everything is published, since the PDF is printed from the published resume. Regenerate it after publishing changes.',
      type: 'file',
      options: {accept: 'application/pdf'},
      readOnly: true,
      group: 'pdf',
    }),
  ],
  preview: {
    select: {label: 'label', name: 'name', jobTitle: 'jobTitle'},
    prepare: ({label, name, jobTitle}) => ({title: label || name || 'Untitled resume', subtitle: jobTitle}),
  },
})
