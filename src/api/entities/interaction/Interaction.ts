import { AbstractEntity } from '@src/api/entities/AbstractEntity'
import { AnyWritableChannel, Guild, GuildMember, InteractionData, Message, RawInteractionData, User } from '@src/api'
import { EntityInitOptions } from '@src/api/entities/EntityInitOptions'
import { attach, idToDate, idToTimestamp } from '@src/utils'
import { InteractionTypes, Keyspaces } from '@src/constants'
import { CacheManagerGetOptions } from '@src/cache'

export class Interaction extends AbstractEntity {
  declare id: string
  declare applicationId: string
  declare type: InteractionTypes
  declare guildId?: string
  declare channelId?: string
  declare memberId?: string
  declare userId?: string
  declare token: string
  declare messageId?: string
  declare version: number
  declare locale?: string
  declare guildLocale?: string

  async init(data: RawInteractionData | InteractionData, options?: EntityInitOptions): Promise<this> {
    attach(this, data, {
      props: [
        'id',
        [ 'applicationId', 'application_id' ],
        'type',
        [ 'guildId', 'guild_id' ],
        [ 'channelId', 'channel_id' ],
        [ 'memberId', 'member_id' ],
        [ 'userId', 'user_id' ],
        'token',
        [ 'messageId', 'message_id' ],
        'version',
        'locale',
        [ 'guildLocale', 'guild_locale' ],
      ],
      disabled: options?.ignore,
      enabled: [ 'id', 'applicationId', 'type', 'guildId' ]
    })

    return this
  }

  get createdDate(): Date {
    return idToDate(this.id)
  }

  get createdTimestamp(): number {
    return idToTimestamp(this.id)
  }

  get canReply(): boolean {
    return this.type !== InteractionTypes.PING && this.type !== InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE
  }

  async guild(options?: CacheManagerGetOptions): Promise<Guild | undefined> {
    return this.guildId ? this.client.guilds.cache.get(this.guildId, options) : undefined
  }

  async channel(options?: CacheManagerGetOptions): Promise<AnyWritableChannel | undefined> {
    if (this.channelId) {
      return this.client.internals.cache.get(
        Keyspaces.CHANNELS, this.guildId ?? this.userId!, 'channelEntityKey', this.channelId, options
      )
    }
  }

  async member(options?: CacheManagerGetOptions): Promise<GuildMember | undefined> {
    return this.memberId ? this.client.members.cache.get(this.memberId, { ...options, storage: this.guildId }) : undefined
  }

  async user(options?: CacheManagerGetOptions): Promise<User | undefined> {
    return this.userId ? this.client.users.cache.get(this.userId, options) : undefined
  }

  async author(options?: CacheManagerGetOptions): Promise<User | GuildMember | undefined> {
    return this.memberId ? this.member(options) : this.user(options)
  }

  async message(options?: CacheManagerGetOptions): Promise<Message | undefined> {
    return this.messageId ? this.client.messages.cache.get(this.messageId, { ...options, storage: this.channelId }) : undefined
  }

}