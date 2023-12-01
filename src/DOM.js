/**
 * imports
 */

import { coinAPI } from './coinAPI.js';

/**
 * nodes
 */

const $start = document.querySelector('#start');
const $startPrice = document.querySelector('#startPrice');
const $end = document.querySelector('#end');
const $endPrice = document.querySelector('#endPrice');
const $coin = document.querySelector('#coin');
const $coinUrl = document.querySelector('#coinUrl');
const $coinIcon = document.querySelector('#coinIcon');
const $amount = document.querySelector('#amount');
const $result = document.querySelector('#result');
const $netProfit = document.querySelector('#netProfit');
const $profitability = document.querySelector('#profitability');
const $check = document.querySelector('button');

/**
 * data
 */

const state = {
    price: {
        start: '',
        end: '',
    },

    selectedCoin: {
        link: '',
        icon: '',
    },

    amount: 0,

    netProfit: '',

    profitability: '',
}

/**
 * init
 */

const coinNamesList = await coinAPI.getNamesList();
renderList(coinNamesList, $coin);
setDefaultDate();

/**
 * lib
 */

function renderList(list) {
    list.forEach(name => {
        const $newOption = new Option(name, name);
        $coin.append($newOption);
    });
}

function getNetProfit(startPrice, endPrice) {
    let profit = 0;
    if (endPrice > startPrice) {
        profit = endPrice - startPrice;
        profit = `+${profit.toFixed(5)}$`;
    } else {
        profit = startPrice - endPrice;
        profit = `-${profit.toFixed(5)}$`;
    }

    return profit;
}

function getProfitability(startPrice, endPrice) {
    let profitability = 0;
    if (endPrice > startPrice) {
        profitability = ((endPrice - startPrice) / startPrice) * 100;
        profitability = `+${profitability.toFixed(2)}%`;
    } else {
        profitability = ((startPrice - endPrice) / startPrice) * 100;
        profitability = `-${profitability.toFixed(2)}%`;
    }

    return profitability;
}

function isIncrease() {
    if (state.profit.match('-')) {
        return false;
    }

    return true;
}

function renderResultInfo() {
    $netProfit.textContent = state.profit;
    $profitability.textContent = state.profitability;

    if (isIncrease()) {
        $result.className += ' bg-success';
    } else {
        $result.className += ' bg-danger';
    }

    return true;
}

function checkAmount() {
    if (state.amount === '' || state.amount <= 0) {
        state.amount = 1;
        $amount.value = 1;
    }

    return true;
}

function getCorrectFormatDate(date) {
    date = new Date(date);
    
    const years = date.getFullYear();
    let months = date.getMonth();
    let days = date.getDate();

    if (days < 10) {
        days = `0${days}`;
    }
    if (months < 10) {
        months = `0${months}`;
    }

    const result = `${years}-${months}-${days}`;
    
    return result;
}

function setDefaultDate() {
    const endDate = new Date().getTime();
    const correctEndDate = getCorrectFormatDate(endDate);

    const yearInMs = 1000 * 60 * 60 * 24 * 365;

    const startDate = endDate - yearInMs;
    const correctStartDate = getCorrectFormatDate(startDate);
    
    $start.value = correctStartDate;
    $end.value = correctEndDate;
}

function getAmount() {
    const amount = $amount.value;

    return amount;
}

function getPrice(data, amount) {
    const price = data.market_data.current_price.usd * amount;

    return price;
}
  
function getImgData(coinData) {
    let name = coinData.name.toLowerCase();

    if (name.includes(' ')) {
        name = name.replaceAll(' ', '-');
    }

    const link = `https://www.coingecko.com/en/coins/${name}`;

    const icon = coinData.image.thumb;

    const data = { link, icon };

    return data;
}

function renderStartPrice() {
    $startPrice.textContent = `${state.price.start.toFixed(5)}$`;

    return true;
}

function renderEndPrice() {
    $endPrice.textContent = `${state.price.end.toFixed(5)}$`;

    return true;
}

function renderImg() {
    $coinUrl.setAttribute('href', `${state.selectedCoin.link}`);
    $coinIcon.setAttribute('src', state.selectedCoin.icon);

    return true;
}

async function main() {
    const startDate = $start.value.split('-').reverse().join('-');
    const endDate = $end.value.split('-').reverse().join('-');

    const coinList = await coinAPI.getList();

    const coinId = coinAPI.getId($coin.value, coinList);
    const startDateData = await coinAPI.requestData(coinId, startDate);
    const endDateData = await coinAPI.requestData(coinId, endDate);

    const imgData = getImgData(endDateData);

    state.amount = getAmount();

    checkAmount($amount);

    state.price.start = getPrice(startDateData, state.amount);
    state.price.end = getPrice(endDateData, state.amount);

    state.selectedCoin.icon = imgData.icon;
    state.selectedCoin.link = imgData.link;
    
    const profit = getNetProfit(state.price.start, state.price.end);
    const profitability = getProfitability(state.price.start, state.price.end);

    state.profit = profit;
    state.profitability = profitability;

    renderResultInfo();
    renderStartPrice();
    renderEndPrice();
    renderImg();
}

export function app() {
    $check.addEventListener('click', async (event) => {
        event.preventDefault();
        await main();
    });
}