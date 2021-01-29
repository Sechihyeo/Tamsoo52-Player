const path = require('path').resolve()
const ytpl = require('ytpl')
const fs = require('fs')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('discord.js').MessageEmbed} MessageEmbed
 */

async function fn (client, msg) {
  const arg = msg.content.split(' ')
  if (arg.length < 2) return msg.channel.send('Wrong Used Command.')
  switch (arg[1]) {
    case 'pull': {
      const playlist = await ytpl('PLMEIhCusI3hRHa5sTrUPTRUF2JpLUBF-s')
      fs.writeFileSync(path + '/data/playlist.json', JSON.stringify(await playlist))
      msg.channel.send('Updated!')
      break
    }
    case 'info': {
      const { items, title, id } = JSON.parse(fs.readFileSync(path + '/data/playlist.json'))
      const embed = new MessageEmbed({ title: title, description: `ID : ${id}, LENGTH : ${items.length}` })
      items.forEach((v, i) => embed.addField(v.title, `ID : ${v.id},\nINDEX : ${v.index},\nURL : https://youtu.be/${v.id}`, true))
      msg.channel.send(embed)
      break
    }
    case 'get': {
      if (arg.length < 3) return msg.channel.send('Wrong Used Command.')
      if (!Number(arg[2])) return msg.channel.send('Wrong Used Command.')
      const { items, title, id } = JSON.parse(fs.readFileSync(path + '/data/playlist.json'))
      const embed = new MessageEmbed({ title: title, description: `ID : ${id}, LENGTH : ${items.length}` })
      if (!items[arg[2] - 1]) return msg.channel.send('Undefind.')
      const data = JSON.stringify(items[arg[2] - 1])
      embed.addField('JSON', `\`\`\`json\n${data.replace(JSON.stringify(items[arg[2] - 1].thumbnails), '').replace('"thumbnails":,', '')}\`\`\``)
      msg.channel.send(embed)
      break
    }
    default: {
      return msg.channel.send('Wrong Used Command.')
    }
  }
}

module.exports = fn
module.exports.aliases = ['playlist']
