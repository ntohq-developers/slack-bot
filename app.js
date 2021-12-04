// Import Node Librarys
const { App } = require("@slack/bolt")

// dotenv setup
require("dotenv").config()



// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   port: process.env.PORT
});



// The echo command simply echoes on command
app.command('/test', async ({ command, ack, respond }) => {
   // Acknowledge command request
   await ack();
 
   await respond(`From: ${command.user_name} Message: ${command.text}`);
 });
 
 


(async () => {
   // Start your app
   await app.start();
   console.log(`⚡️ Slack Bolt app is running!`);
})();