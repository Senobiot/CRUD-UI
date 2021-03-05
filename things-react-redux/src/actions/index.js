import { GET_ALL, SET_ITEMS, API, POST_ITEM, DELETE_ITEM, PUT_ITEM, ERROR } from './types';

export function getRequest(page, limit) {
  return getAction({
    page: page,
    limit: limit,
    label: GET_ALL,
    onSuccess: setItems,
    onFailure: (error) => error,
  });
}

export function postRequest(data) {
  return getAction({
    data: data,
    label: POST_ITEM,
    onSuccess: msg,
    onFailure: errorResponse,
  });
}

export function deleteRequest(id) {
  return getAction({
    id: id,
    data: null,
    label: DELETE_ITEM,
    onFailure: errorResponse,
  });
}

export function putRequest(id, data) {
  return getAction({
    data: data,
    id: id,
    label: PUT_ITEM,
    onFailure: errorResponse,
  });
}

export function setItems(data) {
  return {
    type: SET_ITEMS,
    payload: data,
  };
}

export function errorResponse(data) {
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
