const request = require("request");
const querystring = require("querystring");

class CoinMarketCal {
    constructor(client_id, client_secret) {
        this.client_id = client_id;
        this.client_secret = client_secret;

        this.generateAccessToken = this.generateAccessToken.bind(this);
    }

    generateApiPath(queryObj, endpoint) {
        return `https://api.coinmarketcal.com/${endpoint}?${querystring.stringify(queryObj)}`;
    }

    sendRequest(path, cb) {
        return new Promise((resolve, reject) => {
            request(path, (err, res, body) => {
                if(res.statusCode === 400) {
                    throw new Error();
                } else if(res.statusCode === 401) {
                    throw new Error();
                } else {
                    resolve(cb(JSON.parse(body)));
                }
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

    getEvents(access_token, eventQuery, cb) {
        const queryObj = {
            access_token,
            ...eventQuery
        };

        const path = this.generateApiPath(queryObj, "v1/events");
        this.sendRequest(path, cb);
    }
}

module.exports = CoinMarketCal;
