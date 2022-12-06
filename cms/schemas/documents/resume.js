export default {
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
  fieldsets: [
    { name: 'contact', title: 'Contact Info' }
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
      fieldset: 'contact',
      group: 'header',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      group: 'header',
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email", // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
        ),
    },
    {
      name: 'portfolioUrl',
      title: 'Portfolio URL',
      type: 'url',
      fieldset: 'contact',
      group: 'header',
    },
    // Summary section
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'summary',
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'summary',
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{ type: 'education' }],
      group: 'summary',
    },
    // Experience section
    {
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [{ type: 'experience' }],
      group: 'experience',
    },
    // Skills section
    {
      name: 'skills',
      title: 'Skills',
      type: 'tags',
      group: 'skills',
    }
  ],
};
