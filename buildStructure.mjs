import { RemixEntry } from '@remix-run/react/components.js';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { routes } from './build/index.js';

// const config = await readConfig('.', ServerMode.Production);

// console.log(config);

// let routesByFile = Object.keys(config.routes).reduce((map, key) => {
//   let route = config.routes[key];
//   map.set(path.resolve(config.appDirectory, route.file), route);
//   return map;
// }, new Map());

const routeMap = Object.entries(routes).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: value.module.default,
  }),
  {}
);

for (const [key, Comp] of Object.entries(routeMap)) {
  const rendered = TestRenderer.create(
    React.createElement(RemixEntry, {}, [React.createElement(Comp)])
  );

  console.log(rendered.toJSON());
}
