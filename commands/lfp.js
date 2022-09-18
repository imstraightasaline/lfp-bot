const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const lfpBls = require('../schemas/blschema.js');
const cooldownSchema = require('../schemas/cooldownschema.js');

module.exports = {
  category: 'LFP',
  description: 'LFP request',
  slash: 'both',
  testOnly: true,
  minArgs: 4,
  maxArgs: 4,
  expectedArgs: '<game_name> <gamemodes> <no_of_games_or_game_duration> <no_of_players_needed>',

  callback: async ({ message, interaction, args, guild }) => {
    const cooldownIsTrue = await cooldownSchema.findOne({ status: 1 });

    if(cooldownIsTrue){
      var relativeDate = Math.round(cooldownIsTrue.timestamp / 1000);
      var lastRanBy = `${guild.members.cache.get(cooldownIsTrue.userID).user.username}#${guild.members.cache.get(cooldownIsTrue.userID).user.discriminator}`
      return `This command is on a cooldown, will be removed <t:${relativeDate}:R>.\nCommand last ran by: \`${lastRanBy}\``
    }

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('joinButton')
					.setLabel('Join!')
					.setStyle('PRIMARY'),
			);


    var lfpAccess = "972515311821656094";
    
    if(message){
      const requester = message.author.id;
      const isBled = await lfpBls.findOne({ requester });
      
      if(isBled){
        return `You are blacklisted from requesting.`;
      }
      
      if(!message.member.roles.cache.get(lfpAccess)){
        return message.channel.send("You must have the <@&972515311821656094> role to request! Go to <#960730276575719454> and react to receive it.");
      } else{
          if(!args[3]){
            message.channel.send("Please follow the syntax below.\n`;lfp [game] [gamemode/s] [#_of_games/game_duration] [#_of_players_needed]`\n\n**PLEASE replace all spaces in each [] with underscores** `_`, or else the message will break.");
          } else {
            var lfpRequestEmbed = new MessageEmbed()
            .setTitle(`${message.author.name} is looking for some people to play with.`)
            .setDescription("-----")
            .addFields(
              { name: 'Game:', value: args[0].replace(/_/g, " ")},
              { name: 'Gamemode/s:', value: args[1].replace(/_/g, " ")},
              { name: 'Amount of games/duration:', value: args[2].replace(/_/g, " ")},
              { name: 'Players needed:', value: args[3].replace(/_/g, " ")}
            )
            .setTimestamp()
            .setFooter({ text: "React below if you would like to join." });
        
            let msg = await guild.channels.cache.get("972516041043374152").send({ content: "Hey there <@&972515311821656094>!", embeds: [lfpRequestEmbed], components: [row] });
            message.delete();
            message.channel.send(`Successfully requested players for \`${args[0]}\`!\nSee <#972516041043374152>.`);

            var reqMsg = msg.id;
            var dateNow = Date.now()
            var newTimestamp = (dateNow + 60 * 30);
            var userID = message.author.id;
        
            var uploadTimestamp = {
              userID: userID,
              timestamp: newTimestamp,
              msgID: reqMsg,
              status: 1
            }
            
            await new cooldownSchema(uploadTimestamp).save();
            
            return console.log(`${message.author.tag} has run the lfp command in #${message.channel.name}.`)
        }
      }
    }
    
    if(interaction){
      const requester = interaction.member.user.id;
      const isBled = await lfpBls.findOne({ requester });
      
      if(isBled){
        return `You are blacklisted from requesting.`;
      }
      
      if(!interaction.member.roles.cache.get(lfpAccess)){
        return interaction.reply("You must have the <@&972515311821656094> role to request! Go to <#960730276575719454> and react to receive it.");
      } else{
        var lfpRequestEmbed = new MessageEmbed()
        .setTitle(`${interaction.member.user.username} is looking for some people to play with.`)
        .setDescription("-----")
        .addFields(
          { name: 'Game:', value: args[0]},
          { name: 'Gamemode/s:', value: args[1]},
          { name: 'Amount of games/duration:', value: args[2]},
          { name: 'Players needed:', value: args[3]}
        )
        .setTimestamp()
        .setFooter({ text: "React below if you would like to join." });
  
        let msg = await guild.channels.cache.get("972516041043374152").send({ content: "Hey there <@&972515311821656094>!", embeds: [lfpRequestEmbed], components: [row] });
        interaction.reply(`Successfully requested players for \`${args[0]}\`!\nSee <#972516041043374152>.`);

        var reqMsg = msg.id;
        var dateNow = Date.now();
        var newTimestamp = (dateNow + 30 * 60000);
        var userID = interaction.member.user.id;
    
        var uploadTimestamp = {
          userID: userID,
          timestamp: newTimestamp,
          msgID: reqMsg,
          status: 1
        }
        
        await new cooldownSchema(uploadTimestamp).save();
        
        return console.log(`${interaction.member.user.username}#${interaction.member.user.discriminator} has run the lfp command in #${interaction.channel.name}.`);
      }
    }
  }
}
