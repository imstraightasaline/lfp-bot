const logsList = require('../index.js');

module.exports = {
  category: 'Administrative',
  description: 'Shows recent logs',
  slash: 'both',
  testOnly: true,
  maxArgs: 1,
  permissions: ['ADMINISTRATOR'],
  
  callback: ({ message, interaction }) => {
    if(message){
      message.reply('```\n' + logsList.join('\n') + '\n```');
      console.log(`${message.author.tag} has run the logs command in #${message.channel.name}.`)
      return;
    }
    if(interaction){
      interaction.reply('```\n' + logsList.join('\n') + '\n```');
      console.log(`${interaction.member.user.username}#${interaction.member.user.discriminator} has run the logs command in #${interaction.channel.name}.`)
      return;
    }
  }
 }
