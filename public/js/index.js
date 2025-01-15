/* eslint-disable */
// import '@babel/polyfill';
// import 'core-js';
// import 'regenerator-runtime/runtime';
import { login } from './login.js';
import displayMap from './leaflet.js';

// DOM ELEMENTS
const map = document.getElementById('map');
const loginForm = document.querySelector('.form');

// DELEGATION
if (map) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}
