const path = require('path').resolve()
const ytdl = require('ytdl-core')
const URL = 'https://youtu.be/'
const fs = require('fs')
let index = 14

module.exports.play = (client, msg) => {
  const { items } = JSON.parse(fs.readFileSync(path + '/data/playlist.json'))
  const { chat, voice } = JSON.parse(fs.readFileSync(path + '/data/channel.json'))
  const voiceChannel = client.channels.cache.get(voice)
  if (!voiceChannel) return msg.channel.send('Undefind Voice Channel.')
  voiceChannel.join().then(connection => play(connection))
  async function play (connection) {
    const stream = ytdl(URL + items[index].id, { filter: 'audioonly' })
    const dispatcher = connection.play(stream)
    dispatcher.on('finish', () => {
      index++
      if (!items[index]) index = 0
      play(connection)
    })
  }
}
