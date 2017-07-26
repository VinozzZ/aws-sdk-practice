var Alexa = require('alexa-sdk');
var constants = require('./constants/constants');
// Data
var onboardingStateHandlers = require('./handlers/onBoardingStateHandlers');
var mainStateHandlers = require('./handlers/mainStateHandlers');


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.registerHandlers(
  	onboardingStateHandlers,
  	mainStateHandlers
  	);
  alexa.execute();
};


