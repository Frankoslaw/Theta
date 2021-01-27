module.exports = {
	name: 'changebotprefix',
    description: 'Change actual bot prefix',
    usage: '[new Prefix]',
	args: true,
	guildOnly: true,
	execute(message, args) {
        //message.member.guild.me.hasPermission
		if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.reply("To execute this command you need administrator access!")
        }

        var newPrefix = args[0].toString()
        if(newPrefix.length < 1 || newPrefix.length > 3){
            return message.reply("Prefix must have length betwen 1 to 3 characters!")
        }

        var serverSettings = message.client.settings.get(message.guild.id);
        const oldPrefix = serverSettings.BotPrefix
        serverSettings.BotPrefix = newPrefix

        message.client.settings.set(message.guild.id, serverSettings)
        message.client.saveConfig(message.guild.id)

        return message.channel.send(`Changed prefix: ${oldPrefix} -> ${newPrefix}`)
	},
};