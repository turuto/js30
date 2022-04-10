import { Autocomplete } from './autocomplete.js'

const autocomplete = new Autocomplete();


/*
const API_ENDPOINT = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestionList = document.querySelector('.suggestions');
let cities;

const fetchData = function () {
    console.log('fetching');
    const cities = fetch(API_ENDPOINT)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => populateData(data));
}

const populateData = function (data) {
    cities = data;
    console.log('got them!!!');
    console.log(cities);
    enableUI();
}

const enableUI = function () {
    setListeners();
}

const newSearch = function () {
    console.log('new search');
}

const setListeners = function () {
    searchInput.addEventListener('keydown', newSearch);
}

fetchData();
*/