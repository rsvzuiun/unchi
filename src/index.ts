import { Intents, Client } from 'discord.js'
import config from './config'
import { onMesseageCreate } from './handlers'

const client = new Client({
  // TODO: v14
  intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MESSAGES
})

client.once('ready', () => {
  console.log('ready')
})

client.on('messageCreate', onMesseageCreate)

process.on('exit', () => {
  console.log('exit')
  client.destroy()
})
process.on('SIGINT', () => process.exit(1))

client.login(config.token).catch((reason) => {
  console.error(reason)
  process.exit(1)
})
