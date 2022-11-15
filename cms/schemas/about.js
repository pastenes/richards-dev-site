export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
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
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean'
                  }
                ]
              },
            ]
          }
        }
      ],
    },
    {
      name: 'tags',
      title: 'Skills',
      type: 'tags',
      options: {
        // Locks menu from creating new tags (defaults to false)
        frozen: false,
        // Preset of tags (defaults to empty)
        preload: [
          { label: 'React', value: 'react' },
          { label: 'Gatsby', value: 'gatsby' },
          { label: 'WordPress', value: 'wordpress' },
        ],
        // Closes menu after tag selected (defaults to true)
        closeMenuOnSelect: true,
      },
    },
  ],
};
