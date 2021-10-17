const ev = require('./ev.js');

const discord = require('discord.js');
const client = new discord.Client();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // console.log(message);
  if (message.content === '!ping') {
    message.channel.send('pong!');
  }
});

client.login(ev.DISCORD_TOKEN);


/*
Message {
  channel: TextChannel {
    type: 'text',
    deleted: false,
    id: '870118351182123090',
    name: 'general',
    rawPosition: 0,
    parentID: '870118351182123088',
    permissionOverwrites: Collection [Map] {},
    topic: null,
    lastMessageID: '870118834290446386',
    rateLimitPerUser: 0,
    lastPinTimestamp: null,
    guild: Guild {
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      roles: [RoleManager],
      presences: [PresenceManager],
      voiceStates: [VoiceStateManager],
      deleted: false,
      available: true,
      id: '870118350624264204',
      shardID: 0,
      name: "BexxteBot's Server",
      icon: null,
      splash: null,
      discoverySplash: null,
      region: 'us-east',
      memberCount: 2,
      large: false,
      features: [],
      applicationID: null,
      afkTimeout: 300,
      afkChannelID: null,
      systemChannelID: '870118351182123090',
      embedEnabled: undefined,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      verificationLevel: 'NONE',
      explicitContentFilter: 'DISABLED',
      mfaLevel: 0,
      joinedTimestamp: 1627522841483,
      defaultMessageNotifications: 'ALL',
      systemChannelFlags: [SystemChannelFlags],
      maximumMembers: 100000,
      maximumPresences: null,
      approximateMemberCount: null,
      approximatePresenceCount: null,
      vanityURLCode: null,
      vanityURLUses: null,
      description: null,
      banner: null,
      rulesChannelID: null,
      publicUpdatesChannelID: null,
      preferredLocale: 'en-US',
      ownerID: '223625586436734978',
      emojis: [GuildEmojiManager]
    },
    messages: MessageManager {
      cacheType: [class LimitedCollection extends Collection],
      cache: [LimitedCollection [Map]],
      channel: [Circular]
    },
    nsfw: false,
    _typing: Map {}
  },
  deleted: false,
  id: '870118834290446386',
  type: 'DEFAULT',
  system: false,
  content: 'hi',
  author: User {
    id: '223625586436734978',
    system: false,
    locale: null,
    flags: UserFlags { bitfield: 0 },
    username: 'tonichaelmight',
    bot: false,
    discriminator: '9718',
    avatar: '0923bd86656e4e934b04de2a07f33de0',
    lastMessageID: '870118834290446386',
    lastMessageChannelID: '870118351182123090'
  },
  pinned: false,
  tts: false,
  nonce: '870118833828921344',
  embeds: [],
  attachments: Collection [Map] {},
  createdTimestamp: 1627522896121,
  editedTimestamp: 0,
  reactions: ReactionManager {
    cacheType: [class Collection extends Collection],
    cache: Collection [Map] {},
    message: [Circular]
  },
  mentions: MessageMentions {
    everyone: false,
    users: Collection [Map] {},
    roles: Collection [Map] {},
    _members: null,
    _channels: null,
    crosspostedChannels: Collection [Map] {}
  },
  webhookID: null,
  application: null,
  activity: null,
  _edits: [],
  flags: MessageFlags { bitfield: 0 },
  reference: null
}

 */