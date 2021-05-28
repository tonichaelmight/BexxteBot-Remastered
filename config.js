const bexxteConfig = {

  playlist: '',

  contentWarning: '',

  moderation: {
    'ethan dies': true,
    'ethandies': true,
    'reylo': true,
    'bigfollows': true,
    ' eveline ': true,
    ' mia ': true,
    ' rose ': true,
    'mother miranda': true,
  },

  allCommands: {

    // GENERAL
    'bttv': true,
    'commands': true,
    'discord': true,
    'follow': true,
    'lurk': true,
    'music': true,
    'prime': true,
    'raid': true,
    'so': true,
    'sub': true,
    'uptime': true,
    'whomst': true,

    // SPECIAL
    'ban': true,
    'blm': true,
    'cw': true,
    'stap': true,
    'mute': true,
    'raiding': true,
    'welcome': true,

    // EXPERIMENTAL
    'bexxtebot': true,
    'hello': true,
    'socials': true,
    'test': true,
    'validate': true,

    // PEOPLE
    'marta': true,
    'michael': true,
    'tim': true,
    'yackie': true,

    // PLANNED
    'hangman': false,
    'fortune': false,
    '8ball': false,
    'drag': false,
    'clip': false,
    'blackjack': false,
    'pride': false,

  }

};
// END BEXXTECONFIG



// Forbidden Words
const forbiddenWords = [];

const modKeys = Object.keys(bexxteConfig.moderation);

modKeys.forEach(key => {
  if (bexxteConfig.moderation[key]) {
    forbiddenWords.push(key);
  }
});

//console.log(forbiddenWords);


// UNNECESSARY??
/*
// Active commands
const activeCommands = [];

const cmdKeys = Object.keys(bexxteConfig.allCommands);

cmdKeys.forEach(key => {
  if (bexxteConfig.allCommands[key]) {
    activeCommands.push(key);
  }
});

//console.log(activeCommands);
*/








// EXPORT
module.exports = {
  bexxteConfig,
  forbiddenWords,
  //activeCommands
};