import net from 'net'

const COMMAND = {
  TALK: 0x0001,
  PAUSE: 0x0010,
  RESUME: 0x0020,
  SKIP: 0x0030,
  CLEAR: 0x0040,
  GET_PAUSE: 0x0110,
  GET_NOW_PLAYING: 0x0120,
  GET_TASK_COUNT: 0x0130
}

const ENCODING = {
  UTF_8: 0,
  UTF_16: 1,
  SHIFT_JIS: 2
}

export const talk = (
  text: string,
  host = '127.0.0.1',
  port = 50001,
  speed = -1,
  tone = -1,
  volume = -1,
  voice = 0
) => {
  const sizeHeader = 15
  const sizeText = Buffer.byteLength(text)
  const buffer = Buffer.alloc(sizeHeader + sizeText)
  let idx = 0
  idx = buffer.writeInt16LE(COMMAND.TALK, idx)
  idx = buffer.writeInt16LE(speed, idx)
  idx = buffer.writeInt16LE(tone, idx)
  idx = buffer.writeInt16LE(volume, idx)
  idx = buffer.writeInt16LE(voice, idx)
  idx = buffer.writeInt8(ENCODING.UTF_8, idx)
  idx = buffer.writeInt32LE(sizeText, idx)
  buffer.write(text, idx)

  const client = net.createConnection({ port, host },
    () => {
      client.write(buffer)
      client.end()
    }).on('error', (err) => console.log(err))
}
