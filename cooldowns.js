const cooldowns = {};

const coolDown = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};



exports.createCooldown = async (cmd, ms = 10000) => { // default cooldown is 10 seconds
  // add cooldown object
  cooldowns[cmd] = true;

  // call coolDown function, await return based on ms given or 10000 by default
  const done = await coolDown(ms);

  // checks that cooldown is done
  if (done) {
    // remove cmd from cooldowns
    cooldonws[cmd] = false;
  // i don't think you can ever get here??
  } else {
    console.log('oopsie, cooldowns didn\'t work right!');
  }

}