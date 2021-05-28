// REQUIRES
const ev = require('./ev.js'); // environment variables
const tmi = require('tmi.js'); // twitch tingz
const cooldowns = require('./cooldowns.js'); // connects to cooldowns db
const {exec} = require('child_process'); // function that runs shell scripts
const {configure} = require('./setup.js'); // connects to setup file
const {bexxteConfig} = require('./config.js'); // links to configuration file


// ESTABLISH CLIENT CONNECTION
const client = new tmi.Client({
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: ev.BOT_NAME,
    password: ev.TWITCH_OAUTH_TOKEN
  },
  channels: [ev.CHANNEL_NAME]
});

client.connect();

// configure chat color; option to greet chat
configure();



// this is the function that actually reads every message; desicions on how the bot acts are contained within
client.on('message', (channel, tags, message, self) => {

  // PARAMETER DESCRIPTIONS
	//console.log(channel); // the channel the chat is in; should match env_vars.CHANNEL_NAME
	//console.log(tags); // contains metadata about the message and the user who sent it; bexxtebot tags below as example.
	/*
  {
    'badge-info': { subscriber: '1' },
    badges: { moderator: '1', subscriber: '0' },
    color: '#FF69B4',
    'display-name': 'BexxteBot',
    'emote-sets': '0,301288873',
    mod: true,
    subscriber: true,
    'user-type': 'mod',
    'badge-info-raw': 'subscriber/1',
    'badges-raw': 'moderator/1,subscriber/0',
    username: 'bexxtebot',
    emotes: { '302574576': [ '43-51' ] },
    'emotes-raw': '302574576:43-51',
    'message-type': 'chat'
  }
  */
	//console.log(message); // contains the actual message content as a string
	//console.log(self); // true if the bot sent the message, false otherwise
  //END PARAMETER DESCRIPTIONS


  //MOOBOT HATE
  /* 
  if (tags.username === 'moobot') {
		const randNum = Math.floor(Math.random() * 30);

		switch (randNum) {
			case 0:
			case 1:
			case 2:
				client.say(channel, 'grrrrr');
				return;
			case 3:
				client.say(channel, 'hisssssss');
				return;
			default:
				return;
		}
	}
  */
  // END MOOBOT HATE


  // checks mod status
  const isMod = tags.mod;

  // lowercase everything for easy matching
  message = message.toLowerCase();


  // MODERATION


});