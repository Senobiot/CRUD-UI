import { GET_ALL, SET_ITEMS, API, POST_ITEM, DELETE_ITEM, PUT_ITEM, ERROR } from './types';

export function getRequest(page, limit) {
  return getAction({
    page: page,
    limit: limit,
    label: GET_ALL,
    onSuccess: setItems,
    onFailure: msgResponse,
  });
}

export function postRequest(data) {
  return getAction({
    data: data,
    label: POST_ITEM,
    onSuccess: msgResponse,
    onFailure: msgResponse,
  });
}

export function deleteRequest(id) {
  return getAction({
    id: id,
    data: null,
    label: DELETE_ITEM,
    onSuccess: msgResponse,
    onFailure: msgResponse,
  });
}

export function putRequest(id, data) {
  return getAction({
    data: data,
    id: id,
    label: PUT_ITEM,
    onSuccess: msgResponse,
    onFailure: msgResponse,
  });
}

export function setItems(data) {
  return {
    type: SET_ITEMS,
    payload: data,
  };
}

export function msgResponse(data) {
  return {
    type: ERROR,
    payload: data,
  };
}

function getAction({
  page = null,
  limit = null,
  data = null,
  id = null,
  onSuccess = () => {},
  onFailure = () => {},
  label,
}) {
  return {
    type: API,
    payload: {
      page,
      limit,
      id,
      data,
      onSuccess,
      onFailure,
      label,
    },
  };
}
