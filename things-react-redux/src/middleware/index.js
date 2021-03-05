import appConfig from '../appConfig.json';
const API_URL = appConfig.SERVER_URL;
import { API } from '../actions/types';

const customMiddleware = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { id, data, onSuccess, onFailure, label, page, limit } = action.payload;

  if (label === 'GET_ALL') {
    const params =
    !page && !limit
      ? undefined
      : page && !limit
      ? `?page=${page}`
      : !page && limit
      ? `?limit=${page}`
      : `?page=${page}(&limit=${limit})`;

    try {
      const response = await fetch(params ? API_URL + params : API_URL);
      if (!response.ok) {
        dispatch(onFailure(response.statusText))
      }
      const json = await response.json();
      dispatch(onSuccess(json))
  
    } catch (error) {
      dispatch(onFailure(error))
    }
  }

  if (label === 'POST_ITEM') {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = (await response.json()).msg;
          dispatch(onFailure(error));
        }

      } catch (error) {
        dispatch(onFailure(error));
      }
  }

  if (label === 'DELETE_ITEM') {

    try {
      const response = await fetch(`${API_URL}${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        const error = (await response.json()).msg;
        dispatch(onFailure(error));
      }
      
    } catch (error) {
      dispatch(onFailure(error));
    }
}

if (label === 'PUT_ITEM') {
  console.log(Object.keys(data).length === 0)
    if (Object.keys(data).length === 0) {
    dispatch(onFailure('Nothing changes'));
  }
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = (await response.json()).msg;
      dispatch(onFailure(error));
    }
  } catch (error) {
    dispatch(onFailure(error));
  }
}
};

export default customMiddleware;
