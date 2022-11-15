export default {
  type: 'object',
  name: 'links',
  fieldsets: [{ name: 'social', title: 'Social media handles' }],
  fields: [
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'LinkedIn',
      name: 'linkedin',
      type: 'string',
      fieldset: 'social',
    },
    {
      title: 'GitHub',
      name: 'github',
      type: 'string',
      fieldset: 'social',
    },
  ],
};
