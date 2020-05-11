const httpProxy = require('express-http-proxy');
const requireAuth = require('../auth/requireAuth');

const proxyReqHandler = (apiHost, apiKey) => {
  return httpProxy(apiHost, {
    proxyReqPathResolver(srcReq) {
      return srcReq.originalUrl.replace('/api-proxy', '/api');
    },
    proxyReqOptDecorator(proxyReqOpts, srcReq) {
      const hasOid = (srcReq) => srcReq && srcReq.user && srcReq.user.oid;
      const hasEmail = (srcReq) => srcReq && srcReq.user && srcReq.user._json && srcReq.user._json.email;

      const headers = {
        ...proxyReqOpts.headers,
        'x-okta-id': !hasEmail(srcReq)
          ? !hasOid(srcReq)
            ? 'developer-no-auth'
            : srcReq.user.oid
          : srcReq.user._json.email,
        'x-okta-fullName':
          !srcReq || !srcReq.user || !srcReq.user.displayName ? 'Developer NoAuth' : srcReq.user.displayName,
        apiKey,
      };

      if (headers && srcReq && srcReq.user) {
        headers.Authorization = `Bearer ${srcReq.user.jwt}`;
      }

      return {
        ...proxyReqOpts,
        headers,
      };
    },
  });
};

function config(app) {
  app.all('/api-proxy/*', requireAuth, proxyReqHandler('config.host', 'config.apiKey'));
}

module.exports = config;
