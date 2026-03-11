import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
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
  ],
  fieldsets: [{name: 'contact', title: 'Contact Info'}],
  fields: [
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
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{type: 'experience'}],
      group: 'experience',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'tags',
      group: 'skills',
    }),
  ],
})
