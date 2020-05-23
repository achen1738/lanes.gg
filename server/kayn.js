const { Kayn } = require('kayn');
require('dotenv').config();
const kayn = Kayn(process.env.API_KEY)({
  requestOptions: {
    burst: true
  }
});

module.exports = kayn;
