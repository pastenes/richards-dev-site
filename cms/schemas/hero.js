import { GiHummingbird } from 'react-icons/gi'
export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  icon: GiHummingbird,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'links',
    },
    {
      title: 'Headshot',
      name: 'headshot',
      type: 'imageFile',
    },
  ],
};
