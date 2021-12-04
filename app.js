// Import Node Librarys
const { App } = require("@slack/bolt")

// dotenv setup
require("dotenv").config()

const port = process.env.PORT || 3000


// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   socketMode: false,
});


(async () => {

   // Start your app
   await app.start(port);
   console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
   // say() sends a message to the channel where the event was triggered
   await say({
     blocks: [
       {
         "type": "section",
         "text": {
           "type": "mrkdwn",
           "text": `Hey there <@${message.user}>!`
         },
         "accessory": {
           "type": "button",
           "text": {
             "type": "plain_text",
             "text": "Click Me"
           },
           "action_id": "button_click"
         }
       }
     ],
     text: `Hey there <@${message.user}>!`
   });
 });

app.error((error) => {
   // Check the details of the error to handle cases where you should retry sending a message or stop the app
   console.error(error);
});