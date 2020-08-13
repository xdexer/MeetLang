import React from 'react';

const addNewUser = (userData) => {
  //console.log(JSON.stringify(data));
  return fetch('http://7d678c8ea839.ngrok.io/AddNewUser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

const loginUser = async (userData) => {
  //console.log(JSON.stringify(data));
  try {
    let response = await fetch('http://7d678c8ea839.ngrok.io/LoginUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    let json = await response.json();
    return json.toString();
  } catch (error) {
    console.error(error);
  }
};

export {addNewUser, loginUser};
