const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  if (message.content.startsWith('!play ')) {
    const query = message.content.replace('!play ', '');

    if (!message.member.voice.channel) {
      return message.reply('你必須先進入語音頻道！');
    }

    const channel = message.member.voice.channel;
    const stream = await play.stream(query);
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    const player = createAudioPlayer();

    player.play(resource);
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    }).subscribe(player);

    message.reply(`正在播放：${query}`);

    player.on(AudioPlayerStatus.Idle, () => {
      player.stop();
    });
  }
});

client.login(token);
