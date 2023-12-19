import * as raw from './raw';
export const get = (http, params) => {
  return raw.get(http, `/users/me/access_tokens/${params.tokenId}`);
};
export const getMany = (http, params) => {
  return raw.get(http, '/users/me/access_tokens', {
    params: params.query
  });
};
export const create = (http, _params, rawData, headers) => {
  return raw.post(http, '/users/me/access_tokens', rawData, {
    headers
  });
};
export const revoke = (http, params) => {
  return raw.put(http, `/users/me/access_tokens/${params.tokenId}/revoked`, null);
};