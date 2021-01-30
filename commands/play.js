const music = require('../utils/play')

async function fn (client, msg) {
  music.play(client, msg)
}

module.exports = fn
module.exports.aliases = ['play']
