export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  groups: [
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'summary',
      title: 'Summary',
    }
  ],
  fields: [
    // Header section
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'header',
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      group: 'header',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'header',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'header',
    },
    {
      name: 'portfolioUrl',
      title: 'Portfolio URL',
      type: 'url',
      group: 'header',
    },
    // Summary section
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'summary',
    }
  ],
};
