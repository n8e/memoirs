var getbabelRelayPlugin = require('babel-plugin-relay');
var schema = require('../data/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
