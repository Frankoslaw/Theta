const { readdirSync, existsSync, mkdirSync } = require("fs")
const chalk = require("chalk")

const {
  Constants: { Events },
} = require("discord.js")

const serverEvents = Object.values(Events)

const serverEventsPath = __dirname + `/../events`

module.exports = (client) => {
  const events = readdirSync(serverEventsPath).filter((file) =>
    file.endsWith(".js"),
  )

  let registeredEventsCount = 0

  for (const file of events) {
    const event = require(__dirname + `/../events/${file}`)

    if (!event.run) {
      console.log(chalk.yellowBright(`Event '${file}' missing run().`))
      continue
    } else if (typeof event.run !== "function") {
      console.log(chalk.yellowBright(`Event '${file}' property 'run' must be a function.`))
      continue
    }

    if (serverEvents.includes(event.name)) {
      client.on(event.name, event.run)
      registeredEventsCount++
    } else {
      console.log(
        chalk.redBright(`Event '${event.name}' in '${file}' doesn't exist.`),
      )

      continue
    }
  }
  console.log(chalk.blueBright(`Registered ${registeredEventsCount} event(s).`))
}