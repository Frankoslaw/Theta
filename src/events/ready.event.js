const chalk = require("chalk");

const settingsHandler = require("../handlers/Settings.handler.js")
const commandHandler = require("../handlers/Command.handler.js")

module.exports = {
    name: "ready",
  
    run() {
        commandHandler(this)
        settingsHandler(this)

        console.log(chalk.green(`Logged in as ${this.user.tag}!`))
    }  
  }