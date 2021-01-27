const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('../config/config.js');

module.exports = (client) => {
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./../commands/${file}`);
        client.commands.set(command.name, command);
    }

    const cooldowns = new Discord.Collection();

    client.on('message', message => {
        var prefixForServer = message.client.settings.get(message.guild.id).BotPrefix

        if (!message.content.startsWith(prefixForServer || prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefixForServer.length || prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
    
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if (!command){
            return message.reply(`Command ${prefixForServer || prefix}${commandName} don't exist!`);
        }
    
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
    
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
    
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefixForServer || prefix}${command.name} ${command.usage}\``;
            }
    
            return message.channel.send(reply);
        }

        if (command.ownerRequired && owner != message.author.id){
            return message.reply("That command is for development usage and can be executen only by owner of the bot");
        }
    
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
    
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    });
}