'use strict';
const WeChatMP = require('../index');

let client = new WeChatMP('wx5b0235cb31f8a27f', '829e2cb8ca2b0617523e83e37bc96306'
    , 'ykuGY5Bnm22sSZDBPfSVXQyZbqpvFC2O-GQi_zskDilE2ZdYHd2HbaSkXefZLc0dfmKTdhk_v0Y_dnx80jV_fRghc-nb_IGI9WoKEePzjML-3t8s99WoJTkypcK1ussfFAVcAAAJEZ');
console.log(client);
client.getUserList().then(d => console.log(d)).catch(e => console.log(e))