/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 340:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(650);
/**
 * imports
 */



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

const coinNamesList = await _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__/* .coinAPI */ .S.getNamesList();
renderList(coinNamesList, $coin);
setDefaultDate();

/**
 * lib
 */

function renderList(list) {
    list.forEach(name => {
        const $newOption = new Option(name, name);
        $coin.append($newOption);
        if ($newOption.textContent === 'Bitcoin') {
            $newOption.setAttribute('selected', 'selected');
        }
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
        $result.classList.add('success');
        $result.classList.remove('failure');
    } else {
        $result.classList.add('failure');
        $result.classList.remove('success');
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

    const coinList = await _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__/* .coinAPI */ .S.getList();

    const coinId = _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__/* .coinAPI */ .S.getId($coin.value, coinList);
    const startDateData = await _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__/* .coinAPI */ .S.requestData(coinId, startDate);
    const endDateData = await _coinAPI_js__WEBPACK_IMPORTED_MODULE_0__/* .coinAPI */ .S.requestData(coinId, endDate);

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

function app() {
    $check.addEventListener('click', async (event) => {
        event.preventDefault();
        await main();
    });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 650:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ coinAPI)
/* harmony export */ });
const COINS_WHITE_LIST = [
    'BTC', 'ETH',
    'SOL', 'BNB', 'XRP',
    'ADA', 'DOGE',
    'TRX', 'DOT',
    'TON', 'SHIB',
    'XLM', 'XMR'
];

const COINS_BLACK_LIST = [ 
    'Ethereum (Wormhole)',
    'SOL (Wormhole)', 
    'Wrapped Solana', 
    'OEC Binance Coin', 
    'Heco-Peg Binance Coin', 
    'Binance Coin (Wormhole)',
    'Binance-Peg XRP',
    'HarryPotterObamaPacMan8Inu',
    'Heco-Peg XRP',
    'WarioXRPDumbledoreYugioh69Inu',
    'Binance-Peg Cardano', 
    'Binance-Peg Dogecoin',
    'Doge on Pulsechain',
    'TRON (BSC)', 
    'Binance-Peg Polkadot',
    'Tokamak Network', 
    'TON Community', 
    'To The Moon Token', 
    'Shiba Inu (Wormhole)',
    'SHIB (Ordinals)',
];

const coinAPI = {
    async getData(path) {
        try {
            const response = (await fetch(path)).json();
            const responseData = await response;
            return responseData;
        } catch (error) {
            console.error(error);
        }
    },

    async getList() {
        let coinsData = '';
        try {
            coinsData = await this.getData('../data/coins.json');
        } catch (error) {
            console.error(error);
        }

        const resultList = [];
        
        for (const coinData of coinsData) {
            if (COINS_WHITE_LIST.includes(coinData.symbol.toUpperCase())
                && !COINS_BLACK_LIST.includes(coinData.name)) {
                resultList.push(coinData);
            }
        }

        return resultList;
    },

    async getNamesList() {
        const data = await this.getList();
        const resultArr = [];
    
        for (let coinData of data) {
            resultArr.push(coinData.name);
        }
    
        return resultArr;
    },

    getId(name, data) {
        let id = '';
        for (const coinData of data) {
            if (coinData.name === name) {
                id = coinData.id;
            }
        }
    
        return id;
    },

    async requestData(id, date) {
        let data = {};
        const url = 
            `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`;
        const request = fetch(url);
    
        try {
            const response = await request;
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
            
        return data;
    }
}

/***/ }),

/***/ 138:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(340);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_DOM_js__WEBPACK_IMPORTED_MODULE_0__]);
_DOM_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


(0,_DOM_js__WEBPACK_IMPORTED_MODULE_0__/* .app */ .l)();
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	
/******/ })()
;