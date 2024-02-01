"use strict";
/**
 * imports
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var coinAPI_js_1 = require("./coinAPI.js");
/**
 * nodes
 */
var $start = document.querySelector('#start');
var $startPrice = document.querySelector('#startPrice');
var $end = document.querySelector('#end');
var $endPrice = document.querySelector('#endPrice');
var $coin = document.querySelector('#coin');
var $coinUrl = document.querySelector('#coinUrl');
var $coinIcon = document.querySelector('#coinIcon');
var $amount = document.querySelector('#amount');
var $result = document.querySelector('#result');
var $netProfit = document.querySelector('#netProfit');
var $profitability = document.querySelector('#profitability');
var $check = document.querySelector('button');
var state = {
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
};
/**
 * init
 */
var coinNamesList = coinAPI_js_1.coinAPI.getNamesList();
renderList(coinNamesList);
setDefaultDate();
/**
 * lib
 */
function renderList(list) {
    if ($coin === null) {
        throw new Error('error');
    }
    list.forEach(function (name) {
        var $newOption = new Option(name, name);
        $coin.append($newOption);
        if ($newOption.textContent === 'Bitcoin') {
            $newOption.setAttribute('selected', 'selected');
        }
    });
}
function getNetProfit(startPrice, endPrice) {
    var profit = 0;
    var result = '';
    if (endPrice > startPrice) {
        profit = endPrice - startPrice;
        result = "+".concat(profit.toFixed(5), "$");
    }
    else {
        profit = startPrice - endPrice;
        result = "-".concat(profit.toFixed(5), "$");
    }
    return result;
}
function getProfitability(startPrice, endPrice) {
    var profitability = 0;
    var result = '';
    if (endPrice > startPrice) {
        profitability = ((endPrice - startPrice) / startPrice) * 100;
        result = "+".concat(profitability.toFixed(2), "%");
    }
    else {
        profitability = ((startPrice - endPrice) / startPrice) * 100;
        result = "-".concat(profitability.toFixed(2), "%");
    }
    return result;
}
function isIncrease() {
    if (state.netProfit.match('-')) {
        return false;
    }
    return true;
}
function renderResultInfo() {
    if ($netProfit === null || $profitability === null || $result === null) {
        throw new Error('error');
    }
    $netProfit.textContent = state.netProfit;
    $profitability.textContent = state.profitability;
    if (isIncrease()) {
        $result.classList.add('success');
        $result.classList.remove('failure');
    }
    else {
        $result.classList.add('failure');
        $result.classList.remove('success');
    }
}
function checkAmount() {
    if ($amount === null) {
        throw new Error('error');
    }
    if (state.amount <= 0) {
        state.amount = 1;
        $amount.value = String(state.amount);
    }
}
function getCorrectFormatDate(date) {
    var currentDate = new Date(date);
    var years = currentDate.getFullYear();
    var months = currentDate.getMonth();
    var days = currentDate.getDate();
    if (days < 10) {
        days = "0".concat(days);
    }
    if (months < 10) {
        months = "0".concat(months);
    }
    var result = "".concat(years, "-").concat(months, "-").concat(days);
    return result;
}
function setDefaultDate() {
    if ($start === null || $end === null) {
        throw new Error('error');
    }
    var endDate = new Date().getTime();
    var correctEndDate = getCorrectFormatDate(endDate);
    var yearInMs = 1000 * 60 * 60 * 24 * 365;
    var startDate = endDate - yearInMs;
    var correctStartDate = getCorrectFormatDate(startDate);
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
function getPrice(data, amount) {
    var price = data.market_data.current_price.usd * amount;
    return price;
}
function getCoinData(coinData) {
    var name = coinData.name.toLowerCase();
    if (name.includes(' ')) {
        name = name.replaceAll(' ', '-');
    }
    var link = "https://www.coingecko.com/en/coins/".concat(name);
    var icon = coinData.image.thumb;
    var data = { link: link, icon: icon };
    return data;
}
function renderStartPrice() {
    $startPrice.textContent = "".concat(state.price.start.toFixed(5), "$");
}
function renderEndPrice() {
    $endPrice.textContent = "".concat(state.price.end.toFixed(5), "$");
}
function renderImg() {
    $coinUrl.setAttribute('href', "".concat(state.selectedCoin.link));
    $coinIcon.setAttribute('src', state.selectedCoin.icon);
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var startDate, endDate, coinList, coinId, startDateData, endDateData, coinData, netProfit, profitability;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startDate = $start.value.split('-').reverse().join('-');
                    endDate = $end.value.split('-').reverse().join('-');
                    coinList = coinAPI_js_1.coinAPI.getList();
                    coinId = coinAPI_js_1.coinAPI.getId($coin.value, coinList);
                    return [4 /*yield*/, coinAPI_js_1.coinAPI.requestData(coinId, startDate)];
                case 1:
                    startDateData = _a.sent();
                    return [4 /*yield*/, coinAPI_js_1.coinAPI.requestData(coinId, endDate)];
                case 2:
                    endDateData = _a.sent();
                    coinData = getCoinData(endDateData);
                    state.amount = Number($amount.value);
                    checkAmount();
                    state.price.start = getPrice(startDateData, state.amount);
                    state.price.end = getPrice(endDateData, state.amount);
                    state.selectedCoin.icon = coinData.icon;
                    state.selectedCoin.link = coinData.link;
                    netProfit = getNetProfit(state.price.start, state.price.end);
                    profitability = getProfitability(state.price.start, state.price.end);
                    state.netProfit = netProfit;
                    state.profitability = profitability;
                    renderResultInfo();
                    renderStartPrice();
                    renderEndPrice();
                    renderImg();
                    return [2 /*return*/];
            }
        });
    });
}
function app() {
    var _this = this;
    $check.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, main()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.app = app;
