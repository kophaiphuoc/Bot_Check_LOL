const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require("dotenv");
dotenv.config();

const Inforuser = require('./src/commands/InForUser')

var prefix = process.env.PREFIX

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

client.on('ready', () => {
  console.log(`Bot đã đăng nhập với tên ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.author.bot && message.content.startsWith(prefix)) {
    const split1 = message.content
    const split2 = split1.split(' ')
    const splitJoin = `${split2[0]} ${split2[1]}`
    const restOfString = split1.substring(split2[0].length + split2[1].length + 1);

    switch (splitJoin) {
      case Inforuser.CheckInforChampion().name:
        Inforuser.CheckInforChampion().execute(message, [],restOfString)
        break;
      default:
        console.log('lỗi cú pháp')
        break;
    }
  } else {
    return null
  }

});

client.login(process.env.TOKEN);
