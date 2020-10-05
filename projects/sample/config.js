const axios = require("axios");

const devices = null;

const sessionInfo = {};

/**
 * Do stuff that should be done before the process starts.
 * Perhaps a login or a configuration
 * @param browser
 */
const beforeAll = async (browser) => {};

const pages = [
  {
    url: "https://google.com",
    hooks: {
      // BeforePageScreengrab is where you should manipulate the page
      // Scroll, zoom, click on elements that should be clicked
      beforePageScreengrab: async (browser, page, sessionInfo) => {},
      // Before page navigation can be used to login to the page and obtain session variables
      beforePageNavigation: async (browser, page, sessionInfo) => {},
    },
  },
];

module.exports = { devices, sessionInfo, beforeAll, pages };
