// Import Node Librarys
const { App }           = require("@slack/bolt")
const github         = require("./github")
const commands = require("./commands.js")

const errorBlock   = require('./block_templates/error/message.json')
const announcmentsId = "C01CV401U23"
// dotenv setup
require("dotenv").config()

// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   port: process.env.PORT
});

app.event('team_join', async ({ event, client }) => {
   console.log("New User")
   try {
     const result = await client.chat.postMessage({
       channel: announcmentsId,
       text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`
     });
     console.log(result);
   }
   catch (error) {
     console.error(error);
   }
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