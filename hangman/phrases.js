const phrases = [
  'THE NIGHT IS STILL YOUNG',
  'ALL IN A DAY\'S WORK',
  'HIT ME BABY ONE MORE TIME',
  'EVACUATE THE DANCE FLOOR',
  //'ACCORDING TO ALL KNOWN LAWS OF AVIATION, THERE IS NO WAY A BEE SHOULD BE ABLE TO FLY. ITS WINGS ARE TOO SMALL TO GET ITS FAT LITTLE BODY OFF THE GROUND. THE BEE, OF COURSE, FLIES ANYWAY BECAUSE BEES DON\'T CARE WHAT HUMANS THINK IS IMPOSSIBLE.',
  'DAN NICKY YOUR BOBBIE S',
  'HE DRAGGED ME ALL OVER HELL \'N HALF O\' GEORGIA!',
  'CAUGHT BETWEEN A ROCK AND A HARD PLACE'
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