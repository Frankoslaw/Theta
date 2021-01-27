const chalk = require("chalk");

module.exports = {
    name: "guildCreate",
  
    run(guild) {
        console.log(chalk.green(`Joined: ${guild.id}!`))
        this.saveConfig(guild.id)
    }  
  }