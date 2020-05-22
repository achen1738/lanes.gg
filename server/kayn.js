const { Kayn } = require('kayn');
console.log(process.env.API_KEY);
const kayn = Kayn(process.env.API_KEY)({
  requestOptions: {
    burst: true
  }
});

module.exports = kayn;
