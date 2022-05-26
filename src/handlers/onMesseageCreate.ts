import { Message, Awaitable } from 'discord.js'

export const onMesseageCreate = (msg: Message<boolean>): Awaitable<void> => {
  if (msg.author.bot) return

  console.log({
    name: msg.member?.displayName,
    content: msg.content
  })
}
