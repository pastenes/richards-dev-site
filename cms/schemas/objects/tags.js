export default {
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
};