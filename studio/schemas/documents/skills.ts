import {defineType, defineField, defineArrayMember} from 'sanity'
import {FaTools} from 'react-icons/fa'

// Singleton (document ID `skills`): the landing page's Skills section, one card per group.
// Core skills are highlighted on the site.
export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  icon: FaTools,
  fields: [
    defineField({
      name: 'groups',
      title: 'Groups',
      description: 'One card per group, in this order. Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'skillGroup',
          title: 'Group',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'skill',
                  title: 'Skill',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'core',
                      title: 'Core skill',
                      description: 'Highlighted on the site.',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {title: 'name', core: 'core'},
                    prepare: ({title, core}) => ({title, subtitle: core ? 'Core' : undefined}),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', skills: 'skills'},
            prepare: ({title, skills}) => ({
              title,
              subtitle: `${skills?.length ?? 0} skills`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Skills'}),
  },
})
