const cooldownSchema = require('../schemas/cooldownschema.js');

module.exports = {
  category: 'Administrative',
  description: 'Deletes the cooldown',
  slash: false,
  permissions: ['ADMINISTRATOR'],

  callback: async ({ message, interaction }) => {
    const cooldown = await cooldownSchema.findOne({ global: true });
    
    if(message){
      var author = message.author.tag;
    } else {
      var author = `${interaction.member.user.tag}#${interaction.member.user.discriminator}`;
    }
    
    if(cooldown){
      await cooldownSchema.deleteOne({ global: true });
      console.log(`Cooldown removed by ${author}.`);
      return 'Cooldown deleted.'
    }
  }
}
