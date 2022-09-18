const lfpBls = require('../schemas/blschema.js');

module.exports = {
  category: 'Administrative',
  description: 'Blacklists the user from requesting',
  aliases: ['bl'],
  slash: 'both',
  testOnly: true,
  minArgs: 1,
  maxArgs: 2,
  expectedArgs: '<perpetrator> [reason]',
  permissions: ['ADMINISTRATOR'],

  callback: async ({ message, interaction, args }) => {
    var perpetrator = args[0];

    const isBled = await lfpBls.findOne({ perpetrator });
    if(isBled){
      return `${perpetrator} is already blacklisted.`;
    }
    
    if(args[1]){
      var reason = args[1];
    } else{
      var reason = "None provided.";
    }

    if(message){
      var admin = message.author.tag;
    } else{
      var admin = `${interaction.member.user.username}#${interaction.member.user.discriminator}`;
    }

    var toBl = {
      userID: perpetrator,
      blacklister: admin,
      reason: reason
    }

    await new lfpBls(toBl).save();
    console.log(`${admin} has blacklisted ${perpetrator}.`);

    return `${perpetrator} has been blacklisted.`;
  }
}
