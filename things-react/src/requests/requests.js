import appConfig from '../appConfig.json';
const API_URL = appConfig.SERVER_URL;

export const getData = async (app) => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    json.sort((a, b) => a.id - b.id);
    app.setState({ items: json, isLoaded: true, end: new Date().getTime() });
  } catch (error) {
    console.log(error);
    app.setState({ error: error, isLoaded: true, items: [], status: error });
  }
};

export const deleteData = async (app, e) => {
  const id = e.target.dataset.id;

  app.setState({
    editMode: false,
    currentEditableField: null,
    isLoaded: false,
    error: null,
    status: null,
    start: new Date().getTime(),
  });

  try {
    const response = await fetch(`${API_URL}${id}`, { method: 'DELETE' });

    if (!response.ok) {
      response.json().then((data) => app.setState({ status: data.msg }));
      throw Error(response.statusText);
    }

    await getData(app);
    app.setState({ status: 'Delete data success in' });
  } catch (error) {
    app.setState({ error: error });
  }
};

export const postData = async (app, body) => {
  app.setState({
    editMode: false,
    currentEditableField: null,
    isLoaded: false,
    error: null,
    status: null,
    start: new Date().getTime(),
  });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      response.json().then((data) => app.setState({ status: data.msg }));
      throw Error(response.statusText);
    }

    await getData(app);
    app.setState({
      newThingName: '',
      newThingCar: 'none',
      newThingPet: 'none',
      status: 'Post data success in',
    });
  } catch (error) {
    app.setState({ error: error, isLoaded: true });
  }
};

export const putData = async (app, body, id) => {
  if (Object.keys(body).length === 0) {
    app.setState({
      editMode: false,
      currentEditableField: null,
      status: 'Nothing changes',
      start: new Date().getTime(),
      end: new Date().getTime(),
    });
    return;
  }

  app.setState({
    editMode: false,
    currentEditableField: null,
    isLoaded: false,
    error: null,
    status: null,
    start: new Date().getTime(),
  });

  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      response.json().then((data) => app.setState({ status: data.msg }));
      throw Error(response.statusText);
    }

    await getData(app);
    app.setState({ status: 'Put data success in' });
  } catch (error) {
    app.setState({ error: error, isLoaded: true });
  }
};
