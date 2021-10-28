import { UserResolvable } from '@src/api/entities/user'
import { RoleResolvable } from '@src/api/entities/role'
import { PermissionsResolvable } from '@src/api/entities/bitfield'

export interface GuildMemberData {
  user?: UserResolvable
  userId?: string
  nick?: string
  avatar?: string
  roles: RoleResolvable[]
  joinedDate: Date
  premiumSinceDate?: Date
  deaf: boolean
  mute: boolean
  pending?: boolean
  permissions?: PermissionsResolvable
  guildId: string
  guildOwner: boolean
}
