// Import Node Librarys
const { App }        = require("@slack/bolt")
const github         = require("./github")
const commands       = require("./commands.js")
const errorBlock     = require('./block_templates/error/message.json')
const announcmentsId = "C01CV401U23"

// dotenv setup
require("dotenv").config()

// Initializes your app with your bot token and signing secret
const app = new App({
   token: process.env.BOT_TOKEN,
   signingSecret: process.env.SLACK_SECRET,
   port: process.env.PORT
});

/**********************************************************************/
/*                             Prototypes                             */
/**********************************************************************/
async function GetRepoIssues(args)
{
   let flag     = args[0] // All the flag for the issue command
   let owner    = args[1] // The name of the owner
   let repoName = args[2] // The name of the repo
   let response           // Will contain the finale data or an error

   if(flag == 'o') {
      response = "This is feture is not compatiable"
   }
   else {  
      if(flag =='u') {
         response = await github.GetUsersReposIssues(owner, repoName)
      }
      else {
         response = "Somtheing went wrong"
      }
   }

   console.debug("DEBUG/app.js ln40 : " + response)
   return response
}

/**********************************************************************/
/*              App Events, Message Response, and Commands            */
/**********************************************************************/
app.event('team_join', async ({ event, client }) => {
   console.log("New User")
   try {
     const result = await client.chat.postMessage({
       channel: announcmentsId,
       text: `Welcome to the team, <@${event.user.id}>! 🎉`
     });
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
      }).then((args) => {
         return GetRepoIssues(args)
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