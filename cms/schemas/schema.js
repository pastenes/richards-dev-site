// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './objects/blockContent';
// import category from './category';
// import post from './post';
// import author from './author';
import hero from './documents/hero';
import about from './documents/about';
import links from './objects/links';
import education from './objects/education';
import experience from './objects/experience';
import achievment from './objects/achievment';
import image from './objects/image';
import project from './documents/project';
import resume from './documents/resume';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    hero,
    about,
    links,
    education,
    experience,
    achievment,
    image,
    project,
    resume,
    blockContent,
  ]),
});
