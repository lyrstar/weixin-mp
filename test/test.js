'use strict';
const WeChatMP = require('../index');

let client = new WeChatMP('wx5b0235cb31f8a27f', '829e2cb8ca2b0617523e83e37bc96306'
    , 'ZexDXSbdyVlF806WLrZathWqmU2uqEHApmVV_e65frIw4O_1UB0-rzYdPsE0IhQVYT9ABhuGF-z6CY114hcKhu3PHCbe0UMXllObphaBIybI3_5pHNFhCYNts2O7ue2ZPTFbADAYCO');
console.log(client);
console.log(client.getAccessToken());