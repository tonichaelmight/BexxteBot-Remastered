// REQUIRES
const ev = require('./ev.js'); // environment variables
const tmi = require('tmi.js'); // twitch tingz
const cooldowns = require('./cooldowns.js'); // connects to cooldowns db
const {exec} = require('child_process'); // function that runs shell scripts
const {configure} = require('./setup.js'); // connects to setup file


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