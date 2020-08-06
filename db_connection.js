import React from 'react';

const sendData = async (data) => {
  return fetch('http://0f99c2921c36.ngrok.io/AddNewUser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
};

export {sendData};
