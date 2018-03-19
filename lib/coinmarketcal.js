const request = require("request");
const querystring = require("querystring");

class CoinMarketCal {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;

        // Public Methods
        this.generateAccessToken = this.generateAccessToken.bind(this);
        this.getCoins = this.getCoins.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    generateApiPath(queryObj, endpoint) {
        return `https://api.coinmarketcal.com/${endpoint}?${querystring.stringify(queryObj)}`;
    }

    sendRequest(path, cb) {
        return new Promise((resolve, reject) => {
            request(path, (err, res, body) => {
                resolve(cb(JSON.parse(body)));
            });
        });
    }

    generateAccessToken(cb) {
        const queryObj = {
            grant_type: "client_credentials",
            client_id: this.client_id,
            client_secret: this.client_secret,
        };

        const path = this.generateApiPath(queryObj, "oauth/v2/token");
        this.sendRequest(path, cb);
    }

    getCoins(access_token, cb) {
        const queryObj = {
            access_token,
        };

        const path = this.generateApiPath(queryObj, "v1/coins");
        this.sendRequest(path, cb);
    }

    getCategories(access_token, cb) {
        const queryObj = {
            access_token,
        };

        const path = this.generateApiPath(queryObj, "v1/categories");
        this.sendRequest(path, cb);
    }

    getEvents(access_token, cb) {

    }
}

const coinmarketcal = new CoinMarketCal(authObj.client_id, authObj.client_secret);

const useAccessToken = (response) => {
    const { access_token } = response;
    console.log(access_token);
    const listCategories = (categories) => {
        // console.log(categories);
    };

    const listCoins = (coins) => {
        // console.log(coins);
    };

    coinmarketcal.getCategories(access_token, listCategories);
    coinmarketcal.getCoins(access_token, listCoins);
}
coinmarketcal.generateAccessToken(useAccessToken);
