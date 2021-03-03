import appConfig from '../appConfig.json';
const API_URL = appConfig.SERVER_URL;

export const getData = async (page, limit) => {
  const params = !page && !limit ? undefined :
  page && !limit ? `?page=${page}` :
  !page && limit ? `?limit=${page}` :
  `?page=${page}(&limit=${limit})`;
  try {
    const response = await fetch(params ? API_URL + params : API_URL);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, { method: 'DELETE' });

    if (!response.ok) {
      const error = (await response.json()).msg;
      throw Error(error);
    }
  } catch (error) {
    throw error;
  }
};

export const postData = async (body) => {
  console.log(body);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = (await response.json()).msg;
      throw Error(error);
    }
  } catch (error) {
    throw error;
  }
};

export const putData = async (id, body) => {
  if (Object.keys(body).length === 0) {
    throw Error('Nothing changes');
  }

  try {
    console.log(body);
    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = (await response.json()).msg;
      throw Error(error);
    }
  } catch (error) {
    throw error;
  }
};
