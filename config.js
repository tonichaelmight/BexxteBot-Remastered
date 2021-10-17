const bexxteConfig = {

  playlist: 'https://www.youtube.com/watch?v=FjDT_3A0rKw',

  contentWarning: '',

  moderation: {
    'reylo': true,
    'bigfollows': true,
  },

  allCommands: {

    // TEMPORARY
    'ghostcon': true,

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
    'pride': true,
    'pitbull': true,
    'stap': true,
    'mute': true,
    'raiding': true,
    'welcome': true,

    // EXPERIMENTAL
    'bexxtebot': true,
    'hangman': true,
    'hello': true,
    'guess': true,
    'quote': true,
    'socials': true,
    'test': true,
    'validate': true,

    // PEOPLE
    'marta': true,
    'michael': true,
    'tim': true,
    'yackie': true,

    // PLANNED    
    'fortune': false,
    '8ball': false,
    'drag': false,
    'clip': false,
    'blackjack': false,
    'tarot': false,
  },

  quotes: [
    "Enjoy your suffering byeeee! <3",
    "Nothing is stopping me but common sense.",
    "Well yeah, I'm the protagonist.",
    "The reason Majima doesn't have a backbone is because we blew out that back.",
    "I did not mean to help but I guess I will be a good person.",
    "The kids are not ok.",
    "That's my kid, bitch.",
    "People are the leading cause of murder.",
    "Do you ever just hate yourself?",
    "Choo-choo bitch, I'm right here.",
    "Do you even know the intricacies of war??",
    "I did not sext the recruiter.",
    "Oh my god, you stupid roly poly oly motherfucker.",
    "I'M A BUNNY GIRL WITH MY ASS OUT AND I AINT GOT SHIT"
  ]

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

// Get quote
const getQuote = () => {
  const index = Math.floor(Math.random() * bexxteConfig.quotes.length);
  return bexxteConfig.quotes[index];
}



// EXPORT
module.exports = {
  bexxteConfig,
  forbiddenWords,
  getQuote
};

