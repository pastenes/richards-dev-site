import React from "react";

export default function TagsCloud(props) {
  const TagCloud = require('TagCloud')
  const options = {
    radius: 150,
    maxSpedd: 0.1,
    direction: 135,
    keep: true
  };
  TagCloud('.mytagcloud', props.tags, options);
  console.log('%cTagsCloud.js line:12 props', 'color: #007acc;', props);

  return (
    <div className="mytagcloud text-green font-fira-code basis-1/4 max-h-72"></div>
  )
}