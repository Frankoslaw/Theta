//https://discord.com/api/oauth2/authorize?client_id=790290978342305812&permissions=8&scope=bot
const { token } = require('./config/config.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const eventHandler = require("./handlers/Event.handler.js")

eventHandler(client)


client.login(token);