// Import Node Librarys
const { App }           = require("@slack/bolt")
const github         = require("./github")
const commands = require("./commands.js")

const errorBlock = require('./block_templates/error/message.json')

// dotenv setup
require("dotenv").config()

// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   port: process.env.PORT
});



// The echo command simply echoes on command
app.command('/issue', async ({ command, ack, say, respond }) => {
   try
   {
      await ack().then(() => {
         return commands.splitArgs(command.text)
      }).then((data) => {
         return github.getReposIssues(data[0], data[1])
      }).then((block) => {
         say(block)
      });
   }
   catch(err)
   {
      console.log(err)
      respond(errorBlock)
   }
});

(async () => {
   // Start your app
   await app.start();
   console.log(`⚡️ Slack Bolt app is running!`);
})();