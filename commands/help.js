const { MessageEmbed } = require('discord.js');

module.exports = {
  category: 'General',
  description: 'Shows how to use the bot',
  aliases: ['commands', 'info'],
  slash: 'both',
  testOnly: true,
  maxArgs: 1,

  callback: ({ message, interaction }) => {

    const helpEmbed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle('Information')
    .setThumbnail("https://cdn.discordapp.com/attachments/889830068837318666/973513327777038376/ultradog.png")
    .setDescription(`Hello there, I'm the LFP manager. My prefix is \`;\`.\n---\nLook at <#972516041043374152> pins if you would like to know how to request in the channel.\n\nI support traditional and slash commands. It's easier to use slash commands thanks to the given format.\n\n---\n\n**COMMANDS:**`)
    .addFields(
      { name: 'General:', value: '\`help/commands/info\` - Shows basic information and commands.\n\`lfp\` - See <#972516041043374152> pins for more info.\n\`done\` - See <#972516041043374152> pins for more info.\n\`changelog/changelogs\` - Shows the changes made in the bot over time.'},
      { name: 'Administrative (admins only duh)', value: '\`logs\` - Shows the bot\'s logs.\n\`blacklist/bl\` - Blacklists a user from requesting.\n\`unblacklist/unbl\` - Unblacklists a user.\n\`delcooldown\` - Deletes the request cooldown.'}
    )
    .setFooter({ text: `Created and managed by Tom27#3897 | v0.1.5` })
    .setTimestamp();

    if(message){
      console.log(`${message.author.tag} has run the help command in #${message.channel.name}.`)
    } else{
      console.log(`${interaction.member.user.username}#${interaction.member.user.discriminator} has run the help command in #${interaction.channel.name}.`)
    }

    return helpEmbed;
  }
}
