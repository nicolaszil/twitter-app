const oauthSignature = require('oauth-signature');
const twitterConfig = require('../config/twitter.json');

/**
 * Basic reference for authorization params
 */
const authorizationParams = {
  oauth_consumer_key: twitterConfig.consumerKey,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Date.now() / 1000,
  oauth_nonce: 'Dartagnan2019',
  oauth_version: '1.0',
};

/**
 * Generic function to save data through localStorage
 * @param {*} key
 * @param {*} values
 */
const storeLocalData = (key, values) => {
  const appData = JSON.parse(localStorage.getItem('appData'));
  localStorage.setItem('appData', JSON.stringify(
    { ...appData, [key]: { ...appData[key], ...values } },
  ));
};

/**
 * Transforms a query to a formatted object
 * Shallow escaping of "&" and "=" characters
 * @param {*} params
 */
const stringParamsToObject = (params) => {
  const data = params.split('&');
  return Object.assign({}, ...Object.values(data).map((key) => {
    const newElement = key.split('=');
    return { [newElement[0]]: newElement[1] };
  }));
};

/**
 * Provides formatted authorization headers
 * Uses params to generate a signature
 * @param {*} url
 * @param {*} parameters
 * @param {*} method
 */
const getAuthorizationHeaders = (url, parameters, method = 'POST') => {
  const params = { ...authorizationParams, ...parameters };
  const signature = oauthSignature.generate(
    method,
    url,
    params,
    twitterConfig.consumerSecret,
    twitterConfig.accessTokenSecret,
  );

  let authorizationHeaders = 'OAuth ';
  Object.keys(params).map(key => authorizationHeaders += `${key}="${params[key]}", `);
  authorizationHeaders += `oauth_signature="${signature}"`;

  return authorizationHeaders;
};

module.exports = {
  storeLocalData,
  stringParamsToObject,
  getAuthorizationHeaders,
};
