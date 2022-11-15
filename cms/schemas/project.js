export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'screenshot',
      title: 'Screenshot',
      type: 'imageFile',
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
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
      title: 'Tags',
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
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
