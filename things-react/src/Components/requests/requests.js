const apiURL = 'http://senobiot-things-v1.herokuapp.com/api/v1/things/';

export const getData = async () => {
    const response = await fetch(apiURL);

    return await response.json();
};

export const deleteData = async (id) => {
    const response = await fetch(apiURL + id, {
      method: 'DELETE',
    });

    return await response.json();
};

export const putData = async (id, data = {}) =>  {
    const response = await fetch(apiURL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return await response.json();
};

export const postData = async (data = {}) => {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    
    return await response.json();
}


