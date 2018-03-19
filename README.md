# coinmarketcal-node
A node.js wrapper for the coinmarketcal API.

## Installation
```sh
$ npm install coinmarketcal-node
```

## Quick Start 

Get API keys from https://api.coinmarketcal.com/.

Initialize client with client_id and client_secret.

```
const coinmarketcal = new CoinMarketCal(client_id, client_secret);
```

Generate an access token with client and pass in a callback function which has the access_token as a parameter.
```
coinmarketcal.generateAccessToken(callback);
```

Within the callback, use the access_token to request other API resources.

```
const callback = (access_token) => {
  coinmarketcal.getCategories(access_token, categoriesCb);
  coinmarketcal.getCoins(access_token, coinsCb);
  coinmarketcal.getEvents(access_token, {}, eventsCb);
}
```

## Detailed Example

```
const CoinMarketCal = require("coinmarketcal-node");

// Get API keys @ https://api.coinmarketcal.com/
const authObj = {
    client_id: "",
    client_secret: "",
};

const coinmarketcal = new CoinMarketCal(authObj.client_id, authObj.client_secret);

// Uncomment the console.log()'s below to view response data. 
const useAccessToken = (response) => {
    const { access_token } = response;

    // console.log(access_token);

    const listCategories = (categories) => {
        // console.log(categories);
    };

    const listCoins = (coins) => {
        // console.log(coins);
    };

    const listEvents = (events) => {
        // console.log(events);
    };

    // These resources only require a valid access token to return data.
    coinmarketcal.getCategories(access_token, listCategories);
    coinmarketcal.getCoins(access_token, listCoins);

    /*
    The event resource takes additional query params for filtering events. Please review the 
    the additional parameters for the events resource @ https://api.coinmarketcal.com/
    */

    const eventQuery = {
        page: 1, // integer? - Default value: 1
        max: 5, // integer? - Default value: 16 Max: 300
        // dateRangeStart?: string - Default Value: Today - Format - "MM/DD/YYYY",
        // dateRangeEnd?: string - Default Value: Most recent event - Format - "MM/DD/YYYY",
        // coins?: string - "bitcoin,ethereum,ripple",
        // categories?: string - "1,2,3",
        // sortBy?: string - "created_desc" || "hot_events",
        // showOnly?: string - "hot_events",
    };

    coinmarketcal.getEvents(access_token, eventQuery, listEvents);
};

// Generate access token with a callback function to access response data.
coinmarketcal.generateAccessToken(useAccessToken);

```
