export default {
  type: 'object',
  name: 'experience',
  fields: [
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'employer',
      title: 'Employer',
      type: 'string',
    },
    {
      name: 'start',
      title: 'Start',
      type: 'date',
      options: {
        dateFormat: 'MMMM, YYYY',
      },
    },
    {
      name: 'end',
      title: 'End',
      type: 'date',
      options: {
        dateFormat: 'MMMM, YYYY',
      },
    },
    {
      name: 'achievment',
      title: 'Achievment',
      type: 'array',
      of: [{ type: 'achievment' }],
    },
  ],
  preview: {
    select: {
      title: 'role',
      employer: 'employer',
    },
    prepare(selection) {
      const { title, employer } = selection
      return {
        title: title,
        subtitle: employer,
      }
    }
  }
};
