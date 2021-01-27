const { Collection } = require("discord.js")
const chalk = require("chalk")
const { unlink, readdirSync, readFileSync, writeFileSync } = require("fs")
const yaml = require("js-yaml")

const serverConfigPath = "/config/servers"

module.exports = (client) => {
    client.settings = new Collection()
    var ids = client.guilds.cache.map(guild => guild.id)

    client.saveConfig = (guildId) => {
        try {
            var yamlStr;
            if(guildId == undefined){
                for( let [key, value] of client.settings){
                    yamlStr = yaml.safeDump(value)

                    writeFileSync(__dirname + `/..${serverConfigPath}/${key}.config.yaml`, yamlStr, "utf8",)
                }
            }else{
                if(client.settings.has(guildId)){
                    yamlStr = yaml.safeDump(client.settings.get(guildId))
                }else{
                    yamlStr = readFileSync(__dirname + `/../config/servers/template.config.yaml`, "utf8",)
                    client.settings.set(guildId, yaml.safeLoad(yamlStr))
                }

                writeFileSync(__dirname + `/..${serverConfigPath}/${guildId}.config.yaml`, yamlStr, "utf8",)
            }
        } catch (e) {
            console.log(e)
        }
    }
    client.loadConfig = (guildId) => {
        ids = client.guilds.cache.map(guild => guild.id)

        try {
            if(guildId == undefined){
                const settingsFiles = readdirSync(
                    __dirname + `/..${serverConfigPath}`,
                ).filter((file) => file.endsWith(".config.yaml"))

                for (const file of settingsFiles) {
                    let settingsFile = readFileSync(__dirname + `/..${serverConfigPath}/${file}`, "utf8",)
            
                    let data = yaml.safeLoad(settingsFile)
                    //check data don't have deleted roles

                    let guildIdstr = file.split(".")[0]
            
                    if(guildIdstr == "template"){
                        continue;
                    }

                    if(ids.includes(guildIdstr)){
                        client.settings.set(guildIdstr, data)
                    }else{
                        client.deleteConfig(guildIdstr)
                    }
                }
            }else{
                if(ids.includes(guildId)){
                    let settingsFile = readFileSync(__dirname + `/..${serverConfigPath}/${guildId}.config.yaml`, "utf8",)
                    let data = yaml.safeLoad(settingsFile)

                    client.settings.set(guildId, data)
                }else{
                    client.deleteConfig(guildId)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    client.deleteConfig = (guildId) => {
        console.log(`${guildId} unlinked!`)
        client.settings.delete(guildId)
        unlink(__dirname + `/..${serverConfigPath}/${guildId}.config.yaml`, (e) => {
            if(e){
                console.log(e)
                return
            }
        })
    }

    client.loadConfig()
    for(let id of ids){
        client.saveConfig(id)
    }
}