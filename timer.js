const ev = require('./ev.js');

// these are things that we want on a timer
const phrases = [
  '​Join the Basement Party and hang out offline here: https://discord.gg/bexxters',

  'Link your amazon prime to twitch and get a free sub every month, ya nerds',

  'Hit the <3 to follow and get notified whenever I go live! It also makes my cold heart a little bit warmer!',

  '​Want ad-free viewing, cute bat emotes, and a cool tombstone next to your name? Hit the subscribe button to support the stream bexxteLove',

  'Hey there everyone, my name is BexxteBot! I am a custom chat bot designed specifically for this channel; if you see me do or say anything crazy, make sure to let @bexxters or @tonichaelmight know so that it can be fixed ASAP. Happy Chatting! bexxteLove',

  `Install bttv here (https://betterttv.com/) to use these cool emotes: 
      blobDance 
      monkaTOS 
      catblobDance 
      hypeE 
      think3D 
      HYPERS  
      elmoFire 
      WEEWOO 
      WELCOME 
      nutButton 
      ChefsKiss 
      AerithBop 
      KEKW 
      OhMyPoggies 
      peepoRiot
      HoldIt`,

  'I\'m thrilled to announce I\'ll be participating in GhostCon! A virtual convention taking place Halloween weekend celebrating spooky streamers and artists! I\'ll be live to celebrate on Sunday, Oct 31 at 8pm! Find out more here: https://ghostcon.net/about.php'
];

const loggedIndices = [];

// chooses a random phrase
function saySomethingRandom() {

  let randomIndex;

  while (!randomIndex || loggedIndices.includes(randomIndex)) {

    randomIndex = Math.floor(Math.random() * phrases.length);

  }

  loggedIndices.push(randomIndex);

  if (loggedIndices.length > 3) {
    loggedIndices.shift();
  }
  
  // returns the random phrase within 12 - 35 minutes
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(phrases[randomIndex]);
    }, Math.floor(Math.random() * 1380000) + 720000);
  });
}


// exports function
exports.timer = async function (client) {

  while (true) {

    // gets the result of promise and chats it
    try {
      const msg = await saySomethingRandom();
      client.say(ev.CHANNEL_NAME, msg);
    } catch (error) {
      try {
        const currentDateAndTime = new Date().toLocaleString('en-US', { timeZone: 'UTC', timeZoneName: 'short' });
        const datePlusError = `${currentDateAndTime} :: ${error}\n`;
        fs.appendFile('error.txt', datePlusError, appendError => {
          if (appendError) throw appendError;
        });
      } catch (innerError) {
        console.log('an error occurred while trying to log an error :/');
        console.log(innerError);
      }
    }
    
    

  }

}