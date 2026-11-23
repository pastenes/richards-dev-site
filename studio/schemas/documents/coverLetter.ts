import {defineType, defineField, defineArrayMember} from 'sanity'
import {FaEnvelopeOpenText} from 'react-icons/fa'

// One document per job application. The site prints it at /cover-letter?id=… under the resume's
// header, and "Generate Cover Letter PDF" saves that print to `pdf`.

export default defineType({
  name: 'coverLetter',
  title: 'Cover Letter',
  type: 'document',
  icon: FaEnvelopeOpenText,
  fields: [
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      description: 'The role you are applying for. Shown above the letter and used in the PDF file name.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employer',
      title: 'Employer',
      description: 'Shown under the job title and used in the PDF file name.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobUrl',
      title: 'Job Link',
      description: 'The job posting, for your reference. Not shown in the letter.',
      type: 'url',
    }),
    defineField({
      name: 'resume',
      title: 'Letterhead',
      description:
        'The resume whose name, title and contact info head the letter. Leave empty to use the resume shown on the site.',
      type: 'reference',
      to: [{type: 'resume'}],
    }),
    defineField({
      name: 'content',
      title: 'Letter',
      description: 'The full letter, from the greeting to the sign-off.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{title: 'URL', name: 'href', type: 'url'}],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      description:
        'Set by the "Generate Cover Letter PDF" button at the bottom of the editor (it replaces Publish once everything is published). Regenerate it after publishing changes. "Download PDF" and "Open PDF" are in the "⋯" menus.',
      type: 'file',
      options: {accept: 'application/pdf'},
      readOnly: true,
    }),
  ],
  preview: {
    select: {jobTitle: 'jobTitle', employer: 'employer'},
    prepare: ({jobTitle, employer}) => ({title: jobTitle || 'Untitled cover letter', subtitle: employer}),
  },
})
