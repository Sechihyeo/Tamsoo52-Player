const path = require('path').resolve()
const fs = require('fs')
/**
 * @param {import('discord.js').MessageEmbed} MessageEmbed
 */

async function fn (client, msg) {
  const arg = msg.content.split(' ')
  if (arg.length < 3) return msg.channel.send('Wrong Used Command.')
  if (!Number(arg[1]) || !Number(arg[2])) return msg.channel.send('Wrong Used Command.')
  if (!client.channels.cache.get(arg[1]) || !client.channels.cache.get(arg[2])) return msg.channel.send('Wrong Channel Id')
  if (client.channels.cache.get(arg[1]).type !== 'text' || client.channels.cache.get(arg[2]).type !== 'voice') return msg.channel.send('Wrong Channel Type')
  fs.writeFileSync(path + '/data/channel.json', JSON.stringify({ chat: arg[1], voice: arg[2] }))
  msg.channel.send(`Updated!\nChat Channel : <#${arg[1]}>, Voice Channel : <#${arg[2]}> `)
}

module.exports = fn
module.exports.aliases = ['channel']
