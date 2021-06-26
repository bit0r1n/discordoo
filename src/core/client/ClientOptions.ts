import { ProviderOption } from '@src/core/providers/ProviderOption'
import { GatewayOptions } from '@src/gateway'
import { Optional } from '@src/utils'
import { RESTOptions } from '@src/rest'
import { IpcServerOptions } from '@src/sharding/interfaces/ipc/IpcServerOptions'

export interface ClientOptions {
  providers?: ProviderOption[]
  gateway?: Optional<GatewayOptions, 'token' | 'intents' | 'properties'>
  rest?: RESTOptions
  ipc?: Optional<IpcServerOptions, 'id' | 'managerIpcId' | 'shardId'>
}
