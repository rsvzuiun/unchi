import nodeConfig from 'config'

interface Config {
  token: string
}

const config: Config = {
  token: nodeConfig.get<string>('token')
}
export default config
