// REQUIRES
const ev = require('./ev.js');
const tmi = require('tmi.js');
const cooldowns = require('./cooldowns.js');


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