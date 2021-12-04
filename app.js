// Import Node Librarys
const { App }     = require("@slack/bolt")

// dotenv setup
require("dotenv").config()

// Define all constant and global variables
const botToken    = process.env.BOT_TOKEN
const slackSecret = process.env.SLACK_SECRET 


// Initializes your app with your bot token and signing secret
const app = new App({
   token: botToken,
   signingSecret: slackSecret,
 });
 
 app.command("/test", async ({ command, ack, say }) => {
   try {
     await ack();
     say("Yaaay! that command works!");
   } catch (error) {
       console.log("err")
     console.error(error);
   }
});


 (async () => {
   const port = 3000
   // Start your app
   await app.start(process.env.PORT || port);
   console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
 })();