import React from 'react';

const addNewUser = async (userData) => {
  //console.log(JSON.stringify(data));
  try {
    let response = await fetch('https://meet-lang.herokuapp.com/AddNewUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (userData) => {
  //console.log(JSON.stringify(data));
  try {
    let response = await fetch('https://meet-lang.herokuapp.com/test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    //let json = await response.json();
    //return json.status;
  } catch (error) {
    console.error(error);
  }
};

export {addNewUser, loginUser};
