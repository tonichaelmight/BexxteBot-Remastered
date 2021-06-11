const ev = require('./ev.js');

function waitThenColor() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('HotPink');
    }, 2000);
  });
}

exports.configure = async function (client) {
  // let c = await waitThenColor();
  
  // ensures she's always hot
  // client.color(ev.CHANNEL_NAME, c);

  // let's everyone know a bad bitch just showed up
  // client.say(ev.CHANNEL_NAME, 'hey bestie');
}