import { ENDPOINT, PLACEHOLDER } from './constants.js';

export class Autocomplete {
    constructor() {
        this.init();
    }

    init = function () {
        this.createElements();
        this.fetchData();
        this.addEventListeners();
        this.toggleActiveUI(false);
    }

    createElements = function () {
        this.searchInput = document.querySelector('.search');
        this.suggestionList = document.querySelector('.suggestions');
    }

    addEventListeners = function () {
        this.searchInput.addEventListener('input', this.findCities.bind(this));
    }

    fetchData = function () {
        fetch(ENDPOINT)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => this.populateData(data));
    }

    populateData = function (data) {
        this.cities = data;
        this.toggleActiveUI(true);
    }

    toggleActiveUI = function (status) {
        if (status && this.cities) {
            this.searchInput.classList.remove('is-disabled');
            this.searchInput.removeAttribute('disabled');
        } else {
            this.searchInput.classList.add('is-disabled');
            this.searchInput.setAttribute('disabled', '');
        }
    }

    findCities = function () {
        const filteredCities = this.filterArrayByOcurrences(this.cities, this.searchInput.value);
        this.buildList(filteredCities, this.searchInput.value);
    }

    filterArrayByOcurrences = function (arr, str) {
        const filteredArr = arr.filter(item => {
            const regex = new RegExp(`${str}`, 'i');
            if (item.city.match(regex) || item.state.match(regex)) {
                return item;
            }
        })
        return filteredArr;
    }

    buildList(arr, strToHighLight) {
        console.log(arr.length)
        if (arr.length === 0 || strToHighLight === '') {
            this.suggestionList.innerHTML = PLACEHOLDER;
        } else {
            this.suggestionList.innerHTML = '';
            const regex = new RegExp(`${strToHighLight}`, 'i');
            arr.forEach(item => {
                const rawTxt = `${item.city}, ${item.state}`;
                const highlightedContent = `<span class="hl">${strToHighLight}</span>`;
                const formattedTxt = rawTxt.replace(regex, highlightedContent);
                const li = document.createElement('li');
                li.innerHTML = formattedTxt;
                this.suggestionList.appendChild(li);
            })
        }
    }
}
