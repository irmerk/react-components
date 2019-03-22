import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import Session from './Session';

const CLAUSE_SERVER_URL = 'http://localhost:3000';
const USERS_LOGIN_PATH = '/users/login';
const USERS_LOGOUT_PATH = '/users/logout';
const USERS_PATH = '/users';

// eslint-disable-next-line no-underscore-dangle
fetch._parseJSON = response => response.text().then(text => (
  text ? JSON.parse(text) : {}
));

class Ajax {
  static fetch(url, method = 'GET', body = null, unauthorized = false) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (!unauthorized) {
      const { userAccessToken } = Session.getUser();
      const orgId = Session.getCurrentOrganization();
      headers.Authorization = userAccessToken;
      if (orgId) headers['Clause-Organization'] = orgId;
    }

    const data = {
      headers,
      method,
    };

    let uri = `${CLAUSE_SERVER_URL}/api${url}`;
    if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      data.body = JSON.stringify(body);
    } else if (body && method === 'GET') {
      uri = `${uri}?${this.queryParams(body)}`;
    }

    const fetchJsonPromise = fetch(uri, data).then((response) => {
      if (response.status === 204) {
        return Promise.resolve({});
      }

      let jsonResponse;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') > -1) {
        jsonResponse = response.json();
      } else {
        jsonResponse = Promise.resolve({ error: { message: response.statusText } });
      }

      if (response.status === 401) {
        window.dispatchEvent(new Event('userIsUnauthorized'));
        const error = new Error('Unauthorized');
        error.response = jsonResponse;
        throw error;
      }
      if (response.status >= 400) {
        const error = new Error('Bad response from server');
        error.response = jsonResponse;
        throw error;
      }
      if (method === 'DELETE') {
        return response;
      }
      return jsonResponse;
    }).catch((error) => {
      const err = error;
      if (!err.response) err.response = Promise.resolve({ error: { code: 'SERVER_ERROR', error } });
      throw err;
    });

    return fetchJsonPromise;
  }

  static login(email, password) {
    return Ajax.fetch(USERS_LOGIN_PATH, 'POST', { email, password }, true)
      .then((res) => {
        Session.setUser({ userId: res.userId, userAccessToken: res.id });
        return res;
      });
  }

  static fetchCurrentUser() {
    const { userId, userAccessToken } = Session.getUser();
    if (!userId || !userAccessToken) { return Promise.reject(); }
    const orgId = Session.getCurrentOrganization();

    const url = `${USERS_PATH}/${userId}/full`;
    return Ajax.fetch(url)
      .then((res) => {
        if (!orgId && res.organizations.length) {
          Session.setCurrentOrganization(res.organizations[0]);
        }
        return res;
      });
  }

  static setCurrentOrganization(org) {
    Session.setCurrentOrganization(org);
  }

  static logout() {
    return Ajax.fetch(USERS_LOGOUT_PATH, 'POST')
      .then((res) => {
        Session.clearUser();
        return res;
      });
  }

  static register(userId, verificationToken, password) {
    return Ajax.fetch('/users/register', 'POST', { userId, verificationToken, password }, true)
      .then((res) => {
        Session.setUser({ userId, userAccessToken: res.accessToken });
        return res;
      });
  }

  static queryParams(params) {
    return Object.keys(params)
      .map(k => (`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`))
      .join('&');
  }

  static parseErrors(errors) {
    if (!errors) return {};
    if (!errors.details) return {};

    const result = {};
    const { messages } = errors.details;
    _.forEach(messages, (val, key) => {
      result[key] = val[0];
    });
    return result;
  }

  static parseErrorMessages(errors) {
    const parsed = Ajax.parseErrors(errors);
    let messages = _.flatMap(parsed, val => val);

    if (messages.length > 1) {
      messages = messages.join(', ');
    } else {
      messages = messages.toString();
    }

    return messages;
  }
}

export default Ajax;
