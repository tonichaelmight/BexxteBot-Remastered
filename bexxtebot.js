// REQUIRES
const ev = require('./ev.js'); // environment variables
const tmi = require('tmi.js'); // twitch tingz
const cooldowns = require('./cooldowns.js'); // connects to cooldowns db
const { exec } = require('child_process'); // function that runs shell scripts
const { configure } = require('./setup.js'); // connects to setup file
const config = require('./config.js'); // links to configuration file
const hangman = require('./hangman/hangman.js');

const allLetters = new RegExp('[a-zA-Z]');
const caps = new RegExp('[A-Z]');
const lowers = new RegExp('[a-z]');

const prideEmotes = [
  'AsexualPride', 
  'BisexualPride', 
  'GayPride', 
  'GenderFluidPride', 
  'LesbianPride', 
  'PansexualPride', 
  'TransgenderPride',
  'IntersexPride',
  'NonbinaryPride',
  'bexxteGpride',
  'bexxteLpride',
  'bexxteNBpride',
  'bexxteApride',
  'bexxteTpride',
  'bexxtePpride',
  'bexxteIpride',
]


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
configure(client);



// this is the function that actually reads every message; desicions on how the bot acts are contained within
client.on('message', (channel, tags, message, self) => {

  // PARAMETER DESCRIPTIONS
  //console.log(channel); // the channel the chat is in; should match ev.CHANNEL_NAME
  //console.log(tags); // contains metadata about the message and the user who sent it; bexxtebot tags below as example.
	/*
  Check tags.txt for examples
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
  const isMod = (tags.mod || tags.username === ev.CHANNEL_NAME);

  // lowercase everything for easy matching
  message = message.toLowerCase();


  // MODERATION

  // mods are not subject to this moderation
  if (!isMod) {

    config.forbiddenWords.forEach(word => {
      if (message.includes(word)) {
        client.timeout(channel, tags.username, 20, 'used forbidden word');
        client.color(channel, 'red');
        client.say(channel, `Naughty naughty, @${tags.username}! We don't use that word here.`);
        client.color(channel, 'hotpink');
        return;
      }
    });

  }
  //END MODERATION


  // LURK
  if (
    message === '!lurk' ||
    message.startsWith('!lurk ') ||
    message.endsWith(' !lurk') ||
    message.includes(' !lurk ')) {

    client.say(channel, `${tags.username} is now lurkin in the chat shadows. Stay awhile and enjoy! bexxteCozy`);
    return;
  }


  // ignore messages from bexxtebot; ignore any other messages that don't start with '!'
  if (self || !message.startsWith('!')) return;

  // remove the '!' and establish command var
  let command = message.slice(1);

  // the command is only the word prefixed with '!'; remove the rest if applicable
  if (command.indexOf(' ') !== -1) {
    command = command.slice(0, command.indexOf(' '));
  }

  // ignore if command is inactive
  if (!config.bexxteConfig.allCommands[command]) {
    return;
  }

  

  // cooldowns don't apply to mods
  if (!isMod) {
    if (cooldowns.checkCooldown(command)) {
      return;
    }
  }



  //
  // BASIC COMMANDS
  //

  // BTTV
  if (command === 'bttv') {
    cooldowns.createCooldown(command);

    client.say(
      channel,
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
      HoldIt`
    );
    return;
  }

  // COMMANDS
  if (command === 'commands') {
    cooldowns.createCooldown(command);

    client.say(channel, "Want to see all of the commands at my disposal? Head to https://bexxtebot.github.io for a full list. I'm still learning new things, so check back every now and then to see if there's anything new!");
  }

  // DISCORD
  if (command === 'discord') {
    cooldowns.createCooldown(command);

    client.say(channel, '​Join the Basement Party and hang out offline here: https://discord.gg/bdMQHsd');
    return;
  }

  // FOLLOW
  if (command === 'follow') {
    cooldowns.createCooldown(command);

    client.say(channel, 'Hit the <3 to follow and get notified whenever I go live! It also makes my cold heart a little bit warmer!');
    return;
  }

  // MUSIC
  if (command === 'music') {
    cooldowns.createCooldown(command);

    if (config.bexxteConfig.playlist.length > 0) {
      client.say(channel, `Today's playlist is ${config.bexxteConfig.playlist}`);
    }

    return;
  }

  // PRIME
  if (command === 'prime') {
    cooldowns.createCooldown(command);

    client.say(channel, '​Link your amazon prime to twitch and get a free sub every month, ya nerds');
    return;
  }

  // RAID
  if (command === 'raid' && isMod) {
    cooldowns.createCooldown(command, 2000); //two seconds

    client.say(channel, `​Welcome and thank you for the raid! When people raid, they sadly don't count to twitch averages, so it would be a big help if you could get rid of the '?referrer=raid' in the url! I appreciate you so much! bexxteLove`);
    return;
  }

  // SHOUTOUT
  if (command === 'so' && isMod) {
    // creates variable for shoutout-ee
    let soee = message.slice(4);

    // eliminates messages with more than one word after the command
    if (soee.indexOf(' ') !== -1) {
      return;
    }

    // allow for @ at the beinning
    if (soee.startsWith('@')) {
      soee = soee.slice(1);
    }

    // a twitch username must be between 4 and 25 characters
    if (soee.length < 4 || soee.lenth > 25) {
      return;
    }

    // cannot shout yourself out
    if (soee === tags.username) {
      client.say(channel, `Nice try @${soee}, you can't give yourself a shoutout!`);
      return;
    }

    // cannot shoutout streamer
    if (soee === ev.CHANNEL_NAME) {
      client.say(channel, `@${ev.CHANNEL_NAME} is pretty cool, but she doesn't need a shoutout on her own channel.`);
      return;
    }

    // get channel information
    exec(
      `curl -X GET "https://api.twitch.tv/helix/search/channels?query=${soee}" \
      -H 'Authorization: Bearer ${ev.BEXXTEBOT_TOKEN}' \
      -H 'Client-id: ${ev.CLIENT_ID}'`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // output is entire search data
        let channelData = `${stdout}`;
        // parses to JSON
        channelData = JSON.parse(channelData);

        // isolates the channel we need; ideally it is the first channel
        for (const channel of channelData.data) {
          if (channel.broadcaster_login === soee) {
            channelData = channel;
            break;
          }
        }

        // console.log(channelData);

				/* sample channel data
        {
          broadcaster_language: '',
          broadcaster_login: 'bexxtebot',
          display_name: 'BexxteBot',
          game_id: '0',
          game_name: '',
          id: '688448029',
          is_live: false,
          tag_ids: [],
          thumbnail_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png',
          title: '',
          started_at: ''
        }
        */

        // if there is no exact match, no shoutout
        if (!channelData.broadcaster_login) {
          return;
        }

        // if there is no game data, do a simple shoutout
        if (!channelData.game_name) {
          client.say(channel, `Everyone go check out @${channelData.display_name} at twitch.tv/${channelData.broadcaster_login}! bexxteLove`);
          return;
        }

        // determine if streamer is live
        if (channelData.is_live) {
          if (channelData.game_name === 'Just Chatting') {
            client.say(channel, `Everyone go check out @${channelData.display_name} at twitch.tv/${channelData.broadcaster_login}! They are currently "${channelData.game_name}" bexxteLove`);
            return;
          } else {
            client.say(channel, `Everyone go check out @${channelData.display_name} at twitch.tv/${channelData.broadcaster_login}! They are currently playing "${channelData.game_name}" bexxteLove`);
            return;
          }
          // or offline
        } else {
          if (channelData.game_name === 'Just Chatting') {
            client.say(channel, `Everyone go check out @${channelData.display_name} at twitch.tv/${channelData.broadcaster_login}! They were last seen "${channelData.game_name}" bexxteLove`);
            return;
          } else {
            client.say(channel, `Everyone go check out @${channelData.display_name} at twitch.tv/${channelData.broadcaster_login}! They were last seen playing "${channelData.game_name}" bexxteLove`);
            return;
          }
        }
      }
    );
    return;
  }

  // SUB
  if (command === 'sub') {
    cooldowns.createCooldown(command);

    client.say(channel, '​Want ad-free viewing, cute bat emotes, and a cool tombstone next to your name? Hit the subscribe button to support the stream bexxteLove');
    return;
  }

  // UPTIME
  if (command === 'uptime') {
    cooldowns.createCooldown(command);

    //const streamer = 'matthallplays';
    const streamer = ev.CHANNEL_NAME;

    exec(
      `curl -X GET "https://api.twitch.tv/helix/search/channels?query=${streamer}" \
      -H 'Authorization: Bearer ${ev.BEXXTEBOT_TOKEN}' \
      -H 'Client-id: ${ev.CLIENT_ID}'`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // output is entire search data
        let channelData = `${stdout}`;
        // parses to JSON
        channelData = JSON.parse(channelData);

        // isolates the channel we need; ideally it is the first channel
        for (const channel of channelData.data) {
          if (channel.broadcaster_login === streamer) {
            channelData = channel;
            break;
          }
        }

        if (!channelData.is_live) {
          client.say(channel, `Sorry, doesn't look like ${streamer} is live right now. Check back again later!`);
          return;
        }

        const currentTime = Date.now();
        // console.log(currentTime);

        const startTime = Date.parse(channelData.started_at);
        // console.log(startTime);

        let elapsedTime = currentTime - startTime;
        // console.log(elapsedTime);

        const hours = Math.floor(elapsedTime / (60000 * 60));
        elapsedTime = elapsedTime % (60000 * 60);

        const minutes = Math.floor(elapsedTime / 60000);
        elapsedTime = elapsedTime % 60000;

        const seconds = Math.floor(elapsedTime / 1000);

        client.say(channel, `${streamer} has been live for ${hours === 0 ? '' : `${hours} hours, `}${minutes} minutes and ${seconds} seconds.`);
        return;
      }
    );
  }

  // WHOMST
  if (command === 'whomst') {
    cooldowns.createCooldown(command, 2000); //two seconds

    client.say(channel, "​I'm a Variety Streamer mostly streaming RPGs, Horror, and Indie stuff because I'm not good at Battle Royale FPS games and can't commit to MMOs. You can catch me live five to six nights a week at 7:30pm EST! We do Spooky Sunday with horror/suspense games every Sunday!");
    return;
  }


  //
  // SPECIAL COMMANDS
  //


  // BAN
  if (command === 'ban') {
    // eliminates messages that are too short or too long to contain a valid username
    if (message.length < 9 || message.length > 30) {
      return;
    }

    // argument is everything after the command + ' '
    const username = message.slice(5);

    // eliminate messages with more than one word following the command
    if (username.indexOf(' ') !== -1) {
      return;
    }

    cooldowns.createCooldown(command);

    client.say(channel, `@${username} if the Twitch API would let me, I would ban you from this chat, but know that you are already banned from my heart. </3`);
    return;
  }

  // BLM
  if (command === 'blm') {
    cooldowns.createCooldown(command);

    client.say(channel, 'Black Lives Matter. Follow this link to learn about ways you can support the movement: https://blacklivesmatters.carrd.co/');
    return;
  }

  // content warning command
  if (command === 'cw') {
    cooldowns.createCooldown(command);

    if (config.bexxteConfig.contentWarning) {
      client.say(channel, `${config.bexxteConfig.contentWarning}`);
    } else {
      client.say(channel, 'The streamer has not designated any content warnings for this game.');
    }

    return;
  }

  // STAP
  if (command === 'stap') {
    cooldowns.createCooldown(command);

    client.say(channel, '​stop flaming ok! I dnt ned all da negatwiti yo ar geveng me right nau! bexxteGun');
    return;
  }

  // MUTE
  if (command === 'mute') {
    cooldowns.createCooldown(command);

    for (let i = 0; i < 3; i++) {
      client.say(channel, `@${ev.CHANNEL_NAME.toUpperCase()} HEY QUEEN 👸👸👸 YOU'RE MUTED`);
    }

    return;
  }

  // PRIDE
  if (command === 'pride') {
    cooldowns.createCooldown(command, 2000);

    let emoteString = '';
    let randNum;

    for (let i = 0; i < 10; i++) {
      randNum = Math.floor(Math.random() * prideEmotes.length);
      emoteString += prideEmotes[randNum] + ' ';
    }

    client.say(channel, emoteString);
    return;
  }

  // RAIDING
  if (command === 'raiding' && isMod) {
    // filter out messages with more than one word after the command
    if (message.slice(9).indexOf(' ') !== -1) {
      return;
    } else {
      // gets argument from message
      const argument = message.slice(9);

      // output based on argument
      switch (argument) {
        case 'cozy':
          client.say(channel, 'Cozy Raid bexxteCozy bexxteCozy');
          return;
        case 'love':
          client.say(channel, 'Bexxters Raid bexxteLove bexxteLove');
          return;
        case 'kiwi':
          client.say(channel, 'Kindred Kiwi Raid bexxteLove bexxteLove');
          return;
        case 'vibe':
          client.say(channel, 'Bexxters Raid bexxteBop bexxteBop');
          return;
        case 'aggro':
          client.say(channel, 'Bexxters Raid bexxteGun bexxteGun');
          return;
        default:
          client.say(channel, 'The !raiding command can be followed by any of these: cozy, love, kiwi, vibe, aggro');
          return;
      }
    }
  }

  // WELCOME
  if (command === 'welcome') {
    cooldowns.createCooldown(command);

    client.say(channel, 'his has bondage to you too owo WELCOME');
    return;
  }


  //
  // EXPERIMENTS
  //

  // HANGMAN
  if (command === 'hangman') {

    // kill switch
    if (message === "!hangman reset" && isMod) {
      hangman.reset();
      return;
    }

    // this needs to include mods
    if (cooldowns.checkCooldown(command)) {
      return;
    }

    cooldowns.createCooldown(command);

    // if a game is live already, ignore
    if (hangman.getStatus()) {
      return;
    }

    // otherwise start a game
    hangman.startHangman(client, ev.CHANNEL_NAME);
    return;

  }


  // GUESS (for hangman) 
  if (command === 'guess') {

    // a regular guess REQUIRES 8 characters exactly '!guess ?', where ? is any letter
    if (message.length !== 8) {
      // but we also need to test if they are guessing the whole phrase; a full phrase guess will be more than 8 characters always
      if (message.length > 8 && hangman.isReady()) {

        let phrase = message.slice(7);

        // console.log(phrase);

        phrase = phrase.toUpperCase();

        hangman.guessFullPhrase(client, ev.CHANNEL_NAME, tags.username, phrase);

      }
      return;
    }

    /* nevermind on the cooldown
    // this needs to include mods
    if (cooldowns.checkCooldown(command)) {
      return;
    }
    */

    // make sure she ready
    if (hangman.isReady()) {

      let userGuess = message[7];

      userGuess = userGuess.toUpperCase();

      // at this point, if it isn't a capital letter get rid of it
      if (userGuess.search(caps) === -1) {
        return;
      }

      // don't go further if it's been guessed already
      if (hangman.alreadyGuessed(userGuess)) {
        return;
      }

      // cooldowns.createCooldown(command, 3000);

      hangman.guess(client, ev.CHANNEL_NAME, tags.username, userGuess);
      return;

    }

  }

  // HELLO
  if (command === 'hello') {
    // '!hello ' is 7 characters and a twitch username must be at least 4 characters
    if (message.length >= 11) {
      // only one argument allowed, which no trailing spaces && a twitch username can have a maximum of 25 characters
      if (message.slice(7).indexOf(' ') === -1 && message.slice(7).length <= 25) {
        const recipient = message.slice(7);
        client.say(channel, `${tags.username} says 'Hello', @${recipient}`);
        return;
        // break out for more than one word after/argument too long
      } else {
        return;
      }

      // messages under 11 characters do not have enough characters to contain a valid username
    } else {
      return;
    }
  }

  // FORTUNE
  if (command === 'fortune') {
    cooldowns.createCooldown(command);

    return;
  }

  // BEXXTEBOT
  if (command === 'bexxtebot') {
    cooldowns.createCooldown(command);

    client.say(channel, 'Hey there everyone, my name is BexxteBot! I am a custom chat bot designed specifically for this channel; if you see me do or say anything crazy, make sure to let @bexxters or @tonichaelmight know so that it can be fixed ASAP. Happy Chatting! bexxteLove');
    return;
  }

  // SOCIALS
  if (command === 'socials') {
    cooldowns.createCooldown(command);

    client.say(channel, `Come follow me on these other platforms as well!         
    Twitter: ${ev.TWITTER}      
    TikTok: ${ev.TIK_TOK}`)
  }

  // VALIDATE
  if (command === 'validate') {
    cooldowns.createCooldown(command, 5000);

    // all the nice things bexxteBot has to say
    const validations = [
      'You are valid!!',
      'You matter!',
      'You are important!',
      'You are beautiful!',
      'You a boss ass bitch!'
    ];

    // generates a random index from validations
    function getRandomValidation() {
      return Math.floor(Math.random() * validations.length);
    }

    // get three random indices; make sure they're all different
    let v1, v2, v3;

    v1 = getRandomValidation();

    while (!v2 || v2 === v1) {
      v2 = getRandomValidation();
    }

    while (!v3 || v3 === v1 || v3 === v2) {
      v3 = getRandomValidation();
    }

    // she gives you three validation phrases
    client.say(channel,
      `@${tags.username}
        ${validations[v1]}
        ${validations[v2]}
        ${validations[v3]}`);
    return;
  }


  //
  // PEOPLE
  //

  // MARTA
  if (command === 'marta') {
    cooldowns.createCooldown(command, 5000); // 5 seconds

    client.say(channel, '​Check out (and maybe commission) our UwUest mod and amazing artist Marta over at https://twitter.com/_martuwu or https://martuwuu.carrd.co/ or https://twitch.tv/martuwu_');
    return;
  }

  // TIM
  if (command === 'tim') {
    cooldowns.createCooldown(command, 5000); // 5 seconds

    client.say(channel, '​my partner of 6 years. person I complain to when my stream randomly dies. pretty cool dude.');
    return;
  }

  // MICHAEL
  if (command === 'michael') {
    cooldowns.createCooldown(command, 5000); // 5 seconds

    client.say(channel, "Humor King tonichaelmight aka my best friend for over half my life??? we're old.");
    return;
  }

  // YACKIE
  if (command === 'yackie') {
    cooldowns.createCooldown(command, 5000); // 5 seconds

    client.say(channel, '​Check out one of my bestest buds and overall cool gal Jackie at twitch.tv/broocat !');
    return;
  }


  //
  // TESTING
  //

  // TEST
  if (command === 'test') {
    cooldowns.createCooldown(command);

    client.say(channel, `@${tags.username}, if you see this, the bot is working!`);
    return;
  }
});

///////////////////////////////////
//TIMER
///////////////////////////////////

// connects timer module
const { timer } = require('./timer.js');

// runs timer
timer(client);

/* EMOTES
bexxteCozy
bexxteXcite
bexxteBop
bexxteGun
bexxteLove
*/
