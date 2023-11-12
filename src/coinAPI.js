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

export const coinAPI = {
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