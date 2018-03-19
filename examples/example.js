const CoinMarketCal = require("../lib/coinmarketcal");

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
