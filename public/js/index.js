/* eslint-disable */
import '@babel/polyfill';
// import 'core-js';
// import 'regenerator-runtime/runtime';
import { login, logout } from './login.js';
import { updateData } from './updateSettings.js';
import displayMap from './leaflet.js';

// DOM ELEMENTS
const map = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const userInfoForm = document.querySelector('.form-user-data');
const logOutBtn = document.querySelector('.nav__el--logout');

// DELEGATION
if (map) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (userInfoForm) {
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateData(name, email);
  });
}

if (logOutBtn)
  logOutBtn.addEventListener('click', () => {
    logout();
  });
