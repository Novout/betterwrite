export type IPCRendererChannel =
  | 'update-application'
  | 'update-downloaded'
  | 'channel-for-test'

export interface IPCRenderer {
  send: (channel: IPCRendererChannel, ...args: Array<any>) => any
  receive: (channel: IPCRendererChannel, listener: any) => any
}
