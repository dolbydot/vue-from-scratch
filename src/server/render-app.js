import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/utils';

const renderApp = (title) =>
  `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/bootstrap.css">
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}"></div>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/app.bundle.js"></script>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/lib.bundle.js"></script>
  </body>
</html>
`;

export default renderApp;
