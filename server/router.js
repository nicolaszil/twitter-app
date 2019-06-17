const express = require('express');
const axios = require('axios');
const { Twitter: twitterClient } = require('twitter-node-client');
const twitterConfig = require('../config/twitter.json');

const {
  storeLocalData,
  stringParamsToObject,
  getAuthorizationHeaders,
} = require('./helpers');

const router = new express.Router();
const twitter = new twitterClient(twitterConfig);

router.get('/userinfo', async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin');

    const appData = JSON.parse(localStorage.getItem('appData'));
    if (appData) res.status(200).send(appData);

    res.status(500).send();
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send();
  }
});

router.get('/signin', async (req, res) => {
  try {
    const headers = {
      headers: {
        Authorization: getAuthorizationHeaders(
          twitterConfig.requestTokenUrl,
          { oauth_token: twitterConfig.accessToken },
        ),
      },
    };
    const response = await axios.post(twitterConfig.requestTokenUrl, {}, headers);
    const params = stringParamsToObject(response.data);

    if (params.oauth_callback_confirmed === 'true') {
      storeLocalData('tokens', {
        OAuthToken: params.oauth_token,
        OAuthTokenSecret: params.oauth_token_secret,
        OAuthCallbackConfirmed: params.oauth_callback_confirmed,
      });
      const redirectUrl = `${twitterConfig.authenticateUrl}?oauth_token=${params.oauth_token}`;
      return res.redirect(302, redirectUrl);
    }

    res.status(500).send();
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send();
  }
});

router.get('/callback', async (req, res) => {
  try {
    const appData = JSON.parse(localStorage.getItem('appData'));

    if (appData.tokens.OAuthToken !== req.query.oauth_token) {
      return res.status(500).send();
    }

    storeLocalData('tokens', {
      OAuthToken: req.query.oauth_token,
      OAuthVerifier: req.query.oauth_verifier,
    });

    const headers = {
      headers: {
        Authorization: getAuthorizationHeaders(
          twitterConfig.accessTokenUrl,
          {
            oauth_token: req.query.oauth_token,
            oauth_verifier: req.query.oauth_verifier,
          },
        ),
      },
    };

    const response = await axios.post(twitterConfig.accessTokenUrl, {}, headers);
    const params = stringParamsToObject(response.data);

    if (params.oauth_token_secret === twitterConfig.accessTokenSecret) {
      storeLocalData('user', {
        userId: params.user_id,
        screenName: params.screen_name,
      });
      res.cookie('userLoggedIn', true);
      return res.redirect(301, 'http://localhost:8007');
    }

    return res.status(500).send();
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send();
  }
});

router.get('/search', async (req, res) => {
  try {
    if (!req.query.q) res.status(400).send('You must provide a "q" param');

    const params = req.query;
    params.q = `#${params.q.replace(/\s+/g, '')}`;
    params.lang = 'fr';
    params.result_type = 'mixed';
    params.count = 10;

    const error = (error, response, body) => {
      console.log(error, body);
      res.status(500).send();
    };

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin');
    await twitter.getSearch(params, error, data => res.send(data));
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
