var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');
var convertArrayToReadableStr = require('../helper/convertArrayToReadableStr');
var onboardingStateHandlers = Alexa.CreateStateHandler(constants.states.ONBOARDING, {
	'NewSession': function(){
	  	// Check to see data in session
	  	var userName = this.attributes['userName'];
	  	if(userName){
	  		this.handler.state = constants.states.MAIN;
	  		this.emitWithState('LaunchRequest');
	  		this.emit(':ask', `Welcome back ${userName}! You can ask me about the various alexa meetups around the world or listen to the Alexa Dev chat podcast.`, "What would you like to do?");
	  	}else{
	  		this.emit(':ask', 'Welcome to Voice Devs, The skill that gives you information about the alexa developer community. You can ask me about the various alexa meetups around the world, or listen to the podcast. But first, I\'d like to get to know you better. Tell me your name by saying: My name is, and then your name.', 'Tell me your name by saying: My name is, and then your name.');
	  	}
  	},
  	  'NameCaptureIntent': function(){
  	var USFirstNameSlot = this.event.request.intent.slots.USFirstName.value;
  	var UKFirstNameSlot = this.event.request.intent.slots.UKFirstName.value;
  	var userName;
  	if(USFirstNameSlot){
  		userName = USFirstNameSlot;
  	}else if(UKFirstNameSlot){
  		username = UKFirstNameSlot;
  	}
  	// Save name in Session Attributes 
  	if(userName){
  		this.attributes['userName'] = userName;
  		this.emit(':ask', `ok ${userName}! Tell me what country you're from by saying: I'm from, and then the country you're from`, "Tell me what country you're from by saying: I'm from, and then the country you're from");
  	}else{
  		this.emit(':ask', "Sorry I didn't recognise that name. Please tell me your name by saying: My name is, and then your name.", 'Please tell me your name by saying: My name is, and then your name.');
  	}
  },
	'CountryCaptureIntent': function(){
		var country = this.event.request.intent.slots.Country.value;
		//Get username from session
		var userName = this.attributes['userName'];
		// save country in session
		if(country){
			this.handler.state = constants.states.MAIN;
			this.attributes['country'] = country;
			this.emit(':ask', `Ok, ${userName}! Your from ${country}, that's great! You can ask me about the various meetups around the world, or listen to the Alexa Dev chat podcast. What would you like to do?`, "What would you like to do?");
		}else{
			this.emit(':ask', "Sorry I didn't recognise that country. Please tell me your country by saying: I'm from, and then the country you are from.", "Please tell me your country by saying: I'm from, and then the country you are from.");
		}
	},
  'AMAZON.StopIntent': function(){
  	this.emit(':tell', 'GoodBye');
  },
  'AMAZON.CencelIntent': function(){
  	this.emit(':tell', 'GoodBye');
  },
  'SessionEndedRequest': function(){
  	this.emit(':saveState', true);
  },
  'AMAZON.HelpIntent': function(){
  	var userName = this.attributes['userName'];
  	if(userName){
  		this.emit(':ask', "Please tell me your country by saying: I'm from, and then the country you are from.", "Please tell me your country by saying: I'm from, and then the country you are from.");
  	}else{
  		this.emit(':ask', "Please tell me your name by saying: My name is, and then your name.", 'Please tell me your name by saying: My name is, and then your name.');
  	}
  },
  'Unhandled': function(){
  	this.emitWithState('AMAZON.HelpIntent');
  }
})

module.exports = onboardingStateHandlers;