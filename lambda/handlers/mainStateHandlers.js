var Alexa = require('alexa-sdk');

var constants = require('../constants/constants');
var alexaMeetups = require('../data/alexaMeetups');
var convertArrayToReadableStr = require('../helper/convertArrayToReadableStr');
var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
	'LaunchRequest': function(){
		var userName = this.attributes['userName'];
	  	if(userName){
	  		this.handler.state = constants.states.MAIN;
	  		this.emitWithState('LaunchRequest');
	  		this.emit(':ask', `Welcome back ${userName}! You can ask me about the various alexa meetups around the world or listen to the Alexa Dev chat podcast.`, "What would you like to do?");
	  	}else{
	  		this.handler.state = constants.states.ONBOARDING;
	  		this.emitWithState('Newsession');
	  		this.emit(':ask', 'Welcome to Voice Devs, The skill that gives you information about the alexa developer community. You can ask me about the various alexa meetups around the world, or listen to the podcast. But first, I\'d like to get to know you better. Tell me your name by saying: My name is, and then your name.', 'Tell me your name by saying: My name is, and then your name.');
	  	}
	},
	  'AlexaMeetupNumbersIntent': function(){
  	var meetupsNum = alexaMeetups.length;
  	this.emit(':ask', `I currently know of ${meetupsNum} Alexa developer meetups. Check to see if your city is one of them`, 'How can I help there?')
  },
  'AlexaMeetupCityCheckIntent': function(){
  	// Get slot values
  	var USCitySlot = this.event.request.intent.slots.USCity.value;
  	var EuropeanCitySlot = this.event.request.intent.slots.EuropeanCity.value;
  	//Get city
  	var cityName;
  	if(USCitySlot){
  		cityName = USCitySlot;
  	}else if(EuropeanCitySlot){
  		cityName = EuropeanCitySlot;
  	}
  	else {
  		this.emit(':ask', "Sorry, I didn't recognise that city name", "How can I help?");
  	}
  	// Check for City 
  	var cityMatch = false;
  	for(var i = 0; i < alexaMeetups.length; i++){
  		if(alexaMeetups[i].city.toLowerCase() === cityName.toLowerCase()){
  			cityMatch = true;
  		}
  	}
  	// Add London Audio
  	var londonAudio = '';
  	if(cityName.toLowerCase() === 'london'){
  		londonAudio = '<audio src="https://s3.amazonaws.com/yingrong-alexa-assets/london.mp3" />';
  	}
  	// Response to user
  	if(cityMatch){
  		this.emit(':ask', ` ${londonAudio} Yes! ${cityName} has an Alexa developer meetup!`, 'How can i help?');
  	}else{
  		this.emit(':ask', `Sorry, looks like ${cityName} doesn't have an Alexa developer meetup yet - why don't you start one?`, "How can i help?");
  	}
  },
  'AlexaMeetupOrgniserCheckIntent': function(){
  	var USCitySlot = this.event.request.intent.slots.USCity.value;
  	var EuropeanCitySlot = this.event.request.intent.slots.EuropeanCity.value;
  	var cityName;
  	if(USCitySlot){
  		cityName = USCitySlot;
  	}else if(EuropeanCitySlot){
  		cityName = EuropeanCitySlot;
  	}
  	else {
  		this.emit(':ask', "Sorry, I didn't recognise that city name", "How can I help?");
  	}
  	// Check for City 
  	var cityMatch = false;
  	var organiser = '';
  	for(var i = 0; i < alexaMeetups.length; i++){
  		if(alexaMeetups[i].city.toLowerCase() === cityName.toLowerCase()){
  			cityMatch = true;
  			organiser = alexaMeetups[i].organisers;
  		}
  	}
  	// Add London Audio
  	var londonAudio = '';
  	if(cityName.toLowerCase() === 'london'){
  		londonAudio = '<audio src="https://s3.amazonaws.com/yingrong-alexa-assets/london.mp3" />';
  	}
  	// Response to user
  	if(cityMatch){
  		if(organiser.length === 1){
  			this.emit(':ask', `${londonAudio} The organiser of the ${cityName} is ${organiser[0]}`, 'How can i help?');
  		}else{
  			this.emit(':ask', `The organisers of the ${cityName} are ${convertArrayToReadableStr(organiser)}`, 'How can i help?');
  		}
 
  	}else{
  		this.emit(':ask', `Sorry, looks like ${cityName} doesn't have an Alexa developer meetup yet - why don't you start one?`, "How can i help?");
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
  	this.emit(':ask', 'You can ask me about the various alexa meetups around the world, or listen to the podcast. But first, I\'d like to get to know you better. Tell me your name by saying: My name is, and then your name.', 'Tell me your name by saying: My name is, and then your name.');
  },
  'Unhandled': function(){
  	this.emitWithState('AMAZON.HelpIntent');
  }
})

module.exports = mainStateHandlers;