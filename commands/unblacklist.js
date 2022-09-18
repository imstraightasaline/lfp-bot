const lfpBls = require('../schemas/blschema.js');

module.exports = {
  category: 'Administrative',
  description: 'Unblacklists the user from the database',
  aliases: ['unbl', 'ubl'],
  slash: 'both',
  testOnly: true,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<perpetrator>',
  permissions: ['ADMINISTRATOR'],

  callback: async ({ message, interaction, args }) => {
    var perpetrator = args[0];

    const isBled = await lfpBls.findOne({ perpetrator });
    if(!isBled){
      return `${perpetrator} is not blacklisted.`;
    } else{
      
      if(message){
        var admin = message.author.tag;
      } else{
        var admin = `${interaction.member.user.username}#${interaction.member.user.discriminator}`;
      }
      
      await lfpBls.deleteOne({ perpetrator });
      console.log(`${admin} has unblacklisted ${perpetrator}.`);
      
      return `${perpetrator} has been unblacklisted.`;
    }
  }
}
