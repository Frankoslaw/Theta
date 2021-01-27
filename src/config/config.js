const dotenv = require("dotenv").config({ path: __dirname + "/./../../.env" })

module.exports = {
  token: process.env.TOKEN,
  prefix: "&",
  owner: "622801236340768775"
}