// import { Template, version } from '@accordproject/cicero-core';
import semver from 'semver';

import Ajax from './Ajax';

const CONTRACT_PATH = '/contracts/:id';
const CONTRACTS_PATH = '/contracts/search';
const FETCH_TEMPLATE = 'FETCH_TEMPLATE';
const TEMPLATES_PATH = '/templates';

const contractMethods = {};

/**
 * Contract CRUD
 */

contractMethods.fetchContracts = () => Ajax.fetch(CONTRACTS_PATH);

contractMethods.fetchContract = (contractId) => {
  const contractPath = CONTRACT_PATH.replace(':id', contractId);
  return Ajax.fetch(`${contractPath}?filter[include]=clauses`, 'GET');
};

const fetchTemplate = (uri) => {
  const encodedUri = encodeURIComponent(uri);
  const url = `${TEMPLATES_PATH}/${encodedUri}`;
  return Ajax.fetch(url);
};

const shouldFetchTemplate = (state, templateUri) => {
  const shouldFetch = !state.dashboard.templates[templateUri];
  return shouldFetch;
};

export const loadTemplate = templateUri => (dispatch, getState) => {
  if (shouldFetchTemplate(getState(), templateUri)) {
    dispatch({
      type: `${FETCH_TEMPLATE}_PENDING`,
      templateUri,
    });
    return fetchTemplate(templateUri).then((template) => {
      const buffer = Buffer.from(template.archive, 'base64');
      if (!semver.satisfies(version.version, template.ciceroVersion)) {
        return dispatch({
          type: `${FETCH_TEMPLATE}_FULFILLED`,
          payload: {
            template,
            templateUri,
          },
        });
      }
      return Template.fromArchive(buffer).then((ciceroTemplate) => {
        dispatch({
          type: `${FETCH_TEMPLATE}_FULFILLED`,
          payload: {
            ciceroTemplate,
            template,
            templateUri,
          },
        });
      });
    }).catch((error) => {
      error.response.then((response) => {
        dispatch({
          type: `${FETCH_TEMPLATE}_REJECTED`,
          payload: {
            error: response,
            templateUri,
          },
        });
      });
    });
  }
  return Promise.resolve();
};
