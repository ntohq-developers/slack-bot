// Import Node Librarys
const { App }     = require("@slack/bolt")

// dotenv setup
require("dotenv").config()



// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET ,
   socketMode: true,
   appToken: process.env.APP_TOKEN
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
   const port = process.env.PORT || 3000
   
   // Start your app
   await app.start(process.env.PORT || port);
   console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
 })();

 

app.error((error) => {
   // Check the details of the error to handle cases where you should retry sending a message or stop the app
   console.error(error);
 }); 