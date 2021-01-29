const Config = require('config-js');
const config = new Config('./config.js');
const ForgeSDK = require('forge-apis');

class Token {
	getTokenPublic (callback) {
		let clientId = config.get('credentials.client_id');
		let clientSecret = config.get('credentials.client_secret');

		let apiInstance = new ForgeSDK.AuthClientTwoLegged(clientId, clientSecret, config.get('scopes.public'), config.get('autoRefresh'));
		apiInstance.authenticate().then(function (data) {
			callback(data, apiInstance);
		});
	}

	getTokenInternal (callback) {
		let clientId = config.get('credentials.client_id');
		let clientSecret = config.get('credentials.client_secret');

		let apiInstance = new ForgeSDK.AuthClientTwoLegged(clientId, clientSecret, config.get('scopes.internal'), config.get('autoRefresh'));
		apiInstance.authenticate().then(function (data) {
			callback(data, apiInstance);
		});
	}
}

module.exports = Token;