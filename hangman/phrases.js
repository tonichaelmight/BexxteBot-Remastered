const phrases = [
  'ALL OR NOTHING',
  'ALL\'S WELL THAT ENDS WELL',
  'BEAUTY AND THE BEAT'
];

const getRandomIndex = () => {
  return Math.floor(Math.random() * phrases.length);
};

// holds for 2 seconds before returning a new phrase 
exports.getRandomPhrase = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(phrases[getRandomIndex()]);
    }, 2000);
  });
};