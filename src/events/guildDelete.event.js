const chalk = require("chalk");

module.exports = {
    name: "guildDelete",
  
    run(guild) {
        console.log(chalk.green(`Leaved: ${guild.id}!`))
        this.deleteConfig(guild.id)
    }  
  }