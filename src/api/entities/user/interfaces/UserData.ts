export interface UserData {
  id: string
  username: string
  discriminator: string
  avatar?: string
  bot?: boolean
  system?: boolean
  mfaEnabled?: boolean
  banner?: string
  accentColor?: number
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premiumType?: number
  publicFlags?: number
}
