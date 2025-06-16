const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.GUILDS, GatewayIntentBits.GUILD_MESSAGES] 
});

//登入後印出 Bot 已啟動
client.once('ready', () => {
    console.log(`${client.user.tag} 已登入.`);
});

//處理收到的訊息
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

//登入 Bot，記住要把 YOUR_BOT_TOKEN 替換掉
client.login(process.env.BOT_TOKEN);
