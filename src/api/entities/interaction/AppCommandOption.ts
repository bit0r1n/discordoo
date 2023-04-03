import { AppCommandOptionTypes, DiscordLocale } from '@src/constants'
import { AppCommandOptionChoiceData, AppCommandOptionWithSubcommandsData, RawAppCommandOptionData } from '@src/api'
import { EntityInitOptions } from '@src/api/entities/EntityInitOptions'
import { attach } from '@src/utils'

export class AppCommandOption {
  declare name: string
  declare nameLocalizations?: Record<DiscordLocale, string>
  declare description: string
  declare descriptionLocalizations?: Record<DiscordLocale, string>
  declare choices?: AppCommandOptionChoiceData[]
  declare options?: AppCommandOption[]
  declare required: boolean
  declare value:
    (this['type'] extends AppCommandOptionTypes.String ? string : number)
    | (this['required'] extends true ? never : undefined)
  declare type: AppCommandOptionTypes

  constructor(data: AppCommandOptionWithSubcommandsData | RawAppCommandOptionData, options?: EntityInitOptions) {
    attach(this, data, {
      props: [
        'name',
        [ 'nameLocalizations', 'name_localizations' ],
        'description',
        [ 'descriptionLocalizations', 'description_localizations' ],
        'required',
        'value',
        'type',
      ],
      disabled: options?.ignore,
      enabled: [ 'name', 'type' ]
    })

    if ('choices' in data && data.choices) {
      this.choices = data.choices.map(choice => ({
        name: choice.name,
        value: choice.value,
        nameLocalizations: choice.nameLocalizations ?? choice.name_localizations
      }))
    }

    if ('options' in data && data.options) {
      this.options = data.options.map(option => new AppCommandOption(option, options))
    }

    return this
  }

  toJson(): AppCommandOptionWithSubcommandsData {
    return { ...this } as AppCommandOptionWithSubcommandsData
  }
}
