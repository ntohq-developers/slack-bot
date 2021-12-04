// Import Node Librarys
const { App } = require("@slack/bolt")

// dotenv setup
require("dotenv").config()



// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   socketMode: false,
});


(async () => {
   const port = process.env.PORT || 3000

   // Start your app
   await app.start(process.env.PORT || port);
   console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();


app.event("member_joined_channel", async ({ event, client }) => {
   try {
      // Call chat.postMessage with the built-in client
      const result = await client.chat.postMessage({
         channel: welcomeChannelId,
         text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`
      });
      console.log(result);
   }
   catch (error) {
      console.error(error);
   }
})

app.error((error) => {
   // Check the details of the error to handle cases where you should retry sending a message or stop the app
   console.error(error);
});