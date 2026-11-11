import {defineType, defineField} from 'sanity'
import {SiAboutdotme} from 'react-icons/si'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  icon: SiAboutdotme,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
})
