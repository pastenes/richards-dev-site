import React from 'react';

const HeadComponents = [<script key="birds" src="/three.min.js" />];

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

export { onRenderBody };