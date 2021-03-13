const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'listprefixs',
    description: 'List all prefixes for roles',
	guildOnly: true,
	execute(message, args) {
        //message.member.guild.me.hasPermission
        let NicknamesPrefixs = message.client.settings.get(message.guild.id).NicknamesPrefixs;
        let responseElements = []

        for(let [i, NicknamePrefix] of NicknamesPrefixs.entries()){
            if(NicknamePrefix.id == "else"){
                responseElements.push(`${i}) ${NicknamePrefix.id}: ${NicknamePrefix.prefix}`)
            }else{
                responseElements.push(`${i}) <@&${NicknamePrefix.id}>: ${NicknamePrefix.prefix}`)
            }
        }

        const returnMessage = new MessageEmbed()
            .setColor('#0099ff')
            .addField(`Prefix list: `, responseElements)
        return message.channel.send(returnMessage)
	},
};