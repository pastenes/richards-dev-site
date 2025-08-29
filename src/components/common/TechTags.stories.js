import React from 'react';

import TechTags from './TechTags';

export default {
  title: 'Tech Tags',
  component: TechTags,
};

export const Default = () => <TechTags className="text-green" tags={['caca', 'test']} />;
