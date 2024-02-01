import coinsData from '../data/coins.json'

type coinData = {
    [key: string]: string
}

const COINS_WHITE_LIST: string[] = [
    'BTC', 'ETH',
    'SOL', 'BNB', 'XRP',
    'ADA', 'DOGE',
    'TRX', 'DOT',
    'TON', 'SHIB',
    'XLM', 'XMR'
];

const COINS_BLACK_LIST: string[] = [ 
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
    getList(): coinData[] {
        const resultList: coinData[] = [];
        
        for (const coinData of coinsData) {
            if (COINS_WHITE_LIST.includes(coinData.symbol.toUpperCase())
                && !COINS_BLACK_LIST.includes(coinData.name)) {
                resultList.push(coinData);
            }
        }

        return resultList;
    },    

    getNamesList(): string[] {
        const data: coinData[] = this.getList();
        const resultArr: string[] = [];
    
        for (let coinData of data) {
            resultArr.push(coinData.name);
        }
    
        return resultArr;
    },

    getId(name: string, data: coinData[]): number {
        let id: number = 0;
        for (const coinData of data) {
            if (coinData.name === name) {
                id = Number(coinData.id);
            }
        }
    
        return id;
    },

    async requestData(id: number, date: string): Promise<any> {
        let data: any = {};
        const url: string = 
            `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`;
        const request: Promise<Response> = fetch(url);
    
        try {
            const response: Response = await request;
            data = await response.json();
        } catch (error) {
            console.error(error);
        }
            
        return data;
    }
}