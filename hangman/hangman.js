const { getRandomPhrase } = require('./phrases.js');

let fullPhrase, currentPhrase;

const allLetters = new RegExp('[a-zA-Z]');
const caps = new RegExp('[A-Z]');
const lowers = new RegExp('[a-z]');

const scores = {};

const printScores = (client, channel) => {
  
  const scoresArray = [];
  const scoresKeys = Object.keys(scores);

  scoresKeys.forEach(key => {
    scoresArray.push([key, scores[key]]);
  });

  const scoreSort = (x, y) => {
    return y[1] - x[1];
  }

  scoresArray.sort(scoreSort);

  let finalMessage = `Here are the scores:    `;

  scoresArray.forEach(score => {
    finalMessage += `${score[0]}: ${score[1]},   `
  })

  finalMessage = finalMessage.trim();
  finalMessage = finalMessage.slice(0, -1);

  client.say(channel, finalMessage);

  scoresKeys.forEach(key => {
    delete scores[key];
  });
};

const guessed = {
  A: false,
  B: false,
  C: false,
  D: false,
  E: false,
  F: false,
  G: false,
  H: false,
  I: false,
  J: false,
  K: false,
  L: false,
  M: false,
  N: false,
  O: false,
  P: false,
  Q: false,
  R: false,
  S: false,
  T: false,
  U: false,
  V: false,
  W: false,
  X: false,
  Y: false,
  Z: false
};

const guessedKeys = Object.keys(guessed);

// indicates whether a game is live
let status = false;

// indicates that she is ready for a guess
let ready = false;

// indicates if puzzle is solved
let solved = false;

// checks if a game is already going
exports.getStatus = () => {
  return status;
}

exports.isReady = () => {
  return ready;
}

exports.alreadyGuessed = letter => {
  return guessed[letter];
}

// this starts the game
exports.startHangman = async (client, channel) => {

  // update status
  status = true;

  client.say(channel, 'Starting a game of hangman!');

  // get a random phrase; this will serve as the "correct answer"
  fullPhrase = await getRandomPhrase();

  // create a copy of the phrase that will be turned into a series of currentPhrase to represent the phrase
  currentPhrase = fullPhrase;
  console.log(currentPhrase);

  // replaces all letters with currentPhrase
  while (currentPhrase.search(caps) !== -1) {
    currentPhrase = currentPhrase.replace(caps, '_');
  }

  // say the blank phrase
  client.say(channel, `Here's the phrase: ${currentPhrase}`);
  ready = true;

}


// reset function
exports.reset = () => {

  // reset all the letters to false for the next game
  guessedKeys.forEach(key => {
    if (guessed[key]) {
      guessed[key] = false;
    }
  });

  //reset all the variables
  fullPhrase = undefined;
  currentPhrase = undefined;
  status = false;
  ready = false;
  solved = false;

}


// guessing function
exports.guess = (client, channel, user, letter) => {

  // make sure a straggler doesn't come in
  if (solved) {
    return;
  }
  
  // MATCH
  if (fullPhrase.includes(letter)) {

    // create score data for user if none exists
    if (!scores[user]) {
      scores[user] = 0;
    }

    let index = 0;

    while (fullPhrase.slice(index).search(letter) !== -1 && index < fullPhrase.length) {

      index = fullPhrase.slice(index).search(letter) + index;

      currentPhrase = currentPhrase.slice(0, index) + letter + currentPhrase.slice(index + 1);

      // increment score
      scores[user]++;

      index++;

    }

    client.say(channel, `Congrats, you got a letter! Here's what you've got now: ${currentPhrase}`);

    // if this is true, the puzzle is solved
    if (currentPhrase === fullPhrase) {

      solved = true;

      client.say(channel, 'Omg no way besties you got it!! bexxteLove Great job everyone!');

      printScores(client, channel);

      exports.reset();

      
      return;

    }

    return;

  // NO MATCH
  } else {
    client.say(channel, `No ${letter}'s, ${user}.`);
    return;
  }

}


exports.guessFullPhrase = (client, channel, user, userPhrase) => {

  if (userPhrase === fullPhrase) {

    // create score data for user if none exists
    if (!scores[user]) {
      scores[user] = 0;
    }

    let index = 0;

    while (currentPhrase.slice(index).search('_') !== -1 && currentPhrase.slice(index)) {
      
      index = currentPhrase.slice(index).search('_') + index;
      
      scores[user]++;

      index++;
      
    }

    client.say(channel, `Congrats ${user}, you guessed the whole phrase! ${fullPhrase}`);

    printScores(client, channel);

    exports.reset();

  } else {
    client.say(channel, `Yikes, ${user}... that wasn't quite right.`);
  }

  return;

};