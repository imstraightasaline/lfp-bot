const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const cooldownSchema = require('../schemas/cooldownschema.js');
const replyList = require('../index.js');

module.exports = {
  category: 'LFP',
  description: 'LFP done',
  slash: 'both',
  testOnly: true,

  callback: async ({ message, interaction, args, guild }) => {
    if(message){
      var authorID = message.author.id;
    } else{
      var authorID = interaction.member.user.id;
    }
    
    const cooldown = await cooldownSchema.findOne({ userID: authorID });

    if(cooldown){
      const reqMsg = cooldown.msgID;
      var msg = guild.channels.cache.get('972516041043374152').messages.cache.get(reqMsg);
      if(msg != null){
        guild.channels.cache.get('972516041043374152').messages.fetch(reqMsg).then(msg => msg.delete());
        console.log(`${authorID} has deleted their request.`);
        if(cooldown.status == 2){
          cooldown.delete();
          console.log(`${authorID}'s cooldown status has been deleted.`)
        } else if(cooldown.status == 1){
          cooldown.update({ status: 3 });
          console.log(`${authorID}'s cooldown status has been updated to status 3.`)
        }
        return 'Request deleted.';
      } else if(msg == null){
        return 'Request has already been deleted.';
      } else {
        return 'Unknown error. Message could not be deleted.';
      }
    } else {
      return 'You have no request to be deleted.'
    }
  }
}
