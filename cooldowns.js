// Database creation
const Database = require("@replit/database");
const cooldowns = new Database();



// Cleanup function - sets everything to false whenever the bot restarts
const cleanup = async () => {
  const keysList = await cooldowns.list().then(keys => {return keys});

  keysList.forEach(key => {
    cooldowns.set(key, false).then(() => {});
  });
};

cleanup();



// function that actually does the waiting
const coolDown = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};



// function to be used outside script to manage cooldowns
exports.createCooldown = async (cmd, ms = 10000) => { // default cooldown is 10 seconds
  // add cooldown object
  cooldowns.set(cmd, true).then(() => {});

  // call coolDown function, await return based on ms given or 10000 by default
  const done = await coolDown(ms);

  // checks that cooldown is done
  if (done) {
    // remove cmd from cooldowns
    cooldowns.set(cmd, false).then(() => {});
  // i don't think you can ever get here??
  } else {
    console.log('oopsie, cooldowns didn\'t work right!');
  }

}







// figuring out how it works
const testFunction = async () => {
  cooldowns.set('michael', 'saunders').then(() => {});
  cooldowns.set('bekka', 'moses').then(() => {});

  const allKeys = await cooldowns.list().then(keys => {return keys});
  console.log(allKeys); // ['bekka', 'michael']

  const michael = await cooldowns.get('michael').then(value => {return value});
  console.log(michael); // saunders
}

// testFunction();