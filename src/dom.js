import { coinAPI } from '../src/coinAPI.js';
import { render } from '../src/render.js';

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
 * init
 */

const coinList = await coinAPI.getList();
const coinNamesList = coinAPI.getNamesList(coinList);
render.renderList(coinNamesList, $coin);

/**
 * lib
 */

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

function isIncrease(profit) {
    if (profit.match('-')) {
        return false;
    }

    return true;
}

function renderResultInfo(profit, profitability) {
    $netProfit.textContent = profit;
    $profitability.textContent = profitability;

    if (isIncrease(profit)) {
        $result.className = 'success';
    } else {
        $result.className = 'failure';
    }

    return true;
}

function checkAmount($node) {
    if ($node.value === 0) {
        $node.value = 1; 
    }

    return true;
}

async function main() {
    const startDate = $start.value.split('-').reverse().join('-');
    const endDate = $end.value.split('-').reverse().join('-');

    const coinId = coinAPI.getId($coin.value, coinList);
    const startDateData = await coinAPI.requestData(coinId, startDate);
    const endDateData = await coinAPI.requestData(coinId, endDate);

    checkAmount($amount);
    
    const startPrice = render.getPrice(startDateData, $amount.value);
    const endPrice = render.getPrice(endDateData, $amount.value);

    const img = render.getImg(endDateData);
    render.renderImg(img, $coin.value, $coinUrl, $coinIcon);

    render.renderPrice($startPrice, startPrice);
    render.renderPrice($endPrice, endPrice);

    const profit = getNetProfit(startPrice, endPrice);
    const profitability = getProfitability(startPrice, endPrice);

    renderResultInfo(profit, profitability);
}

export async function app() {
    $check.addEventListener('click', async (event) => {
        event.preventDefault();
        await main();
    });
}
