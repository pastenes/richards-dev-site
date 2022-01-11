import React from 'react';

const HeadComponents = [<script key="rollbar" src="/three.min.js" />];

const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

export { onRenderBody };