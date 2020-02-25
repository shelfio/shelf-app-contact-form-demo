import {SearchOptions} from 'types';
import filter from 'lodash/filter';

export const API_HOST = 'api.shelf.io';

export const searchInLibrary = (
  term?: string,
  options?: SearchOptions,
  intent?: string,
  useSearch?: boolean
) => {
  const accountId = options?.accountId || process?.env?.REACT_APP_SHELF_ACCOUNTID || 'harvard';
  const intentGroupId =
    options?.intentGroupId || process?.env?.REACT_APP_INTENT_GROUPID || 'chatbot';
  const searchIntentGroupId =
    options?.searchIntentGroupId || process?.env?.REACT_APP_SEARCH_INTENT_GROUPID || 'chatbot';
  const url = `https://${options?.shelfDomain ||
    process?.env?.REACT_APP_API_HOST ||
    API_HOST}/chatbot/${accountId}/${
    useSearch ? searchIntentGroupId || intentGroupId : intentGroupId
  }${intent ? `/${intent}` : term ? `?searchText=${term}` : ''}`;

  return fetch(url, {
    method: 'GET'
  })
    .then(resp => {
      return resp.json();
    })
    .then(gems => filter(gems, 'publicURL'));
};
