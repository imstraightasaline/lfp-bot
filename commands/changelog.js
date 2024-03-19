const { MessageEmbed } = require('discord.js');

module.exports = {
  category: 'General',
  description: 'A list of changes made for the bot',
  aliases: ['changelogs'],
  slash: 'both',
  testOnly: true,
  maxArgs: 1,

  callback: ({ message, interaction}) => {
    const changelogEmbed = new MessageEmbed()
    .setTitle("LFP Manager | Changelog")
    .setThumbnail("********************************************************")
    .setColor("#e61410")
    .setDescription("Current version: v0.1.5\n-----")
    .addFields(
      { name: 'v0 | 9/5/2022', value: 'Bot created.' },
      { name: 'v0.1 | 9/5/2022', value: 'Finished help, lfp, and changelogs commands.'},
      { name: 'v0.1.1 | 9/5/2022', value: 'Connected the bot to a database.'},
      { name: 'v0.1.2 | 10/5/2022', value: 'Added blacklist and unblacklist commands.'},
      { name: 'v0.1.3 | 10/5/2022', value: 'Added button interaction to request to join the game.'},
      { name: 'v0.1.4 | 10/5/2022', value: 'Added delete cooldown and done command.'},
      { name: 'v0.1.5 | 11/5/2022', value: 'Fixed the cooldowns.'}
    )
    .setFooter({ text: "Created and managed by #####"})
    .setTimestamp();

    if(message){
      console.log(`${message.author.tag} has run the changelog command in #${message.channel.name}.`)
    } else{
      console.log(`${interaction.member.user.username}#${interaction.member.user.discriminator} has run the changelog command in #${interaction.channel.name}.`)
    }

    return changelogEmbed;
  }
}
