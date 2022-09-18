console.log("NodeJS Version: " + process.version);

const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require('path');

const cooldownSchema = require('./schemas/cooldownschema.js');

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

let logsList = [];

let log = console.log;
console.log = (...args) => {
  logsList.push(...args);
  log(...args);
}

module.exports = logsList;

client.on("debug", ( e ) => console.log(e));

client.on('ready', async () => {
  console.log('Bot is online!');

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    delErrMsgCooldown: 15,
    mongoUri: process.env.MONGO_URI,
    testServers: '960723261430325248',
    botOwners: ['578935696518152193'],
  })
  .setDefaultPrefix(';');

  setInterval(async () => {
    if(logsList.length > 20){
      logsList.shift();
    }

    const cooldown = await cooldownSchema.findOne({ status: 1 });
    if(cooldown){
      if(Date.now() > cooldown.timestamp){
        await cooldown.update({ status: 2 });
        return console.log(`Updated ${cooldown.userID}'s document: status 2.`);
      }
    }

    const cooldownToDelete = await cooldownSchema.findOne({ status: 3 });
    if(cooldownToDelete){
      if(Date.now() > cooldown.timestamp){
        console.log(`${cooldownToDelete.userID}'s cooldown is being deleted.`);
        cooldownToDelete.delete();
        return console.log(`Cooldown successfully deleted.`);
      }
    }
  }, 1000);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
    if(interaction.customId === "joinButton") {
      var cooldown = await cooldownSchema.findOne({ status: 1 });
      var requester = cooldown.userID;

      if(requester == interaction.member.user.id){
        return interaction.reply({ content: "Wow, you must be really lonely to try and join your own game.", ephemeral: true });
      }
      
      interaction.channel.send(`-----\nHey there <@${requester}>, <@${interaction.member.user.id}> would like to join the game!`);
      console.log(`${interaction.member.user.username}#${interaction.member.user.discriminator} has requested to join ${requester}'s game.`);
      return interaction.reply({ content: "Successfully requested to join.", ephemeral: true });
    }
})

keepAlive();
client.login(process.env.TOKEN);
