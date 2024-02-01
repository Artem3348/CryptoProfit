/**
 * imports
 */

import { coinAPI } from './coinAPI.js';

type coinData = {
    [key: string]: string
}

/**
 * nodes
 */

const $start: HTMLDataElement | null = document.querySelector('#start');
const $startPrice: HTMLElement | null = document.querySelector('#startPrice');
const $end: HTMLDataElement | null = document.querySelector('#end');
const $endPrice: HTMLElement | null = document.querySelector('#endPrice');
const $coin: HTMLDataElement | null = document.querySelector('#coin');
const $coinUrl: HTMLElement | null = document.querySelector('#coinUrl');
const $coinIcon: HTMLElement | null = document.querySelector('#coinIcon');
const $amount: HTMLDataElement | null = document.querySelector('#amount');
const $result: HTMLElement | null = document.querySelector('#result');
const $netProfit: HTMLElement | null = document.querySelector('#netProfit');
const $profitability: HTMLElement | null = document.querySelector('#profitability');
const $check: HTMLElement | null = document.querySelector('button');

/**
 * data
 */

type Price = {
    [key: string]: number,
}

type Coin = {
    [key: string]: string,
}

interface State {
    price: Price,
    selectedCoin: Coin,
    amount: number,
    netProfit: string,
    profitability: string,
}

const state: State = {
    price: {
        start: 0,
        end: 0,
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

const coinNamesList: string[] = coinAPI.getNamesList();
renderList(coinNamesList);
setDefaultDate();

/**
 * lib
 */

function renderList(list: string[]): void {
    if ($coin === null) {
        throw new Error('error');
    }
    list.forEach((name: string) => {
        const $newOption: HTMLElement = new Option(name, name);
        $coin.append($newOption);
        if ($newOption.textContent === 'Bitcoin') {
            $newOption.setAttribute('selected', 'selected');
        }
    });
}

function getNetProfit(startPrice: number, endPrice: number): string {
    let profit: number = 0;
    let result: string = ''
    if (endPrice > startPrice) {
        profit = endPrice - startPrice;
        result = `+${profit.toFixed(5)}$`;
    } else {
        profit = startPrice - endPrice;
        result = `-${profit.toFixed(5)}$`;
    }

    return result;
}

function getProfitability(startPrice: number, endPrice: number): string {
    let profitability: number = 0;
    let result: string = '';
    if (endPrice > startPrice) {
        profitability = ((endPrice - startPrice) / startPrice) * 100;
        result = `+${profitability.toFixed(2)}%`;
    } else {
        profitability = ((startPrice - endPrice) / startPrice) * 100;
        result = `-${profitability.toFixed(2)}%`;
    }

    return result;
}

function isIncrease(): boolean {
    if (state.netProfit.match('-')) {
        return false;
    }

    return true;
}

function renderResultInfo(): void {
    if ($netProfit === null || $profitability === null || $result === null) {
        throw new Error('error');
    }
    $netProfit.textContent = state.netProfit;
    $profitability.textContent = state.profitability;

    if (isIncrease()) {
        $result.classList.add('success');
        $result.classList.remove('failure');
    } else {
        $result.classList.add('failure');
        $result.classList.remove('success');
    }
}

function checkAmount(): void {
    if ($amount === null) {
        throw new Error('error');
    }
    if (state.amount <= 0) {
        state.amount = 1;
        $amount.value = String(state.amount);
    }
}

function getCorrectFormatDate(date: number): string {
    const currentDate: Date = new Date(date);
    
    const years: number = currentDate.getFullYear();
    let months: number | string = currentDate.getMonth();
    let days: number | string = currentDate.getDate();

    if (days < 10) {
        days = `0${days}`;
    }
    if (months < 10) {
        months = `0${months}`;
    }

    const result: string = `${years}-${months}-${days}`;
    
    return result;
}

function setDefaultDate(): void {
    if ($start === null || $end === null) {
        throw new Error('error');
    }
    const endDate: number = new Date().getTime();
    const correctEndDate: string = getCorrectFormatDate(endDate);

    const yearInMs: number = 1000 * 60 * 60 * 24 * 365;

    const startDate: number = endDate - yearInMs;
    const correctStartDate: string = getCorrectFormatDate(startDate);
    
    $start.value = correctStartDate;
    $end.value = correctEndDate;
}

// function getAmount(): number {
//     if ($amount === null) {
//         throw new Error('error');
//     }
//     const amount: number = Number($amount.value);

//     return amount;
// }

function getPrice(data: any, amount: number): number {
    const price: number = data.market_data.current_price.usd * amount;

    return price;
}
  
function getCoinData(coinData: any): Coin {
    let name: string = coinData.name.toLowerCase();

    if (name.includes(' ')) {
        name = name.replaceAll(' ', '-');
    }

    const link: string = `https://www.coingecko.com/en/coins/${name}`;

    const icon: string = coinData.image.thumb;

    const data: Coin = { link, icon };

    return data;
}

function renderStartPrice(): void {
    $startPrice.textContent = `${state.price.start.toFixed(5)}$`;
}

function renderEndPrice(): void {
    $endPrice.textContent = `${state.price.end.toFixed(5)}$`;
}

function renderImg(): void {
    $coinUrl.setAttribute('href', `${state.selectedCoin.link}`);
    $coinIcon.setAttribute('src', state.selectedCoin.icon);
}

async function main(): Promise<void> {
    const startDate: string = $start.value.split('-').reverse().join('-');
    const endDate: string = $end.value.split('-').reverse().join('-');

    const coinList: coinData[] = coinAPI.getList();

    const coinId: number = coinAPI.getId($coin.value, coinList);
    const startDateData: any = await coinAPI.requestData(coinId, startDate);
    const endDateData: any = await coinAPI.requestData(coinId, endDate);

    const coinData: Coin = getCoinData(endDateData);

    state.amount = Number($amount.value);

    checkAmount();

    state.price.start = getPrice(startDateData, state.amount);
    state.price.end = getPrice(endDateData, state.amount);

    state.selectedCoin.icon = coinData.icon;
    state.selectedCoin.link = coinData.link;
    
    const netProfit: string = getNetProfit(state.price.start, state.price.end);
    const profitability: string = getProfitability(state.price.start, state.price.end);

    state.netProfit = netProfit;
    state.profitability = profitability;

    renderResultInfo();
    renderStartPrice();
    renderEndPrice();
    renderImg();
}

export function app(): void {
    $check.addEventListener('click', async (event: Event) => {
        event.preventDefault();
        await main();
    });
}